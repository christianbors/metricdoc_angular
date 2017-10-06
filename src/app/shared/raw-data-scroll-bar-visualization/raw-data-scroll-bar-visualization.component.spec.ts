import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataScrollBarVisualizationComponent } from './raw-data-scroll-bar-visualization.component';

describe('RawDataScrollBarVisualizationComponent', () => {
  let component: RawDataScrollBarVisualizationComponent;
  let fixture: ComponentFixture<RawDataScrollBarVisualizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawDataScrollBarVisualizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawDataScrollBarVisualizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
