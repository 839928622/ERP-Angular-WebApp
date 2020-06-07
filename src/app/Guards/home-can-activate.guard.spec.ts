import { TestBed } from '@angular/core/testing';

import { HomeCanActivateGuard } from './home-can-activate.guard';

describe('HomeCanActivateGuard', () => {
  let guard: HomeCanActivateGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HomeCanActivateGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
