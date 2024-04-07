import { Component, OnInit, OnDestroy } from '@angular/core';
import { AirPollutionWorldService } from '../air-pollution-world.service';
import { LocationAirQuality } from 'src/app/shared/location-air-pollution.model';
import { Subscription } from 'rxjs';

declare let L: any;

@Component({
  selector: 'app-air-pollution-location-table',
  templateUrl: './air-pollution-location-table.component.html',
  styleUrls: ['./air-pollution-location-table.component.css']
})
export class AirPollutionLocationTable implements OnInit, OnDestroy {
  
  clicked_place: string;
  clicked_coord: number[];

  airQualityDataLocation: Subscription;
  locationsAirQuality: LocationAirQuality[] = [];
  map: any; 

  constructor(private airPollutionWorldService: AirPollutionWorldService) {}

  ngOnInit(): void {
    this.airQualityDataLocation = this.airPollutionWorldService.locationsAirQuality$
      .subscribe(
        (data: LocationAirQuality[]) => {
          this.locationsAirQuality = data;
          console.log('Received location air quality data:', this.locationsAirQuality);
        },
        error => {
          console.error('Error loading location air quality data:', error);
        }
      );
    
  }

  ngOnDestroy(): void {
    this.airQualityDataLocation.unsubscribe(); 
  }

}
