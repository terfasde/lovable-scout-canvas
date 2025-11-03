import { isLocalBackend, apiFetch } from "@/lib/backend";
import { supabase } from "@/integrations/supabase/client";

export type Conversation = { id: string; user_a: string; user_b: string; created_at: string };
export type DMMessage = { id: string; conversation_id: string; sender_id: string; content: string; created_at: string };

export async function createOrGetConversation(otherUserId: string): Promise<Conversation> {
  if (isLocalBackend()) {
    const convo = await apiFetch('/dms/conversations', {
      method: 'POST',
      body: JSON.stringify({ otherId: otherUserId })
    })
    return convo as Conversation
  }
  const { data, error } = await supabase.rpc('create_or_get_conversation', { other_user_id: otherUserId })
  if (error) throw error
  // supabase RPC returns id; fetch row shape minimally
  return { id: String(data), user_a: '', user_b: '', created_at: new Date().toISOString() }
}

export async function listDMs(conversationId: string): Promise<DMMessage[]> {
  if (isLocalBackend()) {
    const rows = await apiFetch(`/dms/conversations/${conversationId}/messages`)
    return rows as DMMessage[]
  }
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .eq('conversation_id', conversationId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return (data || []) as DMMessage[]
}

export async function sendDM(conversationId: string, content: string): Promise<DMMessage> {
  if (isLocalBackend()) {
    const row = await apiFetch(`/dms/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content })
    })
    return row as DMMessage
  }
  const { data, error } = await supabase
    .from('messages')
    .insert({ conversation_id: conversationId, content })
    .select()
    .single()
  if (error) throw error
  return data as DMMessage
}
