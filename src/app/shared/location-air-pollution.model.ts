import { AirQualityData } from "./air-pollution-response.model";

export class LocationAirQuality {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    airQuality: AirQualityData;

    constructor(id: number, name: string, latitude: number, longitude: number, airQuality: AirQualityData) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.airQuality = airQuality;
    }
}


