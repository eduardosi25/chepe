import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BahuichivoComponent } from './bahuichivo.component';

describe('BahuichivoComponent', () => {
  let component: BahuichivoComponent;
  let fixture: ComponentFixture<BahuichivoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BahuichivoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BahuichivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
