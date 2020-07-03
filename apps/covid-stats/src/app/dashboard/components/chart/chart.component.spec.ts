import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponent } from './chart.component';

describe('DoughnutChartComponent', () => {
  let canvasElement;
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent]
    }).compileComponents();
  }));

  beforeAll(() => {
    canvasElement = window.HTMLCanvasElement.prototype.getContext;
    window.HTMLCanvasElement.prototype.getContext = () => null;
  });

  afterAll(() => {
    window.HTMLCanvasElement.prototype.getContext = canvasElement;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.chartConfig = {};
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeDefined();
  });
});
