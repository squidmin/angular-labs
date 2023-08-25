import {Component, Input, OnInit,} from '@angular/core';
import {query,} from '../../scripts/BigQueryApiService';

import {DEFAULT_REQUEST_ITEMS} from "../../testdata/DataFixtures";
import {ExampleRequestItem} from "../../types/ExampleRequestItem";
import {RowDataService} from "../../row-data.service";
import {ExampleResponseItem} from "../../types/ExampleResponseItem";

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.css']
})
export class JsonEditorComponent implements OnInit {
  label: string = 'Query';

  requestItems: ExampleRequestItem[] = DEFAULT_REQUEST_ITEMS;

  @Input()
  bigQueryApiToken: string = '';

  constructor(private rowDataService: RowDataService) {
  }

  add(): void {
    if (200 > this.requestItems.length) {
      this.requestItems.push({});
      console.log('JsonEditorComponent.add(): this.requestItems ===', this.requestItems);
    }
  }

  remove(): void {
    if (1 < this.requestItems.length) {
      this.requestItems.pop();
      console.log('JsonEditorComponent.remove(): this.requestItems ===', this.requestItems);
    }
  }

  async query() {
    const response = await query(this.bigQueryApiToken, this.requestItems);
    console.log('BQ API response:', JSON.stringify(response));
    const rows: ExampleResponseItem[] = response?.data.body;
    this.rowDataService.setRows(rows);
  }

  queryDryRun(): any {
    // TODO
  }

  ngOnInit(): void {
    console.log('Valid table rows fixture:\n', JSON.stringify(this.requestItems));
  }
}
