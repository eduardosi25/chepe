import { TestBed, inject } from '@angular/core/testing';

import { ModelDummyRestService } from './model-dummy-rest.service';

describe('ModelDummyRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelDummyRestService]
    });
  });

  it('should be created', inject([ModelDummyRestService], (service: ModelDummyRestService) => {
    expect(service).toBeTruthy();
  }));
});
