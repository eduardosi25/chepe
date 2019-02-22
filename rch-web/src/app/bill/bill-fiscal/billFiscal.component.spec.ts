import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillFiscalComponent } from './billFiscal.component';

describe('BillFiscalComponent', () => {
  let component: BillFiscalComponent;
  let fixture: ComponentFixture<BillFiscalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillFiscalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillFiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
