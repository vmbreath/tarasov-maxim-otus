import {TestBed} from '@angular/core/testing';

import {GetTranslateService} from './get-translate.service';
import {HttpClientModule} from "@angular/common/http";

describe('GetTranslateService', () => {
  let service: GetTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(GetTranslateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
