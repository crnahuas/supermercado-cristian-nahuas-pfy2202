import { pages } from "../config/navigation.js";
import ActionLink from "./ActionLink.jsx";
import styles from "./HomeHero.module.css";

export default function HomeHero() {
  return (
    <section className={styles.homeHero} aria-labelledby="home-title">
      <img
        className={styles.heroImage}
        src="./images/portada-abasto.jpg"
        alt="Bolsa de compras con pan y verduras frescas"
        width="1984"
        height="793"
      />
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <h1 id="home-title">
            Dale color
            <br />
            <span>a tu mesa.</span>
          </h1>
          <p>
            Frutas, pan y básicos para tu casa. Lo de la semana y eso que se te
            olvidó ayer.
          </p>
          <ActionLink variant="primary" to={pages.stores.path}>
            Conoce nuestras tiendas
          </ActionLink>
          <div className={styles.heroLocation}>
            Santiago Centro · Providencia · Ñuñoa
          </div>
        </div>
      </div>
    </section>
  );
}
