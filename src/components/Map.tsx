import { MapContainer, TileLayer } from "react-leaflet"
import useAppStore from "../stores/appStore"
import AreaInfoBox from "./AreaInfoBox"
import District from "./District"
import DistrictInfoBox from "./DistrictInfoBox"
import StationArea from "./StationArea"
import StationInfoBox from "./StationInfoBox"
import StationMarker from "./StationMarker"

export default function Map() {
    const stationsData = useAppStore((state) => state.data);

    const stationsAreaGeoJson = useAppStore((state) => state.stationsAreaGeoJson);
    const districtsGeoJson = useAppStore((state) => state.districtsGeoJson);

    return (
        <MapContainer
            placeholder={<h1>Loading...</h1>}
            scrollWheelZoom={true}
            minZoom={8}
            bounds={[[28.45, 33.17], [34.28, 36.69]]}
            maxBounds={[[28.45, 33.17], [34.28, 36.69]]}
            trackResize
        >

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png"
            />


            {stationsAreaGeoJson &&
                stationsAreaGeoJson.features.map((ele: any, i: number) => {
                    return (
                        <StationArea key={i} data={ele} />
                    )
                })}

            {districtsGeoJson &&
                districtsGeoJson.features.map((ele: any, i: number) => {
                    return (
                        <District key={i} data={ele} />
                    )
                })}

            {stationsData.map((station, i) => {
                return (
                    <StationMarker key={station.id} stationData={station} />
                )
            })}

            <div className="info-container">
                <DistrictInfoBox />
                <AreaInfoBox />
                <StationInfoBox />
            </div>
        </MapContainer>
    )
}