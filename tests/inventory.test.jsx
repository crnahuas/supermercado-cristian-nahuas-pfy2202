import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../src/App.jsx";
import { INVENTORY_STORAGE_KEY } from "../src/context/InventoryContext.jsx";

function openPage(path = "/inventario") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}
function fillArticle(
  name = "Leche entera",
  brand = "Colun",
  type = "Lácteos",
  stock = "3",
) {
  for (const [label, value] of [
    ["Nombre del artículo", name],
    ["Marca", brand],
    ["Tipo de producto", type],
    ["Cantidad inicial", stock],
  ]) {
    fireEvent.change(screen.getByLabelText(label), { target: { value } });
  }
  fireEvent.click(screen.getByRole("button", { name: "Guardar artículo" }));
}
function seed() {
  localStorage.setItem(
    INVENTORY_STORAGE_KEY,
    JSON.stringify({
      articles: [
        {
          id: "leche",
          name: "Leche entera",
          brand: "Colun",
          type: "Lácteos",
          stock: 3,
        },
        {
          id: "arroz",
          name: "Arroz integral",
          brand: "Tucapel",
          type: "Abarrotes",
          stock: 5,
        },
        {
          id: "pan",
          name: "Pan integral",
          brand: "Ideal",
          type: "Panadería",
          stock: 0,
        },
      ],
      cart: [],
    }),
  );
}
const nav = () =>
  within(screen.getByRole("navigation", { name: "Gestión de inventario" }));
const table = () => within(screen.getByRole("table"));

describe("Inventario y carrito", () => {
  it("muestra el estado vacío y permite registrar artículos consecutivos con cantidades", () => {
    const view = openPage();
    expect(screen.getByText("Aún no hay artículos")).toBeTruthy();
    fireEvent.click(nav().getByRole("link", { name: "Ingresar artículo" }));
    fillArticle();
    expect(screen.getByRole("status").textContent).toContain("Leche entera");
    expect(screen.getByLabelText("Cantidad inicial").value).toBe("");
    expect(document.activeElement).toBe(
      screen.getByLabelText("Nombre del artículo"),
    );
    fillArticle("Arroz integral", "Tucapel", "Abarrotes", "5");
    fireEvent.click(screen.getByRole("link", { name: "Ver inventario →" }));
    expect(table().getAllByRole("row")).toHaveLength(3);
    expect(table().getByText("3 unidades")).toBeTruthy();
    expect(table().getByText("5 unidades")).toBeTruthy();
    expect(document.title).toBe("Inventario · Abasto");
    view.unmount();
    openPage();
    expect(table().getAllByRole("row")).toHaveLength(3);
  });

  it("valida campos obligatorios y cantidades, conserva valores y enfoca el primer error", () => {
    openPage("/inventario/nuevo");
    fireEvent.click(screen.getByRole("button", { name: "Guardar artículo" }));
    expect(screen.getAllByRole("alert")).toHaveLength(4);
    expect(document.activeElement).toBe(
      screen.getByLabelText("Nombre del artículo"),
    );
    fillArticle("<Leche>", "Colun", "Lácteos", "-1");
    expect(screen.getAllByRole("alert")).toHaveLength(2);
    expect(screen.getByLabelText("Nombre del artículo").value).toBe("<Leche>");
    expect(
      JSON.parse(localStorage.getItem(INVENTORY_STORAGE_KEY)).articles,
    ).toEqual([]);
    fillArticle("Leche", "Colun", "Lácteos", "0");
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.getByRole("status").textContent).toContain("Leche");
  });

  it("permite ver el inventario después de guardar sin validar el formulario recién vaciado", () => {
    openPage("/inventario/nuevo");
    fillArticle();
    const name = screen.getByLabelText("Nombre del artículo");
    const inventoryLink = screen.getByRole("link", {
      name: "Ver inventario →",
    });

    fireEvent.blur(name, { relatedTarget: inventoryLink });
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.getByRole("status").textContent).toContain("Leche entera");
    fireEvent.click(inventoryLink);
    expect(table().getByText("Leche entera")).toBeTruthy();
  });

  it("valida al salir de un campo editado aunque se haya guardado un artículo antes", () => {
    openPage("/inventario/nuevo");
    fillArticle();
    const name = screen.getByLabelText("Nombre del artículo");
    fireEvent.change(name, { target: { value: "Arroz" } });
    fireEvent.change(name, { target: { value: "" } });
    fireEvent.blur(name);
    expect(screen.getByRole("alert").textContent).toBe(
      "Ingresa el nombre del artículo.",
    );
  });

  it("filtra dinámicamente, conserva el inventario completo y abre el detalle del producto", async () => {
    seed();
    openPage();
    fireEvent.change(screen.getByLabelText("Filtrar por categoría"), {
      target: { value: "Lácteos" },
    });
    expect(table().getAllByRole("row")).toHaveLength(2);
    expect(table().queryByText("Arroz integral")).toBe(null);
    expect(screen.getByRole("status").textContent).toBe(
      "Mostrando 1 de 3 artículos",
    );
    expect(
      JSON.parse(localStorage.getItem(INVENTORY_STORAGE_KEY)).articles,
    ).toHaveLength(3);
    fireEvent.change(screen.getByLabelText("Filtrar por categoría"), {
      target: { value: "Bebidas" },
    });
    expect(screen.getByText("Sin artículos en esta categoría")).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Quitar filtro" }));
    expect(table().getAllByRole("row")).toHaveLength(4);
    fireEvent.click(table().getByRole("link", { name: "Leche entera" }));
    expect(
      await screen.findByRole("heading", { name: "Detalle del artículo" }),
    ).toBeTruthy();
    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Leche entera",
    );
    expect(document.title).toBe("Detalle del artículo · Abasto");
  });

  it("descuenta stock, acumula un producto sin duplicarlo y devuelve unidades al disminuir, quitar y vaciar", async () => {
    seed();
    const view = openPage("/inventario/articulos/leche");
    const add = await screen.findByRole("button", {
      name: "Agregar al carrito",
    });
    fireEvent.click(add);
    fireEvent.click(add);
    expect(screen.getByText("1 unidad")).toBeTruthy();
    fireEvent.click(screen.getByRole("link", { name: "Ver carrito →" }));
    expect(
      await screen.findByRole("heading", { name: "Carrito de compras" }),
    ).toBeTruthy();
    expect(screen.getByLabelText("Cantidad de Leche entera").textContent).toBe(
      "2",
    );
    expect(screen.getAllByRole("listitem")).toHaveLength(1);
    fireEvent.click(
      screen.getByRole("button", { name: "Aumentar cantidad de Leche entera" }),
    );
    expect(
      screen.getByRole("button", { name: "Aumentar cantidad de Leche entera" })
        .disabled,
    ).toBe(true);
    expect(screen.getByText("No quedan más unidades disponibles")).toBeTruthy();
    fireEvent.click(
      screen.getByRole("button", {
        name: "Disminuir cantidad de Leche entera",
      }),
    );
    expect(
      screen.getByRole("button", { name: "Aumentar cantidad de Leche entera" })
        .disabled,
    ).toBe(false);
    view.unmount();
    const restored = openPage("/inventario/carrito");
    await screen.findByRole("heading", { name: "Carrito de compras" });
    expect(screen.getByLabelText("Cantidad de Leche entera").textContent).toBe(
      "2",
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Quitar Leche entera" }),
    );
    expect(screen.getByText("Tu carrito está vacío")).toBeTruthy();
    fireEvent.click(nav().getByRole("link", { name: "Inventario (3)" }));
    expect(table().getByText("3 unidades")).toBeTruthy();
    fireEvent.click(table().getByRole("link", { name: "Arroz integral" }));
    fireEvent.click(
      await screen.findByRole("button", { name: "Agregar al carrito" }),
    );
    fireEvent.click(screen.getByRole("link", { name: "Ver carrito →" }));
    await screen.findByRole("heading", { name: "Carrito de compras" });
    fireEvent.click(screen.getByRole("button", { name: "Vaciar carrito" }));
    expect(screen.getByText("Tu carrito está vacío")).toBeTruthy();
    expect(
      JSON.parse(localStorage.getItem(INVENTORY_STORAGE_KEY)).cart,
    ).toEqual([]);
    restored.unmount();
  });

  it("elimina la línea al disminuir su última unidad y restituye su disponibilidad", async () => {
    seed();
    openPage("/inventario/articulos/leche");
    fireEvent.click(
      await screen.findByRole("button", { name: "Agregar al carrito" }),
    );
    fireEvent.click(screen.getByRole("link", { name: "Ver carrito →" }));
    await screen.findByRole("heading", { name: "Carrito de compras" });
    fireEvent.click(
      screen.getByRole("button", {
        name: "Disminuir cantidad de Leche entera",
      }),
    );
    expect(screen.getByText("Tu carrito está vacío")).toBeTruthy();
    fireEvent.click(nav().getByRole("link", { name: "Inventario (3)" }));
    expect(table().getByText("3 unidades")).toBeTruthy();
  });

  it("deshabilita la compra de artículos agotados y maneja identificadores inexistentes", async () => {
    seed();
    const view = openPage("/inventario/articulos/pan");
    expect(
      (await screen.findByRole("button", { name: "Sin unidades disponibles" }))
        .disabled,
    ).toBe(true);
    view.unmount();
    openPage("/inventario/articulos/inexistente");
    expect(
      await screen.findByRole("heading", { name: "Artículo no encontrado" }),
    ).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Agregar al carrito" })).toBe(
      null,
    );
  });

  it("permite abrir el filtro mediante URL sin cambiar los datos guardados", () => {
    seed();
    openPage("/inventario?categoria=L%C3%A1cteos");
    expect(screen.getByLabelText("Filtrar por categoría").value).toBe(
      "Lácteos",
    );
    expect(table().getAllByRole("row")).toHaveLength(2);
  });

  it.each([
    ["/inventario/", "Inventario (0)"],
    ["/inventario/nuevo/", "Ingresar artículo"],
  ])("marca correctamente la navegación de %s", (path, link) => {
    openPage(path);
    expect(
      nav().getByRole("link", { name: link }).getAttribute("aria-current"),
    ).toBe("page");
  });
  it("mantiene una página 404 para rutas de gestión desconocidas", () => {
    openPage("/inventario/desconocida");
    expect(
      screen.getByRole("heading", { name: "Por aquí no era." }),
    ).toBeTruthy();
    for (const link of nav().getAllByRole("link"))
      expect(link.getAttribute("aria-current")).toBe(null);
  });
  it("informa fallos de almacenamiento y mantiene inventario y carrito en memoria", async () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Cuota agotada");
    });
    openPage("/inventario/nuevo");
    expect(screen.getByRole("alert").textContent).toContain(
      "No se pudo guardar",
    );
    fillArticle();
    fireEvent.click(screen.getByRole("link", { name: "Ver inventario →" }));
    fireEvent.click(table().getByRole("link", { name: "Leche entera" }));
    fireEvent.click(
      await screen.findByRole("button", { name: "Agregar al carrito" }),
    );
    fireEvent.click(screen.getByRole("link", { name: "Ver carrito →" }));
    await screen.findByRole("heading", { name: "Carrito de compras" });
    expect(screen.getByLabelText("Cantidad de Leche entera").textContent).toBe(
      "1",
    );
  });
  it("conserva el formulario y permite reintentar un fallo de registro", () => {
    const uuid = vi.spyOn(crypto, "randomUUID").mockImplementationOnce(() => {
      throw new Error("UUID no disponible");
    });
    openPage("/inventario/nuevo");
    fillArticle();
    expect(screen.getByRole("alert").textContent).toContain(
      "No se pudo registrar",
    );
    expect(screen.getByLabelText("Nombre del artículo").value).toBe(
      "Leche entera",
    );
    uuid.mockRestore();
    fireEvent.click(screen.getByRole("button", { name: "Guardar artículo" }));
    expect(screen.queryByRole("alert")).toBe(null);
    expect(screen.getByRole("status").textContent).toContain("Leche entera");
  });
});
