// Nahrazení tří teček výpustkou
document.querySelectorAll("p").forEach((paragraph) => {
  paragraph.innerHTML = paragraph.innerHTML.replace(/\.{3}/g, "…");
});

// Nezalomitelné mezery v odstavcích za jednopísmennými předložkami
document.querySelectorAll("p").forEach((paragraph) => {
  paragraph.innerHTML = paragraph.innerHTML.replace(
    /(\s|^)([ksvzouai])\s+/g,
    "$1$2&nbsp;",
  );
});

// toto je IMAGO ONLY – zobrazovač dlouhého popisku kategorie
document.addEventListener("DOMContentLoaded", () => {
  const textContainer = document.getElementById("category-text");
  const readMoreLink = document.getElementById("read-more");

  // Zkontroluj, zda oba prvky existují
  if (!textContainer || !readMoreLink) {
    console.warn(
      'Elementy "category-text" nebo "read-more" nebyly na stránce nalezeny.',
    );
    return;
  }

  // Kontrola, jestli text přetéká
  if (textContainer.scrollHeight > textContainer.offsetHeight) {
    readMoreLink.style.display = "inline"; // Zobrazí odkaz "Pokračovat"
  }

  // Přidání události pro zobrazení celého textu
  readMoreLink.addEventListener("click", (event) => {
    event.preventDefault(); // Zabraňuje přesměrování odkazu
    textContainer.style.maxHeight = "none"; // Zobrazí celý text
    textContainer.style.overflow = "visible"; // Umožní viditelnost
    readMoreLink.style.display = "none"; // Skryje odkaz
  });
});

// Zavření notifikace
document.querySelectorAll(".dismisable .close").forEach((button) => {
  button.addEventListener("click", function () {
    this.closest(".dismisable").remove(); // Odstraní nejbližší nadřazený element s třídou 'dismisable'
  });
});

// MODAL
// Vybereme všechny prvky, které otevírají modal, zavírací tlačítka a samotné modaly
document.addEventListener("DOMContentLoaded", () => {
  const openModalButtons = document.querySelectorAll(".open-modal");
  const closeModalButtons = document.querySelectorAll('[role="close-modal"]');
  const modals = document.querySelectorAll(".modal");

  // Funkce pro přidání no-scroll a kompenzaci šířky scrollbaru
  function addNoScroll() {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`; // Přidání paddingu pro kompenzaci
    document.body.classList.add("no-scroll");
  }

  // Funkce pro odebrání no-scroll a reset paddingu
  function removeNoScroll() {
    document.body.style.paddingRight = ""; // Reset paddingu
    document.body.classList.remove("no-scroll");
  }

  // Přidáme funkci pro otevření správného modalu
  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = "flex";
        addNoScroll(); // Přidání no-scroll s kompenzací scrollbaru
      } else {
        console.warn(`Modal with ID "${modalId}" not found.`);
      }
    });
  });

  // Zavírání modalů kliknutím na zavírací tlačítko
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      if (modal) {
        modal.style.display = "none";
        removeNoScroll(); // Odebrání no-scroll a reset paddingu
      }
    });
  });

  // Zavírání modalů kliknutím mimo obsah
  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
        removeNoScroll(); // Odebrání no-scroll a reset paddingu
      }
    });
  });
});

// CAROUSEL
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((container) => {
    const carousel = container.querySelector(".carousel");
    const prevButton = container.querySelector(".carousel-button.prev");
    const nextButton = container.querySelector(".carousel-button.next");

    if (!carousel || !prevButton || !nextButton) return;

    // Tolerance pro zaokrouhlování (1 pixel)
    const tolerance = 1;

    // Funkce pro posouvání carouselu
    const scrollCarousel = (direction) => {
      const scrollAmount = carousel.offsetWidth; // Šířka viditelné oblasti
      const currentScroll = carousel.scrollLeft;

      // Vyřešení problému Safari: kontrola koncové pozice
      const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
      let targetScroll =
        direction === "next"
          ? currentScroll + scrollAmount
          : currentScroll - scrollAmount;

      // Ujistěte se, že scroll nepřesáhne povolené hodnoty
      targetScroll = Math.max(0, Math.min(targetScroll, maxScrollLeft));

      carousel.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    };

    // Funkce pro zobrazení/skrytí tlačítek
    const updateButtons = () => {
      const scrollLeft = carousel.scrollLeft;
      const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;

      prevButton.style.display = scrollLeft > tolerance ? "block" : "none";
      nextButton.style.display =
        scrollLeft + tolerance < maxScrollLeft ? "block" : "none";
    };

    // Eventy pro tlačítka
    prevButton.addEventListener("click", () => scrollCarousel("prev"));
    nextButton.addEventListener("click", () => scrollCarousel("next"));

    // Aktualizace tlačítek při scrollování a změně velikosti okna
    carousel.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);

    // Inicializace tlačítek při načtení
    updateButtons();
  });
});

// AKORDEON
document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const panel = document.getElementById(button.getAttribute("aria-controls"));
    const isExpanded = button.getAttribute("aria-expanded") === "true";

    // Přepni stav "aria-expanded" a viditelnost panelu
    button.setAttribute("aria-expanded", !isExpanded);
    if (panel) {
      panel.hidden = isExpanded;
    }

    // Přepni třídu pro změnu symbolu plus/mínus
    const plusIcon = button.querySelector(".plus");
    if (plusIcon) {
      if (!isExpanded) {
        plusIcon.classList.add("minus");
      } else {
        plusIcon.classList.remove("minus");
      }
    }
  });
});

// DROPDOWN
document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll(".dropdown");

  // Funkce pro zavření všech dropdownů
  function closeAllDropdowns() {
    dropdowns.forEach((dropdown) => {
      const menu = dropdown.querySelector(".dropdown-menu");
      if (menu) {
        menu.classList.remove("show");
      }
    });
  }

  dropdowns.forEach((dropdown) => {
    const toggleButton = dropdown.querySelector(".dropdown-toggle");
    const menu = dropdown.querySelector(".dropdown-menu");

    if (!toggleButton || !menu) {
      console.warn(
        "Dropdown toggle nebo menu nebylo nalezeno pro jeden z dropdownů.",
      );
      return;
    }

    // Kliknutí na toggle tlačítko
    toggleButton.addEventListener("click", (event) => {
      event.stopPropagation(); // Zabrání šíření události na dokument
      const isOpen = menu.classList.contains("show");

      // Zavři všechny ostatní dropdowny
      closeAllDropdowns();

      // Přepni aktuální dropdown
      if (!isOpen) {
        menu.classList.add("show");
      }
    });
  });

  // Zavření při stisku klávesy Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllDropdowns();
    }
  });

  // Kliknutí mimo dropdown zavře všechny otevřené dropdowny
  document.addEventListener("click", () => {
    closeAllDropdowns();
  });
});
