import React from "react";
import styles from "../../styles/components/Size-block.module.scss";

function SizeBlock() {
  return (
    <React.Fragment>
      <section className={styles.size_block_section}>
        <p className={styles.p}>
          Está página não está preparada para suportar tamanhos de dispositivos
          móveis.
        </p>
        <p className={styles.p}>
          Por favor, entre em um dispositivo com uma resolução minima de 940x600
        </p>
      </section>
    </React.Fragment>
  );
}

export default SizeBlock;
