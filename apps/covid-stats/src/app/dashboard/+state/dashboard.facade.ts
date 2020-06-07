import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromDashboard from './dashboard.reducer';
import * as DashboardSelectors from './dashboard.selectors';

@Injectable()
export class DashboardFacade {
  loaded$ = this.store.pipe(select(DashboardSelectors.getDashboardLoaded));
  allDashboard$ = this.store.pipe(select(DashboardSelectors.getAllDashboard));
  selectedDashboard$ = this.store.pipe(select(DashboardSelectors.getSelected));

  constructor(private store: Store<fromDashboard.DashboardPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
