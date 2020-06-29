import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';

import * as fromNavigation from './navigation.reducer';
import * as NavigationSelectors from './navigation.selectors';
import { loadCountries } from './navigation.actions';

@Injectable()
export class NavigationFacade {
  loaded$ = this.store.pipe(select(NavigationSelectors.getNavigationLoaded));
  allCountries$ = this.store.pipe(
    select(NavigationSelectors.getAllNavigation)
  );
  selectedCountry$ = this.store.pipe(
    select(NavigationSelectors.getSelected)
  );
  countriesCount$ = this.store.pipe(
    select(NavigationSelectors.getCount)
  );

  constructor(private store: Store<fromNavigation.NavigationPartialState>) {
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

  loadCountries() {
    this.dispatch(loadCountries());
  }
}
