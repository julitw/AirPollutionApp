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

  private filteredRowSubject = new BehaviorSubject<number[]>([]);
  filteresLocations$ = this.filteredRowSubject.asObservable(); 

  selectedLocationsMap: LocationAirQuality[] = []

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
        this.checkSelectedValue()

        this.loadLocationsAirQuality().subscribe(
          (locationAirQualityArray: LocationAirQuality[]) => {
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

  addLocationClickedMap(location: Location): void {
    const currentLocations = this.locationsAirQualitySubject.getValue()
    var  currentSelectedLocations = this.selectedLocationsSubject.getValue();
    const existingSelectedLocation = currentSelectedLocations.find(loc => loc.id === location.id);
    if (!existingSelectedLocation){
        const newSelectedLocation = currentLocations.find((loc)=> loc.id === location.id)
        currentSelectedLocations.push(newSelectedLocation)
        this.selectedLocationsSubject.next(currentSelectedLocations)
    }
      else{
        currentSelectedLocations = currentSelectedLocations.filter((loc) => loc.id !== location.id)
        this.selectedLocationsSubject.next(currentSelectedLocations)
    }
        
  }

  checkSelectedValue(){
    const currentLocations = this.locationsService.get_locations();
    let selectedLocations = this.selectedLocationsSubject.getValue();
    selectedLocations = selectedLocations.filter(selectedLocation =>
      currentLocations.some(currentLocation => currentLocation.id === selectedLocation.id)
    );
    this.selectedLocationsSubject.next(selectedLocations);
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

  filterTable(fieldsObject: any):number[] {
    const hiddenRows: number[] = [];

    const currentArray = this.locationsAirQualitySubject.getValue();
    const filteredLocations: LocationAirQuality[] = [];

    currentArray.forEach((location: LocationAirQuality, index: number) => {
      let meetsCriteria = true;
  
      for (const key of Object.keys(fieldsObject)) {
        const fieldValue = fieldsObject[key];
  
        if (fieldValue !== false) {
          const fieldName = key.replace('_min', '').replace('_max', '');
  
          if (fieldName in location.airQuality[0].components) {
            const componentValue = location.airQuality[0].components[fieldName];
  
            if (key.endsWith('_min') && componentValue < fieldValue) {
              meetsCriteria = false;
              break;
            }
  
            if (key.endsWith('_max') && componentValue > fieldValue) {
              meetsCriteria = false;
              break;
            }
          }
        }
      }
  
      if (!meetsCriteria) {
        const x = location.id
        hiddenRows.push(index); 
      }
    });
  
    this.filteredRowSubject.next(hiddenRows)
    return hiddenRows;
  }

  resetFilters(){
    this.filteredRowSubject.next([])
  }



  updateSelectedLocations(locations: LocationAirQuality[]): void {
            this.selectedLocationsSubject.next(locations);
  }

  getSelectedLocations(){
        return this.selectedLocationsSubject.getValue()
    }


}
