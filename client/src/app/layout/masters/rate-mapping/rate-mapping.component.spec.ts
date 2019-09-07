import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RateMappingComponent } from './rate-mapping.component';

describe('RateMappingComponent', () => {
  let component: RateMappingComponent;
  let fixture: ComponentFixture<RateMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RateMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RateMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
