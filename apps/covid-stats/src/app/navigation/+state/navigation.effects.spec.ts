import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { NavigationEffects } from './navigation.effects';
import * as NavigationActions from './navigation.actions';

describe('NavigationEffects', () => {
  let actions: Observable<any>;
  let effects: NavigationEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        NavigationEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(NavigationEffects);
  });

  describe('loadNavigation$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: NavigationActions.loadNavigation() });

      const expected = hot('-a-|', {
        a: NavigationActions.loadNavigationSuccess({ navigation: [] }),
      });

      expect(effects.loadNavigation$).toBeObservable(expected);
    });
  });
});
