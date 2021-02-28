import { WeatherInterface } from './weather.interface';

export interface CommonForecastInterface {
    temp: any;
    feels_like: any;
    humidity?: number;
    weather: WeatherInterface[];
    wind_speed?: number;
    dt?: number;
}