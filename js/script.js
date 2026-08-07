/* ==========================================================================
   GasExpress LP - Scroll Animations & Interactivity
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggler
  const mobileToggleBtn = document.querySelector(".mobile-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (mobileToggleBtn && navMenu) {
    mobileToggleBtn.addEventListener("click", () => {
      navMenu.classList.toggle("mobile-open");
    });
  }

  // 2. Header Scroll Shadow
  const header = document.querySelector(".site-header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // 3. Scroll Reveal Animation Observer (Replicating Elementor scroll animations)
  const revealElements = document.querySelectorAll(
    ".reveal-fade-in, .reveal-fade-up, .reveal-fade-left, .reveal-fade-right",
  );

  const revealObserverOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px", // Trigger slightly before coming into view
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Unobserve after animating once (matching elementor behavior)
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

        // Close all items
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove("active");
          const otherIcon = otherItem.querySelector(".faq-toggle-icon");
          if (otherIcon) otherIcon.textContent = "+";
        });

        // Open selected item if it wasn't open
        if (!isActive) {
          item.classList.add("active");
          if (toggleIcon) toggleIcon.textContent = "−";
        }
      });
    }
  });
});
