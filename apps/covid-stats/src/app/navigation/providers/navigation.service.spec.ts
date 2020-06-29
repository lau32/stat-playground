import { TestBed } from '@angular/core/testing';

import { NavigationService } from './navigation.service';
import { NavigationApi } from './navigation.api';
import { CasesApi } from '../../core/providers/cases.api';

jest.mock('./navigation.api');
jest.mock('../../core/providers/cases.api');

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavigationService, NavigationApi, CasesApi]
    });
    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
