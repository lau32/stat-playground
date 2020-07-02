import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { CasesApi } from '../../core/providers/cases.api';
import { hot } from '@nrwl/angular/testing';
import { of } from 'rxjs';

jest.mock('../../core/providers/cases.api');

const latestForCountry = {
  count: 0,
  result: {
    'test': {
      confirmed: 0,
      deaths: 0,
      recovered: 0
    }
  }
};


describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CasesApi]
    });
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map to latest country results', () => {
    const mockValue = hot('-(a|)', { a: latestForCountry });
    const expected = hot('-(a|)', { a: latestForCountry.result });
    const casesApi = TestBed.inject(CasesApi);
    jest.spyOn(casesApi, 'getLatestForCountry')
      .mockReturnValue(mockValue);

    const result = service.getLatestForCountry('');

    expect(result).toBeObservable(expected);
  });

  it('should map to latest country results', () => {
    const mockValue = hot('-(a|)', { a: [] });
    const expected = hot('-(a|)', { a: [] });
    const casesApi = TestBed.inject(CasesApi);
    jest.spyOn(casesApi, 'getLatestTimeSeries')
      .mockReturnValue(mockValue);
    jest.spyOn(casesApi, 'getLatestDate')
      .mockReturnValue(of(''));

    const result = service.getLatestTimeSeries('');

    expect(result).toBeObservable(expected);
  });
});
