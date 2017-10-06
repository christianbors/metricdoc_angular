import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetadataTestComponent } from './metadata-test.component';

describe('MetadataTestComponent', () => {
  let component: MetadataTestComponent;
  let fixture: ComponentFixture<MetadataTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetadataTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
