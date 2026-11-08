import { useState } from "react";
import { Link } from "react-router";
import { useInventory } from "../context/InventoryContext.jsx";
import { articlePath, pages } from "../config/navigation.js";
import InventoryShell from "../components/InventoryShell.jsx";
import QuantityControl from "../components/QuantityControl.jsx";
import Icon from "../components/Icon.jsx";

export default function Cart() {
  const { cartItems, cartCount, adjustCart, removeFromCart, clearCart } =
    useInventory();
  const [message, setMessage] = useState("");
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
              <li key={article.id} className="cart-line">
                <div className="min-w-0 flex-1 basis-full sm:basis-0">
                  <Link
                    to={articlePath(article.id)}
                    className="product-link text-lg"
                  >
                    {article.name}
                  </Link>
                  <p className="mt-1 text-sm text-muted">
                    {article.brand} · {article.type}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    {article.available === 0
                      ? "No quedan más unidades disponibles"
                      : `${article.available} ${article.available === 1 ? "unidad disponible" : "unidades disponibles"}`}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-5">
                  <QuantityControl
                    name={article.name}
                    quantity={article.quantity}
                    available={article.available}
                    onChange={(delta) => {
                      adjustCart(article.id, delta);
                      setMessage(
                        delta < 0
                          ? `Se devolvió una unidad de «${article.name}» al inventario.`
                          : `Se agregó una unidad de «${article.name}» al carrito.`,
                      );
                    }}
                  />
                  <button
                    type="button"
                    className="text-button min-h-11 text-danger"
                    aria-label={`Quitar ${article.name}`}
                    onClick={() => {
                      removeFromCart(article.id);
                      setMessage(
                        `Se quitaron las unidades de «${article.name}» del carrito y volvieron al inventario.`,
                      );
                    }}
                  >
                    Quitar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center justify-between gap-5 border-0 border-t border-solid border-line px-5 py-5 sm:px-7">
            <p className="font-semibold">
              Total: {cartCount} {cartCount === 1 ? "unidad" : "unidades"}
            </p>
            <button
              type="button"
              className="text-button min-h-11 text-danger"
              onClick={() => {
                clearCart();
                setMessage(
                  "Se vació el carrito. Todas las unidades volvieron al inventario.",
                );
              }}
            >
              Vaciar carrito
            </button>
          </div>
        </section>
      )}
      <p role="status" aria-atomic="true" className="mt-5 text-sm text-abasto">
        {message}
      </p>
    </InventoryShell>
  );
}
