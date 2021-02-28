import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnitConversionService {
  constructor() {}

  KToC(temp:number) {
    return Math.round(temp - 273.15);
  }

  KToF(temp:number) {
    return Math.round((temp - 273.15) * 9 / 5 + 32);
  }

  CToF(cel:number) {
    return Math.round((cel * 9 / 5) + 32);
  }

  FToC(fah:number) {
    return Math.round((fah - 32) * 5 / 9);
  }
}
