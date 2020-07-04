import { TestBed } from '@angular/core/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Observable, of, throwError } from 'rxjs';

import { NavigationEffects } from './navigation.effects';
import * as NavigationActions from './navigation.actions';
import {
  loadCountriesFailure,
  loadCountriesSuccess,
  loadLatestNumbersFailure,
  loadLatestNumbersSuccess
} from './navigation.actions';
import { NavigationService } from '../providers/navigation.service';
import { NavigationEntity } from './navigation.models';

jest.mock('../providers/navigation.service');

const countriesData: NavigationEntity[] = [];

describe('NavigationEffects', () => {
  let navigationService: NavigationService;
  let actions: Observable<Action>;
  let effects: NavigationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        NavigationEffects,
        NavigationService,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    navigationService = TestBed.inject(NavigationService);
    effects = TestBed.inject(NavigationEffects);
  });

  describe('navigated$', () => {
    it('should map ROUTER_NAVIGATED to loadCountries', () => {
      actions = hot('-a-', {
        a: {
          type: ROUTER_NAVIGATED,
          payload: { routerState: { root: { firstChild: { firstChild: { params: { countryCode: 'test' } } } } } }
        }
      });

      const expected = hot('-a-', { a: NavigationActions.loadCountries({ countryCode: 'test' }) });

      expect(effects.navigated$).toBeObservable(expected);
    });
  });

  describe('loadCountries$', () => {
    beforeEach(() => {
      actions = hot('-(a|)', { a: NavigationActions.loadCountries({ countryCode: '' }) });
    });

    it('should map successful load to loadCountriesSuccess', () => {
      jest.spyOn(navigationService, 'loadCountries')
        .mockReturnValue(of(countriesData));
      const expected = hot('-(a|)',
        { a: loadCountriesSuccess({ countries: countriesData }) });

      expect(effects.loadCountries$).toBeObservable(expected);
    });

    it('should map failed load to loadCountriesFailure', () => {
      const error = new Error('no data');
      jest.spyOn(navigationService, 'loadCountries')
        .mockImplementation(() => throwError(error));
      const expected = hot('-(a|)',
        { a: loadCountriesFailure({ error }) });

      expect(effects.loadCountries$).toBeObservable(expected);
    });
  });

  describe('loadLatestNumbers$', () => {
    beforeEach(() => {
      actions = hot('-(a|)',
        { a: NavigationActions.loadLatestNumbers() });
    });

    it('should map successful load to loadLatestNumbersSuccess', () => {
      const latestNumbersData = [];
      const mockResult = { result: latestNumbersData, count: 0, date: new Date() };
      jest.spyOn(navigationService, 'getLatestNumbers')
        .mockReturnValue(of(mockResult));
      const expected = hot('-(a|)',
        { a: loadLatestNumbersSuccess({ latestNumbers: latestNumbersData }) });

      expect(effects.loadLatestNumbers$).toBeObservable(expected);
    });

    it('should map failed load to loadLatestNumbersFailure', () => {
      const error = new Error('no data');
      jest.spyOn(navigationService, 'getLatestNumbers')
        .mockImplementation(() => throwError(error));
      const expected = hot('-(a|)', { a: loadLatestNumbersFailure({ error }) });

      expect(effects.loadLatestNumbers$).toBeObservable(expected);
    });
  });
});
