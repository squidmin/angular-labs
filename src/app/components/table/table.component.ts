import {Component, OnInit} from '@angular/core';

export interface Row {
  id: string,
  creation_timestamp: string,
  last_update_timestamp: string,
  column_a: string,
  column_b: string,
  field_added_with_update?: number,  // Optional
}

const SAMPLE_DATA: Row[] = [
  {
    id: "asdf-1234",
    creation_timestamp: "2013-06-24T00:00:00",
    last_update_timestamp: "2015-04-20T00:00:00",
    column_a: "column_a_val_1",
    column_b: "column_b_val_1"
  },
  {
    id: "asdf-1235",
    creation_timestamp: "2013-06-24T00:00:00",
    last_update_timestamp: "2015-04-20T00:00:00",
    column_a: "column_a_val_2",
    column_b: "column_b_val_2"
  },
  {
    id: "asdf-1236",
    creation_timestamp: "2013-06-24T00:00:00",
    last_update_timestamp: "2015-04-20T00:00:00",
    column_a: "column_a_val_3",
    column_b: "column_b_val_3"
  },
  {
    id: "asdf-1237",
    creation_timestamp: "2013-06-24T00:00:00",
    last_update_timestamp: "2015-04-20T00:00:00",
    column_a: "column_a_val_4",
    column_b: "column_b_val_4"
  },
  {
    id: "asdf-1238",
    creation_timestamp: "2013-06-24T00:00:00",
    last_update_timestamp: "2015-04-20T00:00:00",
    column_a: "column_a_val_5",
    column_b: "column_b_val_5"
  },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  label: string = 'Table';
  displayedColumns: string[] = ['id', 'creation_timestamp', 'last_update_timestamp', 'column_a', 'column_b',];
  dataSource = SAMPLE_DATA;

  ngOnInit(): void {
    // Additional init tasks
  }
}
