import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as fromNavigation from './navigation.reducer';
import * as NavigationActions from './navigation.actions';
import { NavigationService } from '../providers/navigation.service';
import { map } from 'rxjs/operators';

@Injectable()
export class NavigationEffects {
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
