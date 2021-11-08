import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedeemVoucherPage } from './redeem-voucher.page';

describe('RedeemVoucherPage', () => {
  let component: RedeemVoucherPage;
  let fixture: ComponentFixture<RedeemVoucherPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedeemVoucherPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedeemVoucherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
