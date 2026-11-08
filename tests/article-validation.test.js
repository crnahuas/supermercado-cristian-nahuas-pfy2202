import { describe, expect, it } from "vitest";
import {
  parseArticle,
  validateArticle,
} from "../src/data/articleValidation.js";

const validArticle = {
  name: "Leche entera",
  brand: "Colun",
  type: "Lácteos",
  stock: 3,
};

describe("Reglas compartidas de artículos", () => {
  it.each([
    ["Café molido 250 g", "Nescafé", "Abarrotes"],
    ["Leche 3% (1,5 L)", "Colun", "Lácteos"],
    ["Mix frutos secos + pasas", "Cuisine & Co.", "Abarrotes"],
    ["Chocolate s/azúcar", "M&M's", "Abarrotes"],
    ["Bebida zero", "Coca-Cola", "Bebidas"],
    ["Té verde", "Twinings’", "Bebidas"],
    ["Esponja multiuso", "3M", "Limpieza"],
  ])("acepta nombres y marcas comerciales: %s / %s", (name, brand, type) => {
    expect(validateArticle({ name, brand, type, stock: 3 })).toEqual({});
  });

  it.each([
    ["name", "<script>alert(1)</script>"],
    ["name", "Arroz\nintegral"],
    ["name", "Arroz 🍚"],
    ["name", "---"],
    ["brand", "@@@"],
    ["brand", "Marca\tChile"],
    ["brand", "Marca/Chile"],
    ["brand", 123],
    ["type", "Lácteos123"],
    ["type", "Categoría desconocida"],
    ["type", "Carnes  y pescados"],
    ["type", "Lácteos\nOtros"],
  ])("rechaza el formato de %s: %s", (key, value) => {
    const result = parseArticle({ ...validArticle, [key]: value });
    expect(result.ok).toBe(false);
    expect(Object.keys(result.errors)).toEqual([key]);
  });

  it.each(["name", "brand"])("limita %s a 100 caracteres", (key) => {
    expect(
      validateArticle({ ...validArticle, [key]: "A".repeat(100) }),
    ).toEqual({});
    expect(
      validateArticle({ ...validArticle, [key]: "A".repeat(101) })[key],
    ).toContain("100");
  });

  it.each([null, undefined, {}, [], "artículo", 123])(
    "devuelve errores controlados para entradas incompletas: %s",
    (values) => {
      expect(parseArticle(values)).toEqual({
        ok: false,
        errors: {
          name: "Ingresa el nombre del artículo.",
          brand: "Ingresa la marca del artículo.",
          type: "Selecciona un tipo de producto.",
          stock: "Ingresa la cantidad inicial.",
        },
      });
    },
  );

  it("normaliza espacios exteriores y tildes Unicode sin modificar los datos de entrada", () => {
    const values = {
      name: "  Cafe\u0301 molido  ",
      brand: "  Nestlé  ",
      type: " Abarrotes ",
      stock: " 12 ",
    };
    expect(parseArticle(values)).toEqual({
      ok: true,
      article: {
        name: "Café molido",
        brand: "Nestlé",
        type: "Abarrotes",
        stock: 12,
      },
    });
    expect(values.name).toBe("  Cafe\u0301 molido  ");
  });
});

describe("Cantidades de inventario", () => {
  it.each([
    -1,
    0.5,
    1000000,
    NaN,
    Infinity,
    "",
    "1e2",
    "1.5",
    "-2",
    null,
    false,
  ])("rechaza cantidades inválidas: %s", (stock) => {
    const result = parseArticle({ ...validArticle, stock });
    expect(result.ok).toBe(false);
    expect(Object.keys(result.errors)).toEqual(["stock"]);
  });
  it.each([0, 1, 999999, "0", "0012"])(
    "acepta enteros y los guarda como números: %s",
    (stock) => {
      const result = parseArticle({ ...validArticle, stock });
      expect(result.ok).toBe(true);
      expect(result.article.stock).toBe(Number(stock));
    },
  );
});
