import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import * as DashboardActions from './dashboard.actions';
import { DashboardEntity } from './dashboard.models';
import { Country } from '../../shared/models/country.model';
import { CNumbs } from '../models/dashboard.model';
import { TimeSeriesData } from '../models/timeseries.model';

export const DASHBOARD_FEATURE_KEY = 'dashboard';

export interface State extends EntityState<DashboardEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
  countries?: Country[]
  latestForCountry?: CNumbs
  countryCode: string
  latestTimeSeries: TimeSeriesData[]
}

export interface DashboardPartialState {
  readonly [DASHBOARD_FEATURE_KEY]: State;
}

export const dashboardAdapter = createEntityAdapter<DashboardEntity>();

export const initialState: State = dashboardAdapter.getInitialState({
  loaded: false,
  countries: [],
  countryCode: '',
  latestForCountry: null,
  latestTimeSeries: []
});

const dashboardReducer = createReducer(
  initialState,
  on(DashboardActions.loadLatestForCountry, (state, { payload: { countryCode } }) => ({
    ...state,
    countryCode,
    loaded: false,
    latestTimeSeries: [],
    latestForCountry: null,
    error: null
  })),
  on(DashboardActions.loadLatestForCountrySuccess, (state, { latestForCountry }) =>
    ({ ...state, loaded: true, latestForCountry })
  ),
  on(DashboardActions.loadLatestForCountryFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(DashboardActions.loadLatestTimeSeriesSuccess, (state, { latestTimeSeries }) => ({
    ...state,
    latestTimeSeries
  })),
  on(DashboardActions.loadLatestTimeSeriesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return dashboardReducer(state, action);
}
