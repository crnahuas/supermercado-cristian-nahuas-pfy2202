import { departments } from "../data/departments.js";
import Container from "../components/Container.jsx";
import DepartmentCard from "../components/DepartmentCard.jsx";
import HelpStrip from "../components/HelpStrip.jsx";
import HomeHero from "../components/HomeHero.jsx";
import VisitSection from "../components/VisitSection.jsx";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Container
        as="section"
        className={styles.departments}
        aria-labelledby="departments-title"
      >
        <div className={styles.sectionHeading}>
          <h2 id="departments-title">Lo que no puede faltar.</h2>
          <p>Una vuelta por nuestras secciones.</p>
        </div>
        <div className={styles.departmentGrid}>
          {departments.map((department) => (
            <DepartmentCard key={department.name} department={department} />
          ))}
        </div>
      </Container>
      <VisitSection />
      <HelpStrip
        contained
        title="¿Alguna duda antes de venir?"
        description="Horarios, locales y formas de contactarnos."
      />
    </>
  );
}
