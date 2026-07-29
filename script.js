const PSYCHOLOGIST_WA_NUMBER = "5493512848492";

document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form");

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("patient-name")?.value.trim();
      const phone = document.getElementById("patient-phone")?.value.trim();
      const email = document.getElementById("patient-email")?.value.trim();
      const reason = document.getElementById("patient-reason")?.value.trim();

      if (!name || !phone) {
        alert(
          "Por favor, completa los campos obligatorios (Nombre y Teléfono).",
        );
        return;
      }

      const whatsappText =
        `Hola Lourdes, ¿cómo estás? Mi nombre es ${name}. Te escribo desde tu página web porque me gustaría coordinar una sesión de consulta.\n\n` +
        `Te dejo mis datos para seguir por acá:\n` +
        `• *Teléfono:* ${phone}\n` +
        `• *Email:* ${email || "No especificado"}\n` +
        `• *Motivo de consulta:* ${reason}\n\n` +
        `Un saludo y gracias!`;
      const finalWaUrl = `https://wa.me/${PSYCHOLOGIST_WA_NUMBER}?text=${encodeURIComponent(whatsappText)}`;

      const successOverlay = document.getElementById("booking-success");
      const directWaLink = document.getElementById("direct-wa-link");
      const countdownEl = document.getElementById("countdown");

      if (successOverlay) {
        successOverlay.classList.remove("hidden");
      }

      if (directWaLink) {
        directWaLink.href = finalWaUrl;
      }

      let counter = 3;
      if (countdownEl) countdownEl.innerText = counter;

      const interval = setInterval(() => {
        counter--;
        if (countdownEl) countdownEl.innerText = counter;

        if (counter <= 0) {
          clearInterval(interval);

          window.open(finalWaUrl, "_blank");

          if (successOverlay) {
            successOverlay.classList.add("hidden");
          }
          bookingForm.reset();
        }
      }, 1000);
    });
  }

  const faqToggles = document.querySelectorAll(".faq-toggle");

  faqToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const content = toggle.nextElementSibling;
      if (!content) return;

      const isExpanded = toggle.getAttribute("aria-expanded") === "true";

      faqToggles.forEach((otherToggle) => {
        if (otherToggle !== toggle) {
          otherToggle.setAttribute("aria-expanded", "false");
          const otherContent = otherToggle.nextElementSibling;
          if (otherContent) {
            otherContent.style.maxHeight = "0";
          }
        }
      });

      if (!isExpanded) {
        toggle.setAttribute("aria-expanded", "true");
        content.style.maxHeight = `${content.scrollHeight}px`;
      } else {
        toggle.setAttribute("aria-expanded", "false");
        content.style.maxHeight = "0";
      }
    });
  });
});
