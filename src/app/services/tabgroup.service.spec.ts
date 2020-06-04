import { TestBed } from '@angular/core/testing';

import { TabGroupService } from './tabgroup.service';

describe('TabGroupService', () => {
  let service: TabGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
