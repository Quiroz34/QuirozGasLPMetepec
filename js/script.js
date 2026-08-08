/* ==========================================================================
   Gas LP Quiroz Metepec - Interactivity, Calculators & Scroll Behaviors
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
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
    const toggleIcon = item.querySelector(".faq-toggle-icon");

    if (questionBtn) {
      questionBtn.addEventListener("click", () => {
        const isActive = item.classList.contains("active");

        // Close other items for a clean accordion experience
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove("active");
          const otherIcon = otherItem.querySelector(".faq-toggle-icon");
          if (otherIcon) otherIcon.textContent = "+";
        });

        // Toggle current item
        if (!isActive) {
          item.classList.add("active");
          if (toggleIcon) toggleIcon.textContent = "−";
        }
      });
    }
  });

  // 5. Interactive Stationary Tank Quick Estimator & WhatsApp Dynamic Linking
  const tankPresetButtons = document.querySelectorAll(".tank-preset-btn");
  const tankSelectedCapDisplay = document.getElementById("calc-selected-cap");
  const tankSelectedTypeDisplay = document.getElementById("calc-selected-type");
  const tankOrderBtn = document.getElementById("calc-order-btn");

  const tankPresetsData = {
    "100": { cap: "100 Litros", type: "Residencial Básico", msg: "Hola,%20quisiera%20solicitar%20suministro%20de%20Gas%20LP%20en%20pipa%20para%20un%20tanque%20estacionario%20de%20100L%20en%20Metepec" },
    "120": { cap: "120 Litros", type: "Residencial Compacto", msg: "Hola,%20quisiera%20solicitar%20suministro%20de%20Gas%20LP%20en%20pipa%20para%20un%20tanque%20estacionario%20de%20120L%20en%20Metepec" },
    "180": { cap: "180 Litros", type: "Residencial Estándar", msg: "Hola,%20quisiera%20solicitar%20suministro%20de%20Gas%20LP%20en%20pipa%20para%20un%20tanque%20estacionario%20de%20180L%20en%20Metepec" },
    "300": { cap: "300 Litros", type: "Residencial Familiar", msg: "Hola,%20quisiera%20solicitar%20suministro%20de%20Gas%20LP%20en%20pipa%20para%20un%20tanque%20estacionario%20de%20300L%20en%20Metepec" },
    "500": { cap: "500 Litros", type: "Residencial Plus / Negocio", msg: "Hola,%20quisiera%20solicitar%20suministro%20de%20Gas%20LP%20en%20pipa%20para%20un%20tanque%20estacionario%20de%20500L%20en%20Metepec" },
    "1000": { cap: "1,000+ Litros", type: "Comercial / Restaurante / Industria", msg: "Hola,%20quisiera%20solicitar%20suministro%20mayorista%20de%20Gas%20LP%20en%20pipa%20para%20tanque%20estacionario%20comercial%20en%20Metepec" }
  };

  if (tankPresetButtons.length > 0) {
    tankPresetButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tankPresetButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const capKey = btn.getAttribute("data-cap");
        const data = tankPresetsData[capKey] || tankPresetsData["300"];

        if (tankSelectedCapDisplay) tankSelectedCapDisplay.textContent = data.cap;
        if (tankSelectedTypeDisplay) tankSelectedTypeDisplay.textContent = data.type;
        if (tankOrderBtn) {
          tankOrderBtn.href = `https://wa.me/527223891603?text=${data.msg}`;
        }
      });
    });
  }
});
