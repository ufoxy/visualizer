import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import styles from '../../styles/components/Map.module.scss'

const DEFAULT_CENTER = { lat: -19.151801, lon: -46.007759 }

const Map = () => {
    return (
        <MapContainer
            center={[DEFAULT_CENTER.lat, DEFAULT_CENTER.lon]}
            zoom={14}
            scrollWheelZoom={false}
            className={styles.map}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            <Marker position={[40.8054, -74.0241]} draggable={true}>
                <Popup>Hey ! I live here</Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;