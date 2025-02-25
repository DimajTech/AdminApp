import { TestBed } from '@angular/core/testing';

import { AdvisementService } from './advisement.service';

describe('AdvisementService', () => {
  let service: AdvisementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvisementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
