import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ExampleRequestItem} from './types/ExampleRequestItem';

@Injectable({
  providedIn: 'root',
})
export class RowDataService {
  private rowSubject = new BehaviorSubject<ExampleRequestItem[]>([]);
  rows$ = this.rowSubject.asObservable();

  setRows(rows: ExampleRequestItem[]) {
    this.rowSubject.next(rows);
  }

  getRows() {
    return this.rows$;
  }
}
