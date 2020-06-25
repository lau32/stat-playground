import { createAction, props } from '@ngrx/store';
import { DashboardEntity } from './dashboard.models';

export const loadLatestForCountry = createAction('[Dashboard] Load LatestForCountry',
  props<{ payload: { countryCode: string } }>()
);

export const loadLatestForCountrySuccess = createAction(
  '[Dashboard] Load LatestForCountry Success',
  props<{ dashboard: DashboardEntity[] }>()
);

export const loadLatestForCountryFailure = createAction(
  '[Dashboard] Load LatestForCountry Failure',
  props<{ error: any }>()
);

export const loadLatestCount = createAction('[Dashboard] Load LatestCount');

export const loadLatestCountSuccess = createAction(
  '[Dashboard] Load LatestCount Success',
  props<{ latestCount: any[] }>()
);

export const loadLatestCountFailure = createAction(
  '[Dashboard] Load Countries Failure',
  props<{ error: any }>()
);
