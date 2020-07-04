import { createAction, props } from '@ngrx/store';
import { NavigationEntity } from './navigation.models';
import { Result } from '../../core/models/api.model';

export const loadCountries = createAction(
  '[Navigation] Load Countries',
  props<{ countryCode: string }>()
);

export const loadCountriesSuccess = createAction(
  '[Navigation] Load Countries Success',
  props<{ countries: NavigationEntity[] }>()
);

export const loadCountriesFailure = createAction(
  '[Navigation] Load Countries Failure',
  props<{ error: any }>()
);

export const loadLatestNumbers = createAction('[Navigation] Load Latest Numbers');

export const loadLatestNumbersSuccess = createAction(
  '[Navigation] Load Latest Numbers Success',
  props<{ latestNumbers: Result[] }>()
);

export const loadLatestNumbersFailure = createAction(
  '[Navigation] Load Latest Numbers Failure',
  props<{ error: any }>()
);

export const setSelectedCountry = createAction(
  '[Navigation] Set Selected Country',
  props<{ countryCode: string }>()
);
