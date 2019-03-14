import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalExpressComponent } from './legal-express.component';

describe('LegalExpressComponent', () => {
  let component: LegalExpressComponent;
  let fixture: ComponentFixture<LegalExpressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalExpressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalExpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
