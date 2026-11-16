import Icon from "./Icon.jsx";

export default function CartSummary({ count, onClear }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-5 border-0 border-t border-solid border-line px-5 py-5 sm:px-7">
      <p className="font-semibold">
        Total: {count} {count === 1 ? "unidad" : "unidades"}
      </p>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:items-end">
        <div className="flex flex-wrap items-center gap-5">
          <button
            type="button"
            className="text-button min-h-11 text-danger"
            onClick={onClear}
          >
            Vaciar carrito
          </button>
          <button
            type="button"
            className="button-primary max-sm:w-full"
            disabled
            aria-describedby="checkout-unavailable"
          >
            <Icon name="cart" size={18} />
            Comprar
          </button>
        </div>
        <p id="checkout-unavailable" className="text-sm text-muted">
          La compra en línea aún no está disponible.
        </p>
      </div>
    </div>
  );
}
