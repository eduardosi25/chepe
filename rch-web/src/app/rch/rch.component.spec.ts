import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RchComponent } from './rch.component';

describe('RchComponent', () => {
  let component: RchComponent;
  let fixture: ComponentFixture<RchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
