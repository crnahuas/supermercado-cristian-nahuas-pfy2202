import { lazy } from "react";
import { Route, Routes } from "react-router";
import { pages } from "../config/navigation.js";
import Layout from "../layout/Layout.jsx";
import InventoryLayout from "../layout/InventoryLayout.jsx";
import Home from "../pages/Home.jsx";
import Stores from "../pages/Stores.jsx";
import Faq from "../pages/Faq.jsx";
import NotFound from "../pages/NotFound.jsx";
import Inventory from "../pages/Inventory.jsx";
import NewArticle from "../pages/NewArticle.jsx";

const ArticleDetail = lazy(() => import("../pages/ArticleDetail.jsx"));
const Cart = lazy(() => import("../pages/Cart.jsx"));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={pages.home.path} element={<Home />} />
        <Route path={pages.stores.path} element={<Stores />} />
        <Route path={pages.faq.path} element={<Faq />} />
        <Route path="inventario" element={<InventoryLayout />}>
          <Route index element={<Inventory />} />
          <Route path="nuevo" element={<NewArticle />} />
          <Route path="articulos/:articleId" element={<ArticleDetail />} />
          <Route path="carrito" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path={pages.notFound.path} element={<NotFound />} />
      </Route>
    </Routes>
  );
}
