import {Injectable} from '@angular/core';
import {debounceTime, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class GetTranslateService {
  constructor(private http: HttpClient) {
  }

  getTransEnglish(word) {
    const requestOptions = {
      "headers": {
        "x-rapidapi-host": "just-translated.p.rapidapi.com",
        "x-rapidapi-key": "03bc2e1997msh16c8f8000372905p1a9f5bjsn2efb5541bb78"
      },
    };
    return this.http.get(`https://just-translated.p.rapidapi.com/?text=${word}&lang_from=ru&lang_to=en`, requestOptions)
      .pipe(map(translate => translate['text']), debounceTime(100));
  }

  getTransFrancoise(word) {
    const requestOptions = {
      "headers": {
        "x-rapidapi-host": "just-translated.p.rapidapi.com",
        "x-rapidapi-key": "03bc2e1997msh16c8f8000372905p1a9f5bjsn2efb5541bb78"
      },
    };
    return this.http.get(`https://just-translated.p.rapidapi.com/?text=${word}&lang_from=ru&lang_to=fr`, requestOptions)
      .pipe(map(translate => translate['text']), debounceTime(100));
  }

  async getImage(word) {
    const url = `https://rapidapi.p.rapidapi.com/images/search?q=${word}&count=5`;
    let response = await fetch(url, {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
        "x-rapidapi-key": "03bc2e1997msh16c8f8000372905p1a9f5bjsn2efb5541bb78"
      }
    })
    return await response.json().then(PromiseResult => PromiseResult.value)
  }

}
