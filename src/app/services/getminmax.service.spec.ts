import { TestBed } from '@angular/core/testing';

import { GetminmaxService } from './getminmax.service';

describe('GetminmaxService', () => {
  let service: GetminmaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetminmaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
