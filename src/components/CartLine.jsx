import { Link } from "react-router";
import { articlePath } from "../config/navigation.js";
import QuantityControl from "./QuantityControl.jsx";

export default function CartLine({ article, onChange, onRemove }) {
  return (
    <li className="cart-line">
      <div className="min-w-0 flex-1 basis-full sm:basis-0">
        <Link to={articlePath(article.id)} className="product-link text-lg">
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
          onChange={onChange}
        />
        <button
          type="button"
          className="text-button min-h-11 text-danger"
          aria-label={`Quitar ${article.name}`}
          onClick={onRemove}
        >
          Quitar
        </button>
      </div>
    </li>
  );
}
