import { ImgHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

interface OptimizedImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: string;
  priority?: boolean;
  blur?: boolean;
}

/**
 * Componente de imagen optimizada con lazy loading, blur placeholder y aspectRatio
 */
export function OptimizedImage({
  src,
  alt,
  className,
  aspectRatio,
  priority = false,
  blur = true,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {blur && !isLoaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 to-muted animate-pulse" />
      )}
      
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          error && "hidden"
        )}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        {...props}
      />

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-sm">
          Error cargando imagen
        </div>
      )}
    </div>
  );
}
