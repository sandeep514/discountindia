import { TestBed, async, inject } from '@angular/core/testing';

import { RedirectHomeGuard } from './redirect-home.guard';

describe('RedirectHomeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RedirectHomeGuard]
    });
  });

  it('should ...', inject([RedirectHomeGuard], (guard: RedirectHomeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
