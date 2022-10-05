import { useContext, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import styles from "../../../styles/components/Search-bar/Search-bar.module.scss";
import MenuLateralContext from "../../common/contexts/Menu-lateral";

function SearchBar() {
  const { ContextFunction }: any = useContext(MenuLateralContext);
  // ContextFunction("Funciona!!!!");

  function getSearch(e: any) {
    const value = e.target.value;
    setSearchValue(value);
  };

  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <input
          className={styles.searchQueryInput}
          type="text"
          name="searchQueryInput"
          placeholder="Pesquisar"
          onChange={getSearch}
        />
        <button className={styles.button}>
          <BiSearchAlt fontSize={22} />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
