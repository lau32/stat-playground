import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationEntity } from '../+state/navigation.models';
import { Country } from '../../country';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  COUNTRIES_URL = 'https://raw.githubusercontent.com/lukes/ISO-3166-Countries-with-Regional-Codes/master/all/all.json';

  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.COUNTRIES_URL);
  }

  getCamelCaseCountries(): Observable<NavigationEntity[]> {
    return this.getCountries()
      .pipe(
        map((countries) => countries
          .map((country) => this.mapKeyToCamelCase(country) as NavigationEntity))
      );
  }

  mapKeyToCamelCase(entity: object): object {
    return Object.entries(entity)
      .map(([key, value]) => [toCamel(key), value])
      .reduce((acc, val) => ({ ...acc, [val[0]]: val[1] }), {});
  }
}

function toCamel(s) {
  return s.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
      .replace('-', '')
      .replace('_', '');
  });
}
