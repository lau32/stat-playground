import { Action } from '@ngrx/store';

import {
  loadLatestForCountry,
  loadLatestForCountryFailure,
  loadLatestForCountrySuccess, loadLatestTimeSeriesFailure,
  loadLatestTimeSeriesSuccess
} from './dashboard.actions';
import { initialState, reducer, State } from './dashboard.reducer';

const latestForCountryData = {};
const latestTimeSeriesData = [];

describe('Dashboard Reducer', () => {
  it('should return the default state', () => {
    const action: Action = { type: '' };

    const result: State = reducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should return the loadLatestForCountry', () => {
    const action: Action = { type: loadLatestForCountry.type, payload: { countryCode: '' } } as any;

    const result: State = reducer(initialState, action);

    expect(result).toStrictEqual({ ...initialState, loaded: false, error: null });
  });

  it('should return the loadLatestForCountrySuccess', () => {
    const action: Action = { type: loadLatestForCountrySuccess.type, latestForCountry: latestForCountryData } as any;

    const result: State = reducer(initialState, action);

    expect(result).toStrictEqual({ ...initialState, loaded: true, latestForCountry: latestForCountryData });
  });


  it('should return the loadLatestForCountryFailure', () => {
    const error = new Error('no data');
    const action: Action = { type: loadLatestForCountryFailure.type, error } as any;

    const result: State = reducer(initialState, action);

    expect(result).toStrictEqual({ ...initialState, error });
  });

  it('should return the loadLatestTimeSeriesSuccess', () => {
    const action: Action = { type: loadLatestTimeSeriesSuccess.type, latestTimeSeries: latestTimeSeriesData } as any;

    const result: State = reducer(initialState, action);

    expect(result).toStrictEqual({ ...initialState, latestTimeSeries: latestTimeSeriesData });
  });

  it('should return the loadLatestTimeSeriesFailure', () => {
    const error = new Error('no data');
    const action: Action = { type: loadLatestTimeSeriesFailure.type, error } as any;

    const result: State = reducer(initialState, action);

    expect(result).toStrictEqual({ ...initialState, error });
  });
});
