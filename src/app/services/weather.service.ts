import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonForecastInterface } from '../interfaces/commonforecast.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


// import mockData = '~src/assets/mockJson.json';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  mockData: any = '/assets/mockJson.json';
  URL: string = 'https://api.openweathermap.org/data/2.5/onecall';
  
  //Geolocation
  lat: string = '';
  lon: string = '';
  
  constructor(private http: HttpClient) { }

  getAllWeather(): Observable<any>{
    const params: any = {
      'lat': this.lat,
      'lon': this.lon,
      'exclude' : 'minutely, alerts',
      'appid' : environment.OPENWEATHERMAP_API
    }
    return this.http.get<any>(this.URL, {params: params, observe: 'response'});
  }

  getCurrentWeather(): Observable<CommonForecastInterface> {
    const params: any = {
      'lat': this.lat,
      'lon': this.lon,
      'exclude' : 'minutely, alerts',
      'appid' : environment.OPENWEATHERMAP_API
    }
    return this.http.get<any>(this.URL, {params: params}).pipe(map(res => res.current as CommonForecastInterface ));
  }

  getHourly(): Observable<any> {
    const params: any = {
      'lat': this.lat,
      'lon': this.lon,
      'exclude' : 'minutely, alerts',
      'appid' : environment.OPENWEATHERMAP_API
    }
    return this.http.get<any>(this.URL, {params: params}).pipe(map(res => res.hourly));
  }

  getDaily(): Observable<any> {
    const params: any = {
      'lat': this.lat,
      'lon': this.lon,
      'exclude' : 'minutely, alerts',
      'appid' : environment.OPENWEATHERMAP_API
    }
    return this.http.get<any>(this.URL, {params: params}).pipe(map(res => res.daily));
  }
}
