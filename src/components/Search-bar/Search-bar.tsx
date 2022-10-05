import styles from "../../../styles/components/Search-bar/Search-bar.module.scss";

function SearchBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.searchBar}>
        <input
          className={styles.searchQueryInput}
          type="text"
          name="searchQueryInput"
          placeholder="Pesquisar"
        />
        <button className={styles.button} />
      </div>
    </div>
  );
}

export default SearchBar;
