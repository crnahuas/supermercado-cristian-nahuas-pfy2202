export default function StockBadge({ quantity }) {
  return (
    <span
      className={`stock-badge ${quantity === 0 ? "bg-danger-surface text-danger" : "bg-sage text-abasto"}`}
    >
      {quantity === 0
        ? "Agotado · 0"
        : `${quantity} ${quantity === 1 ? "unidad" : "unidades"}`}
    </span>
  );
}
