import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import useGetPosition from "../../hooks/getPosition";
import formatStringDate from "../../utils/formatStringDate";
import Link from "next/link";
import useGetModel from "../../hooks/getModel";
import useGetStateById from "../../hooks/getStateById";
import useGetStatusClassById from "../../hooks/getStatusClassById";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import styles from "../../../styles/components/Leaflet-map/Leaflet-map.module.scss";
import { useContext } from "react";
import MapContext from "../../common/contexts/Map";

const DEFAULT_CENTER = { lat: -19.151801, lon: -46.007759 };

function LeafletMap() {
  const { equipment, equipmentPositionHistory, equipmentModel }: any =
    useContext(MapContext);

  function GetModel(id: any, equipment: any, equipmentModel: any) {
    return useGetModel(id, equipment, equipmentModel)
      .map((e: any) => e.name)
      .join("");
  }

  return (
    <MapContainer
      center={[DEFAULT_CENTER.lat, DEFAULT_CENTER.lon]}
      zoom={14}
      scrollWheelZoom={false}
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
    </MapContainer>
  );
}

export default LeafletMap;