import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdtableComponent } from './prodtable.component';

describe('ProdtableComponent', () => {
  let component: ProdtableComponent;
  let fixture: ComponentFixture<ProdtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
