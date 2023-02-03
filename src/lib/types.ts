
export interface AppState {
    data: FireStationData[]
    districtsGeoJson: any
    stationsAreaGeoJson: any
    activeDistrict: string | undefined
    activeArea: string | undefined
    activeStation: number | undefined
    setActiveDistrict: (newDistrict: string) => void
    setActiveArea: (newArea: string) => void
    setActiveStation: (newStation: number | undefined) => void
    load: () => Promise<any>
}

export interface FireStationData {
    id: number
    district: string
    regionalStation: string
    station: string
    stationType: "משנה" | "אזורית"
    address: string
    street: string
    geoX: number
    geoY: number
}

export interface ApiResponse {
    success: boolean
    result?: {
        include_total: boolean
        limit: number
        resource_id: string
        records: ApiResponseRecord[]
        fields: any[]
        _links: any[]
    }
}

export interface ApiResponseRecord {
    _id: number
    District: string
    Regional_Station: string
    Station: string
    Station_Type: "משנה" | "אזורית"
    Address: string
    Street: string
    Location: string
    PhoneNumber: string
    Geo_X: string
    Geo_Y: string
    City_Code: string
    Street_Code: string
    EmergencyPhoneNumber: string
    DistrictMail: string
}