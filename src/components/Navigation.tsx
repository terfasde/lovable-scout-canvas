import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
  User,
  Share2,
  Settings,
  ChevronDown,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import UserAvatar from "./UserAvatar";
import { useToast } from "../hooks/use-toast";
import { supabase } from "../integrations/supabase/client";
import { isLocalBackend, apiFetch } from "../lib/backend";
import logoImage from "../assets/grupo-scout-logo.png";
import ThemeToggle from "./ThemeToggle";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll and close on Escape when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setIsMobileMenuOpen(false);
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    // Load profile for current user (if logged in)
    (async () => {
      try {
        if (isLocalBackend()) {
          const me: any = await apiFetch("/profiles/me").catch(() => null);
          if (me) {
            setUserName(me.nombre_completo || null);
            setAvatarUrl(me.avatar_url || null);
          }
          return;
        }
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) return;
        const { data: profile } = await supabase
          .from("profiles")
          .select("nombre_completo, avatar_url")
          .eq("user_id", user.id)
          .single();
        if (profile) {
          setUserName((profile as any).nombre_completo || null);
          setAvatarUrl((profile as any).avatar_url || null);
        }
      } catch (err) {
        // ignore silently
      }
    })();
  }, []);

  const showSolidBg = isScrolled || isMobileMenuOpen;

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        showSolidBg
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-background/60 backdrop-blur md:bg-transparent md:backdrop-blur-0 md:shadow-none"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={logoImage}
              alt="Grupo Scout Séptimo"
              className="w-12 h-12 object-contain"
            />
            <div className="hidden md:block">
              <div className="text-xl font-bold text-foreground">
                Grupo Scout Séptimo
              </div>
              <div className="text-sm text-muted-foreground dark:text-foreground">
                de Montevideo
              </div>
            </div>
          </Link>

          {/* Desktop Navigation + Profile */}
          <div className="hidden md:flex items-center gap-4">
            {/* Nav Links */}
            <div className="flex items-center gap-2">
              {/* Inicio */}
              <Link
                to="/"
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive("/")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-nav-hover hover:text-nav-hover-foreground"
                }`}
              >
                Inicio
              </Link>

              {/* Comuni 7, Mensajes primero (preferencia de diseño previa) */}
              <Link
                to="/usuarios"
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive("/usuarios")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-nav-hover hover:text-nav-hover-foreground"
                }`}
              >
                Comuni 7
              </Link>

              <Link
                to="/historia"
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive("/historia") || isActive("/linea-temporal")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-nav-hover hover:text-nav-hover-foreground"
                }`}
              >
                Historia
              </Link>

              {/* Eventos Link */}
              <Link
                to="/eventos"
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive("/eventos") || isActive("/bauen")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-nav-hover hover:text-nav-hover-foreground"
                }`}
              >
                Eventos
              </Link>

              <Link
                to="/movimiento-scout"
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive("/movimiento-scout")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-nav-hover hover:text-nav-hover-foreground"
                }`}
              >
                Movimiento Scout
              </Link>

              <Link
                to="/contacto"
                className={`px-4 py-2 rounded-md font-medium transition-colors ${
                  isActive("/contacto")
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-nav-hover hover:text-nav-hover-foreground"
                }`}
              >
                Contacto
              </Link>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Profile Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="inline-flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all hover:ring-2 hover:ring-primary/30"
                  aria-label="Abrir perfil"
                >
                  <UserAvatar
                    avatarUrl={avatarUrl}
                    userName={userName}
                    size="md"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userName || "Usuario"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Mi cuenta
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => navigate("/perfil")}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Ver perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => navigate("/perfil/editar")}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Editar perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => navigate("/perfil/compartir")}
                  className="cursor-pointer"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Compartir perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={async () => {
                    try {
                      await supabase.auth.signOut();
                    } catch {
                      /* noop */
                    }
                    try {
                      if (isLocalBackend())
                        localStorage.removeItem("local_api_token");
                    } catch {
                      /* noop */
                    }
                    navigate("/auth");
                    toast({
                      title: "Sesión cerrada",
                      description: "Has cerrado sesión correctamente",
                    });
                  }}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button + Profile */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="inline-flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all hover:ring-2 hover:ring-primary/30"
                  aria-label="Abrir perfil"
                >
                  <UserAvatar
                    avatarUrl={avatarUrl}
                    userName={userName}
                    size="md"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {userName || "Usuario"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      Mi cuenta
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => navigate("/perfil")}
                  className="cursor-pointer"
                >
                  <User className="mr-2 h-4 w-4" />
                  <span>Ver perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => navigate("/perfil/editar")}
                  className="cursor-pointer"
                >
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Editar perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => navigate("/perfil/compartir")}
                  className="cursor-pointer"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  <span>Compartir perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={async () => {
                    try {
                      await supabase.auth.signOut();
                    } catch {
                      /* noop */
                    }
                    try {
                      if (isLocalBackend())
                        localStorage.removeItem("local_api_token");
                    } catch {
                      /* noop */
                    }
                    navigate("/auth");
                    toast({
                      title: "Sesión cerrada",
                      description: "Has cerrado sesión correctamente",
                    });
                  }}
                  className="cursor-pointer text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Overlay to close on outside click */}
            <div
              className="md:hidden fixed inset-0 top-20 z-30 bg-black/25"
              aria-hidden="true"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div
              id="mobile-menu"
              className="md:hidden fixed inset-x-0 top-20 z-40 bg-background/95 backdrop-blur-md border-t border-border animate-fade-in"
              role="dialog"
              aria-modal="true"
            >
              <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col divide-y divide-border rounded-lg overflow-hidden shadow-lg">
                  {/* Inicio */}
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-6 py-4 text-lg font-medium transition-colors focus:outline-none ${
                      isActive("/")
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-nav-hover hover:text-nav-hover-foreground"
                    } ${isActive("/") ? "border-l-4 border-primary" : ""}`}
                  >
                    Inicio
                  </Link>

                  {/* Comuni 7 */}
                  <Link
                    to="/usuarios"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-6 py-4 text-lg font-medium transition-colors focus:outline-none focus:bg-muted ${
                      isActive("/usuarios")
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    } ${isActive("/usuarios") ? "border-l-4 border-primary" : ""}`}
                  >
                    Comuni 7
                  </Link>

                  {/* Historia */}
                  <Link
                    to="/historia"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-6 py-4 text-lg font-medium transition-colors focus:outline-none focus:bg-muted ${
                      isActive("/historia") || isActive("/linea-temporal")
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    } ${isActive("/historia") || isActive("/linea-temporal") ? "border-l-4 border-primary" : ""}`}
                  >
                    Historia
                  </Link>

                  {/* Eventos */}
                  <Link
                    to="/eventos"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-6 py-4 text-lg font-medium transition-colors focus:outline-none focus:bg-muted ${
                      isActive("/eventos") || isActive("/bauen")
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    } ${isActive("/eventos") || isActive("/bauen") ? "border-l-4 border-primary" : ""}`}
                  >
                    Eventos
                  </Link>

                  {/* Movimiento Scout */}
                  <Link
                    to="/movimiento-scout"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-6 py-4 text-lg font-medium transition-colors focus:outline-none focus:bg-muted ${
                      isActive("/movimiento-scout")
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    } ${isActive("/movimiento-scout") ? "border-l-4 border-primary" : ""}`}
                  >
                    Movimiento Scout
                  </Link>

                  {/* Contacto */}
                  <Link
                    to="/contacto"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`px-6 py-4 text-lg font-medium transition-colors focus:outline-none focus:bg-muted ${
                      isActive("/contacto")
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    } ${isActive("/contacto") ? "border-l-4 border-primary" : ""}`}
                  >
                    Contacto
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
