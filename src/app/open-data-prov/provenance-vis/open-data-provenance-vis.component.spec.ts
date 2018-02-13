import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenDataProvenanceVisComponent } from './open-data-provenance-vis.component';

describe('OpenDataProvenanceVisComponent', () => {
  let component: OpenDataProvenanceVisComponent;
  let fixture: ComponentFixture<OpenDataProvenanceVisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenDataProvenanceVisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenDataProvenanceVisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
