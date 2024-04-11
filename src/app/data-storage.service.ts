import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AirPollutionResponse } from './shared/air-pollution-response.model';
import { environment } from 'src/environments';


@Injectable({
  providedIn: 'root'
})
export class PollutionDataService {
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getAirPollutionData(lat: number, lon: number): Observable<any> {
    const url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
    return this.http.get<AirPollutionResponse>(url);
  }
}
