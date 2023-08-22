import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Row } from './types/Row';

@Injectable({
  providedIn: 'root',
})
export class RowDataService {
  private rowSubject = new BehaviorSubject<Row[]>([]);
  rows$ = this.rowSubject.asObservable();

  setRows(rows: Row[]) {
    this.rowSubject.next(rows);
  }
}
