"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
  });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

if (testimonialsItem.length > 0 && modalContainer) {
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector(
        "[data-testimonials-title]",
      ).innerHTML;
      modalText.innerHTML = this.querySelector(
        "[data-testimonials-text]",
      ).innerHTML;
      testimonialsModalFunc();
    });
  }
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  overlay.addEventListener("click", testimonialsModalFunc);
}

// custom select and filter variables for multiple sections (Portfolio & Outreach)
const customSelects = document.querySelectorAll("[data-select]");

customSelects.forEach((select) => {
  const selectList = select.nextElementSibling;
  const selectItems = selectList
    ? selectList.querySelectorAll("[data-select-item]")
    : [];
  const selectValue = select.querySelector("[data-selecct-value]");
  const parentSection = select.closest("article") || select.closest("section");
  const filterBtn = parentSection
    ? parentSection.querySelectorAll("[data-filter-btn]")
    : [];
  const filterItems = parentSection
    ? parentSection.querySelectorAll("[data-filter-item]")
    : [];

  // Toggle select box (Mobile)
  select.addEventListener("click", function (e) {
    e.stopPropagation();
    elementToggleFunc(this);
  });

  // Add event in all select items (Mobile dropdown options)
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase().trim();
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue, filterItems);
    });
  }

  // Add event in all filter buttons for large screen (Desktop)
  if (filterBtn.length > 0) {
    let lastClickedBtn = filterBtn[0];

    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase().trim();
        if (selectValue) selectValue.innerText = this.innerText;
        filterFunc(selectedValue, filterItems);

        lastClickedBtn.classList.remove("active");
        this.classList.add("active");
        lastClickedBtn = this;
      });
    }
  }
});

// Independent filter function scoped per section
const filterFunc = function (selectedValue, filterItems) {
  for (let i = 0; i < filterItems.length; i++) {
    let itemCategory = filterItems[i].dataset.category
      ? filterItems[i].dataset.category.toLowerCase().trim()
      : "";

    if (selectedValue === "all" || selectedValue === "all categories") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

if (form && formBtn) {
  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

// --- HASH ROUTING & DEEP LINKING SUPPORT ---
document.addEventListener("DOMContentLoaded", function () {
  function activateSectionByHash() {
    const hash = window.location.hash.replace("#", "").toLowerCase();
    if (hash) {
      navigationLinks.forEach((nav) => {
        if (nav.innerHTML.toLowerCase() === hash) {
          nav.click();
        }
      });
    }
  }

  // Ejecutar al cargar la página por primera vez
  activateSectionByHash();

  // Escuchar cambios en el hash (si el usuario navega con las flechas del navegador)
  window.addEventListener("hashchange", activateSectionByHash);

  // Agregar el hash a la URL al hacer clic en los botones de navegación
  navigationLinks.forEach((nav) => {
    nav.addEventListener("click", function () {
      const sectionName = this.innerHTML.toLowerCase();
      history.pushState(null, null, `#${sectionName}`);
    });
  });
});

// --- SANTIAGO WEATHER FORECAST WIDGET (Dinámico desde Python) ---
document.addEventListener("DOMContentLoaded", function () {
  async function loadWeatherCards() {
    try {
      // Lee el archivo JSON generado automáticamente por tu script de Python
      const response = await fetch("./assets/js/weather_widget_data.json");
      const data = await response.json();

      const container = document.getElementById("weather-cards-container");
      if (!container) return;

      let html = "";
      data.forEach((card, index) => {
        html += `
          <div class="content-card forecast-card-item">
            <span class="forecast-day-label">${card.day}</span>
            <div class="forecast-icon-box">
              <ion-icon name="${card.icon}"></ion-icon>
            </div>
            <div class="forecast-temps-row">
              <span class="temp-max">${card.max}</span>
              <span class="temp-min">${card.min}</span>
            </div>
          </div>`;
      });
      container.innerHTML = html;
    } catch (error) {
      console.error("No se pudo cargar el pronóstico dinámico:", error);
    }
  }

  loadWeatherCards();
});
