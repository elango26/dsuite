import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsViewComponent } from './cons-view.component';

describe('ConsViewComponent', () => {
  let component: ConsViewComponent;
  let fixture: ComponentFixture<ConsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
