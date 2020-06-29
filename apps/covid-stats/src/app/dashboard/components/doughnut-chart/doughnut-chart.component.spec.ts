import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartComponent } from './doughnut-chart.component';

const latestForCountryData = {
  confirmed: 1, deaths: 2, recovered: 3
};

describe('DoughnutChartComponent', () => {
  let canvasElement;
  let component: DoughnutChartComponent;
  let fixture: ComponentFixture<DoughnutChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DoughnutChartComponent]
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
    fixture = TestBed.createComponent(DoughnutChartComponent);
    component = fixture.componentInstance;
    component.latestForCountry = latestForCountryData;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeDefined();
  });
});
