import { useEffect, useMemo, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, FolderPlus, ImagePlus, Images } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { createAlbum, listAlbums, listImages, uploadImage } from "@/lib/gallery";

// Lista de emails con permisos de administración separados por comas
const ADMIN_EMAILS = (import.meta.env.VITE_GALLERY_ADMIN_EMAILS || "admin@example.com")
  .split(",")
  .map((e: string) => e.trim().toLowerCase());

type Album = {
  name: string;
  coverUrl?: string;
};

const sampleAlbums: Record<string, string[]> = {
  Campamentos: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470246973918-29a93221c455?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=800&auto=format&fit=crop",
  ],
  BAUEN: [
    "https://images.unsplash.com/photo-1573167243872-43c6433b9d40?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=800&auto=format&fit=crop",
  ],
  "Actividades Grupales": [
    "https://images.unsplash.com/photo-1520975922284-4fe8cdd143ba?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975867597-0f6159b7a8f8?q=80&w=800&auto=format&fit=crop",
  ],
};

const Galeria = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // Verificar admin por email
        const { data: { user } } = await supabase.auth.getUser();
        const email = user?.email || "";
        setIsAdmin(ADMIN_EMAILS.includes(email.toLowerCase()));

        // Intentar cargar desde Storage
        const storageAlbums = await listAlbums().catch(() => []);
        if (storageAlbums.length) {
          setAlbums(storageAlbums);
          setSelected(storageAlbums[0].name);
          const imgs = await listImages(storageAlbums[0].name).catch(() => []);
          setImages(imgs);
        } else {
          // Fallback: álbunes de ejemplo
          const sample = Object.keys(sampleAlbums).map((k) => ({ name: k }));
          setAlbums(sample);
          setSelected(sample[0]?.name || "");
          setImages(sampleAlbums[sample[0]?.name || ""] || []);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!selected) return;
      if (sampleAlbums[selected]) {
        setImages(sampleAlbums[selected]);
        return;
      }
      const imgs = await listImages(selected).catch(() => []);
      setImages(imgs);
    })();
  }, [selected]);

  const handleCreateAlbum = async () => {
    const name = prompt("Nombre del álbum/carpeta:");
    if (!name) return;
    await createAlbum(name);
    const updated = await listAlbums().catch(() => []);
    setAlbums(updated);
    setSelected(name);
    const imgs = await listImages(name).catch(() => []);
    setImages(imgs);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !selected) return;
    for (const file of Array.from(files)) {
      await uploadImage(selected, file);
    }
    const imgs = await listImages(selected).catch(() => []);
    setImages(imgs);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Camera className="w-5 h-5 text-primary" />
              <span className="text-primary font-semibold">Galería</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">Momentos del Grupo</h1>
            <p className="text-muted-foreground">Explora los álbumes y revive nuestras actividades</p>
          </div>
        </div>
      </section>

      {/* Admin bar */}
      {isAdmin && (
        <section className="pb-2">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center gap-3 justify-center">
              <Button variant="outline" onClick={handleCreateAlbum} className="gap-2">
                <FolderPlus className="w-4 h-4" /> Crear álbum
              </Button>
              <div>
                <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" id="upload-input" />
                <Button variant="outline" onClick={() => document.getElementById("upload-input")?.click()} className="gap-2">
                  <ImagePlus className="w-4 h-4" /> Subir fotos
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Albums pills */}
      <section className="pb-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {albums.map((a) => (
              <button
                key={a.name}
                onClick={() => setSelected(a.name)}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  selected === a.name ? "bg-primary text-primary-foreground" : "hover:bg-accent-hover"
                }`}
              >
                {a.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram-like grid */}
      <section className="pb-16">
        <div className="container mx-auto px-2 md:px-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : images.length ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2">
              {images.map((src, idx) => (
                <Card key={idx} className="rounded-none overflow-hidden">
                  <div className="relative aspect-square">
                    <img src={src} alt={`foto-${idx}`} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-20">
              <Images className="w-10 h-10 mx-auto mb-3" />
              No hay imágenes en este álbum todavía.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Galeria;
