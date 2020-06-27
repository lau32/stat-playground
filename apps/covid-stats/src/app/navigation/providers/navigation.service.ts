import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavigationEntity } from '../+state/navigation.models';
import { NavigationApi } from './navigation.api';
import { CasesApi } from '../../core/providers/cases.api';

@Injectable()
export class NavigationService {
  constructor(
    private navigationApi: NavigationApi,
    private casesApi: CasesApi,
    ) {
  }

  getLatestNumbers() {
    return this.casesApi.getLatestNumbers()
  }

  getCamelCaseCountries(): Observable<NavigationEntity[]> {
    return this.navigationApi.getCountries()
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
