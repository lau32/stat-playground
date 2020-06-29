import { Action } from '@ngrx/store';

import { loadLatestForCountry, loadLatestForCountryFailure, loadLatestForCountrySuccess } from './dashboard.actions';
import { initialState, reducer, State } from './dashboard.reducer';

const latestForCountryData = {};

describe('Dashboard Reducer', () => {
  it('should return the default state', () => {
    const action: Action = { type: '' };

    const result: State = reducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should return the loadLatestForCountry', () => {
    const action: Action = { type: loadLatestForCountry.type };

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
});
