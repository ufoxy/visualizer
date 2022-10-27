import LeafletMap from "./Leaflet-map/Leaflet-map";
import styles from "../../styles/components/Map.module.scss";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

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
          <i>
            <SiGithub
              fontSize={28}
              color="white"
              style={{ paddingTop: "3px" }}
            ></SiGithub>
          </i>
        </a>
      </div>
      <LeafletMap />
    </section>
  );
};

export default Map;
