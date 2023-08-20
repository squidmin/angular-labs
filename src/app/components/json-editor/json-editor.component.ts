import {Component, OnInit,} from '@angular/core';
import {query,} from '../../scripts/BigQueryApiService';

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.css']
})
export class JsonEditorComponent implements OnInit {

  label: string = 'Query';

  jsonData: any[] = [{}];

  constructor() {
  }

  query(): any {
    const response = query();
  }

  ngOnInit(): void {
    console.log('Valid table rows fixture:\n', JSON.stringify(this.jsonData));
  }

}
