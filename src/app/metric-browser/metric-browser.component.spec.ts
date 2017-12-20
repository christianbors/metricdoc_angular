import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricBrowserComponent } from './metric-browser.component';

describe('MetricBrowserComponent', () => {
  let component: MetricBrowserComponent;
  let fixture: ComponentFixture<MetricBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricBrowserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
