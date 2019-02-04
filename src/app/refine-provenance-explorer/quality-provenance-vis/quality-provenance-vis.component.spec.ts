import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityProvenanceVisComponent } from './quality-provenance-vis.component';

describe('QualityProvenanceVisComponent', () => {
  let component: QualityProvenanceVisComponent;
  let fixture: ComponentFixture<QualityProvenanceVisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityProvenanceVisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityProvenanceVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
