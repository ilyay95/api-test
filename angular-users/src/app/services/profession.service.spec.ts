import { TestBed } from '@angular/core/testing';
import { ProfessionService } from './profession.service';

describe('ProfessionsService', () => {
  let service: ProfessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
