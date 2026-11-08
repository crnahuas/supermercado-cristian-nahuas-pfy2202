export default function QuantityControl({
  name,
  quantity,
  available,
  onChange,
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded border border-solid border-line bg-surface p-1">
      <button
        type="button"
        className="quantity-button"
        aria-label={`Disminuir cantidad de ${name}`}
        onClick={() => onChange(-1)}
      >
        −
      </button>
      <span
        className="min-w-10 text-center font-semibold tabular-nums"
        aria-label={`Cantidad de ${name}`}
      >
        {quantity}
      </span>
      <button
        type="button"
        className="quantity-button"
        aria-label={`Aumentar cantidad de ${name}`}
        disabled={available === 0}
        onClick={() => onChange(1)}
      >
        +
      </button>
    </div>
  );
}
