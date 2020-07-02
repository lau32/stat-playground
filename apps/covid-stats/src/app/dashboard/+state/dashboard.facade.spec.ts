import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from '@nrwl/angular/testing';

import { State } from '../../navigation/+state/navigation.reducer';
import { DashboardFacade } from './dashboard.facade';
import {
  getConfirmed,
  getDailyInfected,
  getDashboardLoaded,
  getLatestForCountry,
  getLatestTimeSeries
} from './dashboard.selectors';

describe('DashboardFacade', () => {
  let store: MockStore<State>;
  let facade: DashboardFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardFacade, provideMockStore()]
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(DashboardFacade);
  });

  it('should return loaded', () => {
    store.overrideSelector(getDashboardLoaded, true);

    expect(facade.loaded$).toBeObservable(hot('a', { a: true }));
  });

  it('should return latestForCountry', () => {
    const latestForCountryData = {
      recovered: 1,
      deaths: 2,
      confirmed: 3
    };

    store.overrideSelector(getLatestForCountry, latestForCountryData);

    expect(facade.latestForCountry$).toBeObservable(hot('a', { a: latestForCountryData }));
  });

  it('should return latestTimeSeries', () => {
    const latestTimeSeriesData = [];

    store.overrideSelector(getLatestTimeSeries, latestTimeSeriesData);

    expect(facade.latestTimeSeries$).toBeObservable(hot('a', { a: latestTimeSeriesData }));
  });

  it('should return dailyInfected', () => {
    const dailyInfectedData = { dates: [], infected: [] };

    store.overrideSelector(getDailyInfected, dailyInfectedData);

    expect(facade.dailyInfected$).toBeObservable(hot('a', { a: dailyInfectedData }));
  });

  it('should return confirmed', () => {
    const confirmedData = { dates: [], confirmed: [] };

    store.overrideSelector(getConfirmed, confirmedData);

    expect(facade.confirmed$).toBeObservable(hot('a', { a: confirmedData }));
  });

});
