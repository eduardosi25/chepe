import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreelComponent } from './creel.component';

describe('CreelComponent', () => {
  let component: CreelComponent;
  let fixture: ComponentFixture<CreelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
