import {
  CART_STORAGE_KEY,
  FREE_SHIPPING_THRESHOLD,
  WHATSAPP_NUMBER,
  money,
  products,
} from "./data.js";

export class Cart {
  constructor() {
    this.items = this.load();
    this.listeners = new Set();
  }

  load() {
    try {
      const stored = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
      if (!Array.isArray(stored)) return [];
      return stored.reduce((items, storedItem) => {
        const product = products.find(
          (item) => item.id === Number(storedItem.id),
        );
        const quantity = Number.parseInt(storedItem.quantity, 10);
        if (product && Number.isInteger(quantity) && quantity > 0) {
          items.push({ ...product, quantity });
        }
        return items;
      }, []);
    } catch {
      return [];
    }
  }

  save() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
  }

  emit() {
    this.save();
    this.listeners.forEach((listener) => listener(this));
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  add(productId) {
    const product = products.find((item) => item.id === productId);
    if (!product) return null;
    const existing = this.items.find((item) => item.id === productId);
    if (existing) existing.quantity += 1;
    else this.items.push({ ...product, quantity: 1 });
    this.emit();
    return product;
  }

  update(productId, action) {
    const index = this.items.findIndex((item) => item.id === productId);
    if (index === -1) return;
    if (action === "increase") this.items[index].quantity += 1;
    if (action === "decrease") this.items[index].quantity -= 1;
    if (action === "remove" || this.items[index].quantity < 1)
      this.items.splice(index, 1);
    this.emit();
  }

  get units() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get total() {
    return this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
  }

  get shippingRemaining() {
    return Math.max(FREE_SHIPPING_THRESHOLD - this.total, 0);
  }

  checkoutUrl() {
    const lines = this.items
      .map(
        (item) => `• ${item.quantity}x ${item.name} — ${money(item.price)} c/u`,
      )
      .join("\n");
    const message = `Hola, me interesa este pedido:\n${lines}\n\nTotal: ${money(this.total)}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }
}
