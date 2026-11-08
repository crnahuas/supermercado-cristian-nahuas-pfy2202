import AppRoutes from "./routes/AppRoutes.jsx";
import { InventoryProvider } from "./context/InventoryContext.jsx";

export default function App() {
  return (
    <InventoryProvider>
      <AppRoutes />
    </InventoryProvider>
  );
}
