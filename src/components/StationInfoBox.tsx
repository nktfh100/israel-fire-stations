import useAppStore from "../stores/appStore"

export default function StationInfoBox() {

    const activeStation = useAppStore((state) => state.activeStation);
    const stationsData = useAppStore((state) => state.data);

    if (activeStation == undefined) {
        return null;
    }

    const stationData = stationsData.find((ele) => ele.id == activeStation);

    return (
        <div className="info-box station-info-box">
            <p>
                <span>תחנה: </span>
                <span>{stationData?.station}</span>
            </p>
            <p>
                <span>כתובת: </span>
                <span>{stationData?.address || stationData?.station}</span>
            </p>
            <p>
                <span>סוג תחנה: </span>
                <span>{stationData?.stationType}</span>
            </p>
        </div>
    )
}