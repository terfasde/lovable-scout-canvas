import { useEffect, useMemo, useRef, useState } from "react";
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
import { Camera, FolderPlus, ImagePlus, Images, Trash2, FolderX } from "lucide-react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import { getAuthUser } from "@/lib/backend";
import { createAlbum, listAlbums, listImages, uploadImage, deleteImage, deleteAlbum } from "@/lib/gallery";
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
        // Verificar admin por email (soporta backend local y Supabase)
        const auth = await getAuthUser();
        const email = auth?.email || "";
        setIsAdmin(ADMIN_EMAILS.includes(email.toLowerCase()));

        // Cargar álbumes desde Storage
  console.log("Cargando álbumes...");
        const storageAlbums = await listAlbums().catch((err) => {
          console.error("Error cargando álbumes:", err);
          return [];
        });
        console.log("Álbumes encontrados:", storageAlbums);
        
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

  const handleDeleteAlbum = async () => {
    if (!selected) return;
    if (!confirm(`¿Estás seguro de que quieres eliminar el álbum "${selected}" y todas sus fotos?`)) return;
    
    try {
      setLoadingImages(true);
      await deleteAlbum(selected);
      const updated = await listAlbums().catch(() => []);
      setAlbums(updated);
      setSelected(updated.length > 0 ? updated[0].name : "");
      setImages([]);
      toast({
        title: "Álbum eliminado",
        description: `El álbum "${selected}" se eliminó correctamente.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `No se pudo eliminar el álbum: ${error}`,
        variant: "destructive",
      });
    } finally {
      setLoadingImages(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Hero */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-4 sm:pb-6">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-primary/10 rounded-full mb-3 sm:mb-4">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="text-primary font-semibold text-xs sm:text-sm">Galería</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">Momentos del Grupo</h1>
            <p className="text-sm sm:text-base text-muted-foreground">Explora los álbumes y revive nuestras actividades</p>
          </div>
        </div>
      </section>

      {/* Admin bar */}
      {isAdmin && (
        <section className="pb-2 sm:pb-3">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-center">
              <Button variant="outline" size="sm" onClick={() => setShowCreateDialog(true)} className="gap-1 sm:gap-2 text-xs sm:text-sm">
                <FolderPlus className="w-3 h-3 sm:w-4 sm:h-4" /> Crear álbum
              </Button>
              <div>
                <input ref={fileInputRef} type="file" multiple accept="image/*" onChange={handleUpload} className="hidden" id="upload-input" />
                <Button variant="outline" size="sm" onClick={() => document.getElementById("upload-input")?.click()} className="gap-1 sm:gap-2 text-xs sm:text-sm" disabled={!selected}>
                  <ImagePlus className="w-3 h-3 sm:w-4 sm:h-4" /> Subir fotos
                </Button>
              </div>
              {selected && (
                <Button variant="outline" size="sm" onClick={handleDeleteAlbum} className="gap-1 sm:gap-2 text-xs sm:text-sm text-destructive hover:text-destructive">
                  <FolderX className="w-3 h-3 sm:w-4 sm:h-4" /> Eliminar
                </Button>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Albums pills */}
      <section className="pb-4 sm:pb-6">
        <div className="container mx-auto px-4">
          {!loading && albums.length === 0 ? (
            <div className="text-center text-muted-foreground py-4">
              <p className="text-xs sm:text-sm">
                {isAdmin ? "No hay álbumes todavía. Crea tu primer álbum arriba." : "No hay álbumes disponibles."}
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center">
              {albums.map((a) => (
                <button
                  key={a.name}
                  type="button"
                  onClick={() => setSelected(a.name)}
                  disabled={loadingImages}
                  aria-pressed={selected === a.name}
                  className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm border transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ring-offset-background ${
                    selected === a.name
                      ? "bg-primary text-primary-foreground border-primary"
                      : "hover:bg-accent/60 border-border"
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Instagram-like grid */}
      <section className="pb-12 sm:pb-16">
        <div className="container mx-auto px-1 sm:px-2 md:px-4">
          {loadingImages ? (
            <div className="flex justify-center py-16 sm:py-20">
              <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : images.length ? (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0.5 sm:gap-1 md:gap-2">
              {images.map((img, idx) => (
                <Card key={idx} className="rounded-none overflow-hidden group relative">
                  <div className="relative aspect-square">
                    <OptimizedImage
                      src={img.url}
                      alt={`foto-${idx}`}
                      aspectRatio="square"
                      loading="lazy"
                      showPlaceholder
                      className="transition-transform duration-300 group-hover:scale-105"
                    />
                    {isAdmin && (
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(img.path)}
                          className="rounded-full w-8 h-8 sm:w-10 sm:h-10"
                        >
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-16 sm:py-20">
              <Images className="w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-3" />
              <p className="text-xs sm:text-sm">No hay imágenes en este álbum todavía.</p>
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

      {/* Footer global en App.tsx */}
    </div>
  );
};

export default Galeria;
