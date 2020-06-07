import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { CovidService } from '../../covid.service';
import { CountrySlim } from '../../covid-api.service';

@Component({
  selector: 'stat-playground-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  latestForCountry$ = this.activatedRoute.paramMap
    .pipe(
      map((params) => params.get('countryCode')),
      filter((countryCode) => !!countryCode),
      mergeMap((countryCode) => this.covidService.getLatestForCountry(countryCode)),
      map((country) => Object.values<CountrySlim>(country)[0])
    );

  countries$ = this.covidService.countriesNumbers$;
  countriesCount$ = this.countries$.pipe(map(countries => countries.length));

  constructor(
    private covidService: CovidService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  onSelectCountry(countryCode: string): void {
    this.router.navigate([countryCode]);
  }
}
