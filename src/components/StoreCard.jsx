import Icon from "./Icon.jsx";
import styles from "./StoreCard.module.css";

export default function StoreCard({ store }) {
  return (
    <article
      className={styles.storeRow}
      aria-labelledby={`store-${store.number}`}
    >
      <div className={styles.storeName}>
        <h2 id={`store-${store.number}`}>{store.name}</h2>
        <div className={styles.detail}>
          <Icon name="pin" size={19} />
          <p>
            {store.address}
            <br />
            {store.commune}, Región Metropolitana
          </p>
        </div>
      </div>
      <div className={styles.storeHours}>
        <h3>
          <Icon name="clock" size={18} />
          Horario de atención
        </h3>
        <p>
          {store.hours}
          <br />
          {store.sunday}
        </p>
        <span className={styles.fieldHint}>
          Festivos: horario sujeto a confirmación.
        </span>
      </div>
      <div className={styles.storeServices}>
        <h3>Servicios</h3>
        <ul>
          {store.services.split(" · ").map((service) => (
            <li key={service}>{service}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}
