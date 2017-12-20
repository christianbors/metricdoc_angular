import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricPreviewComponent } from './metric-preview.component';

describe('MetricPreviewComponent', () => {
  let component: MetricPreviewComponent;
  let fixture: ComponentFixture<MetricPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
