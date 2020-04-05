import { TestBed } from '@angular/core/testing';

import { BloggerService } from './blogger.service';

describe('BloggerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BloggerService = TestBed.get(BloggerService);
    expect(service).toBeTruthy();
  });
});
