import Link from "next/link";
import { ImMap } from "react-icons/im";
import styles from "../../../styles/components/Button/Button.module.scss";

function Button({ children }: any) {
  return (
    <Link href="/">
      <button className={styles.button}>
        {children}
        <ImMap fontSize={20} />
      </button>
    </Link>
  );
}

export default Button;
