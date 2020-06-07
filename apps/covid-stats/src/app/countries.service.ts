import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Country {
  'name': string;
  'alpha-2': string;
  'alpha-3': string;
  'country-code': string;
  'iso_3166-2': string;
  'region': string;
  'sub-region': string;
  'intermediate-region': string;
  'region-code': string;
  'sub-region-code': string;
  'intermediate-region-code': string;
}

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  countriesUrl = 'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json'

  countries$ = this.http.get<Country[]>(
    'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json'
  );

  constructor(private http: HttpClient) { }
}
