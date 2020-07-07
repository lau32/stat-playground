import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'stat-playground-line-chart',
  template: `
      <stat-playground-loader [loaded]="loaded">
          <stat-playground-chart [chartConfig]="chartConfig"></stat-playground-chart>
      </stat-playground-loader>
  `
})
export class LineChartComponent implements OnChanges {
  @Input() data: { dates: string[], confirmed: number[] };

  chartConfig: Chart.ChartConfiguration;
  loaded = false;

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue, previousValue } = changes['data'];

    if (currentValue && previousValue !== currentValue) {
      this.loaded = !!this.data.confirmed.length;

      this.chartConfig = {
        type: 'line',
        data: {
          labels: currentValue.dates,
          datasets: [
            {
              label: 'Confirmed',
              fill: false,
              borderColor: 'hsl(198, 100%, 41%)',
              data: currentValue.confirmed
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
