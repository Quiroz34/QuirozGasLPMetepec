const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Ocultar huella técnica del servidor (Deshabilitar header X-Powered-By)
app.disable('x-powered-by');

// 2. Middleware de Cabeceras de Seguridad HTTP (OWASP / Enterprise Standard)
app.use((req, res, next) => {
  // Evitar ataques de Clickjacking (imposibilita embeber el sitio en iframes maliciosos)
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');

  // Evitar ataques de MIME-Type Sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // Filtro de protección XSS para navegadores compatibles
  res.setHeader('X-XSS-Protection', '1; mode=block');

  // Política de Referrer segura para proteger privacidad del usuario
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Restricción de permisos para sensores y hardware innecesario
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');

  // Forzar conexiones seguras HTTPS (HSTS) en producción
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Content Security Policy (CSP) equilibrada que permite fuentes de Google, WhatsApp y recursos seguros
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; " +
    "script-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
    "font-src 'self' https://fonts.gstatic.com data:; " +
    "img-src 'self' data: https: blob:; " +
    "connect-src 'self' https://wa.me; " +
    "frame-ancestors 'self';"
  );

  next();
});

// 3. Servir archivos estáticos con opciones de seguridad y caché
app.use(express.static(path.join(__dirname), {
  dotfiles: 'ignore', // Bloquear acceso a archivos y carpetas ocultas (.git, .env, etc.)
  etag: true,
  maxAge: process.env.NODE_ENV === 'production' ? '1d' : 0
}));

// 4. Redireccionar rutas no encontradas a index.html de forma limpia
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🔒 Servidor Seguro Node.js (Express) con cabeceras de seguridad activas en: http://localhost:${PORT}`);
});
