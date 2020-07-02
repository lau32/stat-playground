import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'stat-playground-chart',
  template: `
      <div>
          <canvas [attr.aria-label]="label" role="img" #chart>
              <p>Data could not be loaded.</p>
          </canvas>
      </div>`
})
export class ChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('chart') canvas: ElementRef;

  @Input() label = 'Stat chart';
  @Input() chartConfig: Chart.ChartConfiguration = {};

  chart: Chart;

  ngAfterViewInit(): void {
    this.generateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    const chartConfig = changes['chartConfig'];

    if (!chartConfig.firstChange && chartConfig.currentValue !== chartConfig.previousValue) {
      this.chart.config = chartConfig.currentValue;
      this.chart.update();
    }
  }

  generateChart() {
    if (this.chart) {
      this.chart.clear();
    }

    const context = this.canvas.nativeElement.getContext('2d');

    if (!context) {
      return;
    }

    this.chart = new Chart(context, this.chartConfig);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
