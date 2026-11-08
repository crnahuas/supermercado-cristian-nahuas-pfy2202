import { Suspense } from "react";
import { Outlet } from "react-router";
import InventoryNav from "../components/InventoryNav.jsx";

export default function InventoryLayout() {
  return (
    <>
      <InventoryNav />
      <Suspense
        fallback={
          <p role="status" className="p-8 text-center text-muted">
            Cargando página…
          </p>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
}
