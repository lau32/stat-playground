import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from '@nrwl/angular/testing';

import { State } from './navigation.reducer';
import { getAllNavigation, getCount, getNavigationLoaded, getSelected } from './navigation.selectors';
import { NavigationFacade } from './navigation.facade';

describe('NavigationFacade', () => {
  let store: MockStore<State>;
  let facade: NavigationFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationFacade, provideMockStore()]
    });

    store = TestBed.inject(MockStore);
    facade = TestBed.inject(NavigationFacade);
  });

  it('should return loaded', () => {
    store.overrideSelector(getNavigationLoaded, true);

    expect(facade.loaded$).toBeObservable(hot('a', { a: true }));
  });

  it('should return allCountries', () => {
    store.overrideSelector(getAllNavigation, []);

    expect(facade.allCountries$).toBeObservable(hot('a', { a: [] }));
  });

  it('should return selectedCountry', () => {
    store.overrideSelector(getSelected, {} as any);

    expect(facade.selectedCountry$).toBeObservable(hot('a', { a: {} }));
  });

  it('should return countriesCount', () => {
    store.overrideSelector(getCount, 0);

    expect(facade.countriesCount$).toBeObservable(hot('a', { a: 0 }));
  });
});
