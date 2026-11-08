import { Link } from "react-router";
import { pages, siteName } from "../config/navigation.js";
import styles from "./SiteLogo.module.css";

export default function SiteLogo({ className = "" }) {
  return (
    <Link
      className={[styles.wordmark, className].filter(Boolean).join(" ")}
      to={pages.home.path}
      aria-label={`${siteName}, ir al inicio`}
    >
      abasto<span>.</span>
    </Link>
  );
}
