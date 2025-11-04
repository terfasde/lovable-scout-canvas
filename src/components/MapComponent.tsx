import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import { MapPin, AlertCircle } from "lucide-react";

const containerStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "0.5rem",
} as const;

const DEFAULT_CENTER = {
  lat: -34.88597863841296, // Montevideo
  lng: -56.09309381677225,
} as const;

const mapOptions: google.maps.MapOptions = {
  disableDefaultUI: false,
  clickableIcons: true,
  scrollwheel: true,
};

function MapComponent() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const [mapError, setMapError] = useState<string | null>(null);

  // Si no hay API key, mostramos un placeholder amable en lugar de romper
  if (!apiKey) {
    return (
      <div className="w-full h-full flex flex-col gap-2 items-center justify-center bg-muted/30 text-muted-foreground text-sm p-4">
        <MapPin className="w-8 h-8" />
        <p className="text-center">Mapa deshabilitado. Configura VITE_GOOGLE_MAPS_API_KEY para habilitarlo.</p>
      </div>
    );
  }

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    version: "weekly",
    // libraries: ["places"] // Descomenta si necesitas Places u otras libs
  });

  const center = useMemo(() => DEFAULT_CENTER, []);

  // Manejamos errores de carga del script
  if (loadError) {
    console.error("Error cargando Google Maps API:", loadError);
    return (
      <div className="w-full h-full flex flex-col gap-3 items-center justify-center bg-destructive/5 text-destructive text-sm p-6">
        <AlertCircle className="w-10 h-10" />
        <div className="text-center space-y-1">
          <p className="font-semibold">Error cargando Google Maps</p>
          <p className="text-xs">Verifica que la API key sea válida y tenga los permisos necesarios.</p>
          <p className="text-xs text-muted-foreground mt-2">
            Ve a Google Cloud Console → APIs & Services → Credentials
          </p>
        </div>
      </div>
    );
  }

  // Manejamos errores específicos del mapa después de cargado
  if (mapError) {
    return (
      <div className="w-full h-full flex flex-col gap-3 items-center justify-center bg-destructive/5 text-destructive text-sm p-6">
        <AlertCircle className="w-10 h-10" />
        <div className="text-center space-y-1">
          <p className="font-semibold">Error de Google Maps</p>
          <p className="text-xs">{mapError}</p>
          <p className="text-xs text-muted-foreground mt-2">
            Posibles causas: restricciones de API key, límites de cuota o dominio no autorizado
          </p>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-muted/20">
        <div className="flex flex-col gap-2 items-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Cargando mapa...</p>
        </div>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={mapOptions}
      onLoad={() => console.log("Google Map loaded successfully")}
    >
      <Marker position={center} title="Grupo Scout Séptimo Montevideo" />
    </GoogleMap>
  );
}

export default MapComponent;
