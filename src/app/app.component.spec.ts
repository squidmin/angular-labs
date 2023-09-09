import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Component} from "@angular/core";
import {QueryFormComponent} from "./components/query-form/query-form.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatFormFieldModule} from "@angular/material/form-field";

/**
 * When you're running tests for a component, and the component has dependencies on other child components, you may not
 * necessarily want to test the child component's behavior as well. Instead, you might want to mock or "stub" out those
 * child components. For unit tests, you can use "dummy" components to stub out the real ones.
 */
@Component({
  selector: 'app-table',
  template: ''
})
class MockTableComponent {
}

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatFormFieldModule, MatExpansionModule, MatIconModule, BrowserAnimationsModule, MatDividerModule],
    declarations: [AppComponent, QueryFormComponent, MockTableComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
  });
});
