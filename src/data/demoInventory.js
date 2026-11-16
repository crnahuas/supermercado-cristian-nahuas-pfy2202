// Identificadores estables para compartir enlaces a los ejemplos.
// Cada inicio recibe copias nuevas y un carrito sin reservas.
export function createDemoInventory() {
  return {
    articles: [
      {
        id: "demo-leche",
        name: "Leche entera 1 L",
        brand: "Colun",
        type: "Lácteos",
        stock: 12,
      },
      {
        id: "demo-arroz",
        name: "Arroz grano largo 1 kg",
        brand: "Tucapel",
        type: "Abarrotes",
        stock: 8,
      },
      {
        id: "demo-jugo",
        name: "Jugo de naranja 1 L",
        brand: "Watts",
        type: "Bebidas",
        stock: 1,
      },
      {
        id: "demo-pollo",
        name: "Pechuga de pollo 1 kg",
        brand: "Super Pollo",
        type: "Carnes y pescados",
        stock: 6,
      },
      {
        id: "demo-manzanas",
        name: "Manzanas rojas 1 kg",
        brand: "Abasto",
        type: "Frutas y verduras",
        stock: 10,
      },
      {
        id: "demo-pan",
        name: "Pan integral",
        brand: "Ideal",
        type: "Panadería",
        stock: 0,
      },
      {
        id: "demo-detergente",
        name: "Detergente líquido 3 L",
        brand: "Omo",
        type: "Limpieza",
        stock: 4,
      },
      {
        id: "demo-jabon",
        name: "Jabón de avena 90 g",
        brand: "Dove",
        type: "Cuidado personal",
        stock: 5,
      },
    ],
    cart: [],
  };
}
