import { Cart } from "./cart.js";
import { StoreUI } from "./ui.js";

const cart = new Cart();
const ui = new StoreUI();

function closeCustomFilters() {
  document.querySelectorAll(".filter-control.is-open").forEach((control) => {
    control.classList.remove("is-open");
    control
      .querySelector(".filter-trigger")
      .setAttribute("aria-expanded", "false");
  });
}

function setupFilters() {
  ui.populateFilters();
  const preferences = ui.getPreferences();
  ui.searchInput.value = preferences.search || "";
  Object.entries(ui.filterSelects).forEach(([key, select]) => {
    if (
      [...select.options].some((option) => option.value === preferences[key])
    ) {
      select.value = preferences[key];
      ui.syncCustomFilter(select);
    }
  });

  Object.values(ui.filterSelects).forEach((select) => {
    select.addEventListener("change", () => {
      ui.savePreferences();
      ui.renderProducts();
    });
  });

  document.querySelectorAll(".filter-trigger").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      const control = trigger.closest(".filter-control");
      const wasOpen = control.classList.contains("is-open");
      closeCustomFilters();
      if (!wasOpen) {
        control.classList.add("is-open");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.querySelectorAll(".filter-menu").forEach((menu) => {
    menu.addEventListener("click", (event) => {
      const option = event.target.closest("[data-filter-value]");
      if (!option) return;
      const select = menu
        .closest(".filter-control")
        .querySelector(".filter-select-native");
      select.value = option.dataset.filterValue;
      ui.syncCustomFilter(select);
      closeCustomFilters();
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
  });

  document.addEventListener("click", closeCustomFilters);
}

function setupCart() {
  cart.subscribe((currentCart) => ui.renderCart(currentCart));
  ui.renderCart(cart);

  ui.productGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-product-id]");
    if (!button) return;
    const product = cart.add(Number(button.dataset.productId));
    if (product) ui.showToast("Producto agregado", product.name);
  });

  ui.cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("[data-action]");
    if (button)
      cart.update(Number(button.dataset.productId), button.dataset.action);
  });

  document.querySelector("#checkout-button").addEventListener("click", () => {
    if (cart.items.length) window.location.href = cart.checkoutUrl();
  });
}

function setupNavigation() {
  ui.searchInput.addEventListener("input", () => {
    ui.savePreferences();
    ui.renderProducts();
  });
  document
    .querySelector("#search-form")
    .addEventListener("submit", (event) => event.preventDefault());
  document
    .querySelector("#cart-toggle")
    .addEventListener("click", () => ui.toggleCart(true));
  document
    .querySelector("#cart-close")
    .addEventListener("click", () => ui.toggleCart(false));
  document
    .querySelector("#drawer-backdrop")
    .addEventListener("click", () => ui.toggleCart(false));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      ui.toggleCart(false);
      closeCustomFilters();
      ui.closeToast();
    }
  });
  document
    .querySelector("#toast-close")
    .addEventListener("click", () => ui.closeToast());
  document.querySelectorAll("[data-compare]").forEach((button) => {
    button.addEventListener("click", () =>
      ui.showToast("Vista rápida", button.dataset.compare),
    );
  });
}

function initialize() {
  setupFilters();
  ui.renderProducts();
  setupCart();
  setupNavigation();
}

document.addEventListener("DOMContentLoaded", initialize);
