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
  loadCountryCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map(({ payload: { routerState: { root: { firstChild: { params } } } } }) => params),
      tap(console.log),
      filter(({ countryCode }) => !!countryCode),
      map(({ countryCode }) => DashboardActions.loadLatestForCountry({ payload: { countryCode } }))
    )
  );

  loadLatestForCountry$ = createEffect(() =>
    this.dataPersistence.fetch(DashboardActions.loadLatestForCountry, {
      run: (
        action: ReturnType<typeof DashboardActions.loadLatestForCountry>,
      ) => this.covidApiService.getLatestForCountry(action.payload.countryCode)
        .pipe(
          map((response) => DashboardActions.loadLatestForCountrySuccess({
            dashboard: [{
              id: Object.keys(response.result)[0],
              ...Object.values(response.result)[0]
            }]
          }))
        ),

      onError: (
        action: ReturnType<typeof DashboardActions.loadLatestForCountry>,
        error
      ) => {
        return DashboardActions.loadLatestForCountryFailure({ error });
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
