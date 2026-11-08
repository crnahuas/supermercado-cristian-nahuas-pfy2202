import ArticleForm from "../components/ArticleForm.jsx";
import InventoryShell from "../components/InventoryShell.jsx";

export default function NewArticle() {
  return (
    <InventoryShell
      title="Ingresar artículo"
      description="Completa los datos del producto para agregarlo al inventario."
    >
      <div className="max-w-[780px]">
        <ArticleForm />
      </div>
    </InventoryShell>
  );
}
