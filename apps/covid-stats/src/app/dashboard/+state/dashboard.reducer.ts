import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import * as DashboardActions from './dashboard.actions';
import { DashboardEntity } from './dashboard.models';
import { Country } from '../../shared/models/country.model';
import { CNumbs } from '../models/dashboard.model';

export const DASHBOARD_FEATURE_KEY = 'dashboard';

export interface State extends EntityState<DashboardEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
  countries?: Country[]
  latestForCountry?: CNumbs
}

export interface DashboardPartialState {
  readonly [DASHBOARD_FEATURE_KEY]: State;
}

export const dashboardAdapter = createEntityAdapter<DashboardEntity>();

export const initialState: State = dashboardAdapter.getInitialState({
  loaded: false
});

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadLatestForCountry, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(DashboardActions.loadLatestForCountrySuccess, (state, { latestForCountry }) =>
    ({ ...state, loaded: true, latestForCountry })
  ),
  on(DashboardActions.loadLatestForCountryFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return dashboardReducer(state, action);
}
