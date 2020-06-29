import { loadCountries, loadCountriesFailure, loadCountriesSuccess } from './navigation.actions';
import { initialState, reducer, State } from './navigation.reducer';
import { Action } from '@ngrx/store';

describe('Navigation Reducer', () => {
  it('should return the previous state', () => {
    const action: Action = { type: '' };

    const result: State = reducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should return the loadCountries', () => {
    const action: Action = { type: loadCountries.type };

    const result: State = reducer(initialState, action);

    expect(result).toStrictEqual({ ...initialState, loaded: false, error: null });
  });

  it('should return the loadCountriesSuccess', () => {
    const action: Action = { type: loadCountriesSuccess.type, countries: [] } as any;

    const result: State = reducer(initialState, action);

    expect(result).toStrictEqual({ ...initialState, loaded: true });
  });

  it('should return the loadCountriesFailure', () => {
    const error = new Error('no data');
    const action: Action = { type: loadCountriesFailure.type, error } as any;

    const result: State = reducer(initialState, action);

    expect(result).toStrictEqual({ ...initialState, error });
  });
});
