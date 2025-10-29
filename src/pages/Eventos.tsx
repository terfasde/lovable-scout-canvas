import Navigation from "@/components/Navigation";
import Events from "@/components/Events";
import Footer from "@/components/Footer";

const Eventos = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-20">
        <Events />
      </div>
      <Footer />
    </div>
  );
};

export default Eventos;
