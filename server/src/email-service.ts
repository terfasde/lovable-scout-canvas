import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "mailhog";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "1025");
const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@scout-local.dev";
const APP_URL = process.env.APP_URL || "http://localhost:5173";

// Crear transporte SMTP (Mailhog en dev, SMTP real en prod)
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false, // true para 465, false para otros puertos
  // auth solo si es necesario (Mailhog no requiere)
  ...(process.env.SMTP_USER && {
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  }),
});

export async function sendVerificationEmail(
  to: string,
  token: string,
): Promise<void> {
  const verifyUrl = `${APP_URL}/verificar-email?token=${token}`;

  const mailOptions = {
    from: FROM_EMAIL,
    to,
    subject: "🎖️ Verifica tu correo - Grupo Scout",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
          .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎖️ ¡Bienvenido/a al Grupo Scout!</h1>
          </div>
          <div class="content">
            <p>Hola,</p>
            <p>Gracias por registrarte. Para completar tu registro y verificar tu correo electrónico, haz clic en el siguiente enlace:</p>
            <p style="text-align: center;">
              <a href="${verifyUrl}" class="button">Verificar mi correo</a>
            </p>
            <p>O copia y pega este enlace en tu navegador:</p>
            <p style="word-break: break-all; color: #667eea;">${verifyUrl}</p>
            <p><strong>⏰ Este enlace expira en 24 horas.</strong></p>
            <p>Si no solicitaste este registro, puedes ignorar este correo.</p>
            <p>¡Siempre listos!</p>
          </div>
          <div class="footer">
            <p>Grupo Scout Local - Sistema de Gestión</p>
            <p>Este es un correo automático, por favor no respondas.</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
¡Bienvenido/a al Grupo Scout!

Para completar tu registro y verificar tu correo electrónico, visita:
${verifyUrl}

⏰ Este enlace expira en 24 horas.

Si no solicitaste este registro, puedes ignorar este correo.

¡Siempre listos!
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📧 Email de verificación enviado a ${to}`);
  } catch (error) {
    console.error("❌ Error al enviar email:", error);
    // En desarrollo, mostrar el link en consola como fallback
    if (process.env.NODE_ENV !== "production") {
      console.log("\n🔗 Link de verificación (fallback):", verifyUrl, "\n");
    }
    throw error;
  }
}
