const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

// Servir todos los archivos estáticos (HTML, CSS, JS, imágenes, etc.)
app.use(express.static(__dirname));

// Redireccionar cualquier ruta no encontrada a index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor Node.js (Express) corriendo en: http://localhost:${PORT}`);
});
