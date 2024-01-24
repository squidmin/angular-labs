import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GcsUrlService {
  private urlSubject = new BehaviorSubject<string>('');
  url$ = this.urlSubject.asObservable();

  setUrl(url: string) {
    this.urlSubject.next(url);
  }

  getUrl() {
    return this.url$;
  }
}
