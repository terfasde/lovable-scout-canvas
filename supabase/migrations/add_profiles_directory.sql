-- Directory function to list minimal profile info for discovery, bypassing profiles RLS safely
-- Returns only non-sensible fields and can be executed by authenticated users

create or replace function public.list_profiles_directory()
returns table (
  user_id uuid,
  nombre_completo text,
  avatar_url text,
  edad int,
  is_public boolean
)
language sql
security definer
set search_path = public
stable
as $$
  select p.user_id, p.nombre_completo, p.avatar_url, p.edad, p.is_public
  from public.profiles p
  order by p.nombre_completo nulls last, p.user_id;
$$;

revoke all on function public.list_profiles_directory() from public;
grant execute on function public.list_profiles_directory() to authenticated;
-- Optionally allow anonymous to discover public list (commented):
-- grant execute on function public.list_profiles_directory() to anon;
