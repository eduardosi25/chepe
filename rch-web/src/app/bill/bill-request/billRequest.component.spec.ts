import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillRequestComponent } from './billRequest.component';

describe('BillRequestComponent', () => {
  let component: BillRequestComponent;
  let fixture: ComponentFixture<BillRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
