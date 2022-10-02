import React from "react";
import styles from "../../styles/components/Developing.module.scss";
import { TypeAnimation } from "react-type-animation";

function Developing() {
  return (
    <React.Fragment>
      <article className={styles.container}>
        <h1 className={styles.h1}>
          Em desenvolvimento
          <span>
            <TypeAnimation
              cursor={false}
              sequence={[".", 1000, "..", 1000, "...", 1000, "", 1000]}
              speed={99}
              wrapper="h2"
              repeat={Infinity}
              style={{ fontSize: "30px" }}
            />
          </span>
        </h1>
      </article>
    </React.Fragment>
  );
}

export default Developing;
