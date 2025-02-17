import { TestBed } from '@angular/core/testing';
import { SingleEliminationTreeService } from './single-elimination-tree.service';

describe('SingleEliminationTreeService', () => {
  let service: SingleEliminationTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleEliminationTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
