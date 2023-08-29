import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ExampleRequestItem } from './types/ExampleRequestItem';

@Injectable({
  providedIn: 'root',
})
export class RowDataService {
  private rowSubject = new BehaviorSubject<ExampleRequestItem[]>([]);
  private urlSubject = new BehaviorSubject<string>('');
  rows$ = this.rowSubject.asObservable();
  url$ = this.urlSubject.asObservable();

  setRows(rows: ExampleRequestItem[]) {
    this.rowSubject.next(rows);
  }

  setUrl(url: string) {
    this.urlSubject.next(url);
  }
}
