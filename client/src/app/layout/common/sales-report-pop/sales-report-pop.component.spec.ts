import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportPopComponent } from './sales-report-pop.component';

describe('SalesReportPopComponent', () => {
  let component: SalesReportPopComponent;
  let fixture: ComponentFixture<SalesReportPopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReportPopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportPopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
