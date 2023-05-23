import { TestBed } from '@angular/core/testing';

import { PeopleDetailsService } from './people-details.service';

describe('PeopleDetailsService', () => {
  let service: PeopleDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
