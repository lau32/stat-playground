import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { DataPersistence, NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable, of, throwError } from 'rxjs';

import { DashboardService } from '../providers/dashboard.service';
import { loadLatestForCountry, loadLatestForCountryFailure, loadLatestForCountrySuccess } from './dashboard.actions';
import { DashboardEffects } from './dashboard.effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';

jest.mock('../providers/dashboard.service');

const testCountryCode = 'test';

const latestForCountryData = {
  recovered: 1,
  deaths: 2,
  confirmed: 3
};

describe('DashboardEffects', () => {
  let dashboardService: DashboardService;
  let actions: Observable<Action>;
  let effects: DashboardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        DashboardEffects,
        DashboardService,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    dashboardService = TestBed.inject(DashboardService);
    effects = TestBed.inject(DashboardEffects);
  });

  describe('navigated$', () => {
    it('should map ROUTER_NAVIGATED to loadLatestForCountry', () => {
      actions = hot('-a-', {
        a: {
          type: ROUTER_NAVIGATED,
          payload: { routerState: { root: { firstChild: { firstChild: { params: { countryCode: testCountryCode } } } } } }
        }
      });

      const expected = hot('-a-', { a: loadLatestForCountry({ payload: { countryCode: testCountryCode } }) });

      expect(effects.navigated$).toBeObservable(expected);
    });
  });

  describe('loadLatestForCountry$', () => {
    beforeEach(() => {
      actions = hot('-(a|)', { a: loadLatestForCountry({ payload: { countryCode: testCountryCode } }) });
    });

    it('should map successful load to loadLatestForCountrySuccess', () => {
      jest.spyOn(dashboardService, 'getLatestForCountry')
        .mockReturnValue(of({ 'test': latestForCountryData }));
      const expected = hot('-(a|)',
        { a: loadLatestForCountrySuccess({ latestForCountry: latestForCountryData }) });

      expect(effects.loadLatestForCountry$).toBeObservable(expected);
    });

    it('should map failed load to loadLatestForCountryFailure', () => {
      const error = new Error('no data');
      jest.spyOn(dashboardService, 'getLatestForCountry')
        .mockImplementation(() => throwError(error));
      const expected = hot('-(a|)',
        { a: loadLatestForCountryFailure({ error }) });

      expect(effects.loadLatestForCountry$).toBeObservable(expected);
    });
  });
});
