import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityHeaderColComponent } from './quality-header-col.component';

describe('QualityHeaderColComponent', () => {
  let component: QualityHeaderColComponent;
  let fixture: ComponentFixture<QualityHeaderColComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QualityHeaderColComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityHeaderColComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
