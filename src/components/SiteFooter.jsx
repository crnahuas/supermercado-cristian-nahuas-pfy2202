import { Link } from "react-router";
import { pages } from "../config/navigation.js";
import SiteLogo from "./SiteLogo.jsx";
import styles from "./SiteFooter.module.css";

export default function SiteFooter({ compact = false }) {
  if (compact)
    return (
      <footer className={styles.compactFooter}>
        <div className={styles.compactInner}>
          <p>Supermercado Abasto</p>
          <Link to={pages.home.path}>Volver al sitio público</Link>
        </div>
      </footer>
    );
  return (
    <footer className={styles.siteFooter}>
      <div className={styles.footerInner}>
        <div className={styles.footerColumns}>
          <div className={styles.footerBrand}>
            <SiteLogo className={styles.wordmark} />
            <p>Supermercado Abasto</p>
            <nav aria-label="Información del supermercado">
              <Link to={pages.stores.path}>Conoce nuestras tiendas</Link>
              <Link to={pages.faq.path}>{pages.faq.label}</Link>
            </nav>
          </div>
          <section aria-labelledby="footer-contact">
            <h2 id="footer-contact">Hablemos</h2>
            <address>
              <a href="mailto:hola@abasto.cl">hola@abasto.cl</a>
              <span>+56 2 1234 8765</span>
            </address>
            <p>Consultas sobre productos y atención en tienda.</p>
          </section>
          <section aria-labelledby="footer-address">
            <h2 id="footer-address">Casa matriz</h2>
            <address>
              Av. Libertador Bernardo O’Higgins 1450
              <br />
              Santiago, Región Metropolitana
            </address>
            <Link to={pages.stores.path}>Ver todos los locales →</Link>
          </section>
          <section aria-labelledby="footer-hours">
            <h2 id="footer-hours">Horarios</h2>
            <dl className={styles.footerHours}>
              <div>
                <dt>Lunes a sábado</dt>
                <dd>08:30 a 20:30</dd>
              </div>
              <div>
                <dt>Domingos</dt>
                <dd>09:00 a 15:00</dd>
              </div>
            </dl>
            <p>Los horarios pueden cambiar en festivos.</p>
          </section>
        </div>
      </div>
    </footer>
  );
}
