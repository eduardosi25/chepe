import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleRegionalComponent } from './schedule-regional.component';

describe('ScheduleRegionalComponent', () => {
  let component: ScheduleRegionalComponent;
  let fixture: ComponentFixture<ScheduleRegionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleRegionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
