import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  apiKey = '1e73236f14e3ae3662acb668d8acb34d';
  baseUrl = 'http://api.openweathermap.org/geo/1.0/direct';

  constructor(private http: HttpClient) { }

  getCoordinatesByCity(city: string, stateCode: string, countryCode: string, limit: number): Observable<any> {

    const url = `${this.baseUrl}?q=${city},${stateCode},${countryCode}&limit=${limit}&appid=${this.apiKey}`;
    return this.http.get(url);
  }
    

}
