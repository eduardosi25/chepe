import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegalRegionalComponent } from './legal-regional.component';

describe('LegalRegionalComponent', () => {
  let component: LegalRegionalComponent;
  let fixture: ComponentFixture<LegalRegionalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegalRegionalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegalRegionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
