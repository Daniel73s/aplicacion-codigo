import { TestBed } from '@angular/core/testing';

import { DatalocalService } from './datalocal.service';

describe('DatalocalService', () => {
  let service: DatalocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatalocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
