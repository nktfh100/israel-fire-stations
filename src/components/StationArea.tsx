import { useRef } from "react"
import { GeoJSON, useMap } from "react-leaflet"
import useAppStore from "../stores/appStore"


export default function StationArea({ data }: { data: any }) {
    const elementRef = useRef<any>();

    const activeArea = useAppStore((state) => state.activeArea);
    const setActiveArea = useAppStore((state) => state.setActiveArea);
    const setActiveDistrict = useAppStore((state) => state.setActiveDistrict);
    const setActiveStation = useAppStore((state) => state.setActiveStation);

    const isActive = activeArea == data.properties.FIRE_NAME;

    return (
        <GeoJSON
            ref={elementRef}
            data={data}
            style={{
                weight: 3,
                color: "red",
                fillColor: isActive ? "red" : "transparent"
            }}
            eventHandlers={{
                click: (ev) => {
                    setActiveArea(data.properties.FIRE_NAME);
                    setActiveDistrict(data.properties.district);
                    setActiveStation(undefined);
                }
            }}
        />
    )
}