import { TestBed, inject } from '@angular/core/testing';

import { ModelRestService } from './model-rest.service';

describe('ModelRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelRestService]
    });
  });

  it('should be created', inject([ModelRestService], (service: ModelRestService) => {
    expect(service).toBeTruthy();
  }));
});
