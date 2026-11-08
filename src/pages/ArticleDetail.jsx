import { useState } from "react";
import { Link, useParams } from "react-router";
import { useInventory } from "../context/InventoryContext.jsx";
import { pages } from "../config/navigation.js";
import InventoryShell from "../components/InventoryShell.jsx";
import StockBadge from "../components/StockBadge.jsx";
import Icon from "../components/Icon.jsx";

export default function ArticleDetail() {
  const { articleId } = useParams();
  const { articles, adjustCart } = useInventory();
  const article = articles.find((item) => item.id === articleId);
  const [addedId, setAddedId] = useState(null);
  if (!article)
    return (
      <InventoryShell
        title="Artículo no encontrado"
        description="Este artículo no está disponible en el inventario de este navegador."
      >
        <Link to={pages.inventory.path} className="button-primary">
          Volver al inventario
        </Link>
      </InventoryShell>
    );
  return (
    <InventoryShell
      title={article.name}
      description="Revisa los datos del producto y agrega las unidades que necesitas."
    >
      <Link to={pages.inventory.path} className="text-button mb-6 inline-flex">
        ← Volver al inventario
      </Link>
      <section
        className="surface-card max-w-[800px] p-5 sm:p-8"
        aria-labelledby="detail-title"
      >
        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
          <h2 id="detail-title" className="text-2xl tracking-tight">
            Detalle del artículo
          </h2>
          <StockBadge quantity={article.available} />
        </div>
        <dl className="detail-grid">
          <div>
            <dt>Nombre</dt>
            <dd>{article.name}</dd>
          </div>
          <div>
            <dt>Marca</dt>
            <dd>{article.brand}</dd>
          </div>
          <div>
            <dt>Tipo de producto</dt>
            <dd>{article.type}</dd>
          </div>
          <div>
            <dt>Unidades registradas</dt>
            <dd>{article.stock}</dd>
          </div>
          <div>
            <dt>Unidades disponibles</dt>
            <dd>{article.available}</dd>
          </div>
          <div>
            <dt>Unidades en el carrito</dt>
            <dd>{article.inCart}</dd>
          </div>
        </dl>
        <div className="mt-7 border-0 border-t border-solid border-line pt-6">
          <p className="mb-5 text-sm leading-relaxed text-muted">
            Cada vez que agregas una unidad al carrito, se descuenta del
            inventario disponible. Puedes ajustar la cantidad desde el carrito.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <button
              type="button"
              className="button-primary max-sm:w-full"
              disabled={article.available === 0}
              onClick={() => {
                adjustCart(article.id, 1);
                setAddedId(article.id);
              }}
            >
              <Icon name="cart" size={19} />
              {article.available === 0
                ? "Sin unidades disponibles"
                : "Agregar al carrito"}
            </button>
            <Link to={pages.cart.path} className="text-button">
              Ver carrito →
            </Link>
          </div>
          {addedId === article.id && (
            <p role="status" className="mt-5 text-sm text-abasto">
              Agregaste «{article.name}» al carrito. Ahora tienes{" "}
              {article.inCart} {article.inCart === 1 ? "unidad" : "unidades"}.
            </p>
          )}
        </div>
      </section>
    </InventoryShell>
  );
}
