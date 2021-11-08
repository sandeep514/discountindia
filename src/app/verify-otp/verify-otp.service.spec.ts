import { TestBed } from '@angular/core/testing';

import { VerifyOtpService } from './verify-otp.service';

describe('VerifyOtpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerifyOtpService = TestBed.get(VerifyOtpService);
    expect(service).toBeTruthy();
  });
});
