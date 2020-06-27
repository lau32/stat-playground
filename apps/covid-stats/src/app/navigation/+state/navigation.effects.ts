import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as fromNavigation from './navigation.reducer';
import * as NavigationActions from './navigation.actions';
import { NavigationService } from '../providers/navigation.service';
import { map } from 'rxjs/operators';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { EMPTY } from 'rxjs';

@Injectable()
export class NavigationEffects {
  navigated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map(() => NavigationActions.loadCountries())
    )
  );

  loadCountries$ = createEffect(() =>
    this.dataPersistence.fetch(NavigationActions.loadCountries, {
      run: () => {
        return this.navigationService.getCamelCaseCountries()
          .pipe(
            map((countries) => NavigationActions.loadCountriesSuccess({ countries }))
          );
      },

      onError: (
        action: ReturnType<typeof NavigationActions.loadNavigation>,
        error
      ) => NavigationActions.loadNavigationFailure({ error })
    })
  );

  loadLatestNumbers$ = createEffect(() =>
    this.dataPersistence.fetch(NavigationActions.loadCountriesSuccess, {
      run: () => EMPTY
      // this.navigationService.getLatestNumbers()
      ,
      onError: (
        action: ReturnType<typeof NavigationActions.loadNavigation>,
        error
      ) => NavigationActions.loadNavigationFailure({ error })
    })
  );

  constructor(
    private actions$: Actions,
    private navigationService: NavigationService,
    private dataPersistence: DataPersistence<fromNavigation.NavigationPartialState>
  ) {
  }
}
