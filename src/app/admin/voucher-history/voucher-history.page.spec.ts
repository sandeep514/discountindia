import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoucherHistoryPage } from './voucher-history.page';

describe('VoucherHistoryPage', () => {
  let component: VoucherHistoryPage;
  let fixture: ComponentFixture<VoucherHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoucherHistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
