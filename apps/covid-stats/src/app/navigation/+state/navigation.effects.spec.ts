import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { NavigationEffects } from './navigation.effects';
import * as NavigationActions from './navigation.actions';
import { NavigationService } from '../providers/navigation.service';

jest.mock('../providers/navigation.service');

describe('NavigationEffects', () => {
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
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(NavigationEffects);
  });

  describe('loadNavigation$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: NavigationActions.loadNavigation() });

      expect(actions).toBeTruthy();
    });
  });
});
