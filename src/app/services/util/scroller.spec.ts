import { TestBed } from '@angular/core/testing';

import { Scroller } from './scroller';

describe('Scroller', () => {
  let service: Scroller;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Scroller);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
