import { useEffect, useState } from "react";
import { sendVerificationEmail, checkEmailVerified } from "@/lib/email-verification";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, MailCheck, MailQuestion, RefreshCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmailVerificationGuardProps {
  children: React.ReactNode;
  featureName?: string;
}

/**
 * Envuelve contenido que requiere email verificado.
 * Si el email no está verificado, muestra instrucciones y opción para reenviar.
 */
const EmailVerificationGuard = ({
  children,
  featureName = "Funcionalidad",
}: EmailVerificationGuardProps) => {
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
          : "Si el enváo está habilitado, revisa tu correo.",
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

export default EmailVerificationGuard;

