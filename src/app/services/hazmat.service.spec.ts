import { TestBed } from '@angular/core/testing';

import { HazmatService } from './hazmat.service';

describe('HazmatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HazmatService = TestBed.get(HazmatService);
    expect(service).toBeTruthy();
  });
});
