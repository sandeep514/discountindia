import { TestBed } from '@angular/core/testing';

import { PremiumDetailsService } from './premium-details.service';

describe('PremiumDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PremiumDetailsService = TestBed.get(PremiumDetailsService);
    expect(service).toBeTruthy();
  });
});
