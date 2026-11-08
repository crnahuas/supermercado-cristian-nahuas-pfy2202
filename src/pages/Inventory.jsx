import { Link, useSearchParams } from "react-router";
import InventoryShell from "../components/InventoryShell.jsx";
import InventoryTable from "../components/InventoryTable.jsx";
import InventorySummary from "../components/InventorySummary.jsx";
import Icon from "../components/Icon.jsx";
import { useInventory } from "../context/InventoryContext.jsx";
import { productTypes } from "../data/productTypes.js";
import { pages } from "../config/navigation.js";

export default function Inventory() {
  const { articles } = useInventory();
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("categoria") ?? "";
  const selected = productTypes.includes(category) ? category : "";
  // El filtro es una vista derivada; nunca reemplaza el inventario original.
  const visibleArticles = selected
    ? articles.filter((article) => article.type === selected)
    : articles;
  function changeCategory(value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set("categoria", value);
    else next.delete("categoria");
    setSearchParams(next, { replace: true });
  }
  return (
    <InventoryShell
      title="Inventario"
      description="Encuentra tus productos, revisa las unidades disponibles y abre un artículo para agregarlo al carrito."
    >
      <InventorySummary />
      <section className="surface-card" aria-labelledby="article-list-title">
        <div className="flex flex-wrap items-center justify-between gap-5 px-5 py-6 sm:px-7">
          <h2 id="article-list-title" className="text-[23px] tracking-tight">
            Artículos
          </h2>
          <Link
            to={pages.newArticle.path}
            className="button-primary max-sm:w-full"
          >
            <Icon name="plus" size={18} />
            Ingresar artículo
          </Link>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4 border-0 border-t border-solid border-line px-5 py-5 sm:px-7">
          <div className="w-full sm:max-w-xs">
            <label htmlFor="category-filter" className="text-sm font-semibold">
              Filtrar por categoría
            </label>
            <select
              id="category-filter"
              className="form-field"
              value={selected}
              onChange={(event) => changeCategory(event.target.value)}
            >
              <option value="">Todas las categorías</option>
              {productTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <p role="status" className="pb-3 text-sm text-muted">
            Mostrando {visibleArticles.length} de {articles.length} artículos
          </p>
          {selected && (
            <button
              type="button"
              className="text-button mb-2"
              onClick={() => changeCategory("")}
            >
              Quitar filtro
            </button>
          )}
        </div>
        <InventoryTable
          articles={visibleArticles}
          filtered={Boolean(selected)}
        />
        {visibleArticles.length > 0 && (
          <p className="border-0 border-t border-solid border-line px-5 py-4 text-xs text-muted sm:px-7">
            Selecciona el nombre de un artículo para ver su detalle.
            <span className="sm:hidden">
              {" "}
              Desliza la tabla para ver todas las columnas.
            </span>
          </p>
        )}
      </section>
    </InventoryShell>
  );
}
