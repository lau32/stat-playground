import {
  Component
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

import { DashboardService } from '../../providers/dashboard.service';
import { CountryNumbers } from '../../../core/providers/cases.api';

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
      map((country) => Object.values<CountryNumbers>(country)[0])
    );

  constructor(
    private covidService: DashboardService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  onSelectCountry(countryCode: string): void {
    this.router.navigate([countryCode]);
  }
}
