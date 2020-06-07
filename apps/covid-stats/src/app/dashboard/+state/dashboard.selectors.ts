import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  DASHBOARD_FEATURE_KEY,
  State,
  DashboardPartialState,
  dashboardAdapter,
} from './dashboard.reducer';

// Lookup the 'Dashboard' feature state managed by NgRx
export const getDashboardState = createFeatureSelector<
  DashboardPartialState,
  State
>(DASHBOARD_FEATURE_KEY);

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
  (entities, selectedId) => selectedId && entities[selectedId]
);
