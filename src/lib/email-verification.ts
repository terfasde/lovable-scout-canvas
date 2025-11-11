import { supabase } from "@/integrations/supabase/client";

// Permitir activar el envío real por Edge Function solo cuando esté desplegada
const USE_EDGE_EMAIL = (import.meta.env.VITE_ENABLE_EDGE_EMAIL || "").toString().toLowerCase() === "true";

/**
 * Envía un email de verificación al usuario actual
 * NOTA: Esta es una implementación temporal que funciona sin Edge Functions
 * Para producción, usa la Edge Function deploy
 */
export async function sendVerificationEmail() {
  try {
    // Obtener usuario actual
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('No autenticado');
    }

    console.log('📧 Generando token de verificación para:', user.email);

    // Generar token usando la función RPC (creada por la migración)
    // @ts-ignore - La función se agrega vía SQL y no está en los tipos generados
    const { data: tokenData, error: tokenError } = await supabase.rpc('resend_verification_email').single();

    if (tokenError) {
      console.error('❌ Error generando token:', tokenError);
      throw new Error(tokenError.message || 'Error generando token de verificación');
    }

    console.log('✅ Token generado:', tokenData);

    // Extraer token (el RPC devuelve token, expires_at, email pero solo necesitamos token)
    const token = (tokenData as any)?.token;
    
    if (!token) {
      throw new Error('No se pudo generar el token');
    }
    
    const verificationUrl = `${window.location.origin}/verificar-email?token=${token}`;

    // En desarrollo, mostrar el link en consola
    console.log('🔗 Link de verificación (desarrollo):');
    console.log(verificationUrl);
    console.log('\n📋 Copia este link y ábrelo en tu navegador para verificar tu email');
    
    // Intentar copiar al clipboard
    try {
      await navigator.clipboard.writeText(verificationUrl);
      console.log('✅ Link copiado al portapapeles!');
    } catch (e) {
      console.log('⚠️ No se pudo copiar al portapapeles');
    }

    // Fallback: devolver link para desarrollo (sin intentar Edge Function por ahora)
    return {
      success: true,
      message: 'Token generado. Revisá la consola para el link de verificación',
      verificationUrl,
      developmentMode: true
    };

  } catch (error: any) {
    console.error('❌ Error en sendVerificationEmail:', error);
    throw new Error(error.message || 'Error enviando email de verificación');
  }
}

/**
 * Verifica un token de email
 */
export async function verifyEmailToken(token: string) {
  try {
    console.log('🔍 Verificando token...');

    // @ts-ignore - La función se agrega vía SQL y no está en los tipos generados
    const { data, error } = await supabase.rpc('verify_email_token', { p_token: token }).single();

    if (error) {
      console.error('❌ Error verificando token:', error);
      throw new Error(error.message || 'Error verificando token');
    }

    console.log('✅ Resultado verificación:', data);

    const payload = (data || {}) as any;
    return {
      success: !!payload.success,
      message: payload.message,
      userId: payload.verified_user_id || payload.user_id // Soportar ambos nombres
    };
  } catch (error: any) {
    console.error('❌ Error en verifyEmailToken:', error);
    throw new Error(error.message || 'Error verificando el token');
  }
}

/**
 * Verifica si el email del usuario actual está verificado
 */
export async function checkEmailVerified(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return false;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('email_verified')
      .eq('user_id', user.id)
      .single();

    // @ts-ignore - La columna se agrega con la migración SQL
    return profile?.email_verified || false;
  } catch (error) {
    console.error('Error verificando estado de email:', error);
    return false;
  }
}
