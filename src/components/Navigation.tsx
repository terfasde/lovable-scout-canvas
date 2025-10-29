import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, Eye, EyeOff } from "lucide-react";
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
            <Dialog>
              <DialogTrigger asChild>
                <button className="inline-flex items-center rounded-full focus:outline-none" aria-label="Abrir perfil">
                  <Avatar>
                    <AvatarFallback>GS</AvatarFallback>
                  </Avatar>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Mi perfil</DialogTitle>
                  <DialogDescription>Actualiza tus datos personales</DialogDescription>
                </DialogHeader>

                <div className="grid gap-3">
                  <Label htmlFor="nav-nombre">Nombre completo</Label>
                  <Input id="nav-nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} disabled={isSaving} />

                  <Label htmlFor="nav-telefono">Teléfono</Label>
                  <Input id="nav-telefono" value={telefono} onChange={(e) => setTelefono(e.target.value)} disabled={isSaving} />

                  <Label htmlFor="nav-email">Email</Label>
                  <Input id="nav-email" value={emailLocal} onChange={(e) => setEmailLocal(e.target.value)} disabled={isSaving} />

                  <Label htmlFor="nav-password">Contraseña</Label>
                  <div className="relative">
                    <Input id="nav-password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Dejar vacío para no cambiar" disabled={isSaving} />
                    <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2">
                      {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>

                  <Label htmlFor="nav-edad">Edad</Label>
                  <Input
                    id="nav-edad"
                    type="number"
                    value={edad ?? ""}
                    onChange={(e) => setEdad(e.target.value ? Number(e.target.value) : null)}
                    placeholder="Opcional"
                    min={0}
                    disabled={isSaving}
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="nav-seisena">Seisena</Label>
                      <Input id="nav-seisena" value={seisena} onChange={(e) => setSeisena(e.target.value)} placeholder="Seisena" disabled={isSaving || !(edad !== null && edad >= 7)} />
                    </div>
                    <div>
                      <Label htmlFor="nav-patrulla">Patrulla</Label>
                      <Input id="nav-patrulla" value={patrulla} onChange={(e) => setPatrulla(e.target.value)} placeholder="Patrulla" disabled={isSaving || !(edad !== null && edad >= 11)} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label htmlFor="nav-pioneros">Equipo Pioneros</Label>
                      <Input id="nav-pioneros" value={equipoPioneros} onChange={(e) => setEquipoPioneros(e.target.value)} placeholder="Equipo Pioneros" disabled={isSaving || !(edad !== null && edad >= 15)} />
                    </div>
                    <div>
                      <Label htmlFor="nav-rovers">Comunidad Rovers</Label>
                      <Input id="nav-rovers" value={comunidadRovers} onChange={(e) => setComunidadRovers(e.target.value)} placeholder="Comunidad Rovers" disabled={isSaving || !(edad !== null && edad >= 18)} />
                    </div>
                  </div>

                </div>

                <DialogFooter>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-2">
                      <Button id="nav-save" onClick={async () => {
                        if (isSaving) return;
                        setIsSaving(true);
                        try {
                          // Validaciones cliente
                          if (!nombre || nombre.trim().length === 0) {
                            toast({ title: 'Validación', description: 'El nombre no puede estar vacío', variant: 'destructive' });
                            setIsSaving(false);
                            return;
                          }

                          if (emailLocal && !/^\S+@\S+\.\S+$/.test(emailLocal)) {
                            toast({ title: 'Validación', description: 'El email no tiene un formato válido', variant: 'destructive' });
                            setIsSaving(false);
                            return;
                          }

                          if (password && password.length > 0 && password.length < 6) {
                            toast({ title: 'Validación', description: 'La contraseña debe tener al menos 6 caracteres', variant: 'destructive' });
                            setIsSaving(false);
                            return;
                          }

                          if (edad !== null && (edad < 0 || edad > 120)) {
                            toast({ title: 'Validación', description: 'La edad ingresada no es válida', variant: 'destructive' });
                            setIsSaving(false);
                            return;
                          }

                          const { data: { user } } = await supabase.auth.getUser();
                          if (!user) {
                            toast({ title: 'No autenticado', description: 'Inicia sesión para editar tu perfil', variant: 'destructive' });
                            setIsSaving(false);
                            return;
                          }

                          // If user provided a new password, update auth first
                          if (password && password.trim().length > 0) {
                            const { error: pwdErr } = await supabase.auth.updateUser({ password });
                            if (pwdErr) {
                              throw pwdErr;
                            }
                          }

                          await updateProfile({
                            user_id: user.id,
                            nombre_completo: nombre,
                            telefono,
                            email: emailLocal,
                            edad: edad ?? null,
                            seisena: seisena || null,
                            patrulla: patrulla || null,
                            equipo_pioneros: equipoPioneros || null,
                            comunidad_rovers: comunidadRovers || null,
                          });

                          toast({ title: 'Perfil actualizado', description: 'Tus cambios se guardaron correctamente.' });
                        } catch (err: any) {
                          toast({ title: 'Error', description: err?.message || 'No se pudo actualizar el perfil', variant: 'destructive' });
                        } finally {
                          setIsSaving(false);
                        }
                      }} disabled={isSaving}>{isSaving ? 'Guardando...' : 'Guardar'}</Button>
                      <DialogClose asChild>
                        <Button variant="secondary">Cerrar</Button>
                      </DialogClose>
                    </div>
                    <Button variant="ghost" id="nav-logout" onClick={async () => {
                      await supabase.auth.signOut();
                      navigate('/auth');
                    }}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Cerrar sesión
                    </Button>
                  </div>
                </DialogFooter>
              </DialogContent>
            </Dialog>

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
