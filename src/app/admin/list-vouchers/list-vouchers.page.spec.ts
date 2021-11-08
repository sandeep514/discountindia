import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVouchersPage } from './list-vouchers.page';

describe('ListVouchersPage', () => {
  let component: ListVouchersPage;
  let fixture: ComponentFixture<ListVouchersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVouchersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVouchersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
