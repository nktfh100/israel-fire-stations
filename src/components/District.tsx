import { useEffect, useRef } from "react"
import { GeoJSON } from "react-leaflet"
import useAppStore from "../stores/appStore"


export default function District({ data }: { data: any }) {
    const elementRef = useRef<any>();

    const activeDistrict = useAppStore((state) => state.activeDistrict);

    const isActive = activeDistrict == data.properties.district;

    useEffect(() => {
        if (elementRef.current && isActive) {
            elementRef.current.bringToFront();
        }
    }, [elementRef.current, activeDistrict])

    return (
        <GeoJSON
            ref={elementRef}
            data={data}
            style={{
                fillColor: isActive ? "#3388ff" : "transparent",
                weight: 3,
                color: isActive ? "black" : "#3388ff",
                interactive: false
            }}
        />
    )
}