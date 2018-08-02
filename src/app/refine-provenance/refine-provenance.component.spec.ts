import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefineProvenanceComponent } from './refine-provenance.component';

describe('RefineProvenanceComponent', () => {
  let component: RefineProvenanceComponent;
  let fixture: ComponentFixture<RefineProvenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefineProvenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefineProvenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
