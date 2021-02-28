import { Component, OnInit } from '@angular/core';
import { CommonForecastInterface } from 'src/app/interfaces/commonforecast.interface';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})

export class ForecastComponent implements OnInit {
  dailyWeather: CommonForecastInterface[];

  constructor(private weatherService: WeatherService) {
    this.dailyWeather = [];
  }

  ngOnInit(): void { 
    this.initData();
  }

  initData() {
    this.weatherService.getDaily().subscribe(data => {
        return this.dailyWeather = data.slice(1,5);
    })
  }
}
