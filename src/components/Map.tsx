import LeafletMap from "./Leaflet-map/Leaflet-map";
import styles from "../../styles/components/Map.module.scss";
import Link from "next/link";

const Map = () => {
  return (
    <section className={styles.section}>
      <div className={styles.div}>
        <Link href={"/"}>
          <h1 className={styles.h1}>Visualizer</h1>
        </Link>
        <a
          href="https://github.com/ufoxy/visualizer"
          target="_blank"
          rel="noreferrer"
        >
          <i
            className="fa fa-github"
            style={{ fontSize: "32px", color: "white" }}
          ></i>
        </a>
      </div>
      <LeafletMap />
    </section>
  );
};

export default Map;
