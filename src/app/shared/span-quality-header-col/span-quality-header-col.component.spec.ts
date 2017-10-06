import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpanQualityHeaderColComponent } from './span-quality-header-col.component';

describe('QualityHeaderColComponent', () => {
  let component: SpanQualityHeaderColComponent;
  let fixture: ComponentFixture<SpanQualityHeaderColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpanQualityHeaderColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpanQualityHeaderColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
