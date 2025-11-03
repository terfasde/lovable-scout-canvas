import { supabase } from "@/integrations/supabase/client";

export type Thread = {
  id: string;
  author_id: string;
  content: string;
  image_url?: string | null;
  created_at: string;
};

export type ThreadComment = {
  id: string;
  thread_id: string;
  author_id: string;
  content: string;
  created_at: string;
};

export async function listThreads(limit = 50): Promise<Thread[]> {
  const { data, error } = await supabase
    .from('threads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data as Thread[];
}

export async function createThread(content: string, file?: File | null): Promise<Thread> {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) throw new Error('No autenticado');

  let imageUrl: string | null = null;
  if (file) {
    const ext = file.name.split('.').pop();
    const path = `${userId}/${crypto.randomUUID()}.${ext || 'jpg'}`;
    const { error: upErr } = await supabase.storage.from('thread-images').upload(path, file, {
      upsert: false,
      cacheControl: '3600',
    });
    if (upErr) throw upErr;
    const { data: pub } = supabase.storage.from('thread-images').getPublicUrl(path);
    imageUrl = pub.publicUrl;
  }

  const { data, error } = await supabase
    .from('threads')
    .insert({ author_id: userId, content, image_url: imageUrl })
    .select('*')
    .single();
  if (error) throw error;
  return data as Thread;
}

export async function listComments(threadId: string): Promise<ThreadComment[]> {
  const { data, error } = await supabase
    .from('thread_comments')
    .select('*')
    .eq('thread_id', threadId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data as ThreadComment[];
}

export async function addComment(threadId: string, content: string): Promise<ThreadComment> {
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData.user?.id;
  if (!userId) throw new Error('No autenticado');

  const { data, error } = await supabase
    .from('thread_comments')
    .insert({ thread_id: threadId, author_id: userId, content })
    .select('*')
    .single();
  if (error) throw error;
  return data as ThreadComment;
}
