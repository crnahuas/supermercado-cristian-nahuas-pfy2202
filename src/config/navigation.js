import { matchPath } from "react-router";

export const siteName = "Abasto";
const page = (path, label) => ({
  path,
  label,
  title: `${label} · ${siteName}`,
});
export const pages = {
  home: page("/", "Inicio"),
  stores: page("/nuestras-tiendas", "Nuestras tiendas"),
  faq: page("/preguntas-frecuentes", "Preguntas frecuentes"),
  inventory: page("/inventario", "Inventario"),
  newArticle: page("/inventario/nuevo", "Ingresar artículo"),
  articleDetail: page(
    "/inventario/articulos/:articleId",
    "Detalle del artículo",
  ),
  cart: page("/inventario/carrito", "Carrito"),
  notFound: page("*", "Página no encontrada"),
};
export const articlePath = (id) =>
  `/inventario/articulos/${encodeURIComponent(id)}`;
export const navigationItems = [pages.home, pages.stores, pages.faq];
export const inventoryNavigationItems = [
  pages.inventory,
  pages.newArticle,
  pages.cart,
];
export function getPageByPath(pathname) {
  return (
    [...navigationItems, ...inventoryNavigationItems, pages.articleDetail].find(
      ({ path }) => matchPath({ path, end: true }, pathname),
    ) ?? pages.notFound
  );
}
export function isInventoryPath(pathname) {
  return Boolean(matchPath("/inventario/*", pathname));
}
