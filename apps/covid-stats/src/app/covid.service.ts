import { Injectable } from '@angular/core';
import { CountrySlim, CovidApiService, Result } from './covid-api.service';
import { CountriesService } from './countries.service';
import { map, concatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface CNum {
  name: string
  countryCode: string
  numbers: CountrySlim
}

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  countriesNumbers$: Observable<CNum[]> = this.covidApiService
    .latestAllCountries$
    .pipe(concatMap((latestNumbers) => {
        const res: Result = latestNumbers.result
          .reduce((acc, result) => ({ ...acc, ...result }), {});

        return this.countriesService
          .countries$
          .pipe(
            map((countries): CNum[] => countries
              .reduce((acc, country) => {
                const countryCode = country['alpha-3'];
                const numbers = res[countryCode];
                return numbers ? [...acc,
                  { ...country, numbers, countryCode }
                ] : acc;
              }, []))
          );
      }
    ));

  constructor(
    private covidApiService: CovidApiService,
    private countriesService: CountriesService
  ) {
  }

  getLatestForCountry(countryCode: string) {
    return this.covidApiService.getLatestForCountry(countryCode)
      .pipe(
        map((country) => country.result)
      );
  }
}
