import { Link, matchPath, useLocation } from "react-router";

// Coincidencia exacta que admite la barra final igual que las rutas y títulos.
export default function PageNavLink({ to, className, ...props }) {
  const { pathname } = useLocation();
  const isActive = Boolean(matchPath({ path: to, end: true }, pathname));
  return (
    <Link
      {...props}
      to={to}
      aria-current={isActive ? "page" : undefined}
      className={
        typeof className === "function" ? className({ isActive }) : className
      }
    />
  );
}
