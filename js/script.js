/* ==========================================================================
   Gas LP Quiroz Metepec - Interactivity, Calculators, Copy Phone & Behaviors
   ========================================================================== */

function initGasQuiroz() {
  // 1. Mobile Menu Toggler
  const mobileToggleBtn = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("mobile-open");
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("mobile-open");
      });
    });
  }

  // 2. Header Scroll Elevation & Backdrop
  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // 3. Scroll Reveal Animation Observer
  const revealElements = document.querySelectorAll(
    ".reveal-fade-in, .reveal-fade-up, .reveal-fade-left, .reveal-fade-right"
  );

  const revealObserverOptions = {
    root: null,
    rootMargin: "0px 0px -50px 0px",
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, revealObserverOptions);

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // 4. FAQ Accordion Toggling
  const faqItems = document.querySelectorAll(".faq-accordion-item");

  faqItems.forEach((item) => {
    const questionBtn = item.querySelector(".faq-question-btn");

    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close other items for a clean accordion experience
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove("active");
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add("active");
        }
      });
    }
  });

  // 5. 1-Click Copy Phone Numbers to Clipboard with Visual Tooltip
  const copyButtons = document.querySelectorAll(".chip-copy-btn");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      e.stopPropagation();

      const phoneToCopy = btn.getAttribute("data-phone") || "7223891603";

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(phoneToCopy);
        } else {
          // Fallback for older browsers
          const tempInput = document.createElement("input");
          tempInput.value = phoneToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand("copy");
          document.body.removeChild(tempInput);
        }

        btn.classList.add("copied");
        setTimeout(() => {
          btn.classList.remove("copied");
        }, 1800);
      } catch (err) {
        console.warn("No se pudo copiar el número:", err);
      }
    });
  });

  // 6. Interactive Metepec Fraccionamientos / Colonia Selector
  const coloniaButtons = document.querySelectorAll(".colonia-chip-btn");
  const selectedZoneName = document.getElementById("selected-zone-name");
  const selectedZoneEta = document.getElementById("selected-zone-eta");
  const coloniaOrderBtn = document.getElementById("colonia-order-btn");

  if (coloniaButtons.length > 0) {
    coloniaButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        coloniaButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const zone = btn.getAttribute("data-zone") || "Metepec";
        const eta = btn.getAttribute("data-eta") || "20 a 30 min";

        if (selectedZoneName) selectedZoneName.textContent = zone;
        if (selectedZoneEta) selectedZoneEta.textContent = eta;

        if (coloniaOrderBtn) {
          const encodedZone = encodeURIComponent(zone);
          coloniaOrderBtn.href = `https://wa.me/527223891603?text=Hola,%20solicito%20pipa%20de%20Gas%20LP%20express%20para%20${encodedZone},%20Metepec`;
        }
      });
    });
  }

  // 7. Dual Mode Tank Estimator (Litros vs Monto en Pesos $ MXN)
  const tabModeCap = document.getElementById("tab-mode-cap");
  const tabModeAmount = document.getElementById("tab-mode-amount");
  const presetsCapGrid = document.getElementById("presets-capacity-grid");
  const presetsAmountGrid = document.getElementById("presets-amount-grid");

  const tankCalcLabelHeader = document.getElementById("calc-label-header");
  const tankSelectedCapDisplay = document.getElementById("calc-selected-cap");
  const tankSelectedTypeDisplay = document.getElementById("calc-selected-type");
  const tankLevelFill = document.getElementById("tank-level-fill");
  const tankFillLabel = document.getElementById("tank-fill-label");
  const tankOrderBtn = document.getElementById("calc-order-btn");

  const capacityData = {
    "100": { cap: "100 Litros", type: "Residencial Básico", pct: "25%", msg: "Hola,%20quisiera%20solicitar%20suministro%20de%20Gas%20LP%20en%20pipa%20para%20un%20tanque%20estacionario%20de%20100L%20en%20Metepec" },
    "120": { cap: "120 Litros", type: "Residencial Compacto", pct: "35%", msg: "Hola,%20quisiera%20solicitar%20suministro%20de%20Gas%20LP%20en%20pipa%20para%20un%20tanque%20estacionario%20de%20120L%20en%20Metepec" },
    "180": { cap: "180 Litros", type: "Residencial Estándar", pct: "50%", msg: "Hola,%20quisiera%20solicitar%20suministro%20de%20Gas%20LP%20en%20pipa%20para%20un%20tanque%20estacionario%20de%20180L%20en%20Metepec" },
    "300": { cap: "300 Litros", type: "Residencial Familiar", pct: "65%", msg: "Hola,%20quisiera%20solicitar%20suministro%20de%20Gas%20LP%20en%20pipa%20para%20un%20tanque%20estacionario%20de%20300L%20en%20Metepec" },
    "500": { cap: "500 Litros", type: "Residencial Plus / Negocio", pct: "85%", msg: "Hola,%20quisiera%20solicitar%20suministro%20de%20Gas%20LP%20en%20pipa%20para%20un%20tanque%20estacionario%20de%20500L%20en%20Metepec" },
    "1000": { cap: "1,000+ Litros", type: "Comercial / Restaurante / Industria", pct: "100%", msg: "Hola,%20quisiera%20solicitar%20suministro%20mayorista%20de%20Gas%20LP%20en%20pipa%20para%20tanque%20estacionario%20comercial%20en%20Metepec" }
  };

  const amountData = {
    "500": { cap: "$500 MXN (~50 L)", type: "Recarga Parcial Rápida", pct: "25%", msg: "Hola,%20quisiera%20solicitar%20una%20recarga%20de%20$500%20MXN%20de%20Gas%20LP%20para%20tanque%20estacionario%20en%20Metepec" },
    "1000": { cap: "$1,000 MXN (~100 L)", type: "Carga Media Habitual", pct: "45%", msg: "Hola,%20quisiera%20solicitar%20una%20recarga%20de%20$1,000%20MXN%20de%20Gas%20LP%20para%20tanque%20estacionario%20en%20Metepec" },
    "1500": { cap: "$1,500 MXN (~150 L)", type: "Carga Familiar Óptima", pct: "65%", msg: "Hola,%20quisiera%20solicitar%20una%20recarga%20de%20$1,500%20MXN%20de%20Gas%20LP%20para%20tanque%20estacionario%20en%20Metepec" },
    "2000": { cap: "$2,000 MXN (~200 L)", type: "Carga Completa Rendimiento", pct: "85%", msg: "Hola,%20quisiera%20solicitar%20una%20recarga%20de%20$2,000%20MXN%20de%20Gas%20LP%20para%20tanque%20estacionario%20en%20Metepec" },
    "lleno": { cap: "Tanque Lleno (85-90%)", type: "Llenado de Seguridad Máximo", pct: "88%", msg: "Hola,%20quisiera%20solicitar%20llenado%20completo%20de%20seguridad%20(Tanque%20Lleno)%20de%20Gas%20LP%20en%20Metepec" }
  };

  // Tab switcher events
  if (tabModeCap && tabModeAmount && presetsCapGrid && presetsAmountGrid) {
    tabModeCap.addEventListener("click", () => {
      tabModeCap.classList.add("active");
      tabModeAmount.classList.remove("active");
      presetsCapGrid.style.display = "grid";
      presetsAmountGrid.style.display = "none";
      if (tankCalcLabelHeader) tankCalcLabelHeader.textContent = "Capacidad de Tanque";

      // Reset to current active capacity
      const activeCapBtn = presetsCapGrid.querySelector(".tank-preset-btn.active") || presetsCapGrid.firstElementChild;
      if (activeCapBtn) activeCapBtn.click();
    });

    tabModeAmount.addEventListener("click", () => {
      tabModeAmount.classList.add("active");
      tabModeCap.classList.remove("active");
      presetsAmountGrid.style.display = "grid";
      presetsCapGrid.style.display = "none";
      if (tankCalcLabelHeader) tankCalcLabelHeader.textContent = "Monto a Cargar";

      // Select first amount preset if none active
      const activeAmtBtn = presetsAmountGrid.querySelector(".tank-preset-btn.active") || presetsAmountGrid.children[1];
      if (activeAmtBtn) activeAmtBtn.click();
    });
  }

  // Capacity Buttons Handler
  const capPresetButtons = document.querySelectorAll("#presets-capacity-grid .tank-preset-btn");
  capPresetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      capPresetButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const capKey = btn.getAttribute("data-cap");
      const data = capacityData[capKey] || capacityData["300"];

      if (tankSelectedCapDisplay) tankSelectedCapDisplay.textContent = data.cap;
      if (tankSelectedTypeDisplay) tankSelectedTypeDisplay.textContent = data.type;
      if (tankLevelFill) tankLevelFill.style.width = data.pct;
      if (tankFillLabel) tankFillLabel.textContent = data.cap;
      if (tankOrderBtn) {
        tankOrderBtn.href = `https://wa.me/527223891603?text=${data.msg}`;
      }
    });
  });

  // Amount Buttons Handler
  const amtPresetButtons = document.querySelectorAll("#presets-amount-grid .tank-preset-btn");
  amtPresetButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      amtPresetButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const amtKey = btn.getAttribute("data-amount");
      const data = amountData[amtKey] || amountData["1000"];

      if (tankSelectedCapDisplay) tankSelectedCapDisplay.textContent = data.cap;
      if (tankSelectedTypeDisplay) tankSelectedTypeDisplay.textContent = data.type;
      if (tankLevelFill) tankLevelFill.style.width = data.pct;
      if (tankFillLabel) tankFillLabel.textContent = data.cap;
      if (tankOrderBtn) {
        tankOrderBtn.href = `https://wa.me/527223891603?text=${data.msg}`;
      }
    });
  });

  // 8. Dynamic Service Schedule Clock (6:00 AM - 7:00 PM: PIPAS EN SERVICIO [Verde], Fuera de horario: ENCIERRE DE UNIDADES [Rojo])
  function updateServiceScheduleStatus() {
    const serviceIndicator = document.getElementById("live-service-indicator");
    const serviceText = document.getElementById("live-service-text");
    if (!serviceIndicator || !serviceText) return;

    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    const totalMinutes = currentHour * 60 + currentMin;

    // 6:00 AM (360 min) hasta 7:00 PM (1140 min)
    const isOpen = totalMinutes >= 360 && totalMinutes < 1140;

    if (isOpen) {
      serviceIndicator.classList.remove("closed");
      serviceText.textContent = "GRUPO QUIROZ • PIPAS EN SERVICIO";
    } else {
      serviceIndicator.classList.add("closed");
      serviceText.textContent = "GRUPO QUIROZ • ENCIERRE DE UNIDADES";
    }
  }

  updateServiceScheduleStatus();
  setInterval(updateServiceScheduleStatus, 30000);

  // 9. Interactive Luxury Card Spotlight Effect (Apple/Stripe style)
  const spotlightCards = document.querySelectorAll(
    ".why-us-item, .testimonial-card, .cert-badge-item, .tank-preset-btn, .faq-accordion-item, .selected-colonia-box"
  );
  spotlightCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    });
  });

  // 10. Precision Metrics Count-Up Animation
  const metricsStrip = document.querySelector(".trust-metrics-card");
  let hasCounted = false;

  if (metricsStrip && "IntersectionObserver" in window) {
    const metricObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasCounted) {
          hasCounted = true;
          animateTrustNumbers();
          metricObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    metricObserver.observe(metricsStrip);
  }

  function animateTrustNumbers() {
    const metricValues = document.querySelectorAll(".trust-metric-value");
    metricValues.forEach((item) => {
      const text = item.textContent.trim();
      if (text.includes("100%")) {
        let count = 0;
        const timer = setInterval(() => {
          count += 4;
          if (count >= 100) {
            count = 100;
            clearInterval(timer);
          }
          item.textContent = `${count}% Calibrado`;
        }, 22);
      }
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGasQuiroz);
} else {
  initGasQuiroz();
}
