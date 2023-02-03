import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { getData } from '../lib/api'
import { AppState } from '../lib/types'

const useAppStore = create<AppState>()(
    devtools(
        (set) => ({
            data: [],
            districtsGeoJson: undefined,
            stationsAreaGeoJson: undefined,
            activeDistrict: undefined,
            activeArea: undefined,
            activeStation: undefined,
            setActiveDistrict: (newDistrict) => {
                set((_state) => ({ activeDistrict: newDistrict }));
            },
            setActiveArea: (newArea) => {
                set((_state) => ({ activeArea: newArea }));
            },
            setActiveStation: (newStation) => {
                set((_state) => ({ activeStation: newStation }));
            },
            load: async () => {
                const stationsData = await getData();

                const [districtsJson, stationsAreaJson] = await Promise.all([fetch('/districts_wgs84.geojson'), fetch('/stations_area_wgs84.geojson')])
                    .then(async (res) => {
                        return Promise.all(
                            res.map(async (data) => await data.json())
                        )
                    })

                set((_state) => ({ data: stationsData, districtsGeoJson: districtsJson, stationsAreaGeoJson: stationsAreaJson }));
            }
        })
    )
)

export default useAppStore;