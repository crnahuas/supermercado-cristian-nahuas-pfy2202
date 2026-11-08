import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { parseArticle } from "../data/articleValidation.js";
import {
  inventoryReducer,
  loadInventory,
  quantityInCart,
  INVENTORY_STORAGE_KEY,
} from "../data/inventoryState.js";

export { INVENTORY_STORAGE_KEY } from "../data/inventoryState.js";
const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
  const [state, dispatch] = useReducer(
    inventoryReducer,
    undefined,
    loadInventory,
  );
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    try {
      // Inventario y carrito se guardan juntos para recuperar una reserva coherente.
      localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(state));
      setStorageError(false);
    } catch {
      setStorageError(true);
    }
  }, [state]);

  const articles = state.articles.map((article) => {
    const inCart = quantityInCart(state, article.id);
    return { ...article, inCart, available: article.stock - inCart };
  });
  const cartItems = state.cart.map((item) => ({
    ...articles.find((article) => article.id === item.articleId),
    quantity: item.quantity,
  }));
  const cartCount = state.cart.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  function addArticle(values) {
    const result = parseArticle(values);
    if (!result.ok) return result;
    try {
      const article = { id: crypto.randomUUID(), ...result.article };
      dispatch({ type: "article/added", article });
      return { ok: true, article };
    } catch {
      return {
        ok: false,
        errors: {},
        message: "No se pudo registrar el artículo. Inténtalo nuevamente.",
      };
    }
  }

  return (
    <InventoryContext.Provider
      value={{
        articles,
        cartItems,
        cartCount,
        addArticle,
        storageError,
        adjustCart: (articleId, delta) =>
          dispatch({ type: "cart/adjusted", articleId, delta }),
        removeFromCart: (articleId) =>
          dispatch({ type: "cart/removed", articleId }),
        clearCart: () => dispatch({ type: "cart/cleared" }),
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(InventoryContext);
  if (!context) throw new Error("useInventory requiere InventoryProvider.");
  return context;
}
