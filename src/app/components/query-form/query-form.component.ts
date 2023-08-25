import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css']
})
export class QueryFormComponent implements OnInit {
  queryForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.queryForm = this.fb.group({
      subqueries: this.fb.array([this.createSubquery()])
    });
  }

  ngOnInit() {
    this.queryForm = this.fb.group({
      subqueries: this.fb.array([this.createSubquery()])
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
      column_b: ['']
    });
  }

  addSubquery(): void {
    (this.queryForm.get('subqueries') as FormArray).push(this.createSubquery());
  }

  removeSubquery(index: number): void {
    (this.queryForm.get('subqueries') as FormArray).removeAt(index);
  }

  onSubmit() {
    console.log(this.queryForm.value);
  }
}
