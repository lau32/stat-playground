import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as DashboardActions from './dashboard.actions';
import { DashboardEntity } from './dashboard.models';

export const DASHBOARD_FEATURE_KEY = 'dashboard';

export interface State extends EntityState<DashboardEntity> {
  selectedId?: string | number; // which Dashboard record has been selected
  loaded: boolean; // has the Dashboard list been loaded
  error?: string | null; // last none error (if any)
}

export interface DashboardPartialState {
  readonly [DASHBOARD_FEATURE_KEY]: State;
}

export const dashboardAdapter: EntityAdapter<DashboardEntity> = createEntityAdapter<
  DashboardEntity
>();

export const initialState: State = dashboardAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadDashboard, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(DashboardActions.loadDashboardSuccess, (state, { dashboard }) =>
    dashboardAdapter.addAll(dashboard, { ...state, loaded: true })
  ),
  on(DashboardActions.loadDashboardFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return dashboardReducer(state, action);
}
