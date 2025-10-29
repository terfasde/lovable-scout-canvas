import { useEffect, useMemo, useRef, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, FolderPlus, ImagePlus, Images, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { createAlbum, listAlbums, listImages, uploadImage, deleteImage } from "@/lib/gallery";
import { useToast } from "@/hooks/use-toast";

// Lista de emails con permisos de administración separados por comas
const ADMIN_EMAILS = (import.meta.env.VITE_GALLERY_ADMIN_EMAILS || "admin@example.com")
  .split(",")
  .map((e: string) => e.trim().toLowerCase());

type Album = {
  name: string;
  coverUrl?: string;
};

type ImageData = {
  url: string;
  path: string; // Para poder eliminar
};

const Galeria = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingImages, setLoadingImages] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    (async () => {
      try {
        // Verificar admin por email
        const { data: { user } } = await supabase.auth.getUser();
        const email = user?.email || "";
        setIsAdmin(ADMIN_EMAILS.includes(email.toLowerCase()));

        // Cargar álbumes desde Storage
        const storageAlbums = await listAlbums().catch(() => []);
        if (storageAlbums.length) {
          setAlbums(storageAlbums);
          setSelected(storageAlbums[0].name);
          const imgs = await listImages(storageAlbums[0].name).catch(() => []);
          setImages(imgs);
        } else {
          setAlbums([]);
          setImages([]);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!selected) return;
      setLoadingImages(true);
      const imgs = await listImages(selected).catch(() => []);
      setImages(imgs);
      setLoadingImages(false);
    })();
  }, [selected]);

  const handleCreateAlbum = async () => {
    if (!newAlbumName.trim()) {
      toast({
        title: "Error",
        description: "El nombre del álbum no puede estar vacío",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoadingImages(true);
      setShowCreateDialog(false);
      await createAlbum(newAlbumName.trim());
      const updated = await listAlbums().catch(() => []);
      setAlbums(updated);
      setSelected(newAlbumName.trim());
      const imgs = await listImages(newAlbumName.trim()).catch(() => []);
      setImages(imgs);
      setNewAlbumName("");
      toast({
        title: "Álbum creado",
        description: `El álbum "${newAlbumName.trim()}" se creó exitosamente.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudo crear el álbum: ${error}`,
        variant: "destructive",
      });
    } finally {
      setLoadingImages(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !selected) {
      toast({
        title: "Error",
        description: "Primero selecciona un álbum",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setLoadingImages(true);
      
      for (const file of Array.from(files)) {
        await uploadImage(selected, file);
      }
      
      const imgs = await listImages(selected).catch(() => []);
      setImages(imgs);
      toast({
        title: "Fotos subidas",
        description: `${files.length} foto(s) subida(s) exitosamente.`,
      });
    } catch (error) {
      toast({
        title: "Error al subir fotos",
        description: `${error}`,
        variant: "destructive",
      });
    } finally {
      setLoadingImages(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (imagePath: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta imagen?")) return;
    
    try {
      setLoadingImages(true);
      await deleteImage(imagePath);
      const imgs = await listImages(selected).catch(() => []);
      setImages(imgs);
      toast({
        title: "Imagen eliminada",
        description: "La imagen se eliminó correctamente.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudo eliminar la imagen: ${error}`,
        variant: "destructive",
      });
    } finally {
      setLoadingImages(false);
    }
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
              <Button variant="outline" onClick={() => setShowCreateDialog(true)} className="gap-2">
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
          {loadingImages ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : images.length ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2">
              {images.map((img, idx) => (
                <Card key={idx} className="rounded-none overflow-hidden group relative">
                  <div className="relative aspect-square">
                    <img src={img.url} alt={`foto-${idx}`} className="w-full h-full object-cover" loading="lazy" />
                    {isAdmin && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(img.path)}
                          className="rounded-full"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
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

      {/* Dialog para crear álbum */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crear nuevo álbum</DialogTitle>
            <DialogDescription>
              Ingresa el nombre del álbum o carpeta para organizar tus fotos.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="album-name">Nombre del álbum</Label>
              <Input
                id="album-name"
                placeholder="Ej: Campamento 2025"
                value={newAlbumName}
                onChange={(e) => setNewAlbumName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleCreateAlbum();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateAlbum}>
              <FolderPlus className="w-4 h-4 mr-2" />
              Crear álbum
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Galeria;
