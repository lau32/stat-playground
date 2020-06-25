import { Injectable } from '@angular/core';
import {  CovidApiService } from './covid-api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  constructor(private covidApiService: CovidApiService) { }

  getLatestForCountry(countryCode: string) {
    return this.covidApiService.getLatestForCountry(countryCode)
      .pipe(
        map((country) => country.result)
      );
  }
}
