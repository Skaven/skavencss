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
    modal.style.display = "flex";
    addNoScroll(); // Přidání no-scroll s kompenzací scrollbaru
  });
});

// Zavírání modalů kliknutím na zavírací tlačítko
closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    modal.style.display = "none";
    removeNoScroll(); // Odebrání no-scroll a reset paddingu
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

// Vertikální carousel
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll(".carousel-container");

  carousels.forEach((container) => {
    const carousel = container.querySelector(".carousel");
    const upButton = container.querySelector(".carousel-button.up");
    const downButton = container.querySelector(".carousel-button.down");

    if (!carousel || !upButton || !downButton) return;

    // Pixelová tolerance pro zaokrouhlování
    const tolerance = 1;

    // Funkce pro posouvání carouselu nahoru a dolů
    const scrollCarousel = (direction) => {
      const scrollAmount = carousel.clientHeight; // Výška viditelné oblasti
      const currentScroll = carousel.scrollTop; // Aktuální pozice scrollu
      const maxScroll = carousel.scrollHeight - carousel.clientHeight; // Maximální posuv

      let targetScroll =
        direction === "down"
          ? currentScroll + scrollAmount
          : currentScroll - scrollAmount;

      // Omezit posuv na povolené hodnoty
      targetScroll = Math.max(0, Math.min(targetScroll, maxScroll));

      carousel.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    };

    // Funkce pro zobrazení/skrytí tlačítek
    const updateButtons = () => {
      const scrollTop = carousel.scrollTop; // Aktuální pozice scrollu
      const maxScrollTop = carousel.scrollHeight - carousel.clientHeight; // Maximální posuv

      upButton.style.display = scrollTop > tolerance ? "block" : "none";
      downButton.style.display =
        scrollTop < maxScrollTop - tolerance ? "block" : "none";
    };

    // Eventy pro tlačítka
    upButton.addEventListener("click", () => scrollCarousel("up"));
    downButton.addEventListener("click", () => scrollCarousel("down"));

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
    panel.hidden = isExpanded;

    // Přepni třídu pro změnu symbolu plus/mínus
    const plusIcon = button.querySelector(".plus");
    if (!isExpanded) {
      plusIcon.classList.add("minus");
    } else {
      plusIcon.classList.remove("minus");
    }
  });
});

// toto je IMAGO ONLY – zobrazovač dlouhého popisku kategorie
document.addEventListener("DOMContentLoaded", () => {
  const textContainer = document.getElementById("category-text");
  const readMoreLink = document.getElementById("read-more");

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
      console.error("Dropdown toggle or menu not found.");
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

// COUNTER

// Select counter elements
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const decrementBtn = counter.querySelector(".decrement");
    const incrementBtn = counter.querySelector(".increment");
    const inputField = counter.querySelector("input");

    // Handle decrement
    decrementBtn.addEventListener("click", () => {
      const currentValue = parseInt(inputField.value) || 1;
      const newValue = Math.max(
        currentValue - 1,
        parseInt(inputField.min) || 1,
      );
      inputField.value = newValue;
    });

    // Handle increment
    incrementBtn.addEventListener("click", () => {
      const currentValue = parseInt(inputField.value) || 1;
      const newValue = currentValue + 1;
      inputField.value = newValue;
    });

    // Handle manual input
    inputField.addEventListener("input", () => {
      const minValue = parseInt(inputField.min) || 1;
      const currentValue = parseInt(inputField.value) || minValue;

      // Ensure value is not less than min
      if (currentValue < minValue) {
        inputField.value = minValue;
      }
    });
  });
});

// MEGAMENU – zobrazování podmenu UX friendly
document.addEventListener("DOMContentLoaded", () => {
  const menuItems = document.querySelectorAll(".mega-menu-item");

  menuItems.forEach((item) => {
    let showTimeout, hideTimeout;

    const megaMenu = item.querySelector(".mega-menu");

    // Funkce pro zobrazení menu s prodlevou
    const showMenu = () => {
      clearTimeout(hideTimeout);
      showTimeout = setTimeout(() => {
        megaMenu.classList.add("visible");
      }, 100); // 200 ms prodleva pro zobrazení
    };

    // Funkce pro skrytí menu s prodlevou
    const hideMenu = () => {
      clearTimeout(showTimeout);
      hideTimeout = setTimeout(() => {
        megaMenu.classList.remove("visible");
      }, 100); // 200 ms prodleva pro skrytí
    };

    // Události pro hlavní položku menu
    item.addEventListener("mouseenter", showMenu);
    item.addEventListener("mouseleave", hideMenu);

    // Události pro samotné mega menu
    megaMenu.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);
    });
    megaMenu.addEventListener("mouseleave", hideMenu);
  });
});
