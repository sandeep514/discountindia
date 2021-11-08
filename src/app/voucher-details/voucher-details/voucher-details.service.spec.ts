import { TestBed } from '@angular/core/testing';

import { VoucherDetailsService } from './voucher-details.service';

describe('VoucherDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VoucherDetailsService = TestBed.get(VoucherDetailsService);
    expect(service).toBeTruthy();
  });
});
