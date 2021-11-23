import { TestBed } from '@angular/core/testing';

import { VeterinariasService } from './veterinarias.service';

describe('VeterinariasService', () => {
  let service: VeterinariasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeterinariasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
