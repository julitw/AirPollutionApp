import { Injectable, OnInit } from "@angular/core";
import { PollutionDataService } from "../data-storage.service";
import { AirQualityData } from "../shared/air-pollution-response.model";
import { BehaviorSubject, Observable, Subscription, forkJoin } from "rxjs";
import { LocationConfigService } from "../shared/location-config.service";
import { Location } from 'src/app/shared/location.model';
import { LocationAirQuality } from "../shared/location-air-pollution.model";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AirPollutionWorldService {

  private airQualityDataSubject = new BehaviorSubject<AirQualityData[]>([]);
  airQualityData$ = this.airQualityDataSubject.asObservable();

  private locationsAirQualitySubject = new BehaviorSubject<LocationAirQuality[]>([]);
  locationsAirQuality$ = this.locationsAirQualitySubject.asObservable();

  private locations: Location[] = [];
  private locationsSubscription: Subscription;

  constructor(private pollutionDataService: PollutionDataService, private locationsService: LocationConfigService) {
    this.locationsSubscription = this.locationsService.locations$.subscribe(
      (locations: Location[]) => {
        console.log('Locations updated:', locations);

        this.loadLocationsAirQuality().subscribe(
          (locationAirQualityArray: LocationAirQuality[]) => {
            console.log("x", locationAirQualityArray)
          },
          (error) => {
            console.error('Error loading location air quality data:', error);
          }
        );
      }
    );
  }


loadLocationsAirQuality(): Observable<LocationAirQuality[]> {
    this.locations = this.locationsService.get_locations();
    console.log('locationnnn', this.locations);

    const requests: Observable<LocationAirQuality>[] = [];

    this.locations.forEach(location => {
      const request = this.pollutionDataService.getAirPollutionData(location.latitude, location.longitude).pipe(
        map(response => {
          return new LocationAirQuality(
            location.id,
            location.name,
            location.latitude,
            location.longitude,
            response.list
          );
        })
      );
      requests.push(request);
    });

    return new Observable(observer => {
      forkJoin(requests).subscribe(
        (locationAirQualityArray: LocationAirQuality[]) => {
          this.locationsAirQualitySubject.next(locationAirQualityArray);
          console.log('Received location air quality data:', locationAirQualityArray);
          observer.next(locationAirQualityArray); 
          observer.complete();
        },
        (error) => {
          console.error('Error fetching location air quality data:', error);
          observer.error(error); 
        }
      );
    });
  }

  getData(latitude: number, longitude: number): void {
    this.pollutionDataService.getAirPollutionData(latitude, longitude)
      .subscribe(
        (response) => {
          this.airQualityDataSubject.next(response.list);
        },
        (error) => {
          console.error('Error fetching pollution data:', error);
        }
      );
  }

  getLocations(): Location[] {
    return this.locationsService.get_locations();
  }
  getLocationAirPollution(){
    this.loadLocationsAirQuality()
  }

}
