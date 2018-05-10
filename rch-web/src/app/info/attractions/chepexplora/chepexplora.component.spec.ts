import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChepexploraComponent } from './chepexplora.component';

describe('ChepexploraComponent', () => {
  let component: ChepexploraComponent;
  let fixture: ComponentFixture<ChepexploraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChepexploraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChepexploraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
