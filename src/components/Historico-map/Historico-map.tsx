import {
  MapContainer,
  TileLayer,
  LayersControl,
  LayerGroup,
  useMap,
} from "react-leaflet";
import { useRouter } from "next/router";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import styles from "../../../styles/components/Historico-map/Historico-map.module.scss";
import L from "leaflet";
import { useContext, useRef, useState } from "react";
import "leaflet-arrowheads";
import HistoricoContext from "../../common/contexts/Historico";
import useGetPositionsInLastDate from "../../hooks/getPositionsInLastDate";
import useGetAllPositionsById from "../../hooks/getAllPositionsById";
import { TbMapSearch } from "react-icons/tb";
import pin from "../../../public/marker-icon.png";
import Image from "next/image";

const DEFAULT_CENTER = { lat: -19.285292347527296, lng: -46.0382080078125 };
const DEFAULT_ZOOM = 12;

const { BaseLayer, Overlay } = LayersControl;

// Basic: https://api.mapbox.com/styles/v1/ufoxy/cl7xjsprk008t15lgay2bk8gf/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw
// Outdoors: https://api.mapbox.com/styles/v1/ufoxy/cl7xj9uzv003m14r3sxlfu4ni/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw
// Dark: https://api.mapbox.com/styles/v1/ufoxy/cl7xjyti800by15ryoins5lis/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw

function HistoricoMap() {
  const {
    equipment,
    equipmentModel,
    equipmentPositionHistory,
    equipmentStateHistory,
    equipmentState,
  }: any = useContext(HistoricoContext);
  const { query } = useRouter();

  const mapRef = useRef<any>(null);
  const handleFlyTo = (lat: number, lng: number) => {
    mapRef.current.flyTo([lat, lng], 15); // Voar para um marker específico.
  };

  const [positionsInLastDate, setPositionsInLastDate] = useState(
    useGetPositionsInLastDate(query.id, equipmentPositionHistory, 1)
  );

  function AddAllPositions() {
    setPositionsInLastDate(
      useGetAllPositionsById(query.id, equipmentPositionHistory)
    );
    positionsInLastDate[0].map((e: any) => [e.lat, e.lon]);
  }

  function AddPositionsInLastDate(date: number) {
    setPositionsInLastDate(
      useGetPositionsInLastDate(query.id, equipmentPositionHistory, date)
    );
    positionsInLastDate[0].map((e: any) => [e.lat, e.lon]);
  }

  let points = positionsInLastDate[0].map((e: any) => [e.lat, e.lon]);

  var sumLat = 0;
  var sumLng = 0;
  points.forEach(function (point: any) {
    sumLat += point[0];
    sumLng += point[1];
  });
  var avgLat = sumLat / points.length;
  var avgLng = sumLng / points.length;

  function Polyline() {
    const map = useMap();
    map.eachLayer(function (layer) {
      map.removeLayer(layer);
    });

    let freq = 15;
    if (points.length < 15) freq = 15;
    else if (points.length > 15 && points.length < 25) freq = 30;
    else if (points.length >= 25) freq = 45;

    const line = L.polyline(points.map((e: any) => [e[0], e[1]]))
      .arrowheads({ frequency: freq, fill: true, size: "10px" })
      .addTo(map);

    points.map((e: any, i: any) => {
      if (i === 0) {
        let marker: any = L.marker([e[0], e[1]]).addTo(map);
        marker._icon.style.filter = "hue-rotate(50deg)"; // Lilás
      } else if (i === points.length - 1) {
        let marker: any = L.marker([e[0], e[1]]).addTo(map);
        marker._icon.style.filter = "hue-rotate(150deg)"; // Vermelho
      } else {
        let marker: any = L.marker([e[0], e[1]]).addTo(map);
      }
    });

    let zoom = 12;
    if (points.length >= 10) zoom = 11;
    else if (points.length < 10 && points.length > 3) zoom = 12;
    else if (points.length < 3) zoom = 13;

    map.setView([avgLat, avgLng], zoom);
    return (
      <>
        <BaseLayer name="Outdoors Layer">
          <LayerGroup>
            <TileLayer url="https://api.mapbox.com/styles/v1/ufoxy/cl7xj9uzv003m14r3sxlfu4ni/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw" />
          </LayerGroup>
        </BaseLayer>
        <BaseLayer name="Basic Layer">
          <LayerGroup>
            <TileLayer url="https://api.mapbox.com/styles/v1/ufoxy/cl7xjsprk008t15lgay2bk8gf/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw" />
          </LayerGroup>
        </BaseLayer>
        <BaseLayer name="Dark Layer" checked>
          <LayerGroup>
            <TileLayer url="https://api.mapbox.com/styles/v1/ufoxy/cl7xjyti800by15ryoins5lis/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw" />
          </LayerGroup>
        </BaseLayer>
      </>
    );
  }

  return (
    <div
      onChange={(e) => {
        console.log(e.target);
      }}
      className={styles.div}
    >
      <section className={styles.section}>
        <article className={styles.tabs_div}>
          <nav>
            <ul className={styles.nav_ul}>
              <li
                className={styles.li}
                style={{
                  border: "#5f66982f solid 2px",
                  WebkitBorderTopLeftRadius: "25px",
                }}
                onClick={() => AddAllPositions()}
              >
                Todo o Período
              </li>
              <li
                className={styles.li}
                style={{ borderLeft: "none", borderRight: "none" }}
                onClick={() => AddPositionsInLastDate(30)}
              >
                30 Dias
              </li>
              <li
                className={styles.li}
                onClick={() => AddPositionsInLastDate(7)}
              >
                7 Dias
              </li>
              <li
                className={styles.li}
                style={{ borderLeft: "none", borderRight: "none" }}
                onClick={() => AddPositionsInLastDate(3)}
              >
                3 Dias
              </li>
              <li
                className={styles.li}
                style={{ WebkitBorderTopRightRadius: "25px" }}
                onClick={() => AddPositionsInLastDate(1)}
              >
                24 Horas
              </li>
            </ul>
          </nav>
        </article>

        <article className={styles.list_div}>
          {positionsInLastDate[0].map((e: any) => {
            const date = new Date(e.date);
            return (
              <button className={styles.button} key={e.date}>
                <p>{date.toLocaleDateString("pt-BR")}</p>
                <p>{date.toLocaleTimeString("pt-BR")}</p>
                <p style={{ width: "150px" }}>{`${e.lat}, ${e.lon}`}</p>
                <span onClick={() => handleFlyTo(e.lat, e.lon)}>
                  <TbMapSearch className={styles.map_search_icon} />
                </span>
              </button>
            );
          })}
        </article>
      </section>

      <div className={styles.div_map}>
        <article className={styles.article}>
          <p className={styles.p}>
            Rota Final:
            <Image
              src={pin}
              width={16}
              height={22}
              style={{ filter: "hue-rotate(150deg)" }}
            />
          </p>
          <p className={styles.p}>
            Rota Inicial:
            <Image
              src={pin}
              width={16}
              height={22}
              style={{ filter: "hue-rotate(50deg)" }}
            />
          </p>
          <p className={styles.p}>
            Rotas: <Image src={pin} width={16} height={22} />
          </p>
        </article>
        <MapContainer
          ref={mapRef}
          //@ts-ignore
          center={
            // query.lat === undefined || query.lng === undefined
            //   ? [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng]
            //   : [query.lat, query.lng]
            [avgLat, avgLng]
          }
          //@ts-ignore
          // zoom={query.zm === undefined ? DEFAULT_ZOOM : query.zm}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={true}
          minZoom={3}
          className={styles.map}
        >
          <LayersControl position="bottomleft">
            <Polyline />
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
}

export default HistoricoMap;
