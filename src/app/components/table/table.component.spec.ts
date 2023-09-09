import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TableComponent} from './table.component';
import {RowDataService} from '../../row-data.service';
import {of} from 'rxjs';
import {VALID_REQUEST_ITEMS, VALID_RESPONSE_ITEMS} from '../../testdata/DataFixtures';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {ExampleResponseItem} from '../../types/ExampleResponseItem';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let mockRowDataService: jasmine.SpyObj<RowDataService>;

  const mockRows: ExampleResponseItem[] = VALID_RESPONSE_ITEMS;
  const mockUrl = 'http://example.com';

  beforeEach(async () => {
    mockRowDataService = jasmine.createSpyObj('RowDataService', ['rows$', 'url$']);
    mockRowDataService.rows$ = of(VALID_RESPONSE_ITEMS); // initial mock data
    mockRowDataService.url$ = of(mockUrl);

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

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set responseItems on component initialization', () => {
    component.ngOnInit();
    expect(component.responseItems).toEqual(mockRows);
  });

  it('should set url on component initialization', () => {
    component.ngOnInit();
    expect(component.url).toEqual(mockUrl);
  });

  it('should set displayedColumns based on responseItems keys', () => {
    expect(component.displayedColumns).toEqual(Object.keys(VALID_REQUEST_ITEMS[0]));
  });

  it('should display the URL card when URL is set', () => {
    component.ngOnInit();
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.url-card code').textContent).toBe(mockUrl);
  });

  it('should display columns from displayedColumns', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('th').length).toBe(component.displayedColumns.length);
  });
});
