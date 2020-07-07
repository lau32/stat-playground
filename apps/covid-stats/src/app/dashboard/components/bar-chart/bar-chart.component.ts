import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'stat-playground-bar-chart',
  template: `
      <stat-playground-loader [loaded]="loaded">
          <stat-playground-chart [chartConfig]="chartConfig"></stat-playground-chart>
      </stat-playground-loader>
  `
})
export class BarChartComponent implements OnChanges {
  @Input() data: { dates: string[], infected: number[] };

  chartConfig: Chart.ChartConfiguration;
  loaded = false;

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue, previousValue } = changes['data'];

    if (previousValue !== currentValue) {
      this.loaded = !!this.data.infected.length;

      this.chartConfig = {
        type: 'bar',
        data: {
          labels: currentValue.dates,
          datasets: [
            {
              label: 'Daily infected',
              backgroundColor: 'hsl(198, 100%, 41%)',
              data: currentValue.infected
            }
          ]
        },
        options: {
          hover: { intersect: false }
        }
      };
    }
  }
}
