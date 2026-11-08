import { Link } from "react-router";
import Icon from "./Icon.jsx";
import { articlePath, pages } from "../config/navigation.js";
import StockBadge from "./StockBadge.jsx";

export default function InventoryTable({ articles, filtered = false }) {
  return (
    <div
      className="overflow-x-auto focus-visible:outline-2 focus-visible:-outline-offset-3 focus-visible:outline-abasto"
      role="region"
      aria-label="Tabla de inventario"
      tabIndex={0}
    >
      <table className={`data-table ${articles.length ? "min-w-[820px]" : ""}`}>
        <caption className="sr-only">
          Artículos del inventario de Abasto y sus unidades disponibles
        </caption>
        <thead>
          <tr>
            <th scope="col" className="w-[25%]">
              Nombre
            </th>
            <th scope="col">Marca</th>
            <th scope="col">Tipo de producto</th>
            <th scope="col">Disponibles</th>
            <th scope="col">En carrito</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id}>
              <th scope="row">
                <Link to={articlePath(article.id)} className="product-link">
                  {article.name}
                </Link>
              </th>
              <td>{article.brand}</td>
              <td>{article.type}</td>
              <td>
                <StockBadge quantity={article.available} />
              </td>
              <td className="tabular-nums">{article.inCart}</td>
            </tr>
          ))}
          {articles.length === 0 && (
            <tr>
              <td colSpan={5}>
                <div className="px-2 py-8 text-center">
                  <span className="mb-3 block text-muted">
                    <Icon name="box" size={28} />
                  </span>
                  <h3 className="text-[23px] text-ink">
                    {filtered
                      ? "Sin artículos en esta categoría"
                      : "Aún no hay artículos"}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[480px] text-base leading-relaxed">
                    {filtered
                      ? "Prueba otra categoría o selecciona todas para volver al listado completo."
                      : "Agrega un producto con su nombre, marca, categoría y cantidad inicial."}
                  </p>
                  {!filtered && (
                    <Link
                      to={pages.newArticle.path}
                      className="button-primary mt-5"
                    >
                      <Icon name="plus" size={18} />
                      Agregar primer artículo
                    </Link>
                  )}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
