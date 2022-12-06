import React from "react";
import { SiGithub } from "react-icons/si";
import styles from "../../styles/components/Size-block.module.scss";

function SizeBlock() {
  return (
    <React.Fragment>
      <section className={styles.size_block_section}>
        <div className={styles.alert_div}>
          <p className={styles.p}>
            Esta página não está preparada para suportar tamanhos de
            dispositivos móveis.
          </p>
          <p className={styles.p}>
            Por favor, acesse em um dispositivo com uma resolução mínima de
            940x600.
          </p>
        </div>
        <footer className={styles.footer}>
          <a
            href="https://github.com/ufoxy/visualizer"
            target="_blank"
            rel="noreferrer"
            className={styles.a}
          >
            Visualizer
          </a>
          <a
            href="https://github.com/ufoxy/visualizer"
            target="_blank"
            rel="noreferrer"
          >
            <i>
              <SiGithub
                fontSize={28}
                color="white"
                style={{ paddingTop: "3px" }}
              ></SiGithub>
            </i>
          </a>
        </footer>
      </section>
    </React.Fragment>
  );
}

export default SizeBlock;
