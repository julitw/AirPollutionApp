import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { AirPollutionWorldService } from '../air-pollution-world.service';
import { LocationAirQuality } from 'src/app/shared/location-air-pollution.model';
import { Subscription } from 'rxjs';
import Chart from 'chart.js/auto';



@Component({
  selector: 'app-air-pollution-world-figures',
  templateUrl: './air-pollution-world-figures.component.html',
  styleUrls: ['./air-pollution-world-figures.component.css']
})
export class AirPollutionWorldFigures implements OnInit {
  
  selectedLocations: LocationAirQuality[] = [];
  selectedLocationsSubscription: Subscription;

  airQualityDataLocation: Subscription;
  locationsAirQuality: LocationAirQuality[] = [];


  @ViewChild('chart') chartElementRef: ElementRef;
  @ViewChild('chartMain') chartMainElementRef: ElementRef;

  chart : Chart
  
  chartMain : Chart

  isViewInit = false;

  constructor(private airPollutionWorldService: AirPollutionWorldService) {}

  ngOnInit(): void {
    this.airQualityDataLocation = this.airPollutionWorldService.locationsAirQuality$
    .subscribe(
      (data: LocationAirQuality[]) => {
        this.locationsAirQuality = data;
      },
      error => {
        console.error('Error loading location air quality data:', error);
      }
    )
        
  }
  ngAfterViewInit() {
    this.selectedLocationsSubscription = this.airPollutionWorldService.selectedLocations$
      .subscribe(
        (selectedLocations: LocationAirQuality[]) => {
          this.selectedLocations = selectedLocations;
            if (this.selectedLocations.length >= 0){
                this.createChart()
            }
        },
        error => {
          console.error('Error subscribing to selected locations:', error);
        }
      );
  }

  createChart() {
    const existingChart = Chart.getChart(this.chartElementRef.nativeElement);
    const existingChartMain = Chart.getChart(this.chartMainElementRef.nativeElement);
    if (existingChart) {
        existingChart.destroy();
    }
    if (existingChartMain) {
      existingChartMain.destroy();
  }

    const locationColors = [
        'rgba(255, 99, 132, 0.6)',   
        'rgba(54, 162, 235, 0.6)',  
        'rgba(255, 206, 86, 0.6)',   
        'rgba(75, 192, 192, 0.6)',  
        'rgba(153, 102, 255, 0.6)', 
        'rgba(255, 159, 64, 0.6)' ,   
        'rgba(153, 182, 255, 0.6)',  
        'rgba(255, 199, 64, 0.6)'   
    ];


    const datasets_co = [];
    const labels_co = [];
    const componentLabels_co = ['co'];

    this.selectedLocations.forEach((location, i) => {
        const airQuality = location.airQuality[0].components;
        const componentValues = componentLabels_co.map((label) => airQuality[label]);
        labels_co.push(location.name);

        datasets_co.push({
            label: location.name,
            data: componentValues,
            backgroundColor: locationColors[i], 
            borderColor: 'rgba(54, 162, 235, 1)', 
            borderWidth: 1
        });
    });

    const context_co = this.chartElementRef.nativeElement;
    const chart_co = new Chart(context_co, {
        type: 'bar',
        data: {
            labels: componentLabels_co, 
            datasets: datasets_co
        },
        options: {
            aspectRatio: 2.5,
            scales: {
                y: {
                    beginAtZero: true 
                }
            }
        }
    });



    const datasets = [];
    const labels = [];
    const componentLabels = ['no', 'nh3', 'no2', 'pm10', 'so2', 'o3', 'pm2_5'];

    this.selectedLocations.forEach((location, i) => {
        const airQuality = location.airQuality[0].components;
        const componentValues = componentLabels.map((label) => airQuality[label]);
        labels.push(location.name);

        datasets.push({
            label: location.name,
            data: componentValues,
            backgroundColor: locationColors[i], 
            borderColor: 'rgba(54, 162, 235, 1)', 
            borderWidth: 1
        });
    });

    const context = this.chartMainElementRef.nativeElement;
    const chart = new Chart(context, {
        type: 'bar',
        data: {
            labels: componentLabels, 
            datasets: datasets
        },
        options: {
            aspectRatio: 2.5,
            scales: {
                y: {
                    beginAtZero: true 
                }
            }
        }
    });
    }
}
