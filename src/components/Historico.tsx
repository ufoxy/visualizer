import React from "react";
import { useRouter } from "next/router";
import Tabs from "./Tabs/Tabs";
import styles from "../../styles/components/Historico.module.scss"

function Historico() {
  const { query } = useRouter();

  return (
    <React.Fragment>
      <section className={styles.section}>
        <Tabs />
        <div className={styles.container}>
            <h1 className={styles.h1}>
                Em desenvolvimento
                <span>
                    <img src="" alt="" />
                </span>
            </h1>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Historico;
