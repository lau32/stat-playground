import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface CountryNumbers {
  confirmed: number
  deaths: number
  recovered: number
}

interface Result {
  [x: string]: CountryNumbers
}

interface GlobalApiResponse<T> {
  count: number
  date: Date
  result: T[]
}

interface CountryApiResponse<T> {
  count: number
  result: T
}

const BASE_URL = 'https://covidapi.info/api/v1';
export const LATEST_NUMBERS_URL = `${BASE_URL}/global/latest`;
export const LATEST_COUNTRY_NUMBERS_URL = (countryCode: string) => `${BASE_URL}/country/${countryCode}/latest`;

@Injectable()
export class CasesApi {
  constructor(private http: HttpClient) {
  }

  getLatestNumbers() {
    return this.http.get<GlobalApiResponse<Result>>(LATEST_NUMBERS_URL);
  }

  getLatestForCountry(countryCode: string) {
    return this.http
      .get<CountryApiResponse<Result>>(LATEST_COUNTRY_NUMBERS_URL(countryCode));
  }
}
