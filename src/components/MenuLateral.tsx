import React from "react";
import styles from "../../styles/components/Menu-lateral.module.scss";
import Button from "./Button/Button";
import SearchBar from "./Search-bar/Search-bar";
import ScrollNavBar from "./Scroll-navbar/Scroll-navbar";

function MenuLateral({ equipment, path="" }: any) {
  return (
    <React.Fragment>
      <section className={styles.section}>
        <SearchBar />
        <ScrollNavBar equipment={equipment} path={path}></ScrollNavBar>
        <Button children={"Mapa"} />
      </section>
    </React.Fragment>
  );
}

export default MenuLateral;
