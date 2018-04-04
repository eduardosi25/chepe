import { TestBed, inject } from '@angular/core/testing';

import { ModelDummyService } from './model-dummy.service';

describe('ModelDummyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelDummyService]
    });
  });

  it('should be created', inject([ModelDummyService], (service: ModelDummyService) => {
    expect(service).toBeTruthy();
  }));
});
