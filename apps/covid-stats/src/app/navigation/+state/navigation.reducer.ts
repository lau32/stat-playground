import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as NavigationActions from './navigation.actions';
import { NavigationEntity } from './navigation.models';

export const NAVIGATION_FEATURE_KEY = 'navigation';

export interface State extends EntityState<NavigationEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface NavigationPartialState {
  readonly [NAVIGATION_FEATURE_KEY]: State;
}

export const navigationAdapter: EntityAdapter<NavigationEntity> = createEntityAdapter<NavigationEntity>({
  selectId: model => model.countryCode,
  sortComparer: (a, b) => a.name.localeCompare(b.name)
});

export const initialState: State = navigationAdapter.getInitialState({
  loaded: false
});

const navigationReducer = createReducer(
  initialState,
  on(NavigationActions.loadCountries, (state) => ({
    ...state,
    loaded: false,
    error: null
  })),
  on(NavigationActions.loadCountriesSuccess, (state, { countries }) =>
    navigationAdapter.setAll(countries, { ...state, loaded: true })
  ),
  on(NavigationActions.loadCountriesFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return navigationReducer(state, action);
}
