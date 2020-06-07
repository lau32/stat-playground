import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as fromDashboard from './dashboard.reducer';
import * as DashboardActions from './dashboard.actions';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { filter, map, tap } from 'rxjs/operators';
import { CovidApiService } from '../../covid-api.service';

@Injectable()
export class DashboardEffects {
  urlCountryCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map(({ payload: { routerState: { root: { firstChild: { params } } } } }) => params),
      tap(console.log),
      filter(({ countryCode }) => !!countryCode),
      map(({ countryCode }) => DashboardActions.loadDashboard({ payload: { countryCode } }))
    )
  );

  loadDashboard$ = createEffect(() =>
    this.dataPersistence.fetch(DashboardActions.loadDashboard, {
      run: (
        action: ReturnType<typeof DashboardActions.loadDashboard>,
        state: fromDashboard.DashboardPartialState
      ) => {
        // Your custom service 'load' logic goes here. For now just return a success action...
        // return DashboardActions.loadDashboardSuccess({ dashboard: [] });

        return this.covidApiService.getLatestForCountry(action.payload.countryCode)
          .pipe(
            map((response) => DashboardActions.loadDashboardSuccess({
              dashboard: [{
                id: Object.keys(response.result)[0],
                ...Object.values(response.result)[0]
              }]
            }))
          );
      },

      onError: (
        action: ReturnType<typeof DashboardActions.loadDashboard>,
        error
      ) => {
        console.error('Error', error);
        return DashboardActions.loadDashboardFailure({ error });
      }
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromDashboard.DashboardPartialState>,
    private covidApiService: CovidApiService
  ) {
  }
}
