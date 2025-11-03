-- Agregar membresía del creador como owner automáticamente al crear un grupo
CREATE OR REPLACE FUNCTION public.add_group_owner_membership()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.group_members (group_id, user_id, role, joined_at)
  VALUES (NEW.id, NEW.creator_id, 'owner', NOW())
  ON CONFLICT (group_id, user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Asegurar trigger único
DROP TRIGGER IF EXISTS group_owner_membership ON public.groups;

CREATE TRIGGER group_owner_membership
AFTER INSERT ON public.groups
FOR EACH ROW
EXECUTE FUNCTION public.add_group_owner_membership();
