import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVoucherPage } from './create-voucher.page';

describe('CreateVoucherPage', () => {
  let component: CreateVoucherPage;
  let fixture: ComponentFixture<CreateVoucherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVoucherPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVoucherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
