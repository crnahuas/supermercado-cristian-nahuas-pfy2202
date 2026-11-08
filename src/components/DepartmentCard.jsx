import styles from "./DepartmentCard.module.css";

export default function DepartmentCard({ department }) {
  const { name, description, image, alt } = department;
  return (
    <article className={styles.department}>
      <div className={styles.departmentImage}>
        <img src={image} alt={alt} loading="lazy" width="1000" height="750" />
      </div>
      <h3>{name}</h3>
      <p>{description}</p>
    </article>
  );
}
