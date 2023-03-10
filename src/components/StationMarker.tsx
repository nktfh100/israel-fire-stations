import { Marker, Tooltip, useMap } from "react-leaflet"
import { FireStationData } from "../lib/types"
import L from "leaflet"
import { convertGeoPos } from "../lib/utils"
import useAppStore from "../stores/appStore"
import { useCallback, useMemo } from "react"

const iconSize = 30;


export default function StationMarker({ stationData }: { stationData: FireStationData }) {

    const map = useMap();

    const setActiveDistrict = useAppStore((state) => state.setActiveDistrict);
    const setActiveArea = useAppStore((state) => state.setActiveArea);
    const setActiveStation = useAppStore((state) => state.setActiveStation);

    const activeStation = useAppStore((state) => state.activeStation);

    const isActive = stationData.id == activeStation;

    const iconMemo = useMemo(() => {
        return L.icon({
            iconUrl: '/marker.svg',
            iconSize: [iconSize, iconSize],
            iconAnchor: [iconSize / 2, iconSize],
            popupAnchor: [0, -(iconSize / 2)],
            className: "station-icon " + (isActive ? "station-icon--active" : "")
        });
    }, [isActive])

    const wgs84Pos = useMemo(() => convertGeoPos(stationData.geoX, stationData.geoY), [stationData.geoX, stationData.geoY]);

    const handleClick = useCallback((_ev: any) => {
        setActiveDistrict(stationData.district);
        setActiveArea(stationData.regionalStation);
        setActiveStation(stationData.id);
        map.panTo(wgs84Pos);
    }, [setActiveArea, setActiveArea, setActiveStation, stationData.id, wgs84Pos]);

    return (
        <Marker
            key={stationData.id + "" + isActive}
            icon={iconMemo}
            riseOnHover
            title={stationData.station}
            position={wgs84Pos}
            eventHandlers={{
                click: handleClick
            }}
        >
            <Tooltip direction="bottom">
                <p>{stationData.station}</p>
            </Tooltip>
        </Marker>
    )
}
