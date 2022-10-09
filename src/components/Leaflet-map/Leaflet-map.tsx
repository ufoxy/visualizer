import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import useGetPosition from "../../hooks/getPosition";
import useGetModel from "../../hooks/getModel";
import useGetStateById from "../../hooks/getStateById";
import useGetStatusClassById from "../../hooks/getStatusClassById";
import formatStringDate from "../../utils/formatStringDate";
import { useContext } from "react";
import MapContext from "../../common/contexts/Map";
import Link from "next/link";
import { useRouter } from "next/router";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import styles from "../../../styles/components/Leaflet-map/Leaflet-map.module.scss";

const DEFAULT_CENTER = { lat: -19.151801, lng: -46.007759 };
const DEFAULT_ZOOM = 10;

function LeafletMap() {
  const { equipment, equipmentPositionHistory, equipmentModel }: any =
    useContext(MapContext);

  function GetModel(id: any, equipment: any, equipmentModel: any) {
    return useGetModel(id, equipment, equipmentModel)
      .map((e: any) => e.name)
      .join("");
  }

  function LocationMarker() {
    function pushLocaleToHistory() {
      const locale = map.locate().getCenter();
      const zoom = map.getZoom();
      window.history.pushState(
        null,
        "Mapa",
        `/?lat=${locale.lat}&lng=${locale.lng}&zm=${zoom}`
      );
    }

    const map = useMapEvents({
      mouseup() {
        pushLocaleToHistory();
      },
      mouseout() {
        pushLocaleToHistory();
      },
      zoom() {
        pushLocaleToHistory();
      },
    });
    return <></>;
  }

  const { query } = useRouter();

  return (
    <div
      onChange={(e) => {
        console.log(e.target);
      }}
    >
      <MapContainer
        //@ts-ignore
        center={
          query.lat === undefined || query.lng === undefined
            ? [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng]
            : [query.lat, query.lng]
        }
        //@ts-ignore
        zoom={query.zm === undefined ? DEFAULT_ZOOM : query.zm}
        scrollWheelZoom={true}
        minZoom={3}
        className={styles.map}
      >
        <TileLayer url="https://api.mapbox.com/styles/v1/ufoxy/cl7xj9uzv003m14r3sxlfu4ni/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw" />
        {useGetPosition(equipmentPositionHistory).map((e: any) => {
          const id = e.id;
          const equipmentName = equipment.find((x: any) => x.id === e.id).name;
          const lastUpdate = formatStringDate(new Date(e.position.date));
          const model = GetModel(id, equipment, equipmentModel);
          return (
            <Marker position={[e.position.lat, e.position.lon]} key={id}>
              <Popup>
                <p>{`Name: ${equipmentName}`}</p>
                <p>{`Modelo: ${model}`}</p>
                <p>{`Ultima atualização: ${lastUpdate}`}</p>
                <Link href={`equipamento/${equipmentName}?id=${id}`}>
                  <button>Ver detalhe</button>
                </Link>
              </Popup>
            </Marker>
          );
        })}
        <Marker position={[-19.151801, -46.007759]} draggable={false}>
          <Popup>Hey ! I live here</Popup>
        </Marker>
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default LeafletMap;
