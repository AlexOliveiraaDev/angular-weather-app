import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';





@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.scss'
})
export class CurrentWeatherComponent implements OnInit {
  constructor(private weatherService: WeatherService, private http: HttpClient) { }
  coordinates: any;
  lat: string = '';
  lon: string = '';
  weatherData: any;
  apiKey = this.weatherService.apiKey;
  weatherDescription: string = '';
  weatherTemp: number = 0;
  weatherIcon: string = '';

  value = '';

  ngOnInit(): void {
    this.getCoordinates();

  }
  getCoordinates(): void {
    const city = this.value;
    const stateCode = ''; // Se não for para os EUA, deixe vazio
    const countryCode = 'BR'; // Código do país (por exemplo, BR para Brasil)
    const limit = 5; // Limite de resultados

    this.weatherService.getCoordinatesByCity(city, stateCode, countryCode, limit)
      .subscribe(data => {

        if (data && data.length > 0) {
          this.coordinates = data[0];
          this.lat = data[0].lat;
          this.lon = data[0].lon;
          this.getWeather(this.lat, this.lon).subscribe(data => {
            this.weatherData = data;
            this.weatherTemp = Math.floor(data.main.temp);
            this.weatherIcon = data.weather[0].icon;
            switch (data.weather[0].description) {
              case 'clear sky':
                this.weatherDescription = 'Céu limpo e sem nuvens.';
                break;
              case 'few clouds':
                this.weatherDescription = 'Algumas nuvens esparsas pelo céu.';
                break;
              case 'scattered clouds':
                this.weatherDescription = 'Nuvens dispersas no céu.';
                break;
              case 'broken clouds':
                this.weatherDescription = 'Nuvens fragmentadas cobrindo o céu.';
                break;
              case 'shower rain':
                this.weatherDescription = 'Chuva passageira.';
                break;
              case 'rain':
                this.weatherDescription = 'Chuva contínua.';
                break;
              case 'thunderstorm':
                this.weatherDescription = 'Tempestade com trovões e relâmpagos.';
                break;
              case 'snow':
                this.weatherDescription = 'Neve caindo.';
                break;
              case 'mist':
                this.weatherDescription = 'Névoa cobrindo a paisagem.';
                break;
              default:
                this.weatherDescription = 'Condições meteorológicas desconhecidas.';
            }


          });
        }
      });
  }

  getWeather(lat: string, lon: string): Observable<any> {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
    console.log('URL da requisição:', url);

    return this.http.get(url);
  }

  buttonClicked() {
    this.getCoordinates()
  }
}
