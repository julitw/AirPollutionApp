import { Injectable } from '@angular/core';
import { Location } from './location.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationConfigService {

  private locationsSubject = new BehaviorSubject<Location[]>([]);

  get locations$() {
    return this.locationsSubject.asObservable();
  }

  private locations: Location[] = [
    { id: 1, name: 'New York City', latitude: 40.7128, longitude: -74.0060 },
    { id:2, name: 'Tokyo', latitude: 35.6895, longitude: 139.6917 },
    { id:3, name: 'London', latitude: 51.5074, longitude: -0.1278 },
    { id:4, name: 'London', latitude: 48.8566, longitude: 2.3522},
    { id:5, name: 'Sydney', latitude: -33.8688, longitude: 151.2093 },
    { id:6, name: 'Rio de Janeiro', latitude: -22.9068, longitude: -43.1729 },
    { id:8, name: 'Cape Town', latitude: -33.9249, longitude: 18.4241 },
    { id:7, name: 'Dubai', latitude: 25.276987, longitude: 55.296249 },
    { id:9, name: 'Moscow', latitude: 55.7558, longitude: 37.6173 },
    { id:10, name: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
  ];

  constructor() { }

  get_locations(){
    return this.locations
  }
  
  removeLocation(id: number){
    this.locations = this.locations.filter(location => location.id !== id);
    this.locationsSubject.next(this.locations);
  }

  push_locations(location: Location){

    this.locations.push(location);
    this.locationsSubject.next(this.locations)

  }

  generateNewId(): number {
    const highestId = this.locations.reduce((maxId, location) => {
      return location.id > maxId ? location.id : maxId;
    }, 0);

    return highestId + 1;
  }
    
}
