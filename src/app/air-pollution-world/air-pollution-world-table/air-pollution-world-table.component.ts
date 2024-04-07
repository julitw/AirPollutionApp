import { Component, OnInit, OnDestroy } from '@angular/core';
import { AirPollutionWorldService } from '../air-pollution-world.service';
import { LocationAirQuality } from 'src/app/shared/location-air-pollution.model';
import { Subscription } from 'rxjs';

declare let L: any;

@Component({
  selector: 'app-air-pollution-world-table',
  templateUrl: './air-pollution-world-table.component.html',
  styleUrls: ['./air-pollution-world-table.component.css']
})
export class AirPollutionWorldTable implements OnInit, OnDestroy {
  

  airQualityDataLocation: Subscription;
  locationsAirQuality: LocationAirQuality[] = [];
  selectedLocations: LocationAirQuality[] = [];
  selectedLocationsSubscription: Subscription;



  constructor(private airPollutionWorldService: AirPollutionWorldService) {}

  ngOnInit(): void {
    this.airQualityDataLocation = this.airPollutionWorldService.locationsAirQuality$
      .subscribe(
        (data: LocationAirQuality[]) => {
          this.locationsAirQuality = data;
          console.log('TABLE data:', this.locationsAirQuality);
          
        },
        error => {
          console.error('Error loading location air quality data:', error);
        }
      );

      this.selectedLocationsSubscription = this.airPollutionWorldService.selectedLocations$
      .subscribe(
        (selectedLocations: LocationAirQuality[]) => {
          this.selectedLocations = selectedLocations;
          console.log('Selected locations:', this.selectedLocations);
        },
        error => {
          console.error('Error subscribing to selected locations:', error);
        }
      );
    
  }

  sortTable(columnName: string): void {
        this.airPollutionWorldService.sortTable(columnName)
  }


  ngOnDestroy(): void {
    this.airQualityDataLocation.unsubscribe(); 
  }

  toggleSelection(location: LocationAirQuality): void {
    if (this.isSelected(location)) {
      this.airPollutionWorldService.updateSelectedLocations(this.selectedLocations.filter(item => item !== location));
    } else {
      const updatedSelectedLocations = [...this.selectedLocations, location];
      this.airPollutionWorldService.updateSelectedLocations(updatedSelectedLocations);
    }
  }

  isSelected(location: LocationAirQuality): boolean {
    return this.selectedLocations.includes(location);
  }

  show_graphs(){
    console.log(this.selectedLocations)
  }

}
