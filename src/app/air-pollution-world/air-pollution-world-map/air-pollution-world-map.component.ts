import { Component, OnInit, OnDestroy } from '@angular/core';
import { AirPollutionWorldService } from '../air-pollution-world.service';
import { LocationAirQuality } from 'src/app/shared/location-air-pollution.model';
import { Subscription } from 'rxjs';

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
  map: any; 

  constructor(private airPollutionWorldService: AirPollutionWorldService) {}

  ngOnInit(): void {
    this.airQualityDataLocation = this.airPollutionWorldService.locationsAirQuality$
      .subscribe(
        (data: LocationAirQuality[]) => {
          this.locationsAirQuality = data;
          console.log('Received location air quality data:', this.locationsAirQuality);
          this.updateMap(); 
        },
        error => {
          console.error('Error loading location air quality data:', error);
        }
      );
    
    this.initMap();
  }

  ngOnDestroy(): void {
    this.airQualityDataLocation.unsubscribe(); 
  }

  

  
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
      let iconSize: [number, number]; 
      switch (location.airQuality[0].main.aqi) {
        case 1:
          iconSize = [25, 41]; // Mały rozmiar dla klasy 1
          break;
        case 2:
          iconSize = [30, 50]; // Średni rozmiar dla klasy 2
          break;
        case 3:
          iconSize = [35, 60]; // Średni rozmiar dla klasy 3
          break;
        case 4:
          iconSize = [40, 70]; // Duży rozmiar dla klasy 4
          break;
        case 5:
          iconSize = [45, 80]; // Bardzo duży rozmiar dla klasy 5
          break;
        default:
          iconSize = [25, 41]; // Domyślny rozmiar
      }

      const customIcon = L.icon({
        iconUrl: 'assets/marker-icon.png',
        iconSize: iconSize,
        iconAnchor: [iconSize[0] / 2, iconSize[1]],
        popupAnchor: [0, -iconSize[1] / 2]
      });

      L.marker([location.latitude, location.longitude], { icon: customIcon })
        .addTo(this.map)
        .bindPopup(`<b>${location.name}</b>`)
        .on('click', () => {
          this.clicked_place = location.name;
          console.log(this.clicked_place);
        });
    });

    this.map.on('click', (event) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
      this.clicked_coord = [lat,lng]})

  }
}
