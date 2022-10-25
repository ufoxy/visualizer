import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  LayersControl,
  LayerGroup,
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

const { BaseLayer, Overlay } = LayersControl;

// Basic: https://api.mapbox.com/styles/v1/ufoxy/cl7xjsprk008t15lgay2bk8gf/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw
// Outdoors: https://api.mapbox.com/styles/v1/ufoxy/cl7xj9uzv003m14r3sxlfu4ni/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw
// Dark: https://api.mapbox.com/styles/v1/ufoxy/cl7xjyti800by15ryoins5lis/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw

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
        <LayersControl position="bottomleft">
          <BaseLayer name="Outdoors Layer" checked>
            <LayerGroup>
              <TileLayer url="https://api.mapbox.com/styles/v1/ufoxy/cl7xj9uzv003m14r3sxlfu4ni/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw" />
              <LayersControl.Overlay name="Ativar/Desativar Ícones" checked>
                <LayerGroup>
                  {useGetPosition(equipmentPositionHistory).map((e: any) => {
                    const id = e.id;
                    const equipmentName = equipment.find(
                      (x: any) => x.id === e.id
                    ).name;
                    const lastUpdate = formatStringDate(
                      new Date(e.position.date)
                    );
                    const model = GetModel(id, equipment, equipmentModel);
                    return (
                      <Marker
                        position={[e.position.lat, e.position.lon]}
                        key={id}
                      >
                        <Popup>
                          <div className={styles.div}>
                            <h2
                              className={styles.h2}
                            >{`Nome: ${equipmentName}`}</h2>
                            <h3 className={styles.h3}>{`Modelo: ${model}`}</h3>
                            <p
                              className={styles.p}
                            >{`Ultima atualização: ${lastUpdate}`}</p>
                          </div>
                          <Link href={`equipamento/${equipmentName}?id=${id}`}>
                            <button className={styles.button}>
                              Ver detalhes
                            </button>
                          </Link>
                        </Popup>
                      </Marker>
                    );
                  })}
                </LayerGroup>
              </LayersControl.Overlay>
            </LayerGroup>
          </BaseLayer>
        </LayersControl>
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default LeafletMap;
