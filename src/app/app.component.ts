import { Component, OnInit } from '@angular/core';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Weather App';
  haveGeo: boolean = false;
  constructor(private weatherService: WeatherService){ }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition((data)=>{
      this.weatherService.lat = data.coords.latitude.toString();
      this.weatherService.lon = data.coords.longitude.toString();
      this.haveGeo = true;
    })
  }
}
