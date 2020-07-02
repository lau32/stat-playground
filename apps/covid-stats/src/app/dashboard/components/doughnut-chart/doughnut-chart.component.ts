import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

import { CNumbs } from '../../models/dashboard.model';

@Component({
  selector: 'stat-playground-doughnut-chart',
  template: `
      <stat-playground-chart [chartConfig]="chartConfig"></stat-playground-chart>`
})
export class DoughnutChartComponent implements OnInit {
  @Input() latestForCountry: CNumbs;

  chartConfig: Chart.ChartConfiguration = {};

  ngOnInit(): void {
    const { confirmed, deaths, recovered } = this.latestForCountry;

    this.chartConfig = {
      type: 'doughnut',
      data: {
        labels: ['Confirmed', 'Deaths', 'Recovered'],
        datasets: [{
          backgroundColor: [
            'hsl(198, 100%, 41%)',
            'hsl(14, 91%, 55%)',
            'hsl(93, 76%, 49%)'
          ],
          data: [confirmed, deaths, recovered]
        }]
      },
      options: {
        hover: { intersect: false }
      }
    };
  }
}
