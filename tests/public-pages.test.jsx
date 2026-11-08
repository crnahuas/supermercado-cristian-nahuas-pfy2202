import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../src/App.jsx";

function openPage(path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("Separación del sitio público y la gestión", () => {
  it.each(["/", "/nuestras-tiendas", "/preguntas-frecuentes"])(
    "mantiene la navegación pública en %s y permite entrar y salir de la gestión",
    (path) => {
      openPage(path);
      expect(
        screen.getByRole("navigation", { name: "Navegación principal" }),
      ).toBeTruthy();
      expect(
        screen.queryByRole("navigation", { name: "Gestión de inventario" }),
      ).toBe(null);
      expect(
        within(screen.getByRole("contentinfo")).getByRole("heading", {
          name: "Hablemos",
        }),
      ).toBeTruthy();
      fireEvent.click(
        screen.getByRole("link", { name: "Gestión de inventario →" }),
      );
      expect(
        screen.queryByRole("navigation", { name: "Navegación principal" }),
      ).toBe(null);
      expect(
        screen.getByRole("navigation", { name: "Gestión de inventario" }),
      ).toBeTruthy();
      const footer = within(screen.getByRole("contentinfo"));
      expect(footer.queryByRole("heading", { name: "Hablemos" })).toBe(null);
      expect(footer.getByText("Supermercado Abasto")).toBeTruthy();
      fireEvent.click(
        screen.getByRole("link", { name: "Ver sitio público →" }),
      );
      expect(
        screen.getByRole("heading", { name: /Dale color\s*a tu mesa\./ }),
      ).toBeTruthy();
      expect(
        screen.queryByRole("navigation", { name: "Gestión de inventario" }),
      ).toBe(null);
      expect(document.activeElement).toBe(screen.getByRole("main"));
    },
  );
});
