import { describe, expect, it } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "../src/App.jsx";
import { navigationItems, pages } from "../src/config/navigation.js";

function openPage(path = pages.home.path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
  return within(
    screen.getByRole("navigation", { name: "Navegación principal" }),
  );
}

async function expectPage(page) {
  await waitFor(() => expect(document.title).toBe(page.title));
  const navigation = screen.getByRole("navigation", {
    name: "Navegación principal",
  });
  for (const item of navigationItems) {
    const link = within(navigation).getByRole("link", {
      name: item.label,
      exact: true,
    });
    expect(link.getAttribute("aria-current")).toBe(
      item === page ? "page" : null,
    );
  }
}

describe("Navegación del supermercado", () => {
  it("cambia de página, actualiza título y enlace activo, y mueve el foco al contenido", async () => {
    const menu = openPage();
    await expectPage(pages.home);
    fireEvent.click(menu.getByRole("link", { name: pages.stores.label }));
    await screen.findByRole("heading", {
      name: pages.stores.label,
      exact: true,
    });
    await expectPage(pages.stores);
    expect(document.activeElement).toBe(screen.getByRole("main"));
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
    expect(screen.getAllByRole("article")).toHaveLength(3);
    fireEvent.click(menu.getByRole("link", { name: pages.faq.label }));
    await screen.findByRole("heading", { name: pages.faq.label, exact: true });
    await expectPage(pages.faq);
    expect(screen.getAllByRole("banner")).toHaveLength(1);
    expect(screen.getAllByRole("contentinfo")).toHaveLength(1);
  });

  it.each([
    ["/nuestras-tiendas/", pages.stores],
    ["/PREGUNTAS-FRECUENTES", pages.faq],
  ])(
    "mantiene el título y la navegación coherentes al abrir %s",
    async (path, page) => {
      openPage(path);
      await screen.findByRole("heading", { name: page.label, exact: true });
      await expectPage(page);
    },
  );

  it.each(["/no-existe", "/nuestras-tiendas/otra"])(
    "muestra la página 404 para %s y permite volver al inicio",
    async (path) => {
      openPage(path);
      await screen.findByRole("heading", { name: "Por aquí no era." });
      await expectPage(pages.notFound);
      fireEvent.click(
        screen.getByRole("link", { name: "Volver al inicio", exact: true }),
      );
      await screen.findByRole("heading", { name: /Dale color\s*a tu mesa\./ });
      await expectPage(pages.home);
      expect(document.activeElement).toBe(screen.getByRole("main"));
    },
  );

  it("conserva el salto al contenido y los enlaces del pie", async () => {
    openPage();
    expect(
      screen
        .getByRole("link", { name: "Saltar al contenido" })
        .getAttribute("href"),
    ).toBe("#contenido");
    expect(screen.getByRole("main").getAttribute("tabindex")).toBe("-1");
    const footer = within(screen.getByRole("contentinfo"));
    fireEvent.click(
      footer.getByRole("link", { name: pages.faq.label, exact: true }),
    );
    await screen.findByRole("heading", { name: pages.faq.label, exact: true });
    await expectPage(pages.faq);
  });

  it("muestra preguntas reutilizables con una respuesta inicial abierta", () => {
    openPage(pages.faq.path);
    const question = screen.getByText("¿Dónde están las tiendas?", {
      exact: true,
    });
    expect(question.closest("details").open).toBe(true);
    const other = screen.getByText("¿Abren los domingos?", { exact: true });
    fireEvent.click(other.closest("summary"));
    expect(other.closest("details").open).toBe(true);
  });
});
