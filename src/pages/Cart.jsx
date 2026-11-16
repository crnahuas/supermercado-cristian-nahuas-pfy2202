import { Link } from "react-router";
import { pages } from "../config/navigation.js";
import InventoryShell from "../components/InventoryShell.jsx";
import CartLine from "../components/CartLine.jsx";
import CartSummary from "../components/CartSummary.jsx";
import useCartActions from "../hooks/useCartActions.js";
import Icon from "../components/Icon.jsx";

export default function Cart() {
  const { cartItems, cartCount, message, adjustQuantity, removeArticle, emptyCart } =
    useCartActions();
  return (
    <InventoryShell
      title="Carrito de compras"
      description="Ajusta tus cantidades. Al disminuir o quitar un producto, sus unidades vuelven al inventario disponible."
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-muted">
          {cartItems.length} {cartItems.length === 1 ? "producto" : "productos"}{" "}
          · {cartCount} {cartCount === 1 ? "unidad" : "unidades"}
        </p>
        <Link to={pages.inventory.path} className="text-button">
          ← Seguir agregando artículos
        </Link>
      </div>
      {cartItems.length === 0 ? (
        <section className="surface-card px-5 py-12 text-center">
          <span className="mb-4 block text-abasto">
            <Icon name="cart" size={36} />
          </span>
          <h2 className="text-2xl tracking-tight">Tu carrito está vacío</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Abre el detalle de un artículo del inventario para agregar tu primer
            producto.
          </p>
          <Link to={pages.inventory.path} className="button-primary mt-6">
            Explorar inventario
            <Icon name="arrow" size={18} />
          </Link>
        </section>
      ) : (
        <section className="surface-card" aria-labelledby="cart-list-title">
          <h2
            id="cart-list-title"
            className="border-0 border-b border-solid border-line px-5 py-6 text-2xl tracking-tight sm:px-7"
          >
            Tus productos
          </h2>
          <ul className="m-0 list-none p-0">
            {cartItems.map((article) => (
              <CartLine
                key={article.id}
                article={article}
                onChange={(delta) => adjustQuantity(article, delta)}
                onRemove={() => removeArticle(article)}
              />
            ))}
          </ul>
          <CartSummary count={cartCount} onClear={emptyCart} />
        </section>
      )}
      <p role="status" aria-atomic="true" className="mt-5 text-sm text-abasto">
        {message}
      </p>
    </InventoryShell>
  );
}
