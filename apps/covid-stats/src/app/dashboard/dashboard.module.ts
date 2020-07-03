import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CountriesComponent } from './components/countries/countries.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDashboard from './+state/dashboard.reducer';
import { DashboardEffects } from './+state/dashboard.effects';
import { DashboardFacade } from './+state/dashboard.facade';
import { DoughnutChartComponent } from './components/doughnut-chart/doughnut-chart.component';
import { NavigationModule } from '../navigation/navigation.module';
import { ChartComponent } from './components/chart/chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';

const routes: Routes = [
  {
    path: '',
    component: CountriesComponent
  },
  {
    path: ':countryCode',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    ChartComponent, CountriesComponent, DashboardComponent,
    DoughnutChartComponent, BarChartComponent, LineChartComponent],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),

    StoreModule.forFeature(
      fromDashboard.DASHBOARD_FEATURE_KEY,
      fromDashboard.reducer
    ),

    EffectsModule.forFeature([DashboardEffects]),
    NavigationModule
  ],
  providers: [DashboardFacade]
})
export class DashboardModule {
}
