import React, { Children } from "react";
import Link from "next/link";

import styles from "../../styles/components/Menu-lateral.module.scss";

const styleTest = {
  width: "100%",
  padding: "50px 0",
};

function MenuLateral({ equipment, path = "" }: any) {
  return (
    <React.Fragment>
      <section className={styles.section}>
        <h1 style={{}}>Hello World!</h1>

        <div className={styles.scroll_navbar}>
          <ul className={styles.ul}>
            {equipment.map((e: any) => (
              <Link
                key={e.id}
                href={`${path}${e.name}?id=${e.id}`}
                prefetch={false}
              >
                <li key={e.id} className={styles.li}>
                  {e.name}
                </li>
              </Link>
            ))}
            <li
              style={styleTest}
            ></li>
            <li
              style={styleTest}
            ></li>
            <li
              style={styleTest}
            ></li>
          </ul>
        </div>

        <Link href="/">
          <button className={styles.button}>Mapa</button>
        </Link>
      </section>
    </React.Fragment>
  );
}

export default MenuLateral;
