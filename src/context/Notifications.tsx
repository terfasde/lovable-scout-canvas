import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseUser } from "@/App";
import { useToast } from "@/hooks/use-toast";

export type AppNotification = {
  id: string;
  type: "message" | "follow_request" | "thread_comment" | "mention";
  created_at: string;
  read: boolean;
  data: Record<string, any>;
};

interface NotificationsContextType {
  notifications: AppNotification[];
  unreadCount: number;
  addNotification: (n: AppNotification) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
  removeNotification: (id: string) => void;
  loadMore: () => Promise<void>;
  hasMore: boolean;
  loadingMore: boolean;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications debe usarse dentro de NotificationsProvider");
  return ctx;
};

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useSupabaseUser();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [oldestPersistedTimestamp, setOldestPersistedTimestamp] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const { toast } = useToast();

  const addNotification = useCallback((n: AppNotification) => {
    setNotifications(prev => [n, ...prev]);
  }, []);

  const markAllRead = useCallback(async () => {
    if (!user) return;
    const unread = notifications.filter(n => !n.read);
    if (unread.length === 0) return;
    const persistentIds = unread.filter(n => n.type === 'thread_comment' || n.type === 'mention').map(n => n.id);
    if (persistentIds.length > 0) {
      await supabase
        .from("notifications")
        .update({ read_at: new Date().toISOString() })
        .in("id", persistentIds);
    }
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }, [notifications, user]);

  const markRead = useCallback(async (id: string) => {
    const target = notifications.find(n => n.id === id);
    if (!target) return;
    if (!target.read && (target.type === 'thread_comment' || target.type === 'mention')) {
      await supabase.from('notifications').update({ read_at: new Date().toISOString() }).eq('id', id);
    }
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }, [notifications]);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Suscripción a solicitudes de seguimiento nuevas
  useEffect(() => {
    if (!user) return;
    const channelFollows = supabase
      .channel(`follows:pending:${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "follows", filter: `followed_id=eq.${user.id}` },
        async payload => {
          const row: any = payload.new;
          if (row.status !== "pending") return;
          // Obtener perfil del seguidor
          const { data: prof } = await supabase
            .from("profiles")
            .select("nombre_completo, username, avatar_url")
            .eq("user_id", row.follower_id)
            .maybeSingle();
          const display = prof?.nombre_completo || prof?.username || row.follower_id.slice(0, 8);
          const notif: AppNotification = {
            id: `follow-${row.follower_id}-${row.created_at}`,
            type: "follow_request",
            created_at: new Date().toISOString(),
            read: false,
            data: { follower_id: row.follower_id, display, avatar_url: prof?.avatar_url || null }
          };
          addNotification(notif);
          toast({ title: "Nueva solicitud de seguimiento", description: `${display} quiere seguirte` });
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channelFollows); };
  }, [user, addNotification, toast]);

  // Suscripción a mensajes nuevos en cualquier conversación del usuario
  useEffect(() => {
    if (!user) return;
    // Suscribirse a todos los mensajes: filtrar en el handler
    const channelMessages = supabase
      .channel(`messages:any:${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        payload => {
          const row: any = payload.new;
          if (row.sender_id === user.id) return; // ignorar propios
          // Crear notificación optimista sin validar conversación
          const notif: AppNotification = {
            id: `msg-${row.id}`,
            type: "message",
            created_at: row.created_at || new Date().toISOString(),
            read: false,
            data: { conversation_id: row.conversation_id, sender_id: row.sender_id, content: row.content }
          };
          addNotification(notif);
          toast({ title: "Nuevo mensaje", description: row.content?.slice(0, 80) || "Mensaje recibido" });
        }
      )
      .subscribe();
    return () => { supabase.removeChannel(channelMessages); };
  }, [user, addNotification, toast]);

  // Cargar notificaciones persistentes (thread_comment, mention) y suscribirse a nuevas
  useEffect(() => {
    if (!user) return;
    let channel: any;
    (async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("id, type, created_at, read_at, data")
        .eq("recipient_id", user.id)
        .order("created_at", { ascending: false })
        .limit(50);
      if (!error && data) {
        setNotifications(prev => {
          // Mantener existentes (mensajes, follows en memoria) y combinar con persistentes evitando duplicados por id
          const map = new Map(prev.map(n => [n.id, n] as const));
          for (const r of data as any[]) {
            map.set(r.id, {
              id: r.id,
              type: r.type,
              created_at: r.created_at,
              read: !!r.read_at,
              data: r.data || {}
            });
          }
          return Array.from(map.values()).sort((a,b) => (a.created_at < b.created_at ? 1 : -1));
        });
        if (data.length === 50) {
          setHasMore(true);
          const oldest = data[data.length - 1];
          setOldestPersistedTimestamp(oldest.created_at);
        } else {
          setHasMore(false);
        }
      }
      channel = supabase
        .channel(`notifications:ins:${user.id}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "notifications", filter: `recipient_id=eq.${user.id}` },
          (payload) => {
            const row: any = payload.new;
            const notif: AppNotification = {
              id: row.id,
              type: row.type,
              created_at: row.created_at,
              read: false,
              data: row.data || {}
            };
            addNotification(notif);
            if (row.type === "thread_comment") {
              toast({ title: "Nuevo comentario en tu hilo", description: (row.data?.content || "").slice(0,80) });
            } else if (row.type === "mention") {
              const uname = row.data?.username ? `@${row.data.username}` : "";
              toast({ title: "Te mencionaron", description: `${uname} ${(row.data?.content || "").slice(0,70)}`.trim() });
            }
          }
        )
        .subscribe();
    })();
    return () => { if (channel) supabase.removeChannel(channel); };
  }, [user, addNotification, toast]);

  const loadMore = useCallback(async () => {
    if (!user || !hasMore || loadingMore || !oldestPersistedTimestamp) return;
    setLoadingMore(true);
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('id, type, created_at, read_at, data')
        .eq('recipient_id', user.id)
        .lt('created_at', oldestPersistedTimestamp)
        .order('created_at', { ascending: false })
        .limit(50);
      if (!error && data && data.length > 0) {
        setNotifications(prev => {
          const map = new Map(prev.map(n => [n.id, n] as const));
          for (const r of data as any[]) {
            map.set(r.id, {
              id: r.id,
              type: r.type,
              created_at: r.created_at,
              read: !!r.read_at,
              data: r.data || {}
            });
          }
          return Array.from(map.values()).sort((a,b) => (a.created_at < b.created_at ? 1 : -1));
        });
        if (data.length === 50) {
          const oldest = data[data.length - 1];
          setOldestPersistedTimestamp(oldest.created_at);
          setHasMore(true);
        } else {
          setHasMore(false);
        }
      } else if (!error && data && data.length === 0) {
        setHasMore(false);
      }
    } finally {
      setLoadingMore(false);
    }
  }, [user, hasMore, loadingMore, oldestPersistedTimestamp]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, addNotification, markAllRead, markRead, removeNotification, loadMore, hasMore, loadingMore }}>
      {children}
    </NotificationsContext.Provider>
  );
};
