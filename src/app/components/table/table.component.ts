import {Component, OnInit, ViewChild,} from '@angular/core';
import {RowDataService} from "../../row-data.service";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {EXAMPLE_SCHEMA} from "../../schema/ExampleSchema";
import {ExampleResponseItem} from "../../types/ExampleResponseItem";
import {Subscription} from 'rxjs';
import {GcsUrlService} from "../../gcs-url.service";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  label: string = 'Table';
  url: string = '';
  responseItems: ExampleResponseItem[] = [];
  dataSource = new MatTableDataSource(this.responseItems);
  displayedColumns: string[] = EXAMPLE_SCHEMA;
  showFilterRow: boolean = false;
  filterValues: { [key: string]: string } = {};
  filterRowColumns: string[] = [];
  panelOpenState = false;
  keysToCheck: string[] = [];

  // The ! operator tells TypeScript that this property will be initialized later, and it won't be null or undefined.
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  private rowDataSubscription: Subscription;
  private urlSubscription: Subscription;

  constructor(private rowDataService: RowDataService, private gcsUrlService: GcsUrlService) {
    this.rowDataSubscription = this.rowDataService.getRows().subscribe((data: any[]) => {
      this.responseItems = data;
      this.dataSource.data = this.responseItems;
    });
    this.urlSubscription = this.gcsUrlService.getUrl().subscribe((data: string) => {
      this.url = data;
    });
  }

  ngOnInit(): void {
    this.sort = new MatSort();
    this.dataSource.sort = this.sort;
    this.filterRowColumns = this.displayedColumns.map(column => column + '-filter');
  }

  // applyFilter(column: string, event: any) {
  //   // const value = (event.target as HTMLInputElement).value;
  //   const value = event.target.value;
  //   if (value) {
  //     this.filterValues[column] = value.toLowerCase();
  //   } else {
  //     delete this.filterValues[column];
  //   }
  //
  //   // Filtering logic
  //   const activeFilters = Object.keys(this.filterValues);
  //   if (activeFilters.length) {
  //     this.responseItems = VALID_REQUEST_ITEMS.filter(item =>
  //       activeFilters.every(columnKey => (item[columnKey] as string).toLowerCase().includes(this.filterValues[columnKey]))
  //     );
  //   } else {
  //     this.responseItems = VALID_REQUEST_ITEMS;
  //   }
  // }
  applyFilter() {
    this.dataSource.filterPredicate = (data: any, filter: string) => {
      let match = true;
      Object.keys(this.filterValues).forEach(key => {
        const searchValue = this.filterValues[key].toLowerCase();
        if (!match) {
          return;
        }
        if (this.keysToCheck.some(str => key.includes(str))) {
          if (this.isEmpty(this.filterValues[key])) {
            delete this.filterValues[key];
          } else {
            const dataValue: string = data[key] as string;
            match = dataValue?.includes(searchValue);
          }
        } else if (key.includes('placeholder_key')) {
          if (this.isEmpty(this.filterValues[key])) {
            delete this.filterValues[key];
          } else {
            // Custom key-based logic
          }
        } else {
          const dataValue = data[key]?.toString().trim().toLowerCase();
          match = dataValue?.indexOf(searchValue.trim()) !== -1;
        }
      });
      return match;
    }
    this.dataSource.filter = 'triggerFiltering';
  }

  resetFilters() {
    this.filterValues = {};
    this.applyFilter();
  }

  toggleFilterRow() {
    this.showFilterRow = !this.showFilterRow;
  }

  downloadCSV() {
    const csvRows = this.dataSource.data.map(row => Object.values(row).join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    const dateTime = new Date();
    const formattedDateTime = dateTime.toISOString();
    link.setAttribute('download', 'bq_query-' + formattedDateTime + '.csv');
    document.body.appendChild(link);
    link.click();
  }

  isEmpty(field: any): boolean {
    return null === field || undefined === field || '' === field;
  }

}
