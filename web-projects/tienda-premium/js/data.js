export const products = [
  {
    id: 1,
    name: "Camisa Oxford Sostenible",
    category: "Hombres",
    price: 95000,
    description: "Piezas esencial con estructura ligera y acabado limpio.",
    material_macro: "Algodón Oxford reciclado",
    precision_macro: "Costuras reforzadas de precisión",
    sustainability_label: "Algodón certificado",
    material: "Algodón",
    cut: "Regular",
    color: "Blanco",
    image_url:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Hombre Watch",
    category: "Accesorios",
    price: 285000,
    description: "Precisión atemporal en una caja de acero cepillado.",
    material_macro: "Acero inoxidable 316L",
    precision_macro: "Movimiento de cuarzo japonés",
    sustainability_label: "Diseñado para durar",
    material: "Acero",
    cut: "Classic",
    color: "Negro",
    image_url:
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Sleeck Watch",
    category: "Accesorios",
    price: 320000,
    description: "Una silueta delgada para acompañar cada momento.",
    material_macro: "Cristal mineral endurecido",
    precision_macro: "Perfil ultradelgado de 7 mm",
    sustainability_label: "Correa intercambiable",
    material: "Cristal",
    cut: "Slim",
    color: "Plata",
    image_url:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Camisa Watch",
    category: "Mujeres",
    price: 125000,
    description: "Proporciones precisas y textura suave para todos los días.",
    material_macro: "Popelina de algodón",
    precision_macro: "Cuello estructurado de precisión",
    sustainability_label: "Producción responsable",
    material: "Algodón",
    cut: "Relaxed",
    color: "Azul",
    image_url:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Oxford Studio",
    category: "Hombres",
    price: 110000,
    description: "Volumen relajado y tacto natural en una pieza esencial.",
    material_macro: "Oxford de bajo impacto",
    precision_macro: "Paneles cortados por láser",
    sustainability_label: "Fibra trazable",
    material: "Algodón",
    cut: "Relaxed",
    color: "Crudo",
    image_url:
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Studio Chrono",
    category: "Accesorios",
    price: 410000,
    description: "Una lectura clara del tiempo, reducida a lo esencial.",
    material_macro: "Titanio mate",
    precision_macro: "Cronógrafo de alta precisión",
    sustainability_label: "Componentes reemplazables",
    material: "Titanio",
    cut: "Classic",
    color: "Grafito",
    image_url:
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=900&q=85",
  },
];

export const FREE_SHIPPING_THRESHOLD = 500000;
export const WHATSAPP_NUMBER = "573001234567";
export const CART_STORAGE_KEY = "lumen-cart";
export const PREFERENCES_STORAGE_KEY = "lumen-store-preferences";

export const money = (value) =>
  `$${new Intl.NumberFormat("es-CO").format(value)} COP`;
