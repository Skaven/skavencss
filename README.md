# Skaven.css 📐

**Skaven.css** is a minimalist typographic CSS framework and design system focused on a strict **vertical baseline grid**. It is built as an experiment in layout harmony, ensuring that every element—from text to buttons and images—aligns perfectly to a rhythmic vertical scale.

---

## 📏 The Baseline Grid & Vertical Rhythm

The foundation of this framework is the vertical grid, controlled by a CSS variable with a default value of **24px**.

### Alignment Logic
* **Line Height & Font Size:** Since browser engines don't have a native "snap to baseline" feature, Skaven.css uses calculated line-heights. Text is centered within the line height, with remaining space distributed evenly (4px above and below) to maintain the grid.
* **Grid Visibility:** The framework includes a utility to show/hide the grid for debugging and alignment checks.

---

## 🏗️ Layout System

The layout is built to be semantic and flexible.

### Containers
Structure your page using semantic tags like `<header>`, `<main>`, and `<footer>`. Inside these, use the `.container` class:
* **.container**: Centers content and provides base horizontal padding.
* **.pt / .pb**: Use these classes to add top or bottom padding in increments of the baseline grid.

### Grid (Rows & Items)
* **.row**: The flexbox wrapper. Use classes like **.top**, **.middle**, **.bottom**, or **.stretch** for vertical alignment.
* **.item**: The columns within a row. Use **.wide** to make a specific item expand to fill available space.
* **.compact / .gapless**: Use these to reduce or remove the gutter between items.

---

## 📱 Breakpoints & Responsiveness

The framework uses five distinct breakpoints to handle various screen sizes:

1. **Mobile**: up to 575 px
2. **Tablet**: 576 px – 767 px
3. **Desktop**: 768 px – 1023 px
4. **Widescreen**: 1024 px – 1279 px
5. **FullHD**: 1280 px – 1535 px
6. **Mega**: 1536 px and above

### Visibility Helper Classes:
* **.from[breakpoint]**: Displays the element only starting from that size (e.g., .fromdesktop).
* **.to[breakpoint]**: Displays the element only up to that size (e.g., .totablet).
* **.[breakpoint]-yes**: Displays the element exclusively on that specific viewport.

---

## ✍️ Elements & Typography

Skaven.css styles raw HTML tags directly, making it ideal for rendering Markdown or plain text.

* **Headings**: Uses h1 to h4, with sizes following a 1.5x scale. You can also use classes **.size1** to **.size4**.
* **Paragraphs**: Automatically aligned to the grid with a one-line bottom margin.
* **.readable**: Limits the line length to 75 characters for optimal reading UX.
* **Lists**: Both unordered (ul) and ordered (ol) lists are grid-aligned. Use **.inline** for horizontal layouts.

---

## 🧩 Components

### Buttons
Buttons default to 100% width for mobile-first accessibility.
* **.primary / .secondary**: The main action styles.
* **.pseudo / .ghost**: Subtle styles without heavy borders or backgrounds.
* **.highlight**: A neobrutalist-inspired emphasis style.
* **.square**: For icon buttons (best used with the .icon class).

### Callouts & Containers
* **.callout**: A simple framed box for highlighting content.
* **.shadow / .shadow-light**: Adds depth to your containers.
* **.bg-white**: Sets a clean white background.

### Navigation & Menus
* **.breadcrumb**: Styled navigation paths inside a nav tag.
* **.tabs**: Tabbed navigation lists. Add **.boxed** for a folder-tab look.
* **.mega-menu**: Pure CSS dropdown menus for complex navigation.
* **.sidebar**: Vertical navigation with hover highlights.

### Forms
Input fields, textareas, and selects are styled to fit the baseline grid.
* **.join**: Use this class to merge an input and a button into a single visual unit.

---

## 🖼️ Media & Images

Images on a grid can be tricky. Skaven.css offers helper classes:
* **.onebox / .twobox / .threebox**: Forces square aspect ratios based on grid rows.
* **.oneline / .twolines**: Forces height based on the number of grid lines.
* **.frame**: Adds a decorative frame to any image or figure.

---

## 🛠️ Utility Classes (Spacing)

Control margins (**m**) and paddings (**p**) using four levels:
* **-0**: Zero
* **-half**: 12px
* **[standard]**: 24px (One baseline unit)
* **-big**: 48px (Two baseline units)

Example: **.mb-half** for a 12px bottom margin.

---

## 🚀 Installation

Add the following to your HTML head:

<link rel="stylesheet" href="https://www.skaven.cz/css/skaven.css">

---

**Created by Skaven** | [Full Documentation & Live Demo](https://www.skaven.cz/css/)
