import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UrikeComponent } from './urike.component';

describe('UrikeComponent', () => {
  let component: UrikeComponent;
  let fixture: ComponentFixture<UrikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
