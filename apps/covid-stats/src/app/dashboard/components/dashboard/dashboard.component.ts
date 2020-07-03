import { Component, OnInit } from '@angular/core';

import { DashboardFacade } from '../../+state/dashboard.facade';

@Component({
  selector: 'stat-playground-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  latestForCountry$ = this.dashboardFacade.latestForCountry$;
  loaded$ = this.dashboardFacade.loaded$;
  dailyInfected$ = this.dashboardFacade.dailyInfected$;
  confirmed$ = this.dashboardFacade.confirmed$;

  constructor(private dashboardFacade: DashboardFacade) {
  }

  ngOnInit(): void {
    this.dashboardFacade.loadLatestTimeSeries();
  }
}
