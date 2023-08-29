import {Component, OnInit} from '@angular/core';
import {VALID_REQUEST_ITEMS} from "../../testdata/DataFixtures";
import {RowDataService} from "../../row-data.service";
import {ExampleResponseItem} from "../../types/ExampleResponseItem";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  label: string = 'Table';

  url: string | undefined = undefined;

  responseItems: ExampleResponseItem[] = VALID_REQUEST_ITEMS;

  displayedColumns: string[] = Object.keys(this.responseItems[0]);

  constructor(private rowDataService: RowDataService) {
  }

  ngOnInit(): void {
    this.rowDataService.rows$.subscribe(receivedRows => {
      this.responseItems = receivedRows;
    });
    this.rowDataService.url$.subscribe(receivedUrl => {
      this.url = receivedUrl;
    });
  }
}
