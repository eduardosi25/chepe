import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostBoxComponent } from './cost-box.component';

describe('CostBoxComponent', () => {
  let component: CostBoxComponent;
  let fixture: ComponentFixture<CostBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
