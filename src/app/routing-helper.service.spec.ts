import { TestBed, inject } from '@angular/core/testing';

import { RoutingHelperService } from './routing-helper.service';

describe('RoutingHelperServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutingHelperService]
    });
  });

  it('should ...', inject([RoutingHelperService], (service: RoutingHelperService) => {
    expect(service).toBeTruthy();
  }));
});
