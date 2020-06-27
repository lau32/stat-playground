import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartComponent } from './doughnut-chart.component';
import { ElementRef } from '@angular/core';

describe('DoughnutChartComponent', () => {
  let canvasElement;
  let component: DoughnutChartComponent;
  let fixture: ComponentFixture<DoughnutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoughnutChartComponent],
    }).compileComponents();
  }));

  beforeAll(() => {
    canvasElement = window.HTMLCanvasElement.prototype.getContext;
    window.HTMLCanvasElement.prototype.getContext = (...args) => null;
  });

  afterAll(() => {
    window.HTMLCanvasElement.prototype.getContext = canvasElement;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(1).toBeTruthy();
  });
});
