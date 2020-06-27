import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DashboardEffects } from './dashboard.effects';
import * as DashboardActions from './dashboard.actions';
import { CasesApi } from '../../core/providers/cases.api';

jest.mock('../../core/providers/cases.api')

describe('DashboardEffects', () => {
  let actions: Observable<any>;
  let effects: DashboardEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CasesApi,
        DashboardEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore()
      ]
    });

    effects = TestBed.inject(DashboardEffects);
  });

  describe('loadDashboard$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: DashboardActions.loadLatestForCountry({ payload: { countryCode: '' } }) });

      expect(actions).toBeTruthy()
    });
  });
});
