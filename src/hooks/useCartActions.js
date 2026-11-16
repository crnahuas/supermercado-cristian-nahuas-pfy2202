import { useState } from "react";
import { useInventory } from "../context/InventoryContext.jsx";

export default function useCartActions() {
  const { cartItems, cartCount, adjustCart, removeFromCart, clearCart } =
    useInventory();
  const [message, setMessage] = useState("");

  function adjustQuantity(article, delta) {
    adjustCart(article.id, delta);
    setMessage(
      delta < 0
        ? `Se devolvió una unidad de «${article.name}» al inventario.`
        : `Se agregó una unidad de «${article.name}» al carrito.`,
    );
  }

  function removeArticle(article) {
    removeFromCart(article.id);
    setMessage(
      `Se quitaron las unidades de «${article.name}» del carrito y volvieron al inventario.`,
    );
  }

  function emptyCart() {
    clearCart();
    setMessage(
      "Se vació el carrito. Todas las unidades volvieron al inventario.",
    );
  }

  return {
    cartItems,
    cartCount,
    message,
    adjustQuantity,
    removeArticle,
    emptyCart,
  };
}
