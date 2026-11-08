import { parseArticle } from "./articleValidation.js";

export const INVENTORY_STORAGE_KEY = "abasto.inventory.v2";
export const LEGACY_STORAGE_KEY = "abasto.inventory.v1";
export const emptyInventory = () => ({ articles: [], cart: [] });

export function quantityInCart(state, id) {
  return state.cart.find((item) => item.articleId === id)?.quantity ?? 0;
}

export function availableStock(state, id) {
  const article = state.articles.find((item) => item.id === id);
  return article ? article.stock - quantityInCart(state, id) : 0;
}

// Cada reserva tiene una sola transición. El stock disponible se deriva,
// evitando mantener dos contadores que puedan desincronizarse.
export function inventoryReducer(state, action) {
  switch (action.type) {
    case "article/added": {
      const parsed = parseArticle(action.article);
      const id = action.article?.id;
      if (
        !parsed.ok ||
        typeof id !== "string" ||
        !id.trim() ||
        state.articles.some((article) => article.id === id)
      )
        return state;
      return {
        ...state,
        articles: [...state.articles, { id, ...parsed.article }],
      };
    }
    case "cart/adjusted": {
      const { articleId, delta } = action;
      const article = state.articles.find((item) => item.id === articleId);
      if (!article || !Number.isSafeInteger(delta) || delta === 0) return state;
      const quantity = quantityInCart(state, articleId) + delta;
      if (quantity < 0 || quantity > article.stock) return state;
      const remaining = state.cart.filter(
        (item) => item.articleId !== articleId,
      );
      const cart =
        quantity === 0
          ? remaining
          : state.cart.some((item) => item.articleId === articleId)
            ? state.cart.map((item) =>
                item.articleId === articleId ? { ...item, quantity } : item,
              )
            : [...state.cart, { articleId, quantity }];
      return { ...state, cart };
    }
    case "cart/removed":
      return {
        ...state,
        cart: state.cart.filter((item) => item.articleId !== action.articleId),
      };
    case "cart/cleared":
      return { ...state, cart: [] };
    default:
      return state;
  }
}

export function restoreInventory(saved, { legacy = false } = {}) {
  if (
    (!legacy &&
      (!saved ||
        !Array.isArray(saved.articles) ||
        !Array.isArray(saved.cart))) ||
    (legacy && !Array.isArray(saved))
  )
    return emptyInventory();
  const seen = new Set();
  const articles = (legacy ? saved : saved.articles).flatMap((record) => {
    if (
      typeof record?.id !== "string" ||
      !record.id.trim() ||
      seen.has(record.id)
    )
      return [];
    // La versión anterior no registraba cantidades: cada registro migra como una unidad.
    const parsed = parseArticle(legacy ? { ...record, stock: 1 } : record);
    if (!parsed.ok) return [];
    seen.add(record.id);
    return [{ id: record.id, ...parsed.article }];
  });
  const cart = [];
  if (!legacy) {
    for (const item of saved.cart) {
      const article = articles.find((record) => record.id === item?.articleId);
      if (
        !article ||
        !Number.isSafeInteger(item.quantity) ||
        item.quantity <= 0 ||
        item.quantity > article.stock ||
        cart.some((line) => line.articleId === item.articleId)
      )
        continue;
      cart.push({ articleId: item.articleId, quantity: item.quantity });
    }
  }
  return { articles, cart };
}

export function loadInventory() {
  try {
    const saved = localStorage.getItem(INVENTORY_STORAGE_KEY);
    if (saved !== null) return restoreInventory(JSON.parse(saved));
    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    return legacy === null
      ? emptyInventory()
      : restoreInventory(JSON.parse(legacy), { legacy: true });
  } catch {
    return emptyInventory();
  }
}
