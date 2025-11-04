import { useEffect, useMemo, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { isLocalBackend, apiFetch } from "@/lib/backend";
import { getFollowers, getFollowing } from "@/lib/follows";
import { createOrGetConversation, listDMs, sendDM } from "@/lib/dms";
import { useToast } from "@/hooks/use-toast";
import { Smile, Sticker } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

interface MessageWithSender extends Message {
  sender_username?: string | null;
  sender_name?: string | null;
}

// Emojis comunes scouts
const EMOJIS = ['😊', '😂', '❤️', '👍', '🙏', '🎉', '🔥', '⭐', '👏', '🙌', '💪', '✨', '🌟', '🏕️', '⛺', '🎒', '🔦', '🧭', '🪵', '🔥'];

// Stickers scouts
const STICKERS = [
  '🏕️ Campamento',
  '⛺ Carpa',
  '🎒 Mochila',
  '🔦 Linterna',
  '🧭 Brújula',
  '🪵 Fogata',
  '🌲 Bosque',
  '⚜️ Flor de Lis',
  '🪢 Nudo',
  '🎯 Siempre Listo',
  '🦅 Águila',
  '🐺 Lobo',
  '⚡ Relámpago',
  '🌙 Luna',
  '☀️ Sol',
];

export default function Mensajes() {
  const [directory, setDirectory] = useState<ProfileLite[]>([]);
  const [mutualFollows, setMutualFollows] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState<ProfileLite | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      if (isLocalBackend()) {
        // me
        const me = await apiFetch('/profiles/me') as any;
        const myId = String(me.id || me.user_id);
        setCurrentUserId(myId);
        // mutuals
        const { data: iFollow } = await getFollowing(myId);
        const { data: followsMe } = await getFollowers(myId);
        const iFollowSet = new Set<string>((iFollow || []).map((f: any) => String(f.followed_id || f.following_id)));
        const followsMeSet = new Set<string>((followsMe || []).map((f: any) => String(f.follower_id)));
        const mutuals = new Set<string>();
        iFollowSet.forEach((id) => { if (followsMeSet.has(id)) mutuals.add(id); });
        setMutualFollows(mutuals);
        // Directory = perfiles de mutuals
        const ids = Array.from(mutuals);
        const profiles = ids.length ? await apiFetch('/profiles/batch', { method: 'POST', body: JSON.stringify({ ids }) }) : [];
        setDirectory((profiles as any[]).map(p => ({
          user_id: String((p as any).user_id),
          nombre_completo: (p as any).nombre_completo ?? null,
          username: (p as any).username ?? null,
          avatar_url: (p as any).avatar_url ?? null,
        })));
        return;
      }
      // Supabase path
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        setCurrentUserId(userData.user.id);
        const { data: iFollow } = await supabase
          .from('follows')
          .select('followed_id')
          .eq('follower_id', userData.user.id)
          .eq('status', 'accepted');
        const { data: followsMe } = await supabase
          .from('follows')
          .select('follower_id')
          .eq('followed_id', userData.user.id)
          .eq('status', 'accepted');
        const iFollowSet = new Set((iFollow || []).map(f => f.followed_id));
        const followsMeSet = new Set((followsMe || []).map(f => f.follower_id));
        const mutuals = new Set<string>();
        iFollowSet.forEach(id => { if (followsMeSet.has(id)) mutuals.add(id); });
        setMutualFollows(mutuals);
      }
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
    // Filtrar: solo usuarios que se siguen mutuamente (excluyendo el usuario actual)
    const users = directory.filter(u => 
      u.user_id !== currentUserId && mutualFollows.has(u.user_id)
    );
    
    if (!q) return users.slice(0, 10);
    return users.filter(u => {
      const matchesUsername = (u.username || '').toLowerCase().includes(q);
      const matchesName = (u.nombre_completo || '').toLowerCase().includes(q);
      // También buscar si escriben @username
      const matchesAt = q.startsWith('@') && (u.username || '').toLowerCase().includes(q.slice(1));
      return matchesUsername || matchesName || matchesAt;
    }).slice(0, 10);
  }, [search, directory, currentUserId, mutualFollows]);

  const startConversation = async () => {
    if (!selectedUser) return;
    try {
      if (isLocalBackend()) {
        const convo = await createOrGetConversation(selectedUser.user_id);
        setConversationId(convo.id);
        loadMessages(convo.id);
      } else {
        const { data, error } = await supabase.rpc('create_or_get_conversation', { other_user_id: selectedUser.user_id });
        if (error) throw error;
        setConversationId(String(data));
        loadMessages(String(data));
      }
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const loadMessages = async (convId: string) => {
    if (isLocalBackend()) {
      try {
        const data = await listDMs(convId);
        const messagesWithSender: MessageWithSender[] = (data as Message[]).map(msg => {
          const sender = directory.find(u => u.user_id === msg.sender_id);
          return { ...msg, sender_username: sender?.username, sender_name: sender?.nombre_completo };
        });
        setMessages(messagesWithSender);
        setTimeout(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
      } catch (error: any) {
        toast({ title: 'Error', description: error.message, variant: 'destructive' });
      }
      return;
    }
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', convId)
      .order('created_at', { ascending: true });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
      return;
    }
    const messagesWithSender: MessageWithSender[] = (data as Message[]).map(msg => {
      const sender = directory.find(u => u.user_id === msg.sender_id);
      return { ...msg, sender_username: sender?.username, sender_name: sender?.nombre_completo };
    });
    setMessages(messagesWithSender);
    setTimeout(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
  };
  
  // Real-time/polling para mensajes nuevos
  useEffect(() => {
    if (!conversationId) return;
    if (isLocalBackend()) {
      const interval = setInterval(() => { loadMessages(conversationId); }, 1500);
      return () => clearInterval(interval);
    }
    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` }, (payload) => {
        const newMsg = payload.new as Message;
        const sender = directory.find(u => u.user_id === newMsg.sender_id);
        const enriched: MessageWithSender = { ...newMsg, sender_username: sender?.username, sender_name: sender?.nombre_completo };
        setMessages(prev => { if (prev.some(m => m.id === enriched.id)) return prev; return [...prev, enriched]; });
        setTimeout(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [conversationId, directory]);

  const send = async () => {
    if (!conversationId || !newMessage.trim()) return;
    
    const tempMessage = newMessage.trim();
    setNewMessage(""); // Limpiar inmediatamente para mejor UX
    
    try {
      if (isLocalBackend()) {
        await sendDM(conversationId, tempMessage);
      } else {
        const { data: userData } = await supabase.auth.getUser();
        const sender_id = userData.user?.id;
        const { error } = await supabase
          .from('messages')
          .insert({ conversation_id: conversationId, sender_id, content: tempMessage });
        if (error) throw error;
      }
    } catch (e: any) {
      setNewMessage(tempMessage); // Restaurar mensaje si falla
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  const insertEmoji = (emoji: string) => {
    setNewMessage(prev => prev + emoji);
  };

  const sendSticker = async (sticker: string) => {
    if (!conversationId) return;
    try {
      if (isLocalBackend()) {
        await sendDM(conversationId, sticker);
      } else {
        const { data: userData } = await supabase.auth.getUser();
        const sender_id = userData.user?.id;
        const { error } = await supabase
          .from('messages')
          .insert({ conversation_id: conversationId, sender_id, content: sticker });
        if (error) throw error;
      }
    } catch (e: any) {
      toast({ title: 'Error', description: e.message, variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation global en App.tsx */}
      <div className="h-16 sm:h-20"></div>

      <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Inicia una conversación</CardTitle>
            <p className="text-sm text-muted-foreground">Solo con personas que se siguen mutuamente</p>
          </CardHeader>
          <CardContent>
            <Input placeholder="Buscar por nombre o @usuario" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="mt-3 space-y-2 max-h-64 overflow-auto">
              {filtered.length === 0 ? (
                <div className="text-sm text-muted-foreground text-center py-4">
                  No hay contactos mutuos disponibles
                </div>
              ) : (
                filtered.map(u => (
                  <button 
                    key={u.user_id} 
                    className={`w-full text-left p-2 rounded border transition-colors ${
                      selectedUser?.user_id === u.user_id 
                        ? 'bg-primary/10 border-primary/50' 
                        : 'hover:bg-muted/50 border-border'
                    }`} 
                    onClick={() => setSelectedUser(u)}
                  >
                    <div className="font-medium">{u.nombre_completo || 'Scout'}</div>
                    <div className="text-xs text-muted-foreground">{u.username ? `@${u.username}` : ''}</div>
                  </button>
                ))
              )}
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
                <div className="flex-1 overflow-auto space-y-3 p-4 border rounded mb-2">
                  {messages.length === 0 ? (
                    <div className="text-muted-foreground text-sm text-center py-8">Sin mensajes aún</div>
                  ) : (
                    <>
                      {messages.map(m => {
                        const isMine = m.sender_id === currentUserId;
                        return (
                          <div key={m.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] rounded-lg px-3 py-2 ${isMine ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                              {!isMine && (
                                <div className="text-xs opacity-70 mb-1">
                                  {m.sender_username ? `@${m.sender_username}` : m.sender_name || 'Scout'}
                                </div>
                              )}
                              <div className="text-sm">{m.content}</div>
                              <div className={`text-xs mt-1 ${isMine ? 'opacity-70' : 'opacity-50'}`}>
                                {new Date(m.created_at).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Escribe un mensaje..." 
                    value={newMessage} 
                    onChange={(e)=>setNewMessage(e.target.value)} 
                    onKeyDown={(e)=>{ if(e.key==='Enter'){ e.preventDefault(); send(); } }} 
                  />
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Smile className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <Tabs defaultValue="emojis">
                        <TabsList className="grid w-full grid-cols-2">
                          <TabsTrigger value="emojis">
                            <Smile className="h-4 w-4 mr-2" />
                            Emojis
                          </TabsTrigger>
                          <TabsTrigger value="stickers">
                            <Sticker className="h-4 w-4 mr-2" />
                            Stickers
                          </TabsTrigger>
                        </TabsList>
                        
                        <TabsContent value="emojis" className="mt-2">
                          <div className="grid grid-cols-10 gap-1">
                            {EMOJIS.map((emoji, i) => (
                              <button
                                key={i}
                                onClick={() => insertEmoji(emoji)}
                                className="text-2xl hover:bg-muted rounded p-1 transition-colors"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </TabsContent>
                        
                        <TabsContent value="stickers" className="mt-2">
                          <div className="grid grid-cols-1 gap-1 max-h-64 overflow-auto">
                            {STICKERS.map((sticker, i) => (
                              <button
                                key={i}
                                onClick={() => sendSticker(sticker)}
                                className="text-left px-3 py-2 hover:bg-muted rounded transition-colors text-sm"
                              >
                                {sticker}
                              </button>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </PopoverContent>
                  </Popover>
                  
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
