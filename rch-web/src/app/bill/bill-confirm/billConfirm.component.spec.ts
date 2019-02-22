import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillConfirmComponent } from './billConfirm.component';

describe('BillConfirmComponent', () => {
  let component: BillConfirmComponent;
  let fixture: ComponentFixture<BillConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
