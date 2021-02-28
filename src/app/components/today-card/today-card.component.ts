import { Component, OnInit, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { CommonForecastInterface } from 'src/app/interfaces/commonforecast.interface';
import { GetminmaxService } from 'src/app/services/getminmax.service';
import { UnitConversionService } from 'src/app/services/unit-conversion.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-today-card',
  templateUrl: './today-card.component.html',
  styleUrls: ['./today-card.component.scss']
})
export class TodayCardComponent implements OnInit {
  lat:  string;
  lon:  string;
  todayWeather: CommonForecastInterface;
  todayDate: Date;
  todayTemps: number[];
  minTemp: number;
  maxTemp: number;
  haveData: boolean = false;

  constructor(private weatherService: WeatherService, 
      private getMinMaxService: GetminmaxService,
      private unitConversionService: UnitConversionService) {
    this.todayDate = new Date();
    this.todayTemps = [];
    this.todayWeather = {
      temp: 0,
      feels_like: 0,
      weather: []
    };
    this.minTemp = this.maxTemp = 0;
    this.lat = this.lon = '';
  }

  ngOnInit(): void {
    this.initData();
    this.weatherService.getHourly().subscribe(hourly => {
      if(hourly){
        hourly.forEach((hour:any) => {
          if (new Date(hour.dt * 1000).getDate() == this.todayDate.getDate()) {
            this.todayTemps.push(hour.temp);
          }
        });
        [this.minTemp, this.maxTemp] = this.getMinMaxService.getMinMaxTemp(this.todayTemps);
        this.minTemp = this.unitConversionService.KToF(this.minTemp);
        this.maxTemp = this.unitConversionService.KToF(this.maxTemp);
      }
    })
    this.lat = this.weatherService.lat;
    this.lon = this.weatherService.lon;
  }

  initData() {
    this.weatherService.getCurrentWeather().subscribe(today => {
      return this.todayWeather = today;
    });
  }

  get todayDateString() { return this.todayDate.toLocaleString()}
  get todayWeatherTemp() { return (this.todayWeather && this.todayWeather.temp) ? this.unitConversionService.KToF(this.todayWeather.temp) : null };
  get todayWeatherHumidity() { return (this.todayWeather && this.todayWeather.humidity) ? this.todayWeather.humidity : null };
  get todayWeatherWind() { return (this.todayWeather && this.todayWeather.wind_speed) ? this.todayWeather.wind_speed : null };
}
