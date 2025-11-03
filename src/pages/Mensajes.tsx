import { useEffect, useMemo, useState } from "react";
import Navigation from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface ProfileLite {
  user_id: string;
  nombre_completo: string | null;
  username?: string | null;
  avatar_url?: string | null;
}

interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export default function Mensajes() {
  const [directory, setDirectory] = useState<ProfileLite[]>([]);
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<ProfileLite | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.rpc('list_profiles_directory');
      if (error) {
        console.error(error);
      } else {
        setDirectory((data as any[]).map(r => ({
          user_id: String(r.user_id),
          nombre_completo: r.nombre_completo ?? null,
          username: r.username ?? null,
          avatar_url: r.avatar_url ?? null,
        })));
      }
    })();
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return directory.slice(0, 10);
    return directory.filter(u => {
      const matchesUsername = (u.username || '').toLowerCase().includes(q);
      const matchesName = (u.nombre_completo || '').toLowerCase().includes(q);
      // También buscar si escriben @username
      const matchesAt = q.startsWith('@') && (u.username || '').toLowerCase().includes(q.slice(1));
      return matchesUsername || matchesName || matchesAt;
    }).slice(0, 10);
  }, [search, directory]);

  const startConversation = async () => {
    if (!selectedUser) return;
    try {
      const { data, error } = await supabase.rpc('create_or_get_conversation', { other_user_id: selectedUser.user_id });
      if (error) throw error;
      setConversationId(String(data));
      loadMessages(String(data));
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const loadMessages = async (convId: string) => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    setMessages(data as Message[]);
  };

  const send = async () => {
    if (!conversationId || !newMessage.trim()) return;
    const { data: userData } = await supabase.auth.getUser();
    const sender_id = userData.user?.id;
    try {
      const { error } = await supabase
        .from('messages')
        .insert({ conversation_id: conversationId, sender_id, content: newMessage.trim() });
      if (error) throw error;
      setNewMessage("");
      await loadMessages(conversationId);
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="h-16 sm:h-20"></div>

      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Inicia una conversación</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="Buscar por nombre o @usuario" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="mt-3 space-y-2 max-h-64 overflow-auto">
              {filtered.map(u => (
                <button key={u.user_id} className={`w-full text-left p-2 rounded border ${selectedUser?.user_id===u.user_id? 'bg-accent' : ''}`} onClick={() => setSelectedUser(u)}>
                  <div className="font-medium">{u.nombre_completo || 'Scout'}</div>
                  <div className="text-xs text-muted-foreground">{u.username ? `@${u.username}` : ''}</div>
                </button>
              ))}
            </div>
            <Button className="w-full mt-3" disabled={!selectedUser} onClick={startConversation}>Abrir chat</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent>
            {!conversationId ? (
              <div className="text-muted-foreground">Selecciona un usuario y abre el chat.</div>
            ) : (
              <div className="flex flex-col h-[60vh]">
                <div className="flex-1 overflow-auto space-y-2 p-2 border rounded mb-2">
                  {messages.length === 0 ? (
                    <div className="text-muted-foreground text-sm">Sin mensajes aún</div>
                  ) : (
                    messages.map(m => (
                      <div key={m.id} className="text-sm"><span className="text-muted-foreground">[{new Date(m.created_at).toLocaleTimeString()}]</span> {m.content}</div>
                    ))
                  )}
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Escribe un mensaje..." value={newMessage} onChange={(e)=>setNewMessage(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); send(); } }} />
                  <Button onClick={send}>Enviar</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
