import { pages } from "../config/navigation.js";
import ActionLink from "../components/ActionLink.jsx";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.notFound}>
      <h1>Por aquí no era.</h1>
      <p>No encontramos esa página. Puedes volver al inicio desde aquí.</p>
      <ActionLink variant="primary" to={pages.home.path}>
        Volver al inicio
      </ActionLink>
    </div>
  );
}
