import React from "react";
import Link from "next/link";
import styles from "../../../styles/components/Tabs/Tabs.module.scss"
import { useRouter } from "next/router";

function Tabs() {

  const { query } = useRouter();

  return (
    <React.Fragment>
      <article className={styles.tabs_div}>
      <nav>
        <ul className={styles.nav_ul}>
          <li className={styles.li}>
            <Link href={`/equipamento/${query.name}?id=${query.id}`}>{query.name}</Link>
          </li>
          <li className={styles.li}>
            <Link href={`/equipamento/historico/${query.name}?id=${query.id}`}>Histórico</Link>
          </li>
        </ul>
      </nav>
        </article>
    </React.Fragment>
  );
}

export default Tabs;