import { createAction, props } from '@ngrx/store';

import { CNumbs } from '../models/dashboard.model';
import { TimeSeriesData } from '../models/timeseries.model';

export const loadLatestForCountry = createAction(
  '[Dashboard] Load LatestForCountry',
  props<{ payload: { countryCode: string } }>()
);

export const loadLatestForCountrySuccess = createAction(
  '[Dashboard] Load LatestForCountry Success',
  props<{ latestForCountry: CNumbs }>()
);

export const loadLatestForCountryFailure = createAction(
  '[Dashboard] Load LatestForCountry Failure',
  props<{ error: any }>()
);

export const loadLatestTimeSeries = createAction(
  '[Dashboard] Load LatestTimeSeries'
);

export const loadLatestTimeSeriesSuccess = createAction(
  '[Dashboard] Load LatestTimeSeries Success',
  props<{ latestTimeSeries: TimeSeriesData[] }>()
);

export const loadLatestTimeSeriesFailure = createAction(
  '[Dashboard] Load LatestTimeSeries Failure',
  props<{ error: any }>()
);
