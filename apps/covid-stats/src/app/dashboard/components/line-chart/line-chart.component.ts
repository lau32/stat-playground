import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'stat-playground-line-chart',
  template: `
      <stat-playground-chart [chartConfig]="chartConfig"></stat-playground-chart>`
})
export class LineChartComponent implements OnChanges {
  @Input() data: { dates: string[], confirmed: number[] };

  chartConfig: Chart.ChartConfiguration = {};

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue, previousValue } = changes['data'];

    if (currentValue && previousValue !== currentValue) {
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
          responsive: true,
          showLines: false,
          hover: { intersect: false }
        }
      };
    }
  }
}
