import {TestBed} from '@angular/core/testing';

import {LocalStorageService} from './local-storage.service';
import {SettingsComponent} from "./settings/settings.component";

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should get [] on getAllLocalStorage()"', () => {
    expect(service.getAllLocalStorage()).toEqual([]);
  });

  it('should get primary settings"', () => {
    service.storeSettingsOnLocalStorage('wordsToLearn', 5);
    const settings = {
      wordsToLearn: 5,
      timeForLearning: 10,
      language: "English"
    }
    expect(service.getAllLocalStorageSettings()).toEqual(settings);
  });

  it('should store wordsToLearn on localStorage"', () => {
    service.storeSettingsOnLocalStorage('wordsToLearn', 10);
    expect(service.getAllLocalStorageSettings().wordsToLearn).toEqual(10);
  });

});
