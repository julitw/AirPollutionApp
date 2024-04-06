import { Component, OnInit } from '@angular/core';
import { PollutionDataService } from '../data-storage.service';
import { AirPollutionResponse, AirQualityData } from '../shared/air-pollution-response.model';
import { AirPollutionWorldService } from './air-pollution-world.service';
import { Subscription } from 'rxjs';
import { LocationAirQuality } from '../shared/location-air-pollution.model';
import { Location } from '../shared/location.model';
import { LocationConfigService } from '../shared/location-config.service';

@Component({
  selector: 'app-air-pollution-world',
  templateUrl: './air-pollution-world.component.html',
  styleUrls: ['./air-pollution-world.component.css']
})
export class AirPollutionWorldComponent implements OnInit {
  latitude: number;
  longitude: number;

  nameLocation: string;
  latitudeLocation: number;
  longitudeLocation: number;

  airQualityData: AirQualityData[] = [];
  airQualityDataSubscription: Subscription;
  locationsAirQuality: LocationAirQuality[] = [];


  constructor(private airPollutionWorldService: AirPollutionWorldService, private locationConfigService: LocationConfigService) {}

  ngOnInit(): void {
    this.airQualityDataSubscription = this.airPollutionWorldService.airQualityData$
      .subscribe((data) => {
        this.airQualityData = data;
      });
  }

  onSubmit(): void {
      this.airPollutionWorldService.getData(this.latitude, this.longitude);
      this.latitude = null;
      this.longitude = null;

  }

  addLocalization(){
    const id = this.locationConfigService.generateNewId();
    const name = this.nameLocation
    const latitude = this.latitudeLocation
    const longitude =this.longitudeLocation
    const location: Location = {id, name, latitude, longitude}
    this.locationConfigService.push_locations(location)
    this.nameLocation = '';
    this.latitudeLocation = null;
    this.longitudeLocation = null;
    
  }

  ngOnDestroy(): void {
    if (this.airQualityDataSubscription) {
      this.airQualityDataSubscription.unsubscribe();
    }
    
  }
}