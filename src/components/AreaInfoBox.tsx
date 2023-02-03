import useAppStore from "../stores/appStore"

export default function AreaInfoBox() {

    const activeArea = useAppStore((state) => state.activeArea);
    const stationsData = useAppStore((state) => state.data);

    if (!activeArea) {
        return null;
    }

    return (
        <div className="info-box area-info-box">
            <p>
                <span>אזור: </span>
                <span>{activeArea}</span>
            </p>
            <p>
                <span>מס' תחנות באזור: </span>
                <span>{stationsData.filter((ele) => ele.regionalStation == activeArea).length}</span>
            </p>
            <p>
                <span>תחנה אזורית: </span>
                <span>{stationsData.find((ele) => ele.regionalStation == activeArea && ele.stationType == "אזורית")?.station}</span>
            </p>
        </div>
    )
}