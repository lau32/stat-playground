import { Injectable } from '@angular/core';

import { Action, select, Store } from '@ngrx/store';

import * as fromDashboard from './dashboard.reducer';
import * as DashboardSelectors from './dashboard.selectors';

@Injectable()
export class DashboardFacade {
  loaded$ = this.store.pipe(select(DashboardSelectors.getDashboardLoaded));
  latestForCountry$ = this.store.pipe(select(DashboardSelectors.getLatestForCountry));
  latestTimeSeries$ = this.store.pipe(select(DashboardSelectors.getLatestTimeSeries));
  dailyInfected$ = this.store.pipe(select(DashboardSelectors.getDailyInfected));
  confirmed$ = this.store.pipe(select(DashboardSelectors.getConfirmed));

  constructor(private store: Store<fromDashboard.DashboardPartialState>) {
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
