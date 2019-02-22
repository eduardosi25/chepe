import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillErrorModalComponent } from './error.component';

describe('BillFiscalComponent', () => {
  let component: BillErrorModalComponent;
  let fixture: ComponentFixture<BillErrorModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillErrorModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillErrorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
