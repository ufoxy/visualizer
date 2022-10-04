import React from "react";
import styles from "../../styles/components/Menu-lateral.module.scss";
import Button from "./Button/Button";
import SearchBar from "./Search-bar/Search-bar";
import ScrollNavBar from "./Scroll-navbar/Scroll-navbar";

function MenuLateral() {
  return (
    <React.Fragment>
      <section className={styles.section}>
        <SearchBar />
        <ScrollNavBar></ScrollNavBar>
        <Button>Mapa</Button>
      </section>
    </React.Fragment>
  );
}

export default MenuLateral;
