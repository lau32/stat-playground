import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { map } from 'rxjs/operators';

import * as fromNavigation from './navigation.reducer';
import * as NavigationActions from './navigation.actions';
import { NavigationService } from '../providers/navigation.service';

@Injectable()
export class NavigationEffects {
  navigated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map(({ payload: { routerState: { root: { firstChild: { params, firstChild } } } } }) =>
        params['countryCode'] || ''),
      map((countryCode) => NavigationActions.loadCountries({ countryCode }))
    )
  );

  loadCountries$ = createEffect(() =>
    this.dataPersistence.fetch(NavigationActions.loadCountries, {
      run: () => {
        return this.navigationService.loadCountries()
          .pipe(
            map((countries) => NavigationActions.loadCountriesSuccess({ countries }))
          );
      },
      onError: (
        action: ReturnType<typeof NavigationActions.loadCountries>,
        error
      ) => NavigationActions.loadCountriesFailure({ error })
    })
  );

  loadLatestNumbers$ = createEffect(() =>
    this.dataPersistence.fetch(NavigationActions.loadLatestNumbers, {
      run: () => this.navigationService.getLatestNumbers()
        .pipe(map(({ result: latestNumbers }) =>
          NavigationActions.loadLatestNumbersSuccess({ latestNumbers }))),
      onError: (
        action: ReturnType<typeof NavigationActions.loadLatestNumbersFailure>,
        error
      ) => NavigationActions.loadLatestNumbersFailure({ error })
    })
  );

  constructor(
    private actions$: Actions,
    private navigationService: NavigationService,
    private dataPersistence: DataPersistence<fromNavigation.NavigationPartialState>
  ) {
  }
}
