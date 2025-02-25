import { TestBed } from '@angular/core/testing';

import { RegisterProfessorService } from './register-professor.service';

describe('RegisterProfessorService', () => {
  let service: RegisterProfessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterProfessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
