import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefineProvenanceExplorerComponent } from './refine-provenance-explorer.component';

describe('RefineProvenanceExplorerComponent', () => {
  let component: RefineProvenanceExplorerComponent;
  let fixture: ComponentFixture<RefineProvenanceExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefineProvenanceExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefineProvenanceExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
