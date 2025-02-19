import { TestBed } from '@angular/core/testing';

import { RegistrationApplicationsService } from './registration-applications.service';

describe('RegistrationApplicationsService', () => {
  let service: RegistrationApplicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationApplicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
