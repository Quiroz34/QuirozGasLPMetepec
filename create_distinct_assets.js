const fs = require('fs');
const path = require('path');

// 1. fleet.svg: Flotilla de Pipas Gas LP Quiroz Metepec
const fleetSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="100%" height="100%">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0F172A"/>
      <stop offset="60%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#1E40AF"/>
    </linearGradient>
    <linearGradient id="tankGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="70%" stop-color="#E2E8F0"/>
      <stop offset="100%" stop-color="#94A3B8"/>
    </linearGradient>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1E40AF"/>
      <stop offset="100%" stop-color="#1D4ED8"/>
    </linearGradient>
  </defs>

  <!-- Fondo Industrial / Planta de Gas -->
  <rect width="1200" height="700" fill="url(#skyGrad)"/>
  
  <!-- Estructura de Esferas y Tanques Industriales de Gas LP -->
  <circle cx="250" cy="280" r="140" fill="url(#tankGrad)" stroke="#CBD5E1" stroke-width="4"/>
  <rect x="235" y="420" width="30" height="150" fill="#64748B"/>
  <rect x="180" y="420" width="20" height="150" fill="#475569"/>
  <rect x="300" y="420" width="20" height="150" fill="#475569"/>

  <circle cx="600" cy="240" r="170" fill="url(#tankGrad)" stroke="#CBD5E1" stroke-width="4"/>
  <rect x="585" y="410" width="30" height="160" fill="#64748B"/>
  <rect x="520" y="410" width="20" height="160" fill="#475569"/>
  <rect x="660" y="410" width="20" height="160" fill="#475569"/>

  <!-- Tuberías Industriales -->
  <path d="M 50 380 L 1150 380" stroke="#F59E0B" stroke-width="12" fill="none"/>
  <path d="M 50 400 L 1150 400" stroke="#1E40AF" stroke-width="8" fill="none"/>

  <!-- Suelo de la Planta -->
  <rect x="0" y="520" width="1200" height="180" fill="#1E293B"/>
  <rect x="0" y="515" width="1200" height="5" fill="#F59E0B"/>

  <!-- Pipas en Fila (Flotilla) -->
  <!-- Pipa 1 -->
  <g transform="translate(100, 440)">
    <rect x="0" y="20" width="220" height="70" rx="35" fill="url(#tankGrad)" stroke="#94A3B8" stroke-width="3"/>
    <text x="25" y="62" font-family="Montserrat, sans-serif" font-weight="900" font-size="18" fill="#1E40AF">GAS LP QUIROZ</text>
    <rect x="210" y="35" width="60" height="55" rx="8" fill="#1E40AF"/>
    <circle cx="45" cy="95" r="16" fill="#0F172A" stroke="#CBD5E1" stroke-width="3"/>
    <circle cx="175" cy="95" r="16" fill="#0F172A" stroke="#CBD5E1" stroke-width="3"/>
    <circle cx="240" cy="95" r="16" fill="#0F172A" stroke="#CBD5E1" stroke-width="3"/>
  </g>

  <!-- Pipa 2 (Principal) -->
  <g transform="translate(450, 410)">
    <rect x="0" y="20" width="340" height="110" rx="55" fill="url(#tankGrad)" stroke="#64748B" stroke-width="4"/>
    <rect x="30" y="60" width="280" height="36" rx="6" fill="#0F172A"/>
    <text x="45" y="85" font-family="Montserrat, sans-serif" font-weight="900" font-size="22" fill="#F59E0B">GAS LP QUIROZ METEPEC</text>
    <rect x="330" y="40" width="90" height="90" rx="12" fill="url(#blueGrad)" stroke="#F59E0B" stroke-width="3"/>
    <circle cx="70" cy="135" r="22" fill="#0F172A" stroke="#CBD5E1" stroke-width="4"/>
    <circle cx="270" cy="135" r="22" fill="#0F172A" stroke="#CBD5E1" stroke-width="4"/>
    <circle cx="380" cy="135" r="22" fill="#0F172A" stroke="#CBD5E1" stroke-width="4"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, 'assets', 'fleet.svg'), fleetSvg);

// 2. coverage-truck.svg: Cobertura en Metepec
const coverageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="100%" height="100%">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1E40AF"/>
      <stop offset="50%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#0F172A"/>
    </linearGradient>
    <linearGradient id="tankWhite" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#E2E8F0"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="700" fill="url(#bgGrad)"/>
  
  <!-- Ilustración de Zona Residencial Metepec -->
  <polygon points="100,500 250,300 400,500" fill="#1E293B" opacity="0.6"/>
  <polygon points="350,500 500,260 650,500" fill="#334155" opacity="0.8"/>
  <polygon points="600,500 750,320 900,500" fill="#1E293B" opacity="0.6"/>
  
  <!-- Edificios y Hogares -->
  <rect x="150" y="380" width="120" height="170" fill="#475569" rx="4"/>
  <rect x="320" y="320" width="160" height="230" fill="#334155" rx="4"/>
  <rect x="700" y="350" width="140" height="200" fill="#475569" rx="4"/>

  <!-- Calle principal -->
  <rect x="0" y="520" width="1200" height="180" fill="#0F172A"/>
  <line x1="0" y1="610" x2="1200" y2="610" stroke="#F59E0B" stroke-width="6" stroke-dasharray="30 20"/>

  <!-- Pipa en Ruta de Cobertura en Metepec -->
  <g transform="translate(350, 380)">
    <rect x="0" y="30" width="420" height="130" rx="65" fill="url(#tankWhite)" stroke="#CBD5E1" stroke-width="5"/>
    <rect x="40" y="70" width="340" height="46" rx="8" fill="#1E40AF"/>
    <text x="55" y="102" font-family="Montserrat, sans-serif" font-weight="900" font-size="26" fill="#F59E0B">GAS LP QUIROZ METEPEC</text>
    <rect x="410" y="45" width="110" height="115" rx="16" fill="#1E40AF" stroke="#F59E0B" stroke-width="4"/>
    <circle cx="90" cy="165" r="28" fill="#0F172A" stroke="#FFFFFF" stroke-width="5"/>
    <circle cx="330" cy="165" r="28" fill="#0F172A" stroke="#FFFFFF" stroke-width="5"/>
    <circle cx="470" cy="165" r="28" fill="#0F172A" stroke="#FFFFFF" stroke-width="5"/>
  </g>
</svg>`;

fs.writeFileSync(path.join(__dirname, 'assets', 'coverage-truck.svg'), coverageSvg);

// 3. refill.svg: Recarga de Tanques Estacionarios
const refillSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="100%" height="100%">
  <defs>
    <linearGradient id="refillBg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1E293B"/>
      <stop offset="100%" stop-color="#1E40AF"/>
    </linearGradient>
    <linearGradient id="statTank" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="50%" stop-color="#F1F5F9"/>
      <stop offset="100%" stop-color="#CBD5E1"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="700" fill="url(#refillBg)"/>

  <!-- Tanque Estacionario Gigante -->
  <rect x="250" y="220" width="700" height="260" rx="130" fill="url(#statTank)" stroke="#94A3B8" stroke-width="6"/>
  <rect x="400" y="180" width="120" height="50" fill="#1E40AF" rx="8"/>
  <circle cx="460" cy="205" r="14" fill="#F59E0B"/>

  <!-- Medidor de Porcentaje y Válvula de Seguridad -->
  <circle cx="700" cy="205" r="30" fill="#0F172A" stroke="#F59E0B" stroke-width="4"/>
  <text x="685" y="212" font-family="Montserrat, sans-serif" font-weight="900" font-size="18" fill="#F59E0B">100%</text>

  <!-- Rotulado Oficial del Tanque -->
  <text x="320" y="360" font-family="Montserrat, sans-serif" font-weight="900" font-size="44" fill="#1E40AF">GAS LP QUIROZ METEPEC</text>
  <text x="370" y="410" font-family="Plus Jakarta Sans, sans-serif" font-weight="700" font-size="22" fill="#D97706">SUMINISTRO SEGURO &amp; CERTIFICADO PROFECO</text>

  <!-- Manguera de Suministro de Pipa -->
  <path d="M 0 650 Q 300 600 460 230" stroke="#F59E0B" stroke-width="16" fill="none"/>
  <path d="M 0 650 Q 300 600 460 230" stroke="#0F172A" stroke-width="6" fill="none" stroke-dasharray="10 10"/>
</svg>`;

fs.writeFileSync(path.join(__dirname, 'assets', 'refill.svg'), refillSvg);

console.log('✅ Archivos SVG limpios en Azul Zafiro creados exitosamente en assets/');
