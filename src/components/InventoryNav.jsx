import { inventoryNavigationItems, pages } from "../config/navigation.js";
import Container from "./Container.jsx";
import PageNavLink from "./PageNavLink.jsx";
import { useInventory } from "../context/InventoryContext.jsx";
import Icon from "./Icon.jsx";

export default function InventoryNav() {
  const { articles, cartCount } = useInventory();
  return (
    <div className="border-0 border-b border-solid border-line bg-abasto">
      <Container>
        <nav
          aria-label="Gestión de inventario"
          className="flex flex-wrap items-center gap-x-5 gap-y-1 py-3"
        >
          {inventoryNavigationItems.map(({ path, label }) => {
            const count =
              path === pages.inventory.path
                ? articles.length
                : path === pages.cart.path
                  ? cartCount
                  : null;
            return (
              <PageNavLink
                key={path}
                to={path}
                aria-label={count === null ? label : `${label} (${count})`}
                className={({ isActive }) =>
                  `inline-flex min-h-11 items-center gap-1.5 border-0 border-b-2 border-solid py-2 text-sm font-semibold focus-visible:outline-sage focus-visible:outline-offset-4 sm:text-[15px] ${isActive ? "border-lime text-lime" : "border-transparent text-sage hover:text-lime"}`
                }
              >
                {path === pages.cart.path && <Icon name="cart" size={18} />}
                {label}
                {count !== null && (
                  <span className="tabular-nums"> ({count})</span>
                )}
              </PageNavLink>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
