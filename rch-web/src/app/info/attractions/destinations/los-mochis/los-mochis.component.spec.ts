import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LosMochisComponent } from './los-mochis.component';

describe('LosMochisComponent', () => {
  let component: LosMochisComponent;
  let fixture: ComponentFixture<LosMochisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LosMochisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LosMochisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
