import React, { useEffect, useState } from "react";
import { sendVerificationEmail, checkEmailVerified } from "@/lib/email-verification";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, MailCheck, MailQuestion, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailVerificationGuardProps {
  children: React.ReactNode;
  featureName?: string; // Nombre de la funcionalidad protegida
}

/**
 * Envuelve contenido que requiere email verificado.
 * Si el email no está verificado, muestra instrucciones y opción para reenviar.
 */
export const EmailVerificationGuard: React.FC<EmailVerificationGuardProps> = ({
  children,
  featureName = "Funcionalidad",
}) => {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState<boolean>(false);
  const [sending, setSending] = useState(false);
  const [lastVerificationLink, setLastVerificationLink] = useState<string | null>(null);
  const [developmentMode, setDevelopmentMode] = useState(false);
  const { toast } = useToast();

  // Chequear estado inicial de verificación
  useEffect(() => {
    (async () => {
      try {
        const ok = await checkEmailVerified();
        setVerified(ok);
      } catch (e) {
        console.warn("Error comprobando verificación", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleResend = async () => {
    setSending(true);
    try {
      const result: any = await sendVerificationEmail();
      if (result?.verificationUrl) {
        setLastVerificationLink(result.verificationUrl);
        if (result.developmentMode) setDevelopmentMode(true);
      }
      toast({
        title: "Token generado",
        description: result?.developmentMode
          ? "Link copiado / visible en consola (modo desarrollo)."
          : "Si el envío está habilitado, revisa tu correo.",
      });
    } catch (e: any) {
      toast({
        title: "Error",
        description: e.message || "No se pudo generar el token.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  // Mientras carga estado
  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  // Si ya verificado, mostrar contenido protegido
  if (verified) {
    return <>{children}</>;
  }

  // Bloque de verificación pendiente
  return (
    <div className="max-w-2xl mx-auto py-10">
      <Alert className="mb-6">
        <MailQuestion className="h-5 w-5" />
        <AlertTitle>Email sin verificar</AlertTitle>
        <AlertDescription>
          Necesitas verificar tu email para acceder a <strong>{featureName}</strong>.<br />
          Presiona el botón para generar / reenviar tu link de verificación.
        </AlertDescription>
      </Alert>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="text-sm text-muted-foreground leading-relaxed">
            <p>
              El sistema usa un <strong>token de un solo uso</strong> válido por 24 horas. Al
              hacer clic en el enlace tu email quedará marcado como verificado.
            </p>
            {developmentMode && lastVerificationLink && (
              <p className="mt-2 text-xs bg-muted p-2 rounded">
                Modo desarrollo: abre manualmente este link si no recibes correo:<br />
                <a
                  href={lastVerificationLink}
                  className="text-primary underline break-all"
                >
                  {lastVerificationLink}
                </a>
              </p>
            )}
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button onClick={handleResend} disabled={sending} variant="default">
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" /> Generando...
                </>
              ) : (
                <>
                  <RefreshCcw className="h-4 w-4 mr-2" /> Generar / Reenviar link
                </>
              )}
            </Button>
            {lastVerificationLink && (
              <Button
                variant="secondary"
                onClick={() => {
                  navigator.clipboard
                    .writeText(lastVerificationLink)
                    .then(() =>
                      toast({
                        title: "Copiado",
                        description: "Link copiado al portapapeles.",
                      }),
                    )
                    .catch(() =>
                      toast({
                        title: "No se pudo copiar",
                        description: "Copialo manualmente desde el texto.",
                        variant: "destructive",
                      }),
                    );
                }}
              >
                <MailCheck className="h-4 w-4 mr-2" /> Copiar link
              </Button>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            Si el correo tarda, revisa spam. En desarrollo puede no enviarse y sólo mostrarse el link.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerificationGuard;import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkEmailVerified, sendVerificationEmail } from "@/lib/email-verification";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, AlertCircle, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailVerificationGuardProps {
  children: React.ReactNode;
  featureName?: string;
}

export const EmailVerificationGuard = ({ 
  children, 
  featureName = "esta funcionalidad" 
}: EmailVerificationGuardProps) => {
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkEmailVerification();
  }, []);

  const checkEmailVerification = async () => {
    try {
      const { data: { user } } = await (await import("@/integrations/supabase/client")).supabase.auth.getUser();
      
      if (!user) {
        navigate("/auth");
        return;
      }

      setUserEmail(user.email || "");

      const verified = await checkEmailVerified();
      setEmailVerified(verified);
      setLoading(false);
    } catch (error) {
      console.error("Error verificando email:", error);
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setResendingEmail(true);
    try {
      console.log('📧 Intentando enviar email de verificación...');
      
      const result = await sendVerificationEmail();
      
      console.log('✅ Resultado:', result);

      if (result.developmentMode) {
        toast({
          title: "🔗 Link de verificación generado",
          description: "El link se copió al portapapeles. También lo podés ver en la consola del navegador (F12).",
          duration: 8000,
        });
      } else {
        toast({
          title: "✅ Email enviado",
          description: `Revisá tu correo (${userEmail}). El enlace expira en 24 horas.`,
        });
      }
    } catch (error: any) {
      console.error("❌ Error enviando email:", error);
      toast({
        title: "Error al enviar email",
        description: error.message || "No se pudo enviar el correo. Revisá la consola para más detalles.",
        variant: "destructive",
      });
    } finally {
      setResendingEmail(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!emailVerified) {
    return (
      <div className="min-h-screen bg-background">
        {/* Navigation space */}
        <div className="h-20"></div>
        
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-yellow-600 dark:text-yellow-500" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold text-center mb-4">
            Verificá tu email
          </h1>
          
          <p className="text-center text-muted-foreground mb-8">
            Para acceder a <strong>{featureName}</strong> necesitás verificar tu correo electrónico
          </p>

          {/* Alert Box */}
          <Alert className="mb-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-950/30">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-500" />
            <AlertDescription>
              <p className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                ¿Por qué necesito verificar mi email?
              </p>
              <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1 list-disc list-inside">
                <li>Asegura que puedas recibir notificaciones importantes</li>
                <li>Protege tu cuenta y la de otros scouts</li>
                <li>Permite comunicación segura entre miembros</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Features locked */}
          <div className="bg-card border rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Funcionalidades desbloqueadas con email verificado:
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">👥</span>
                <strong>Comuni 7:</strong> Hilos, comentarios y grupos
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">💬</span>
                <strong>Mensajes:</strong> Chat privado con otros scouts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">📸</span>
                <strong>Galería:</strong> Fotos y recuerdos del grupo
              </li>
            </ul>
          </div>

          {/* Email info */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              Email registrado:
            </p>
            <p className="font-medium text-lg">{userEmail}</p>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              className="w-full gap-2" 
              size="lg"
              onClick={handleResendEmail}
              disabled={resendingEmail}
            >
              <Mail className="w-5 h-5" />
              {resendingEmail ? "Enviando..." : "Enviar email de verificación"}
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/perfil")}
            >
              Ir a mi perfil
            </Button>

            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => navigate("/")}
            >
              Volver al inicio
            </Button>
          </div>

          {/* Help text */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>¿No recibiste el email? Revisá tu carpeta de spam o</p>
            <button 
              onClick={handleResendEmail}
              className="text-primary hover:underline font-medium"
              disabled={resendingEmail}
            >
              envialo nuevamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Email verificado: mostrar el contenido
  return <>{children}</>;
};
