import { TestBed } from '@angular/core/testing';

import { DealDetailsService } from './deal-details.service';

describe('DealDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealDetailsService = TestBed.get(DealDetailsService);
    expect(service).toBeTruthy();
  });
});
