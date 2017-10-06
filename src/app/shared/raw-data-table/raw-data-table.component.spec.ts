import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RawDataTableComponent } from './raw-data-table.component';

describe('RawDataTableComponent', () => {
  let component: RawDataTableComponent;
  let fixture: ComponentFixture<RawDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RawDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
