import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricChecksOverviewComponent } from './metric-checks-overview.component';

describe('MetricChecksOverviewComponent', () => {
  let component: MetricChecksOverviewComponent;
  let fixture: ComponentFixture<MetricChecksOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricChecksOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricChecksOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
