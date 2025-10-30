-- Agregar campo username a profiles
alter table public.profiles add column if not exists username text unique;
alter table public.profiles add column if not exists username_updated_at timestamptz;

-- Crear índice para búsquedas rápidas por username
create index if not exists idx_profiles_username on public.profiles(username);

-- Agregar constraint para formato de username (solo letras, números, guiones y puntos)
alter table public.profiles add constraint username_format 
  check (username ~* '^[a-z0-9._-]{3,30}$');

-- Función para validar cambio de username (máximo cada 7 días)
create or replace function check_username_change()
returns trigger as $$
begin
  -- Si es la primera vez que se establece el username, permitir
  if old.username is null then
    new.username_updated_at = now();
    return new;
  end if;
  
  -- Si el username no cambió, no hacer nada
  if old.username = new.username or new.username is null then
    return new;
  end if;
  
  -- Si cambió, verificar que hayan pasado 7 días
  if old.username_updated_at is not null and 
     now() - old.username_updated_at < interval '7 days' then
    raise exception 'Solo puedes cambiar tu nombre de usuario cada 7 días. Último cambio: %', 
      old.username_updated_at;
  end if;
  
  -- Permitir el cambio y actualizar la fecha
  new.username_updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger para validar cambios de username
drop trigger if exists validate_username_change on public.profiles;
create trigger validate_username_change
  before update on public.profiles
  for each row
  execute function check_username_change();

-- Comentarios
comment on column public.profiles.username is 'Nombre de usuario único estilo @instagram, 3-30 caracteres, solo letras, números, puntos, guiones bajos y guiones. Solo se puede cambiar cada 7 días';
comment on column public.profiles.username_updated_at is 'Fecha del último cambio de username, usado para validar que solo se cambie cada 7 días';
