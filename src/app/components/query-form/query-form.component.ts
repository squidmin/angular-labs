import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {query} from "../../scripts/BigQueryApiService";
import {RowDataService} from "../../row-data.service";
import {ExampleResponseItem} from "../../types/ExampleResponseItem";
import {ChangeDetectorRef} from '@angular/core';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QueryFormComponent implements OnInit {
  queryForm: FormGroup;

  @Input()
  gcpToken: string = "";

  constructor(
    private fb: FormBuilder,
    private rowDataService: RowDataService,
    private cdr: ChangeDetectorRef) {

    this.queryForm = this.fb.group({
      subqueries: this.fb.array([this.createSubquery()]),
    });

  }

  ngOnInit() {
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
    this.cdr.markForCheck();
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const csv = (e.target as FileReader).result;
        this.processCSV(csv as string);
      };
      reader.readAsText(file);
    }
  }

  processCSV(data: string) {
    let csvRecordsArray = data.split(/\r\n|\n/);
    console.log('csvRecordsArray ===', csvRecordsArray);

    let sqs = [];
    csvRecordsArray.forEach((row, index) => {
      // if (index === 0) {
      // Handle header of CSV, if there's any
      //   return;
      // }

      const cols = row.split(';');
      if (cols.length === 5) {
        const [id, creation_timestamp, last_update_timestamp, column_a, column_b] = cols;
        console.log(id, creation_timestamp, last_update_timestamp, column_a, column_b,);

        let sqs = this.queryForm.get('subqueries') as FormArray;
        sqs.push(
          this.fb.group({
            id: id,
            creation_timestamp: creation_timestamp,
            last_update_timestamp: last_update_timestamp,
            column_a: column_a,
            column_b: column_b,
          })
        );
      }
    });
    this.removeSubquery(0);
    this.cdr.detectChanges();
  }

  isBlank(sqs: any) {
    console.log('sqs.id ===', sqs.id);
    return false;
  }

}
