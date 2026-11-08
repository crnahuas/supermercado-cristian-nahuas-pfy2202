import { pages } from "../config/navigation.js";
import { questions } from "../data/questions.js";
import ActionLink from "../components/ActionLink.jsx";
import Container from "../components/Container.jsx";
import FaqItem from "../components/FaqItem.jsx";
import PageBanner from "../components/PageBanner.jsx";
import styles from "./Faq.module.css";

export default function Faq() {
  return (
    <>
      <PageBanner
        title={pages.faq.label}
        description="Respuestas sobre locales, horarios y atención."
        image="./images/panaderia.jpg"
        alt="Pan rebanado sobre una tabla de madera"
      />
      <Container className={styles.faqLayout}>
        <div className={styles.questions}>
          {questions.map(({ q, a }, index) => (
            <FaqItem
              key={q}
              question={q}
              answer={a}
              defaultOpen={index === 0}
            />
          ))}
        </div>
        <div className={styles.faqHelp}>
          <p>Para revisar direcciones, horarios y servicios de cada local:</p>
          <ActionLink to={pages.stores.path}>Ver nuestras tiendas</ActionLink>
        </div>
      </Container>
    </>
  );
}
