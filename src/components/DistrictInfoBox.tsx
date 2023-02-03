import useAppStore from "../stores/appStore"

export default function DistrictInfoBox() {

    const activeDistrict = useAppStore((state) => state.activeDistrict);
    const stationsData = useAppStore((state) => state.data);
    const stationsAreas = useAppStore((state) => state.stationsAreaGeoJson);

    if (!activeDistrict) {
        return null;
    }

    return (
        <div className="info-box district-info-box">
            <p>
                <span>מחוז: </span>
                <span>{activeDistrict}</span>
            </p>
            <p>
                <span>מס' תחנות במחוז: </span>
                <span>{stationsData.filter((ele) => ele.district == activeDistrict).length}</span>
            </p>
            <p>
                <span>מס' אזורים: </span>
                <span> {stationsAreas?.features.filter((ele: any) => ele.properties.district == activeDistrict).length}</span>
            </p>
        </div>
    )
}