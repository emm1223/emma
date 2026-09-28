import { money, PREFERENCES_STORAGE_KEY, products } from "./data.js";

export class StoreUI {
  constructor() {
    this.productGrid = document.querySelector("#product-grid");
    this.cartItems = document.querySelector("#cart-items");
    this.cartCount = document.querySelector("#cart-count");
    this.cartItemCount = document.querySelector("#cart-item-count");
    this.cartTotal = document.querySelector("#cart-total");
    this.checkoutTotal = document.querySelector("#checkout-total");
    this.checkoutButton = document.querySelector("#checkout-button");
    this.shippingMessage = document.querySelector("#shipping-message");
    this.shippingProgressFill = document.querySelector(
      "#shipping-progress-fill",
    );
    this.filterCount = document.querySelector("#filter-count");
    this.searchInput = document.querySelector("#search-input");
    this.toast = document.querySelector("#toast");
    this.toastTitle = document.querySelector("#toast-title");
    this.toastMessage = document.querySelector("#toast-message");
    this.toastTime = document.querySelector("#toast-time");
    this.toastTimer = null;
    this.filterSelects = {
      material: document.querySelector("#material-filter"),
      cut: document.querySelector("#cut-filter"),
      color: document.querySelector("#color-filter"),
    };
  }

  getPreferences() {
    try {
      return JSON.parse(localStorage.getItem(PREFERENCES_STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  savePreferences() {
    localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify({
        search: this.searchInput.value,
        material: this.filterSelects.material.value,
        cut: this.filterSelects.cut.value,
        color: this.filterSelects.color.value,
      }),
    );
  }

  populateFilters() {
    Object.entries(this.filterSelects).forEach(([key, select]) => {
      const values = [
        ...new Set(products.map((product) => product[key])),
      ].sort();
      const label =
        key === "material" ? "Material" : key === "cut" ? "Corte" : "Color";
      select.innerHTML = `<option value="all">${label}</option>${values.map((value) => `<option value="${value}">${value}</option>`).join("")}`;
      this.syncCustomFilter(select);
    });
  }

  syncCustomFilter(select) {
    const control = select.closest(".filter-control");
    const menu = control.querySelector(".filter-menu");
    const triggerLabel = control.querySelector(".filter-trigger span");
    triggerLabel.textContent = select.options[select.selectedIndex].textContent;
    menu.innerHTML = [...select.options]
      .map(
        (option) => `
      <button type="button" role="option" class="filter-option${option.value === select.value ? " is-selected" : ""}" data-filter-value="${option.value}">
        <span>${option.textContent}</span>${option.value === select.value ? '<b aria-hidden="true">✓</b>' : ""}
      </button>
    `,
      )
      .join("");
  }

  getVisibleProducts() {
    const query = this.searchInput.value.trim().toLowerCase();
    return products.filter((product) => {
      const matchesSearch =
        !query ||
        `${product.name} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(query);
      const matchesFilters = Object.entries(this.filterSelects).every(
        ([key, select]) =>
          select.value === "all" || product[key] === select.value,
      );
      return matchesSearch && matchesFilters;
    });
  }

  renderProducts() {
    const visibleProducts = this.getVisibleProducts();
    this.filterCount.textContent = `${visibleProducts.length} ${visibleProducts.length === 1 ? "producto" : "productos"}`;
    this.productGrid.innerHTML = visibleProducts.length
      ? visibleProducts
          .map(
            (product, index) => `
      <article class="product-card" style="animation-delay: ${index * 80}ms">
        <div class="product-image-wrap">
          <span class="product-badge">Esencial</span>
          <img class="product-image" src="${product.image_url}" alt="${product.name}" loading="lazy">
          <div class="product-overlay"><span>${product.sustainability_label}</span><small>${product.material_macro}</small><small>${product.precision_macro}</small></div>
          <button class="add-button" type="button" data-product-id="${product.id}" aria-label="Agregar ${product.name} al carrito">+</button>
        </div>
        <div class="product-meta"><div><p class="product-name">${product.name}</p><p class="product-category">${product.category} · ${product.description}</p></div><span class="product-price">${money(product.price)}</span></div>
      </article>
    `,
          )
          .join("")
      : '<p class="no-results">No encontramos productos con esos criterios.</p>';
  }

  renderCart(cart) {
    this.cartCount.textContent = cart.units;
    this.cartItemCount.textContent = cart.units;
    this.cartTotal.textContent = money(cart.total);
    this.checkoutTotal.textContent = money(cart.total);
    this.checkoutButton.disabled = cart.items.length === 0;
    this.shippingProgressFill.style.width = `${Math.min((cart.total / 500000) * 100, 100)}%`;
    this.shippingMessage.textContent = cart.shippingRemaining
      ? `Te faltan ${money(cart.shippingRemaining)}`
      : "Tu pedido tiene envío gratis";
    this.cartItems.innerHTML = cart.items.length
      ? cart.items
          .map(
            (item) => `
      <div class="cart-item"><img src="${item.image_url}" alt="${item.name}"><div><h3>${item.name}</h3><div class="cart-item-controls" aria-label="Cantidad de ${item.name}"><button class="quantity-button" type="button" data-action="decrease" data-product-id="${item.id}" aria-label="Disminuir cantidad">−</button><span class="quantity-value">${item.quantity}</span><button class="quantity-button" type="button" data-action="increase" data-product-id="${item.id}" aria-label="Aumentar cantidad">+</button><button class="remove-button" type="button" data-action="remove" data-product-id="${item.id}" aria-label="Eliminar ${item.name}">×</button></div></div><span class="cart-item-price">${money(item.price * item.quantity)}</span></div>
    `,
          )
          .join("")
      : '<p class="empty-cart">Tu bolsa esta esperando una pieza especial.</p>';
  }

  showToast(title, message) {
    clearTimeout(this.toastTimer);
    this.toastTitle.textContent = title;
    this.toastMessage.textContent = message;
    this.toastTime.textContent = "Ahora";
    this.toast.classList.remove("is-visible");
    void this.toast.offsetWidth;
    this.toast.classList.add("is-visible");
    this.toastTimer = setTimeout(
      () => this.toast.classList.remove("is-visible"),
      3200,
    );
  }

  closeToast() {
    clearTimeout(this.toastTimer);
    this.toast.classList.remove("is-visible");
  }

  toggleCart(open) {
    const drawer = document.querySelector("#cart-drawer");
    const toggle = document.querySelector("#cart-toggle");
    const backdrop = document.querySelector("#drawer-backdrop");
    drawer.classList.toggle("is-open", open);
    drawer.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-expanded", String(open));
    backdrop.hidden = !open;
    document.body.classList.toggle("drawer-open", open);
  }
}
