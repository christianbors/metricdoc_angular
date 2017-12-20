import { TestBed, inject } from '@angular/core/testing';

import { GlobalNavService } from './global-nav.service';

describe('GlobalNavService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GlobalNavService]
    });
  });

  it('should ...', inject([GlobalNavService], (service: GlobalNavService) => {
    expect(service).toBeTruthy();
  }));
});
