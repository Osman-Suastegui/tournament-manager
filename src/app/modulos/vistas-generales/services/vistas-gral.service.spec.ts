import { TestBed } from '@angular/core/testing';

import { VistasGralService } from './vistas-gral.service';

describe('VistasGralService', () => {
  let service: VistasGralService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VistasGralService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
