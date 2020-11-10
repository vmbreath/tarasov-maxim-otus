import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {GetTranslateService} from "../get-translate.service";
import {interval, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";
import {LocalStorageService} from "../local-storage.service";

@Component({
  selector: 'app-recently-added',
  templateUrl: './recently-added.component.html',
  styleUrls: ['./recently-added.component.scss']
})
export class RecentlyAddedComponent implements OnInit {
  inputText: any
  isMouseOver: boolean = false;
  language: string = "English";
  englishTranslation$: Observable<any>
  frenchTranslation$: Observable<any>
  words: any[] = []
  wordUrl: any

  constructor(private getTranslateService: GetTranslateService, public localStorageService: LocalStorageService) {
  }

  doId() {
    return `f${(~~(Math.random() * 1e8)).toString(16)}`;
  }

  getWord(ev) {
    this.englishTranslation$ = this.getTranslateService.getTransEnglish(ev.target.value);
    this.frenchTranslation$ = this.getTranslateService.getTransFrancoise(ev.target.value);
  }

  deleteWord(ev) {
    this.words.forEach((word, index) => {
      if (word.id === ev.toElement.id) {
        this.words.splice(index, 1)
      }
    })
    this.localStorageService.removeOnLocalStorage(ev.toElement.id);
  }

  async doWords(ev, trans) {
    if (ev.toElement.innerText && this.inputText) {
      await this.getTranslateService.getImage(this.inputText).then(data => this.getImage(data));
      this.words.push({
        id: this.doId(),
        wordRussian: ev.toElement.innerText,
        wordEnglish: this.inputText,
        wordUrl: this.wordUrl
      });
      const englishWord = ev.toElement.innerText.match(/: (.+)/g)[0].replace(': ', '');
      const frenchWord = ev.toElement.innerText.match(/: (.+)/g)[1].replace(': ', '');
      this.localStorageService.storeOnLocalStorage(this.doId(), this.inputText, englishWord, frenchWord, this.wordUrl);
    }
  }

  getImage(ev) {
    this.wordUrl = ev[0]['contentUrl'];
  }

  ngOnInit(): void {
  }
}
