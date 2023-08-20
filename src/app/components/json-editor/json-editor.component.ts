import {Component, OnInit,} from '@angular/core';
import {Row} from "../../Row";
import {VALID_TABLE_ROWS} from "../../testdata/DataFixtures";

@Component({
  selector: 'app-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.css']
})
export class JsonEditorComponent implements OnInit {

  jsonData: Row[] = VALID_TABLE_ROWS;

  ngOnInit(): void {
    console.log("Valid table rows fixture:\n", JSON.stringify(this.jsonData));
  }

}
