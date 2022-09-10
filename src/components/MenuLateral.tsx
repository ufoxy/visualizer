import React, { Children } from "react";
import Link from "next/link";

import styles from "../../styles/components/Menu-lateral.module.scss"

function MenuLateral({ children }: any) {
  return (
    <React.Fragment>
      <section className={styles.section}>
        <h1 style={{}}>Hello World!</h1>
        <ul className={styles.ul}>
          {children}
        </ul>
        <Link href="/">
          <button className={styles.button}>
            Mapa
          </button>
        </Link>
      </section>
    </React.Fragment>
  );
}

export default MenuLateral;
