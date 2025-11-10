import Events from "@/components/Events";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const Eventos = () => {
  return (
    <div className="min-h-screen">
      <div className="pt-20">
        <Events />
        
        {/* Botón para acceder a BAUEN */}
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">¿Buscás información sobre BAUEN?</h2>
            <p className="text-muted-foreground mb-6">
              Descubrí todo sobre el evento scout nacional más importante del año
            </p>
            <Link to="/bauen">
              <Button size="lg" className="gap-2">
                <Calendar className="w-5 h-5" />
                Ver BAUEN
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {/* Footer global en App.tsx */}
    </div>
  );
};

export default Eventos;
