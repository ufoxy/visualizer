import React from "react";
import { useRouter } from "next/router";
import Tabs from "./Tabs/Tabs";
import styles from "../../styles/components/Historico.module.scss";
import Image from "next/image";
const gif = require("../assets/gifs/load-animation.gif") as string;
import { TypeAnimation } from 'react-type-animation';

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
              <TypeAnimation
                cursor={false}
                sequence={[
                  ".",
                  1000,
                  "..",
                  1000,
                  "...",
                  1000,
                  "",
                  1000,
                ]}
                speed={99}
                wrapper="h2"
                repeat={Infinity}
                style={{fontSize:"30px"}}
              />
            </span>
          </h1>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Historico;
