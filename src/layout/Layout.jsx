import { useRef } from "react";
import { Outlet, useLocation } from "react-router";
import { isInventoryPath } from "../config/navigation.js";
import Header from "../components/Header.jsx";
import SiteFooter from "../components/SiteFooter.jsx";
import useRouteEffects from "../hooks/useRouteEffects.js";
import styles from "./Layout.module.css";

export default function Layout() {
  const mainRef = useRef(null);
  const { pathname } = useLocation();
  const management = isInventoryPath(pathname);
  useRouteEffects(mainRef);

  return (
    <div className={styles.appShell}>
      <a
        className={styles.skipLink}
        href="#contenido"
        onClick={(event) => {
          event.preventDefault();
          mainRef.current?.focus();
        }}
      >
        Saltar al contenido
      </a>
      <Header management={management} />
      <main
        ref={mainRef}
        id="contenido"
        className={styles.mainContent}
        tabIndex={-1}
      >
        <Outlet />
      </main>
      <SiteFooter compact={management} />
    </div>
  );
}
