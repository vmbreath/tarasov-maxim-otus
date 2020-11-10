import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from "../local-storage.service";
import {FormControl, ValidatorFn, Validators} from "@angular/forms";


@Component({
  selector: 'app-go-learning',
  templateUrl: './go-learning.component.html',
  styleUrls: ['./go-learning.component.scss']
})
export class GoLearningComponent implements OnInit {
  form
  settings: any
  numberOfWords: number = 2;
  timeForLearning: number = 30;
  language: string = "English";
  currentWordNumber = 0;
  timeCounter = 0;
  interval: any;
  wordsToLearn = this.localStorageService.getAllLocalStorage().slice(0, this.numberOfWords);
  start: boolean = false;
  timeIsUp: boolean = false;
  hint: boolean = false;
  allDone: boolean = this.wordsToLearn.length === 0;
  translationShowed: boolean = false;
  currentRussianWord: string = '';

  constructor(private localStorageService: LocalStorageService) {
  }

  ngOnInit(): void {
    this.settings = this.localStorageService.getAllLocalStorageSettings();
    this.numberOfWords = this.settings.wordsToLearn;
    this.timeForLearning = this.settings.timeForLearning;
    this.language = this.settings.language;
    this.timeCounter = this.timeForLearning;
  }

  nextWord() {
    if (this.name.errors === null) {
      if (this.currentWordNumber === this.wordsToLearn.length - 1) {
        this.localStorageService.removeOnLocalStorage(this.wordsToLearn[this.currentWordNumber].id)
        this.allDone = true;
        this.timeCounter = this.timeForLearning;
        clearInterval(this.interval);
      } else {
        this.localStorageService.removeOnLocalStorage(this.wordsToLearn[this.currentWordNumber].id)
        this.currentWordNumber++;
      }
    }
    this.name.setValue('');
  }

  skipWord() {
    console.log(this.wordsToLearn, this.currentWordNumber)
    this.translationShowed = false;
    if (this.currentWordNumber === this.wordsToLearn.length - 1) {
      this.start = false;
      this.timeCounter = this.timeForLearning;
      clearInterval(this.interval);
      this.currentWordNumber = 0;
    } else {
      this.currentWordNumber++;
    }
  }

  doTimer() {
    this.start = true;
    this.timeIsUp = false;
    this.allDone = false;
    this.interval = setInterval(() => {
      if (this.timeCounter === 0) {
        this.timeCounter = this.timeForLearning;
        this.timeIsUp = true;
        clearInterval(this.interval);
        //this.allDone = true;
        this.start = false;
      } else {
        this.timeCounter--;
      }
    }, 1000)
  }

  isActualTranslation: ValidatorFn = (control) => {
    const isTheSameTrans = control.value === this.currentRussianWord;
    if (isTheSameTrans) {
      return null
    } else {
      return {isCorrectTranslation: null}
    }
  }
  name = new FormControl(
    '',
    [
      Validators.required,
      this.wordsToLearn === true ? Validators.nullValidator : this.isActualTranslation
    ],
  );
}
