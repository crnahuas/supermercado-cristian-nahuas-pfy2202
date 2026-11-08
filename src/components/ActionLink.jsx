import { Link } from "react-router";
import Icon from "./Icon.jsx";
import styles from "./ActionLink.module.css";

export default function ActionLink({
  to,
  variant = "text",
  children,
  className = "",
  ...props
}) {
  const appearance =
    variant === "text" ? [styles.textButton] : [styles.button, styles[variant]];
  return (
    <Link
      to={to}
      className={[...appearance, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
      <Icon size={18} />
    </Link>
  );
}
