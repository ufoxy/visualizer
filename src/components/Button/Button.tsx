import Link from "next/link";
import styles from "../../../styles/components/Button/Button.module.scss";

function Button({ children }: any) {
  return (
    <Link href="/">
      <button className={styles.button}>{children}</button>
    </Link>
  );
}

export default Button;
