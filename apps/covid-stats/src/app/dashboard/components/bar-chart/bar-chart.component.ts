import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'stat-playground-bar-chart',
  template: `
      <stat-playground-chart [chartConfig]="chartConfig"></stat-playground-chart>`
})
export class BarChartComponent implements OnChanges {
  @Input() data: { dates: string[], infected: number[] };

  chartConfig: Chart.ChartConfiguration = {};

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue, previousValue } = changes['data'];

    if (currentValue && previousValue !== currentValue) {
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
          responsive: true,
          showLines: false,
          hover: { intersect: false }
        }
      };
    }
  }
}
