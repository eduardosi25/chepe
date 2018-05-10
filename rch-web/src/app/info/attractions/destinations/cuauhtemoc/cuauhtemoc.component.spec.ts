import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuauhtemocComponent } from './cuauhtemoc.component';

describe('CuauhtemocComponent', () => {
  let component: CuauhtemocComponent;
  let fixture: ComponentFixture<CuauhtemocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuauhtemocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuauhtemocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
