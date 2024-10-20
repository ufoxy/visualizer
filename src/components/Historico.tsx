import React from "react";
import Tabs from "./Tabs/Tabs";
import styles from "../../styles/components/Historico.module.scss";
import dynamic from "next/dynamic";

function Historico() {
  const Map = dynamic(
    () => import("../components/Historico-map/Historico-map"),
    {
      ssr: false,
    }
  );

  return (
    <React.Fragment>
      <section className={styles.section}>
        <Tabs />
        <Map />
      </section>
    </React.Fragment>
  );
}

export default Historico;
