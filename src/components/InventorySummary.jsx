import { useInventory } from "../context/InventoryContext.jsx";

export default function InventorySummary() {
  const { articles, cartCount } = useInventory();
  const available = articles.reduce(
    (sum, article) => sum + article.available,
    0,
  );
  const entries = [
    [
      articles.length,
      articles.length === 1 ? "artículo registrado" : "artículos registrados",
    ],
    [available, available === 1 ? "unidad disponible" : "unidades disponibles"],
    [
      cartCount,
      cartCount === 1 ? "unidad en el carrito" : "unidades en el carrito",
    ],
  ];
  return (
    <div
      className="mb-7 grid gap-3 sm:grid-cols-3"
      aria-label="Resumen de inventario"
    >
      {entries.map(([value, label]) => (
        <p key={label} className="surface-card px-5 py-4 text-sm text-muted">
          <strong className="mr-2 text-2xl font-semibold tabular-nums text-ink">
            {value}
          </strong>
          {label}
        </p>
      ))}
    </div>
  );
}
