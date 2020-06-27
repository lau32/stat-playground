import { TestBed } from '@angular/core/testing';

import {
  CasesApi,
  LATEST_NUMBERS_URL,
  LATEST_COUNTRY_NUMBERS_URL,
} from './cases.api';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

const globalData = {
  count: 188,
  date: '2020-06-24',
  result: [
    { IRL: { confirmed: 25396, deaths: 1726, recovered: 23364 } },
    {
      ISR: {
        confirmed: 22044,
        deaths: 308,
        recovered: 15940,
      },
    },
  ],
};

const countryData = {
  count: 1,
  result: {
    '2020-06-24': {
      confirmed: 22044,
      deaths: 308,
      recovered: 15940,
    },
  },
};

describe('CasesApi', () => {
  let service: CasesApi;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CasesApi],
    });

    service = TestBed.inject(CasesApi);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get latest numbers', () => {
    service.getLatestNumbers().subscribe((response) => {
      expect(response).toEqual(globalData);
    });

    const request = httpTestingController.expectOne(LATEST_NUMBERS_URL);

    expect(request.request.method).toEqual('GET');

    request.flush(globalData);
  });

  it('should get latest numbers for country', () => {
    service.getLatestForCountry('').subscribe((response) => {
      expect(response).toEqual(countryData);
    });

    const request = httpTestingController.expectOne(
      LATEST_COUNTRY_NUMBERS_URL('')
    );

    expect(request.request.method).toEqual('GET');

    request.flush(countryData);
  });
});
