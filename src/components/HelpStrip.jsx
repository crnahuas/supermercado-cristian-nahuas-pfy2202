import { pages } from "../config/navigation.js";
import ActionLink from "./ActionLink.jsx";
import Container from "./Container.jsx";
import styles from "./HelpStrip.module.css";

export default function HelpStrip({
  title,
  description,
  to = pages.faq.path,
  linkLabel = pages.faq.label,
  contained = false,
  className = "",
}) {
  const Wrapper = contained ? Container : "div";
  return (
    <Wrapper
      className={[styles.helpStrip, className].filter(Boolean).join(" ")}
    >
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <ActionLink to={to}>{linkLabel}</ActionLink>
    </Wrapper>
  );
}
