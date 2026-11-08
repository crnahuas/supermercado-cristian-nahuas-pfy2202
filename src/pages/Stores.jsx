import { pages } from "../config/navigation.js";
import { stores } from "../data/stores.js";
import Container from "../components/Container.jsx";
import HelpStrip from "../components/HelpStrip.jsx";
import PageBanner from "../components/PageBanner.jsx";
import StoreCard from "../components/StoreCard.jsx";
import styles from "./Stores.module.css";

export default function Stores() {
  return (
    <>
      <PageBanner
        title={pages.stores.label}
        description="Encuentra tu local. Nosotros ponemos el resto."
        image="./images/tienda.jpg"
        alt="Verduras ordenadas en una góndola"
      />
      <Container className={styles.storesContent}>
        <div className={styles.storeList}>
          {stores.map((store) => (
            <StoreCard key={store.number} store={store} />
          ))}
        </div>
        <HelpStrip
          className={styles.helpStrip}
          title="Antes de venir"
          description="Revisa las preguntas sobre los locales y sus horarios."
        />
      </Container>
    </>
  );
}
