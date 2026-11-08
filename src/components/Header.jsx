import { Link } from "react-router";
import { navigationItems, pages } from "../config/navigation.js";
import SiteLogo from "./SiteLogo.jsx";
import PageNavLink from "./PageNavLink.jsx";
import styles from "./Header.module.css";

export default function Header({ management = false }) {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerInner}>
        <SiteLogo />
        {management ? (
          <>
            <p className={styles.managementLabel}>Gestión de inventario</p>
            <Link className={styles.managementEntry} to={pages.home.path}>
              Ver sitio público →
            </Link>
          </>
        ) : (
          <div className={styles.headerActions}>
            <nav className={styles.topNav} aria-label="Navegación principal">
              {navigationItems.map(({ path, label }) => (
                <PageNavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                >
                  {label}
                </PageNavLink>
              ))}
            </nav>
            <Link className={styles.managementEntry} to={pages.inventory.path}>
              Gestión de inventario →
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
