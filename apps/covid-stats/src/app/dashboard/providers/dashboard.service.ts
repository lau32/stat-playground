import { Injectable } from '@angular/core';
import { CasesApi } from '../../core/providers/cases.api';
import { concatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TimeSeriesData } from '../models/timeseries.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private covidApiService: CasesApi) {
  }

  getLatestForCountry(countryCode: string) {
    return this.covidApiService.getLatestForCountry(countryCode)
      .pipe(
        map((country) => country.result)
      );
  }

  getLatestTimeSeries(countryCode: string): Observable<TimeSeriesData[]> {
    return this.covidApiService.getLatestDate()
      .pipe(
        concatMap((latestDate: string) => this.covidApiService.getLatestTimeSeries(countryCode, latestDate))
      );
  }
}
