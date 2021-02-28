import { Injectable } from '@angular/core';
import { CommonForecastInterface } from '../interfaces/commonforecast.interface';

@Injectable({
  providedIn: 'root'
})
export class GetminmaxService {

  constructor() { }

  getMinMaxTemp(temp_array:number[]):number[] {
    let min, max;
    min = Math.min(...temp_array);
    max = Math.max(...temp_array);
    
    return [ min, max ];
  }
}
