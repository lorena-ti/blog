import { TestBed } from '@angular/core/testing';

import { PostSource } from './post-source';

describe('PostSource', () => {
  let service: PostSource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostSource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
