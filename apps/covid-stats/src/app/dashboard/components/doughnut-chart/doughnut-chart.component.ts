import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges, OnDestroy,
  SimpleChange,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Chart } from 'chart.js';
import { CountryNumbers } from '../../../core/providers/cases.api';

@Component({
  selector: 'stat-playground-doughnut-chart',
  template: `<div><canvas #chart></canvas></div>`
})
export class DoughnutChartComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('chart') canvas: ElementRef;

  @Input() latestForCountry: CountryNumbers;

  chart: Chart;
  context: CanvasRenderingContext2D;

  ngOnChanges(changes: SimpleChanges): void {
    const latestForCountry: SimpleChange = changes['latestForCountry'];

    if (!latestForCountry.firstChange && latestForCountry.previousValue !== latestForCountry.currentValue) {
      this.generateChart(latestForCountry.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  generateChart({ confirmed, deaths, recovered }) {
    if (this.chart) {
      this.chart.clear();
    }

    this.chart = new Chart(this.context, {
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
