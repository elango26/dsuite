import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentdamagesComponent } from './recentdamages.component';

describe('RecentdamagesComponent', () => {
  let component: RecentdamagesComponent;
  let fixture: ComponentFixture<RecentdamagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentdamagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentdamagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
