
import proj4 from 'proj4'

const ITM = "+proj=tmerc +lat_0=31.7343936111111 +lon_0=35.2045169444444 +k=1.0000067 +x_0=219529.584 +y_0=626907.39 +ellps=GRS80 +towgs84=23.772,17.49,17.859,0.3132,1.85274,-1.67299,-5.4262 +units=m +no_defs +type=crs";
const W84 = "+proj=longlat +datum=WGS84 +no_defs +type=crs";

// Convert from coordinate system of EPSG:2039 (israel) to EPSG:4326 (gps)
export function convertGeoPos(geoX: number, geoY: number): [number, number] {
    if (typeof geoX != "number") {
        return [0, 0];
    }

    const result: [number, number] = proj4(ITM, W84, [geoX, geoY]);

    return adjustPosition(result[1], result[0]);
}


// https://gis.stackexchange.com/a/2980
// markers are offset from the actual location, so we move them a little bit
export function adjustPosition(geoX: number, geoY: number): [number, number] {
    //Coordinate offsets in radians
    const R = 6378137;

    //offsets in meters
    const dn = 100;
    const de = 110;

    //Coordinate offsets in radians
    const dLat = dn / R;
    const dLon = de / (R * Math.cos(Math.PI * geoX / 180));

    //OffsetPosition, decimal degrees
    const latO = geoX + dLat * 180 / Math.PI;
    const lonO = geoY + dLon * 180 / Math.PI;

    return [latO, lonO];
}