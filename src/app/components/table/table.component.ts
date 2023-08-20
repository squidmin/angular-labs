import {Component, OnInit} from '@angular/core';
import {VALID_TABLE_ROWS} from "../../testdata/DataFixtures";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  label: string = 'Table';
  displayedColumns: string[] = ['id', 'creation_timestamp', 'last_update_timestamp', 'column_a', 'column_b',];
  dataSource = VALID_TABLE_ROWS;

  ngOnInit(): void {
    // Additional init tasks
  }
}
