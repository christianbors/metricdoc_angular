import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricDetailVisualizationComponent } from './metric-detail-visualization.component';

describe('MetricDetailVisualizationComponent', () => {
  let component: MetricDetailVisualizationComponent;
  let fixture: ComponentFixture<MetricDetailVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricDetailVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricDetailVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
