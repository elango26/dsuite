import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentsalesComponent } from './recentsales.component';

describe('RecentsalesComponent', () => {
  let component: RecentsalesComponent;
  let fixture: ComponentFixture<RecentsalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentsalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentsalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
