import { TestBed } from '@angular/core/testing';

import { ItemlistsService } from './itemlists.service';

describe('ItemlistsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ItemlistsService = TestBed.get(ItemlistsService);
    expect(service).toBeTruthy();
  });
});
