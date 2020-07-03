import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DASHBOARD_FEATURE_KEY, dashboardAdapter, DashboardPartialState, State } from './dashboard.reducer';

export const getDashboardState = createFeatureSelector<DashboardPartialState,
  State>(DASHBOARD_FEATURE_KEY);

const { selectAll, selectEntities } = dashboardAdapter.getSelectors();

export const getDashboardLoaded = createSelector(
  getDashboardState,
  (state: State) => state.loaded
);

export const getDashboardError = createSelector(
  getDashboardState,
  (state: State) => state.error
);

export const getAllDashboard = createSelector(
  getDashboardState,
  (state: State) => selectAll(state)
);

export const getDashboardEntities = createSelector(
  getDashboardState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getDashboardState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getDashboardEntities,
  getSelectedId,
  (
    entities,
    selectedId) => selectedId && entities[selectedId]
);

export const getLatestForCountry = createSelector(
  getDashboardState,
  (state: State) => state.latestForCountry || { confirmed: 0, deaths: 0, recovered: 0 }
);

export const getLatestTimeSeries = createSelector(
  getDashboardState,
  (state: State) => state.latestTimeSeries
);

export const getDailyInfected = createSelector(
  getDashboardState,
  (state: State) => state.latestTimeSeries.reduce((acc, data, index, all) => ({
    dates: [...acc.dates, data.date],
    infected: [...acc.infected, Math.max(0, all[index].confirmed - (all[index - 1]?.confirmed || 0))]
  }), { dates: [], infected: [] })
);

export const getConfirmed = createSelector(
  getDashboardState,
  (state: State) => state.latestTimeSeries.reduce((acc, data) => ({
    dates: [...acc.dates, data.date],
    confirmed: [...acc.confirmed, data.confirmed]
  }), { dates: [], confirmed: [] })
);
