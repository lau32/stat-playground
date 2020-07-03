import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import * as fromDashboard from './dashboard.reducer';
import * as DashboardActions from './dashboard.actions';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { filter, map } from 'rxjs/operators';
import { DashboardService } from '../providers/dashboard.service';
import { CNumbs } from '../models/dashboard.model';

@Injectable()
export class DashboardEffects {
  navigated$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map(({ payload: { routerState: { root: { firstChild: { firstChild: { params } } } } } }) => params),
      filter(({ countryCode }) => !!countryCode),
      map(({ countryCode }) => DashboardActions.loadLatestForCountry({ payload: { countryCode } }))
    )
  );

  loadLatestForCountry$ = createEffect(() =>
    this.dataPersistence.fetch(DashboardActions.loadLatestForCountry, {
      run: (
        { payload: { countryCode } }: ReturnType<typeof DashboardActions.loadLatestForCountry>
      ) => this.dashboardService.getLatestForCountry(countryCode)
        .pipe(
          map((response) => DashboardActions.loadLatestForCountrySuccess({
            latestForCountry: Object.values<CNumbs>(response)[0]
          }))
        ),
      onError: (
        action: ReturnType<typeof DashboardActions.loadLatestForCountry>,
        error
      ) => DashboardActions.loadLatestForCountryFailure({ error })
    })
  );

  latestTimeSeries$ = createEffect(() =>
    this.dataPersistence.fetch(DashboardActions.loadLatestForCountrySuccess, {
      run: (
        action: ReturnType<typeof DashboardActions.loadLatestForCountrySuccess>,
        { dashboard: { countryCode } }
      ) => this.dashboardService.getLatestTimeSeries(countryCode)
        .pipe(map((latestTimeSeries) =>
          DashboardActions.loadLatestTimeSeriesSuccess({ latestTimeSeries }))),
      onError: (
        action: ReturnType<typeof DashboardActions.loadLatestForCountrySuccess>,
        error
      ) => DashboardActions.loadLatestTimeSeriesFailure({ error })
    })
  );

  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<fromDashboard.DashboardPartialState>,
    private dashboardService: DashboardService
  ) {
  }
}
