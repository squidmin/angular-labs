import {waitForAsync, ComponentFixture, TestBed,} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QueryFormComponent} from './query-form.component';
import {RowDataService} from "../../row-data.service";
import {NO_ERRORS_SCHEMA} from '@angular/core';

describe('QueryFormComponent', () => {
  let component: QueryFormComponent;
  let fixture: ComponentFixture<QueryFormComponent>;
  let mockQueryFunction: () => Promise<any>;
  let rowDataService: jasmine.SpyObj<RowDataService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('RowDataService', ['setRows', 'setUrl']);

    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [QueryFormComponent],
      providers: [
        {provide: RowDataService, useValue: spy}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(QueryFormComponent);
    component = fixture.componentInstance;

    // Mocking the callQuery method to simulate the real service call.
    mockQueryFunction = jasmine.createSpy('callQuery').and.returnValue(Promise.resolve({
      data: {
        body: [],
        url: 'http://example.com'
      }
    }));
    spyOn(component, 'onSubmit').and.callFake(mockQueryFunction);

    rowDataService = TestBed.get(RowDataService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a subquery when addSubquery is called', () => {
    component.addSubquery();
    expect(component.subqueries.length).toBe(2); // Initially 1, then after adding it should be 2
  });

  it('should remove a subquery when removeSubquery is called', () => {
    component.addSubquery();
    component.removeSubquery(1);
    expect(component.subqueries.length).toBe(1); // After adding and removing, it should be back to 1
  });

  it('should clear all subqueries when clearAll is called', () => {
    component.clearAll();
    expect(component.subqueries.length).toBe(1); // It should have only 1 subquery after clearing all
  });
});
