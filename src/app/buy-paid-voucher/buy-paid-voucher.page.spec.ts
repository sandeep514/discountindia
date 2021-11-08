import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyPaidVoucherPage } from './buy-paid-voucher.page';

describe('BuyPaidVoucherPage', () => {
  let component: BuyPaidVoucherPage;
  let fixture: ComponentFixture<BuyPaidVoucherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyPaidVoucherPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyPaidVoucherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
