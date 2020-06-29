import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from '@nrwl/angular/testing';

import { State } from '../../navigation/+state/navigation.reducer';
import { DashboardFacade } from './dashboard.facade';
import { getDashboardLoaded, getLatestForCountry } from './dashboard.selectors';

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
});
