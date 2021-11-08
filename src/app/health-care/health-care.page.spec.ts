import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCarePage } from './health-care.page';

describe('HealthCarePage', () => {
  let component: HealthCarePage;
  let fixture: ComponentFixture<HealthCarePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthCarePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
