import Container from "./Container.jsx";
import { useInventory } from "../context/InventoryContext.jsx";

export default function InventoryShell({ title, description, children }) {
  const { storageError } = useInventory();
  return (
    <section
      className="bg-paper pt-8 pb-10 sm:pt-12.5 sm:pb-15"
      aria-labelledby="inventory-title"
    >
      <Container>
        <header>
          <h1
            id="inventory-title"
            className="wrap-anywhere text-[clamp(36px,4.4vw,52px)] leading-[1.13] tracking-[-0.045em]"
          >
            {title}
          </h1>
          <p className="mt-3.5 max-w-[620px] text-base leading-[1.9] text-muted sm:mt-4 sm:text-[15px]">
            {description}
          </p>
        </header>
        {storageError && (
          <p
            role="alert"
            className="mt-6 rounded border border-solid border-danger-line bg-danger-surface px-5 py-4 text-[15px] leading-[1.8] text-danger"
          >
            No se pudo guardar en este navegador. Tu inventario y carrito
            seguirán disponibles mientras mantengas abierta la aplicación, pero
            podrían perderse al recargar.
          </p>
        )}
        <div className="mt-8 sm:mt-10">{children}</div>
      </Container>
    </section>
  );
}
