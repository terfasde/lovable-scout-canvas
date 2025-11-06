import { MapPin } from "lucide-react";

const DEFAULT_CENTER = {
  lat: -34.88597863841296,
  lng: -56.09309381677225,
};

const DEFAULT_ADDRESS = "Volteadores 1753, Montevideo, Uruguay";

interface MapComponentEmbedProps {
  center?: { lat: number; lng: number };
  address?: string;
  zoom?: number;
}

/**
 * Componente de mapa usando Google Maps Embed API
 * - NO requiere billing habilitado
 * - Completamente GRATIS sin límites
 * - Solo necesita Maps Embed API habilitada en Google Cloud Console
 */
function MapComponentEmbed({
  center = DEFAULT_CENTER,
  address = DEFAULT_ADDRESS,
  zoom = 15,
}: MapComponentEmbedProps) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;

  // Si no hay API key, mostramos un placeholder
  if (!apiKey) {
    return (
      <div className="w-full h-full flex flex-col gap-2 items-center justify-center bg-muted/30 text-muted-foreground text-sm p-4">
        <MapPin className="w-8 h-8" />
        <p className="text-center">
          Mapa deshabilitado. Configura VITE_GOOGLE_MAPS_API_KEY para
          habilitarlo.
        </p>
      </div>
    );
  }

  // Construir URL del embed con coordenadas o dirección
  const embedUrl = address
    ? `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodeURIComponent(address)}&zoom=${zoom}`
    : `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${center.lat},${center.lng}&zoom=${zoom}`;

  return (
    <iframe
      title="Mapa de ubicación - Grupo Scout Séptimo Montevideo"
      src={embedUrl}
      width="100%"
      height="100%"
      style={{ border: 0, borderRadius: "0.5rem" }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}

export default MapComponentEmbed;
