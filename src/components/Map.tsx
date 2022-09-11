import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import styles from '../../styles/components/Map.module.scss'

const DEFAULT_CENTER = { lat: -19.151801, lon: -46.007759 }

// Basic: https://api.mapbox.com/styles/v1/ufoxy/cl7xjsprk008t15lgay2bk8gf/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw
// Outdoors: https://api.mapbox.com/styles/v1/ufoxy/cl7xj9uzv003m14r3sxlfu4ni/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw
// Dark: https://api.mapbox.com/styles/v1/ufoxy/cl7xjyti800by15ryoins5lis/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw

const Map = () => {
    return (
        <MapContainer
            center={[DEFAULT_CENTER.lat, DEFAULT_CENTER.lon]}
            zoom={14}
            scrollWheelZoom={false}
            className={styles.map}
        >
            <TileLayer
                url="https://api.mapbox.com/styles/v1/ufoxy/cl7xj9uzv003m14r3sxlfu4ni/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidWZveHkiLCJhIjoiY2w3d2hsOTlsMGhvNTN2b2F5bHlhNGU2bSJ9.ux0VWarP69sXVXtiHXOjkw"
            />
            <Marker position={[40.8054, -74.0241]} draggable={true}>
                <Popup>Hey ! I live here</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;