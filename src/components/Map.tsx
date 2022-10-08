import LeafletMap from "./Leaflet-map/Leaflet-map";
import styles from "../../styles/components/Map.module.scss";

// Basic: https://api.mapbox.com/styles/v1/ufoxy/cl7xjsprk008t15lgay2bk8gf/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw
// Outdoors: https://api.mapbox.com/styles/v1/ufoxy/cl7xj9uzv003m14r3sxlfu4ni/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw
// Dark: https://api.mapbox.com/styles/v1/ufoxy/cl7xjyti800by15ryoins5lis/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw

const Map = () => {
  return (
    <section className={styles.section}>
      <div className={styles.div}>
        <h1 className={styles.h1}>Visualizer</h1>
        <i
          className="fa fa-github"
          style={{ fontSize: "32px", color: "white" }}
        ></i>
        <i
          className="fa fa-gear"
          style={{ fontSize: "32px", color: "white" }}
        ></i>
      </div>
      <LeafletMap />
    </section>
  );
};

export default Map;
