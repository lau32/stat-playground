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
    const data = changes['data'];

    if (data.currentValue && data.previousValue !== data.currentValue) {
      this.chartConfig = {
        type: 'bar',
        data: {
          labels: data.currentValue.dates,
          datasets: [
            {
              label: 'Daily infected',
              backgroundColor: 'hsl(198, 100%, 41%)',
              data: data.currentValue.infected
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
