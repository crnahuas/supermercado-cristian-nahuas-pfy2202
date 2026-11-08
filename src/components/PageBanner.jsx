import styles from "./PageBanner.module.css";

export default function PageBanner({ title, description, image, alt }) {
  return (
    <div className={styles.pageBanner}>
      <div className={styles.pageBannerInner}>
        <div className={styles.pageBannerCopy}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <img src={image} alt={alt} width="1400" height="1050" />
      </div>
    </div>
  );
}
