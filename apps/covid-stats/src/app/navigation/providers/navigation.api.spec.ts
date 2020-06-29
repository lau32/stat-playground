import { TestBed } from '@angular/core/testing';

import { NavigationApi, COUNTRIES_URL } from './navigation.api';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

const countriesData = [
  {
    name: 'Afghanistan',
    'alpha-2': 'AF',
    'alpha-3': 'AFG',
    'country-code': '004',
    'iso_3166-2': 'ISO 3166-2:AF',
    region: 'Asia',
    'sub-region': 'Southern Asia',
    'intermediate-region': '',
    'region-code': '142',
    'sub-region-code': '034',
    'intermediate-region-code': '',
  },
  {
    name: 'Åland Islands',
    'alpha-2': 'AX',
    'alpha-3': 'ALA',
    'country-code': '248',
    'iso_3166-2': 'ISO 3166-2:AX',
    region: 'Europe',
    'sub-region': 'Northern Europe',
    'intermediate-region': '',
    'region-code': '150',
    'sub-region-code': '154',
    'intermediate-region-code': '',
  },
];

describe('NavigationApi', () => {
  let httpTestingController: HttpTestingController;
  let service: NavigationApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NavigationApi],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(NavigationApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get countries', () => {
    service.getCountries().subscribe((data) => {
      expect(data).toEqual(countriesData);
    });

    const request = httpTestingController.expectOne(COUNTRIES_URL);

    expect(request.request.method).toEqual('GET');

    request.flush(countriesData);
  });
});
