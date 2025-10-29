import { Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/grupo-scout-logo.png";
const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return <footer className="bg-scout-black text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logoImage} alt="Grupo Scout Séptimo" className="w-12 h-12 object-contain" />
              <div>
                <div className="text-xl font-bold text-white">Grupo Scout Séptimo</div>
                <div className="text-sm text-gray-400">de Montevideo</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">Formando líderes comprometidos desde 1964. Una comunidad de aventura, valores y crecimiento personal.</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com/gruposcoutseptimomontevideo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/grupo_scout_septimo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={scrollTop} className="hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/linea-temporal" onClick={scrollTop} className="hover:text-primary transition-colors">
                  Línea Temporal
                </Link>
              </li>
              <li>
                <Link to="/historia" onClick={scrollTop} className="hover:text-primary transition-colors">
                  Historia
                </Link>
              </li>
              <li>
                <Link to="/bauen" onClick={scrollTop} className="hover:text-primary transition-colors">
                  BAUEN
                </Link>
              </li>
              <li>
                <Link to="/eventos" onClick={scrollTop} className="hover:text-primary transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/galeria" onClick={scrollTop} className="hover:text-primary transition-colors">
                  Galería
                </Link>
              </li>
              <li>
                <Link to="/contacto" onClick={scrollTop} className="hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1 text-primary flex-shrink-0" />
                <span className="text-sm">Volteadores 1753, Montevideo</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-primary flex-shrink-0" />
                <span className="text-sm">+598 098 138 668</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-primary flex-shrink-0" />
                <span className="text-sm">scoutsseptimo7@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2025 Grupo Scout Séptimo de Montevideo. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-sm">
            <Link to="#" className="hover:text-primary transition-colors">
              Política de Privacidad
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;