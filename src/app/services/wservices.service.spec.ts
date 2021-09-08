import { TestBed } from '@angular/core/testing';

import { WservicesService } from './wservices.service';

describe('WservicesService', () => {
  let service: WservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
