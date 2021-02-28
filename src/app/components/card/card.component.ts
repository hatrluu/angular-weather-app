import { Component, Input, OnInit } from '@angular/core';
import { CommonForecastInterface } from 'src/app/interfaces/commonforecast.interface';
import { GetminmaxService } from 'src/app/services/getminmax.service';
import { UnitConversionService } from 'src/app/services/unit-conversion.service';

const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday']
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() weatherInfo: CommonForecastInterface;
  day: string;
  minTemp: number;
  maxTemp: number;

  constructor(private getMinMaxService: GetminmaxService, private unitConversionService: UnitConversionService) { 
    this.day = '';
    this.weatherInfo = {
      temp: 0,
      feels_like: 0,
      weather: [],
      dt: 0
    };
    this.minTemp = this.maxTemp = 0;
  }

  ngOnInit(): void {
    if(this.weatherInfo.dt){
      let day = new Date(this.weatherInfo.dt*1000).getDay()
      this.day = dayOfWeek[day];
    }
    [this.minTemp,this.maxTemp] = this.getMinMaxService.getMinMaxTemp(Object.values(this.weatherInfo.temp));
    this.minTemp = this.unitConversionService.KToF(this.minTemp);
    this.maxTemp = this.unitConversionService.KToF(this.maxTemp);
  }
}
