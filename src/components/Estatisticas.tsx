import React from "react";
import Tabs from "./Tabs/Tabs";
import styles from "../../styles/components/Historico.module.scss";
import Developing from "./Developing";

function Estatisticas() {
  return (
    <React.Fragment>
      <section className={styles.section}>
        <Tabs />
        <Developing />
      </section>
    </React.Fragment>
  );
}

export default Estatisticas;
