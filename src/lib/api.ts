import { ApiResponse, ApiResponseRecord, FireStationData } from "./types"

export async function getData(): Promise<FireStationData[]> {
    // Taken from "https://data.gov.il/api/3/action/datastore_search?resource_id=230fcb10-b032-43e8-bb0b-6ed143253daa&limit=500"
    let response = await fetch("/stations_locations.json");
    if (!response.ok) {
        alert("API error: " + response.status);
        return [];
    }

    let json: ApiResponse = await response.json();

    if (!json || !json.result || !json.success) {
        alert("API error: " + response.status)
        return [];
    }

    const stationsData = parseStations(json.result.records);

    return stationsData;

}

export function parseStations(apiData: ApiResponseRecord[]): FireStationData[] {
    const data = [] as FireStationData[];

    for (const station of apiData) {
        const parsedStationData = parseStationData(station);
        if (parsedStationData) {
            data.push(parsedStationData);
        }
    }

    return data;
}

export function parseStationData(stationApiData: ApiResponseRecord): FireStationData | undefined {

    if (!stationApiData["Station"]) {
        return undefined;
    }

    const data: FireStationData = {
        id: stationApiData['_id'],
        address: stationApiData['Address'],
        district: stationApiData['District'],
        regionalStation: stationApiData['Regional_Station'],
        station: stationApiData['Station'],
        stationType: stationApiData['Station_Type'],
        street: stationApiData['Street'],
        geoX: parseInt(stationApiData['Geo_X']),
        geoY: parseInt(stationApiData['Geo_Y'])
    };

    return data;
}