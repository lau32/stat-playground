import {
  AfterViewInit,
  Component,
  ElementRef, Inject,
  Input,
  OnChanges,
  OnDestroy, PLATFORM_ID,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Chart } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'stat-playground-chart',
  template: `
      <div  *ngIf="isBrowser">
          <canvas [attr.aria-label]="label" role="img" #chart>
              <p>Data could not be loaded.</p>
          </canvas>
      </div>`
})
export class ChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('chart') canvas: ElementRef;

  @Input() label = 'Stat chart';
  @Input() chartConfig: Chart.ChartConfiguration;

  chart: Chart;
  isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.generateChart();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const { currentValue, previousValue } = changes['chartConfig'];

    if (this.chart && currentValue !== previousValue) {
      this.chart.config = currentValue;
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
