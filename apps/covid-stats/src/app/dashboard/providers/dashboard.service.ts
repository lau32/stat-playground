import { Injectable } from '@angular/core';
import { CasesApi } from '../../core/providers/cases.api';
import { map } from 'rxjs/operators';

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
}
