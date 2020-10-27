import {Inject, Injectable} from '@angular/core';
import {LOCAL_STORAGE, StorageService} from "ngx-webstorage-service";

let STORAGE_KEY;
let STORAGE_KEY1;
STORAGE_KEY = 'local_toLearnWords';
STORAGE_KEY1 = 'local_toLearnWordsSettings';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
  }

  public storeSettingsOnLocalStorage(setting, value): void {
    let settings = this.storage.get(STORAGE_KEY1) || [];
    if (settings.length === 0) {
      settings = {
        wordsToLearn: 5,
        timeForLearning: 10,
        language: "English"
      }
    }
    settings[setting] = value;
    this.storage.set(STORAGE_KEY1, settings);
    console.log(this.storage.get(STORAGE_KEY1) || 'LocaL storage is empty');
  }

  public storeOnLocalStorage(id, wordRussian, wordEnglish, wordFrancoise, wordUrl): void {
    const currentList = this.storage.get(STORAGE_KEY) || [];
    currentList.push({
      id: id,
      wordRussian: wordRussian,
      wordEnglish: wordEnglish,
      wordFrancoise: wordFrancoise,
      wordUrl: wordUrl
    });
    this.storage.set(STORAGE_KEY, currentList);
    console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
  }

  public removeOnLocalStorage(id): void {
    const currentList = this.storage.get(STORAGE_KEY) || [];
    currentList.forEach((word, index) => {
      if (word.id === id) {
        currentList.splice(index, 1)
      }
    })
    this.storage.set(STORAGE_KEY, currentList);
    console.log(this.storage.get(STORAGE_KEY) || 'LocaL storage is empty');
  }

  public getAllLocalStorage() {
    return this.storage.get(STORAGE_KEY) || [];
  }

  public getAllLocalStorageSettings() {
    if (this.storage.get(STORAGE_KEY1) === undefined) {
      this.storeSettingsOnLocalStorage('wordsToLearn', 5);
      this.storeSettingsOnLocalStorage('timeForLearning', 10);
      this.storeSettingsOnLocalStorage('language', "English");
      return this.storage.get(STORAGE_KEY1) || [];
    }
    return this.storage.get(STORAGE_KEY1) || [];
  }
}
