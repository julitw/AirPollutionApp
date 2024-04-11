import { Component, OnInit, OnDestroy } from '@angular/core';
import { AirPollutionWorldService } from '../air-pollution-world.service';
import { LocationAirQuality } from 'src/app/shared/location-air-pollution.model';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationConfigService } from 'src/app/shared/location-config.service';
import { Location } from 'src/app/shared/location.model';

declare let L: any;

@Component({
  selector: 'app-air-pollution-world-map',
  templateUrl: './air-pollution-world-map.component.html',
  styleUrls: ['./air-pollution-world-map.component.css']
})
export class AirPollutionWorldMapComponent implements OnInit, OnDestroy {
  
  clicked_place: string;
  clicked_coord: number[];

  airQualityDataLocation: Subscription;
  locationsAirQuality: LocationAirQuality[] = [];

  
  selectedLocationMapData: Subscription;
  selectedLocationMap: Location[] = [];
  map: any; 

  mapForm: FormGroup;
  formSubmitted: boolean = false;
  
  clickedCoord: { lat: number, lng: number };

  constructor(private airPollutionWorldService: AirPollutionWorldService, private formBuilder: FormBuilder, private locationConfigSerivce: LocationConfigService) {}

  ngOnInit(): void {
    this.airQualityDataLocation = this.airPollutionWorldService.locationsAirQuality$
      .subscribe(
        (data: LocationAirQuality[]) => {
          this.locationsAirQuality = data;
          this.updateMap(); 
        },
        error => {
          console.error('Error loading location air quality data:', error);
        }

      );
      this.mapForm = this.formBuilder.group({
        latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
        longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
        name: ['', [Validators.required]]
      });
      this.initForm();
    this.initMap();
  }

  ngOnDestroy(): void {
    this.airQualityDataLocation.unsubscribe(); 
  }

  updateForm(latitude: number, longitude: number): void {
    this.mapForm.patchValue({
      latitude: latitude,
      longitude: longitude
    });}

  
  private initMap(): void {
    this.map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.updateMap();
  }

  private updateMap(): void {
    if (!this.map) {
      return; 
    }
  
    this.map.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    
    this.locationsAirQuality.forEach(location => {
      let iconUrl: string; 
      const iconSize:[number, number] = [50,50]
      switch (location.airQuality[0].main.aqi) {
        case 1:
          iconUrl = 'assets/marker-icon_blue.png'; // Mały rozmiar dla klasy 1
          break;
        case 2:
          iconUrl = 'assets/marker-icon_green.png'; // Średni rozmiar dla klasy 2
          break;
        case 3:
          iconUrl = 'assets/marker-icon_yellow.png'; // Średni rozmiar dla klasy 3
          break;
        case 4:
          iconUrl = 'assets/marker-icon_orange.png'; // Duży rozmiar dla klasy 4
          break;
        case 5:
          iconUrl = 'assets/marker-icon_red.png'; // Bardzo duży rozmiar dla klasy 5
          break;
        default:
          iconUrl = 'assets/marker-icon_blue.png'; // Domyślny rozmiar
      }

      const customIcon = L.icon({
        iconUrl: iconUrl,
        iconSize: iconSize,
        iconAnchor: [iconSize[0] / 2, iconSize[1]],
        popupAnchor: [0, -iconSize[1] / 2]
      });

      L.marker([location.latitude, location.longitude], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(`<b>${location.name}</b>`)
        .on('click', () => {
          this.clicked_place = location.name 
          const name = location.name
          const id = location.id
          const latitude = location.latitude;
          const longitude = location.longitude;
          const location_clicked: Location = {id,name,latitude, longitude }
          this.airPollutionWorldService.addLocationClickedMap(location_clicked)
        });
    });

    this.map.on('click', (event) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
      this.clickedCoord = { lat: lat, lng: lng };

      this.updateForm(lat, lng);})

  }

  initForm(): void {
    this.mapForm == this.formBuilder.group({
      latitude: ['', [Validators.required, Validators.min(-90), Validators.max(90)]],
      longitude: ['', [Validators.required, Validators.min(-180), Validators.max(180)]],
      name: ['', [Validators.required]]
    });
  }

  onSubmit(){
    if (this.mapForm.valid) {
      const id = this.locationConfigSerivce.generateNewId();
      const latitude = this.mapForm.get('latitude').value;
      const longitude = this.mapForm.get('longitude').value;
      const name = this.mapForm.get('name').value;
      const location: Location = {id, name, latitude, longitude}
      this.locationConfigSerivce.push_locations(location)
      this.mapForm.reset()

  }}
}
