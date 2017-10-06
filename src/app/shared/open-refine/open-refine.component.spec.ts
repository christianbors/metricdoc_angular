import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenRefineComponent } from './open-refine.component';

describe('OpenRefineComponent', () => {
  let component: OpenRefineComponent;
  let fixture: ComponentFixture<OpenRefineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenRefineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenRefineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
