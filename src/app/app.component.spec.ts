import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {Component} from "@angular/core";

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
    declarations: [AppComponent, MockTableComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'angular-labs'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-labs');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('p')?.textContent).toContain('App Component');
  });
});
