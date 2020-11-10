import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../local-storage.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  inputNumberWords: number
  inputTimeForWord: number
  inputLanguage: any
  settings: any

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.settings = this.localStorageService.getAllLocalStorageSettings();
    this.inputNumberWords = this.settings.wordsToLearn;
    this.inputTimeForWord = this.settings.timeForLearning;
    this.inputLanguage = this.settings.language;
  }

  setWordsNumber() {
    if (this.inputNumberWords > 1 && this.inputNumberWords < 21) {
      this.localStorageService.storeSettingsOnLocalStorage('wordsToLearn', this.inputNumberWords)
    } else {
      this.inputNumberWords = this.settings.wordsToLearn;
    }
  }

  setTimeForWord() {
    this.localStorageService.storeSettingsOnLocalStorage('timeForLearning', this.inputTimeForWord)
  }

  setLanguage() {
    this.localStorageService.storeSettingsOnLocalStorage('language', this.inputLanguage)
  }
}
