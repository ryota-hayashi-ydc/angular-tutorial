import { TestBed } from '@angular/core/testing';

import { HttpTrainingService } from './http-training.service';

describe('HttpTrainingService', () => {
  let service: HttpTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
