import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {query} from "../../scripts/BigQueryApiService";
import {RowDataService} from "../../row-data.service";
import {ExampleResponseItem} from "../../types/ExampleResponseItem";

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css']
})
export class QueryFormComponent implements OnInit {
  queryForm: FormGroup;

  @Input()
  gcpToken: string = "";

  constructor(private fb: FormBuilder, private rowDataService: RowDataService) {
    this.queryForm = this.fb.group({
      subqueries: this.fb.array([this.createSubquery()]),
    });
  }

  ngOnInit() {
    this.queryForm = this.fb.group({
      subqueries: this.fb.array([this.createSubquery()]),
    });
  }

  get subqueries(): FormArray {
    return this.queryForm.get('subqueries') as FormArray;
  }

  hasMultipleSubqueries(): boolean {
    const controls = (this.queryForm?.get('subqueries') as FormArray)?.controls;
    return controls && controls.length > 1;
  }

  createSubquery(): FormGroup {
    return this.fb.group({
      id: [''],
      creation_timestamp: [''],
      last_update_timestamp: [''],
      column_a: [''],
      column_b: [''],
    });
  }

  addSubquery(): void {
    (this.queryForm.get('subqueries') as FormArray).push(this.createSubquery());
  }

  removeSubquery(index: number): void {
    (this.queryForm.get('subqueries') as FormArray).removeAt(index);
  }

  async onSubmit() {
    console.log(this.queryForm.value.subqueries);
    const response = await query(this.gcpToken, this.queryForm.value.subqueries);
    // console.log('BQ API RESPONSE:', JSON.stringify(response?.data.body));
    const rows: ExampleResponseItem[] = response?.data.body;
    const url: string = response?.data.url;
    if (rows.length) {
      this.rowDataService.setRows(rows);
    } else if (url) {
      this.rowDataService.setUrl(url);
    }
  }

  queryDryRun(bigQueryApiToken: string): void {
    // TODO
  }
}
