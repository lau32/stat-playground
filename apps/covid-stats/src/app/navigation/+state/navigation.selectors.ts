import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  NAVIGATION_FEATURE_KEY,
  State,
  NavigationPartialState,
  navigationAdapter,
} from './navigation.reducer';

// Lookup the 'Navigation' feature state managed by NgRx
export const getNavigationState = createFeatureSelector<
  NavigationPartialState,
  State
>(NAVIGATION_FEATURE_KEY);

const { selectAll, selectEntities } = navigationAdapter.getSelectors();

export const getNavigationLoaded = createSelector(
  getNavigationState,
  (state: State) => state.loaded
);

export const getNavigationError = createSelector(
  getNavigationState,
  (state: State) => state.error
);

export const getAllNavigation = createSelector(
  getNavigationState,
  (state: State) => selectAll(state)
);

export const getNavigationEntities = createSelector(
  getNavigationState,
  (state: State) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getNavigationState,
  (state: State) => state.selectedId
);

export const getSelected = createSelector(
  getNavigationEntities,
  getSelectedId,
  (entities, selectedId) =>
    selectedId && entities[selectedId].countryCode
);

export const getCount = createSelector(
  getAllNavigation,
  (entities) => entities.length
);
