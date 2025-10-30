import { supabase } from "@/integrations/supabase/client";

export type FollowStatus = "pending" | "accepted" | "blocked";

export async function getMyUserId() {
  const { data } = await supabase.auth.getUser();
  return data.user?.id || null;
}

export async function getFollowRelation(withUserId: string) {
  const me = await getMyUserId();
  if (!me) return { data: null, error: new Error("No autenticado") };
  return supabase
    .from("follows")
    .select("follower_id, followed_id, status, created_at, accepted_at")
    .or(`and(follower_id.eq.${me},followed_id.eq.${withUserId}),and(follower_id.eq.${withUserId},followed_id.eq.${me})`)
    .maybeSingle();
}

export async function followUser(targetUserId: string) {
  const me = await getMyUserId();
  if (!me) return { error: new Error("No autenticado") } as const;
  if (me === targetUserId) return { error: new Error("No puedes seguirte a ti mismo") } as const;
  
  // Check if relationship already exists
  const { data: existing } = await supabase
    .from("follows")
    .select("status")
    .eq("follower_id", me)
    .eq("followed_id", targetUserId)
    .maybeSingle();
  
  if (existing) {
    if (existing.status === "pending") {
      return { error: new Error("Ya tienes una solicitud pendiente") } as const;
    }
    if (existing.status === "accepted") {
      return { error: new Error("Ya sigues a este usuario") } as const;
    }
    if (existing.status === "blocked") {
      return { error: new Error("No puedes seguir a este usuario") } as const;
    }
  }
  
  const { error } = await supabase.from("follows").insert({
    follower_id: me,
    followed_id: targetUserId,
  });
  return { error } as const;
}

export async function unfollowUser(targetUserId: string) {
  const me = await getMyUserId();
  if (!me) return { error: new Error("No autenticado") } as const;
  return supabase
    .from("follows")
    .delete()
    .eq("follower_id", me)
    .eq("followed_id", targetUserId);
}

export async function cancelRequest(targetUserId: string) {
  // same as unfollow for pending
  return unfollowUser(targetUserId);
}

export async function acceptFollow(followerId: string) {
  const me = await getMyUserId();
  if (!me) return { error: new Error("No autenticado") } as const;
  return supabase
    .from("follows")
    .update({ status: "accepted", accepted_at: new Date().toISOString() })
    .eq("followed_id", me)
    .eq("follower_id", followerId)
    .eq("status", "pending");
}

export async function rejectFollow(followerId: string) {
  const me = await getMyUserId();
  if (!me) return { error: new Error("No autenticado") } as const;
  return supabase
    .from("follows")
    .delete()
    .eq("followed_id", me)
    .eq("follower_id", followerId)
    .eq("status", "pending");
}

export async function getFollowers(userId: string) {
  return supabase
    .from("follows")
    .select("follower_id, created_at")
    .eq("followed_id", userId)
    .eq("status", "accepted")
    .order("created_at", { ascending: false });
}

export async function getFollowing(userId: string) {
  return supabase
    .from("follows")
    .select("followed_id, created_at")
    .eq("follower_id", userId)
    .eq("status", "accepted")
    .order("created_at", { ascending: false });
}

export async function getPendingRequestsForMe() {
  const me = await getMyUserId();
  if (!me) return { data: [], error: new Error("No autenticado") } as const;
  
  // Get pending follows
  const { data: follows, error: followsError } = await supabase
    .from("follows")
    .select("follower_id, created_at")
    .eq("followed_id", me)
    .eq("status", "pending")
    .order("created_at", { ascending: false });
  
  if (followsError || !follows) {
    return { data: [], error: followsError };
  }
  
  // Get follower profiles separately
  const followerIds = follows.map(f => f.follower_id);
  if (followerIds.length === 0) {
    return { data: [], error: null };
  }
  
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("user_id, nombre_completo, avatar_url, username")
    .in("user_id", followerIds);
  
  if (profilesError) {
    return { data: [], error: profilesError };
  }
  
  // Merge data
  const result = follows.map(f => ({
    follower_id: f.follower_id,
    created_at: f.created_at,
    follower: profiles?.find(p => p.user_id === f.follower_id) || null
  }));
  
  return { data: result, error: null };
}

// Counts
export async function getFollowersCount(userId: string) {
  return supabase
    .from("follows")
    .select("follower_id", { count: "exact", head: true })
    .eq("followed_id", userId)
    .eq("status", "accepted");
}

export async function getFollowingCount(userId: string) {
  return supabase
    .from("follows")
    .select("followed_id", { count: "exact", head: true })
    .eq("follower_id", userId)
    .eq("status", "accepted");
}

// Lists with optional joined profiles (subject to RLS; may be null)
export async function getFollowersWithProfiles(userId: string, from = 0, to = 49) {
  // Get follows
  const { data: follows, error: followsError } = await supabase
    .from("follows")
    .select("follower_id, created_at")
    .eq("followed_id", userId)
    .eq("status", "accepted")
    .order("created_at", { ascending: false })
    .range(from, to);
  
  if (followsError || !follows) {
    return { data: [], error: followsError };
  }
  
  // Get profiles separately
  const followerIds = follows.map(f => f.follower_id);
  if (followerIds.length === 0) {
    return { data: [], error: null };
  }
  
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("user_id, nombre_completo, avatar_url, username")
    .in("user_id", followerIds);
  
  if (profilesError) {
    return { data: [], error: profilesError };
  }
  
  // Merge data
  const result = follows.map(f => ({
    follower_id: f.follower_id,
    created_at: f.created_at,
    follower: profiles?.find(p => p.user_id === f.follower_id) || null
  }));
  
  return { data: result, error: null };
}

export async function getFollowingWithProfiles(userId: string, from = 0, to = 49) {
  // Get follows
  const { data: follows, error: followsError } = await supabase
    .from("follows")
    .select("followed_id, created_at")
    .eq("follower_id", userId)
    .eq("status", "accepted")
    .order("created_at", { ascending: false })
    .range(from, to);
  
  if (followsError || !follows) {
    return { data: [], error: followsError };
  }
  
  // Get profiles separately
  const followedIds = follows.map(f => f.followed_id);
  if (followedIds.length === 0) {
    return { data: [], error: null };
  }
  
  const { data: profiles, error: profilesError } = await supabase
    .from("profiles")
    .select("user_id, nombre_completo, avatar_url, username")
    .in("user_id", followedIds);
  
  if (profilesError) {
    return { data: [], error: profilesError };
  }
  
  // Merge data
  const result = follows.map(f => ({
    followed_id: f.followed_id,
    created_at: f.created_at,
    followed: profiles?.find(p => p.user_id === f.followed_id) || null
  }));
  
  return { data: result, error: null };
}
