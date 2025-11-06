/**
 * Componente de imagen optimizado con lazy loading, blur placeholder y manejo de errores
 */

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ImageOff } from "lucide-react";

interface OptimizedImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  /**
   * URL de la imagen en baja calidad para blur placeholder
   */
  blurDataURL?: string;
  /**
   * Imagen de fallback si falla la carga
   */
  fallback?: string;
  /**
   * Aspect ratio para mantener espacio mientras carga
   */
  aspectRatio?: "square" | "video" | "portrait" | "wide" | string;
  /**
   * Comportamiento de lazy loading
   */
  loading?: "lazy" | "eager";
  /**
   * Clase del contenedor
   */
  containerClassName?: string;
  /**
   * Mostrar placeholder mientras carga
   */
  showPlaceholder?: boolean;
}

const aspectRatios = {
  square: "1/1",
  video: "16/9",
  portrait: "3/4",
  wide: "21/9",
};

export function OptimizedImage({
  src,
  alt,
  blurDataURL,
  fallback,
  aspectRatio = "square",
  loading = "lazy",
  containerClassName,
  className,
  showPlaceholder = true,
  ...props
}: OptimizedImageProps) {
  const [imageState, setImageState] = useState<"loading" | "loaded" | "error">(
    "loading",
  );
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setImageState("loading");
    setCurrentSrc(src);
  }, [src]);

  const handleLoad = () => {
    setImageState("loaded");
  };

  const handleError = () => {
    setImageState("error");
    if (fallback && currentSrc !== fallback) {
      setCurrentSrc(fallback);
      setImageState("loading");
    }
  };

  const ratio =
    aspectRatio in aspectRatios
      ? aspectRatios[aspectRatio as keyof typeof aspectRatios]
      : aspectRatio;

  return (
    <div
      className={cn("relative overflow-hidden bg-muted", containerClassName)}
      style={{ aspectRatio: ratio }}
    >
      {/* Blur placeholder */}
      {showPlaceholder && imageState === "loading" && blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-lg scale-110"
        />
      )}

      {/* Loading placeholder */}
      {showPlaceholder && imageState === "loading" && !blurDataURL && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted animate-pulse">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      )}

      {/* Error state */}
      {imageState === "error" && !fallback && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted text-muted-foreground">
          <ImageOff className="w-12 h-12 mb-2" />
          <p className="text-sm">No se pudo cargar la imagen</p>
        </div>
      )}

      {/* Main image */}
      {(imageState !== "error" || (imageState === "error" && !!fallback)) && (
        <img
          src={currentSrc}
          alt={alt}
          loading={loading}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            imageState === "loaded" ? "opacity-100" : "opacity-0",
            className,
          )}
          {...props}
        />
      )}
    </div>
  );
}

/**
 * Componente para galería de imágenes con lazy loading
 */
interface ImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    thumbnail?: string;
  }>;
  columns?: number;
  gap?: number;
  aspectRatio?: OptimizedImageProps["aspectRatio"];
  onImageClick?: (index: number) => void;
}

export function ImageGallery({
  images,
  columns = 3,
  gap = 4,
  aspectRatio = "square",
  onImageClick,
}: ImageGalleryProps) {
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        gap: `${gap * 0.25}rem`,
      }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={cn(
            "cursor-pointer transition-transform hover:scale-105",
            onImageClick && "hover:opacity-80",
          )}
          onClick={() => onImageClick?.(index)}
        >
          <OptimizedImage
            src={image.src}
            alt={image.alt}
            blurDataURL={image.thumbnail}
            aspectRatio={aspectRatio}
            loading="lazy"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Hook para generar blur placeholder desde imagen
 * (Solo en cliente, no afecta SSR)
 */
export function useBlurDataURL(src: string): string | undefined {
  const [blurDataURL, setBlurDataURL] = useState<string>();

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Reducir tamaño a 10x10 para blur placeholder
      canvas.width = 10;
      canvas.height = 10;

      ctx.drawImage(img, 0, 0, 10, 10);

      try {
        setBlurDataURL(canvas.toDataURL("image/jpeg", 0.1));
      } catch (error) {
        // CORS error - no se puede generar blur
        console.warn("No se pudo generar blur placeholder (CORS)");
      }
    };

    img.onerror = () => {
      // Ignorar errores silenciosamente
    };
  }, [src]);

  return blurDataURL;
}
