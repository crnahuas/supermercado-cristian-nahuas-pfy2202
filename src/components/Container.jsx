import styles from "./Container.module.css";

export default function Container({
  as: Element = "div",
  className = "",
  children,
  ...props
}) {
  return (
    <Element
      className={[styles.pageContainer, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </Element>
  );
}
