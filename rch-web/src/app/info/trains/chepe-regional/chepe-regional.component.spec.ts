import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChepeRegionalComponent } from './chepe-regional.component';

describe('ChepeRegionalComponent', () => {
  let component: ChepeRegionalComponent;
  let fixture: ComponentFixture<ChepeRegionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChepeRegionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChepeRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
