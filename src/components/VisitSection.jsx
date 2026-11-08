import { pages } from "../config/navigation.js";
import ActionLink from "./ActionLink.jsx";
import Container from "./Container.jsx";
import styles from "./VisitSection.module.css";

export default function VisitSection() {
  return (
    <Container
      as="section"
      className={styles.visitSection}
      aria-labelledby="visit-title"
    >
      <div className={styles.visitImage}>
        <img
          src="./images/tienda.jpg"
          alt="Sección de verduras de un supermercado"
          loading="lazy"
          width="1400"
          height="1050"
        />
      </div>
      <div className={styles.visitContent}>
        <h2 id="visit-title">
          La compra de siempre.
          <br />
          Cerca de ti.
        </h2>
        <p>
          Encuentra Abasto en Santiago Centro, Providencia y Ñuñoa. Revisa la
          dirección y el horario de tu local antes de salir.
        </p>
        <ActionLink variant="primary" to={pages.stores.path}>
          Encuentra tu tienda
        </ActionLink>
      </div>
    </Container>
  );
}
