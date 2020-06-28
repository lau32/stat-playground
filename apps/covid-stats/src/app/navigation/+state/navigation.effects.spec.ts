import { TestBed } from '@angular/core/testing';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { Observable, of, throwError } from 'rxjs';

import { NavigationEffects } from './navigation.effects';
import * as NavigationActions from './navigation.actions';
import { NavigationService } from '../providers/navigation.service';
import {
  loadCountries,
  loadCountriesFailure,
  loadCountriesSuccess, loadLatestNumbersFailure,
  loadLatestNumbersSuccess
} from './navigation.actions';
import { NavigationEntity } from './navigation.models';

jest.mock('../providers/navigation.service');

const countriesData: NavigationEntity[] = [];

describe('NavigationEffects', () => {
  let navigationService;
  let actions: Observable<any>;
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
      actions = hot('-a-', { a: { type: ROUTER_NAVIGATED } });

      const expected = hot('-a-', { a: loadCountries() });

      expect(effects.navigated$).toBeObservable(expected);
    });
  });

  describe('loadCountries$', () => {
    beforeEach(() => {
      actions = hot('-(a|)', { a: NavigationActions.loadCountries() });
    });

    it('should map successful load to loadCountriesSuccess', () => {
      jest.spyOn(navigationService, 'getCamelCaseCountries')
        .mockReturnValue(of(countriesData));
      const expected = hot('-(a|)',
        { a: loadCountriesSuccess({ countries: countriesData }) });

      expect(effects.loadCountries$).toBeObservable(expected);
    });

    it('should map failed load to loadCountriesFailure', () => {
      const error = new Error('no data');
      jest.spyOn(navigationService, 'getCamelCaseCountries')
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
      jest.spyOn(navigationService, 'getLatestNumbers')
        .mockReturnValue(of({ result: latestNumbersData }));
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
