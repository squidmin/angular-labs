import {Component, Input, OnInit,} from '@angular/core';
import {query,} from '../../scripts/BigQueryApiService';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.css']
})
export class JsonEditorComponent implements OnInit {

  label: string = 'Query';

  @Input()
  bigQueryApiToken: string = '';

  jsonData: any[] = [{}];

  constructor() {
  }

  async query() {
    const response = await query(this.bigQueryApiToken, this.jsonData);
    console.log('BQ API response:', JSON.stringify(response));
  }

  queryDryRun(): any {
    // TODO
  }

  ngOnInit(): void {
    console.log('Valid table rows fixture:\n', JSON.stringify(this.jsonData));
  }

}
