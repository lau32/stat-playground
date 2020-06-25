import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as fromNavigation from './navigation.reducer';
import * as NavigationActions from './navigation.actions';
import { NavigationService } from '../providers/navigation.service';
import { map } from 'rxjs/operators';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';

@Injectable()
export class NavigationEffects {
  loadCountries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map(() => NavigationActions.loadCountries())
    )
  );

  loadNavigation$ = createEffect(() =>
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
      ) => {
        console.error('Error', error);
        return NavigationActions.loadNavigationFailure({ error });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private navigationService: NavigationService,
    private dataPersistence: DataPersistence<fromNavigation.NavigationPartialState>
  ) {
  }
}
