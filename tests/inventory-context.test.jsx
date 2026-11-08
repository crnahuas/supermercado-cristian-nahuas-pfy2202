import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import {
  InventoryProvider,
  useInventory,
} from "../src/context/InventoryContext.jsx";
import {
  availableStock,
  emptyInventory,
  inventoryReducer,
  INVENTORY_STORAGE_KEY,
  LEGACY_STORAGE_KEY,
  restoreInventory,
} from "../src/data/inventoryState.js";

const article = {
  id: "milk",
  name: "Leche entera",
  brand: "Colun",
  type: "Lácteos",
  stock: 3,
};
const initial = () => ({ articles: [{ ...article }], cart: [] });
function reserve(state, delta, articleId = "milk") {
  return inventoryReducer(state, { type: "cart/adjusted", articleId, delta });
}

describe("Consistencia del stock", () => {
  it("rechaza cantidades imposibles, stock negativo e identificadores inexistentes", () => {
    const state = initial();
    for (const delta of [4, -1, 1.5, NaN, Infinity, "1", null])
      expect(reserve(state, delta)).toBe(state);
    expect(reserve(state, 1, "missing")).toBe(state);
    expect(availableStock(state, "milk")).toBe(3);
  });
  it("mantiene la conservación de unidades al reservar, devolver y vaciar sin mutar entradas", () => {
    const state = initial();
    Object.freeze(state.articles[0]);
    Object.freeze(state.articles);
    Object.freeze(state.cart);
    Object.freeze(state);
    let next = reserve(state, 2);
    expect(availableStock(next, "milk")).toBe(1);
    next = reserve(next, 1);
    expect(availableStock(next, "milk")).toBe(0);
    expect(reserve(next, 1)).toBe(next);
    next = reserve(next, -2);
    expect(availableStock(next, "milk")).toBe(2);
    next = inventoryReducer(next, { type: "cart/cleared" });
    expect(availableStock(next, "milk")).toBe(3);
    expect(state).toEqual(initial());
  });
  it("procesa varias acciones en un mismo evento con el estado más reciente y sin sobreventa", () => {
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(initial()));
    const { result } = renderHook(useInventory, { wrapper: InventoryProvider });
    act(() => {
      for (let n = 0; n < 10; n++) result.current.adjustCart("milk", 1);
    });
    expect(result.current.cartCount).toBe(3);
    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.articles[0].available).toBe(0);
    act(() => {
      for (let n = 0; n < 10; n++) result.current.adjustCart("milk", -1);
    });
    expect(result.current.cartCount).toBe(0);
    expect(result.current.articles[0].available).toBe(3);
  });
  it("elimina o vacía reservas sin alterar otras existencias ni duplicar devoluciones", () => {
    const base = {
      articles: [article, { ...article, id: "other", stock: 5 }],
      cart: [],
    };
    let state = reserve(reserve(base, 2), 3, "other");
    state = inventoryReducer(state, {
      type: "cart/removed",
      articleId: "milk",
    });
    state = inventoryReducer(state, {
      type: "cart/removed",
      articleId: "milk",
    });
    expect(availableStock(state, "milk")).toBe(3);
    expect(availableStock(state, "other")).toBe(2);
    state = inventoryReducer(state, { type: "cart/cleared" });
    state = inventoryReducer(state, { type: "cart/cleared" });
    expect(availableStock(state, "other")).toBe(5);
  });
  it("rechaza artículos inválidos en el límite del contexto", () => {
    const { result } = renderHook(useInventory, { wrapper: InventoryProvider });
    let response;
    act(() => {
      response = result.current.addArticle({ ...article, stock: -1 });
    });
    expect(response.ok).toBe(false);
    expect(result.current.articles).toEqual([]);
  });
});

describe("Recuperación y migración", () => {
  it("recupera inventario y reservas juntos tras recargar", () => {
    localStorage.setItem(
      INVENTORY_STORAGE_KEY,
      JSON.stringify(reserve(initial(), 2)),
    );
    const { result, unmount } = renderHook(useInventory, {
      wrapper: InventoryProvider,
    });
    expect(result.current.articles[0].available).toBe(1);
    expect(result.current.cartCount).toBe(2);
    unmount();
    const restored = renderHook(useInventory, { wrapper: InventoryProvider });
    expect(restored.result.current.articles[0].available).toBe(1);
    act(() => restored.result.current.clearCart());
    expect(restored.result.current.articles[0].available).toBe(3);
  });
  it("descarta registros inválidos y duplicados, reservas huérfanas o mayores al stock", () => {
    const data = {
      articles: [article, article, null, { ...article, id: "bad", stock: -1 }],
      cart: [
        null,
        { articleId: "missing", quantity: 1 },
        { articleId: "milk", quantity: 4 },
        { articleId: "milk", quantity: -1 },
        { articleId: "milk", quantity: 0.5 },
        { articleId: "milk", quantity: 2 },
        { articleId: "milk", quantity: 1 },
      ],
    };
    expect(restoreInventory(data)).toEqual({
      articles: [article],
      cart: [{ articleId: "milk", quantity: 2 }],
    });
  });
  it("migra los registros anteriores como una unidad sin modificar su almacenamiento", () => {
    const legacy = JSON.stringify([
      { id: "old", name: "Arroz", brand: "Tucapel", type: "Abarrotes" },
    ]);
    localStorage.setItem(LEGACY_STORAGE_KEY, legacy);
    const { result } = renderHook(useInventory, { wrapper: InventoryProvider });
    expect(result.current.articles[0]).toMatchObject({
      id: "old",
      stock: 1,
      available: 1,
    });
    expect(localStorage.getItem(LEGACY_STORAGE_KEY)).toBe(legacy);
    expect(
      JSON.parse(localStorage.getItem(INVENTORY_STORAGE_KEY)).articles,
    ).toHaveLength(1);
  });
  it.each([
    "{dañado",
    "null",
    "[]",
    '{"articles":null,"cart":[]}',
    '{"articles":[],"cart":null}',
  ])("inicia con seguridad ante datos dañados: %s", (saved) => {
    localStorage.setItem(INVENTORY_STORAGE_KEY, saved);
    const { result } = renderHook(useInventory, { wrapper: InventoryProvider });
    expect(result.current.articles).toEqual([]);
    expect(result.current.cartItems).toEqual([]);
  });
  it("no vuelve a migrar datos anteriores si ya existe un inventario nuevo vacío", () => {
    localStorage.setItem(LEGACY_STORAGE_KEY, JSON.stringify([article]));
    localStorage.setItem(
      INVENTORY_STORAGE_KEY,
      JSON.stringify(emptyInventory()),
    );
    const { result } = renderHook(useInventory, { wrapper: InventoryProvider });
    expect(result.current.articles).toEqual([]);
  });
  it("mantiene operativa la aplicación si la lectura del navegador falla", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("Bloqueado");
    });
    const { result } = renderHook(useInventory, { wrapper: InventoryProvider });
    expect(result.current.articles).toEqual([]);
  });
});
