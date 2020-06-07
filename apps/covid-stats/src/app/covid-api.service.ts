import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CountrySlim {
  confirmed: number
  deaths: number
  recovered: number
}

export interface Result {
  [ x: string ]: CountrySlim
}

interface ApiResponse<T> {
  count: number
  date: Date
  result: T
}

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {
  baseUrl = 'https://covidapi.info/api/v1'
  allCountriesLatestUrl = `${this.baseUrl}/global/latest`
  latestAllCountries$ = this.http
    .get<ApiResponse<Result[]>>(this.allCountriesLatestUrl)

  constructor(private http: HttpClient) { }

  getLatestForCountry(countryCode: string) {
    return  this.http
      .get<ApiResponse<Result>>(`${this.baseUrl}/country/${countryCode}/latest`)
  }
}
