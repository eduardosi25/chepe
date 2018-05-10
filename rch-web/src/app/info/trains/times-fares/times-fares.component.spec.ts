import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimesFaresComponent } from './times-fares.component';

describe('TimesFaresComponent', () => {
  let component: TimesFaresComponent;
  let fixture: ComponentFixture<TimesFaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimesFaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimesFaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
