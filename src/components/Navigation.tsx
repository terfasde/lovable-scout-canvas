import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Eye, EyeOff } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { getProfile, updateProfile } from "@/lib/api";
import logoImage from "@/assets/grupo-scout-logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Profile form state
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [emailLocal, setEmailLocal] = useState("");
  const [edad, setEdad] = useState<number | null>(null);
  const [seisena, setSeisena] = useState("");
  const [patrulla, setPatrulla] = useState("");
  const [equipoPioneros, setEquipoPioneros] = useState("");
  const [comunidadRovers, setComunidadRovers] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Línea Temporal", path: "/linea-temporal" },
    { name: "Historia", path: "/historia" },
    { name: "BAUEN", path: "/bauen" },
    { name: "Eventos", path: "/eventos" },
    { name: "Galería", path: "/galeria" },
    { name: "Contacto", path: "/contacto" },
  ];

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    // Load profile for current user (if logged in)
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const profile = await getProfile(user.id).catch(() => null);
        if (profile) {
          setNombre(profile.nombre_completo || "");
          setTelefono(profile.telefono || "");
          setEmailLocal(profile.email || user.email || "");
          setEdad(profile.edad ?? null);
          setSeisena(profile.seisena || "");
          setPatrulla(profile.patrulla || "");
          setEquipoPioneros(profile.equipo_pioneros || "");
          setComunidadRovers(profile.comunidad_rovers || "");
          setProfileLoaded(true);
        }
      } catch (err) {
        // ignore silently
      }
    })();
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src={logoImage} alt="Grupo Scout Séptimo" className="w-12 h-12 object-contain" />
            <div className="hidden md:block">
              <div className="text-xl font-bold text-foreground">Grupo Scout</div>
              <div className="text-sm text-muted-foreground">Séptimo de Montevideo</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Profile + Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="inline-flex items-center rounded-full focus:outline-none" aria-label="Abrir perfil">
                  <Avatar>
                    <AvatarFallback>GS</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onSelect={() => navigate('/perfil')}>Entrar al perfil</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate('/perfil/editar')}>Actualizar perfil</DropdownMenuItem>
                <DropdownMenuItem onSelect={() => navigate('/perfil/compartir')}>Compartir perfil</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={async () => { await supabase.auth.signOut(); navigate('/auth'); }}>Cerrar sesión</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-md font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
