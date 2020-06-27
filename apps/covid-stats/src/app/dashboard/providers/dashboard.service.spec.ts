import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { CasesApi } from '../../core/providers/cases.api';


jest.mock('../../core/providers/cases.api');

describe('CovidService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[CasesApi]
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
