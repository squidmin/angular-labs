import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TableComponent} from './table.component';
import {RowDataService} from '../../row-data.service';
import {of} from 'rxjs';
import {VALID_REQUEST_ITEMS} from '../../testdata/DataFixtures';
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockRowDataService: jasmine.SpyObj<RowDataService>;

  beforeEach(async () => {
    mockRowDataService = jasmine.createSpyObj('RowDataService', ['rows$', 'url$']);
    mockRowDataService.rows$ = of([...VALID_REQUEST_ITEMS]); // initial mock data
    mockRowDataService.url$ = of('mockUrl'); // initial mock URL

    await TestBed.configureTestingModule({
      imports: [MatCardModule, MatTableModule],
      declarations: [TableComponent],
      providers: [
        {provide: RowDataService, useValue: mockRowDataService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
  });
});
