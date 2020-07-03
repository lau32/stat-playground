import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

import { CNumbs } from '../../models/dashboard.model';

@Component({
  selector: 'stat-playground-doughnut-chart',
  template: `
      <stat-playground-chart [chartConfig]="chartConfig"></stat-playground-chart>`
})
export class DoughnutChartComponent implements OnChanges {
  @Input() latestForCountry: CNumbs;

  chartConfig: Chart.ChartConfiguration = {};

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue, previousValue } = changes['latestForCountry'];

    if (currentValue !== previousValue) {
      const { confirmed, deaths, recovered } = currentValue;

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
}
