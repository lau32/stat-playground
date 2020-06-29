import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

import { CNumbs } from '../../models/dashboard.model';

@Component({
  selector: 'stat-playground-doughnut-chart',
  styleUrls: ['./doughnut-chart.component.scss'],
  template: `
      <div>
          <canvas #chart></canvas>
      </div>`
})
export class DoughnutChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chart') canvas: ElementRef;

  @Input() latestForCountry: CNumbs;

  chart: Chart;

  ngAfterViewInit(): void {
    this.generateChart(this.latestForCountry);
  }

  generateChart({ confirmed, deaths, recovered }) {
    if (this.chart) {
      this.chart.clear();
    }

    const context = this.canvas.nativeElement.getContext('2d');

    if (!context) {
      return;
    }

    this.chart = new Chart(context, {
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
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
