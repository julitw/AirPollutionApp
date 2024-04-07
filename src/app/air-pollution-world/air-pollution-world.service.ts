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

  private selectedLocationsSubject = new BehaviorSubject<LocationAirQuality[]>([]);
    selectedLocations$ = this.selectedLocationsSubject.asObservable();

  private locations: Location[] = [];
  private locationsSubscription: Subscription;

  columnSortDirections: { [key: string]: boolean } = {
    id: true,      
    name: true,   
    aqi: true,     
    co: true,      
    no: true,     
    no2: true,     
    o3: true,      
    so2: true,     
    pm2_5: true,   
    pm10: true,    
    nh3: true     
  };

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

  removeLastElement() {

    const currentArray = this.locationsAirQualitySubject.getValue();
    console.log("Filter", currentArray[0].airQuality[0].main.aqi)
    const filteredLocations = currentArray.filter(location => location.name==='London' )
    currentArray.sort((a,b) => {
      return a.id - b.id
    })
    console.log(filteredLocations)
    if (currentArray.length > 0) {
      const newArray = currentArray.slice(0, -1); 
      this.locationsAirQualitySubject.next(newArray);
    } else {
      console.log('Tablica jest pusta, nie można usunąć ostatniego elementu.');
    }
  }


  sortTable(columnName: string) {
    const currentArray = this.locationsAirQualitySubject.getValue();

    const sortFunctions: { [key: string]: (a: any, b: any) => number } = {
      id: (a, b) => a.id - b.id,
      name: (a, b) => a.name.localeCompare(b.name),
      aqi: (a, b) =>  a.airQuality[0].main.aqi - +b.airQuality[0].main.aqi,
      co: (a, b) => a.airQuality[0].components.co - b.airQuality[0].components.co,
      no: (a, b) => a.airQuality[0].components.no - b.airQuality[0].components.no,
      no2: (a, b) => a.airQuality[0].components.no2 - b.airQuality[0].components.no2,
      o3: (a, b) => a.airQuality[0].components.o3 - b.airQuality[0].components.o3,
      so2: (a, b) => a.airQuality[0].components.so2 - b.airQuality[0].components.so2,
      pm2_5: (a, b) => a.airQuality[0].components.pm2_5 - b.airQuality[0].components.pm2_5,
      pm10: (a, b) => a.airQuality[0].components.pm10 - b.airQuality[0].components.pm10,
      nh3: (a, b) => a.airQuality[0].components.nh3 - b.airQuality[0].components.nh3
    };
  
    const isClicked = this.columnSortDirections[columnName];
    const sortDirection = isClicked ? 1 : -1;

    currentArray.sort((a, b) => sortFunctions[columnName](a, b) * sortDirection);

    this.columnSortDirections[columnName] = !isClicked;
  
    this.locationsAirQualitySubject.next(currentArray);
  }

    updateSelectedLocations(locations: LocationAirQuality[]): void {
            this.selectedLocationsSubject.next(locations);
            }

    getSelectedLocations(){
        return this.selectedLocationsSubject.getValue()
    }

}
