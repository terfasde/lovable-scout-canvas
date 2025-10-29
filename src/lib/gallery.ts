import { supabase } from "@/integrations/supabase/client";

export type GalleryAlbum = { name: string; coverUrl?: string };

const BUCKET = "gallery"; // Asegúrate de crear este bucket en Supabase Storage

export async function listAlbums(): Promise<GalleryAlbum[]> {
  // Supabase Storage no tiene carpetas reales; usamos prefijos en los paths
  const { data, error } = await supabase.storage.from(BUCKET).list(undefined, {
    limit: 100,
    offset: 0,
  });
  if (error) throw error;
  // Si no hay elementos en raíz, devolver vacío
  // Para detectar álbumes, listamos con search en raíz y filtramos por directorios simulados
  const folders = (data || [])
    .filter((d: any) => d?.metadata?.size === 0 && d.name.endsWith("/")) as any[];

  // Alternativa: si no hay carpetas, intentamos inferir a partir de prefijos en archivos
  if (!folders.length) {
    const { data: all, error: err2 } = await supabase.storage.from(BUCKET).list("", { limit: 1000 });
    if (err2) return [];
    const prefixes = new Set<string>();
    (all || []).forEach((f: any) => {
      const parts = f.name.split("/");
      if (parts.length > 1) prefixes.add(parts[0]);
    });
    return Array.from(prefixes).map((n) => ({ name: n }));
  }

  return folders.map((f: any) => ({ name: f.name.replace(/\/$/, "") }));
}

export async function listImages(album: string): Promise<{ url: string; path: string }[]> {
  const { data, error } = await supabase.storage.from(BUCKET).list(album, { limit: 1000 });
  if (error) throw error;
  const files = (data || []).filter((f: any) => !f.name.endsWith("/") && !f.name.startsWith("."));
  const images = files.map((f: any) => ({
    url: supabase.storage.from(BUCKET).getPublicUrl(`${album}/${f.name}`).data.publicUrl,
    path: `${album}/${f.name}`,
  }));
  return images;
}

export async function createAlbum(name: string): Promise<void> {
  // Crear carpeta simulada subiendo un archivo "oculto"
  const path = `${name}/.keep`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, new Blob([""]), {
    contentType: "text/plain",
    upsert: false,
  });
  if (error && !String(error.message).includes("The resource already exists")) throw error;
}

export async function uploadImage(album: string, file: File): Promise<void> {
  const ext = file.name.split(".").pop();
  const name = `${crypto.randomUUID()}.${ext}`;
  const path = `${album}/${name}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
}

export async function deleteImage(imagePath: string): Promise<void> {
  // imagePath debe ser relativo al bucket, ej: "Campamentos/abc123.jpg"
  const { error } = await supabase.storage.from(BUCKET).remove([imagePath]);
  if (error) throw error;
}
