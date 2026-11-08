import styles from "./FaqItem.module.css";

export default function FaqItem({ question, answer, defaultOpen = false }) {
  return (
    <details className={styles.item} name="faq" open={defaultOpen || undefined}>
      <summary>
        <span>{question}</span>
        <span className={styles.toggle} aria-hidden="true">
          +
        </span>
      </summary>
      <p>{answer}</p>
    </details>
  );
}
