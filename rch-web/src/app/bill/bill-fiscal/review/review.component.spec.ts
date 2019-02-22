import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillReviewModalComponent } from './review.component';

describe('BillReviewModalComponent', () => {
  let component: BillReviewModalComponent;
  let fixture: ComponentFixture<BillReviewModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillReviewModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillReviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
