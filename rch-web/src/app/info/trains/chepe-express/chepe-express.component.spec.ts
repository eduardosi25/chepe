import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChepeExpressComponent } from './chepe-express.component';

describe('ChepeExpressComponent', () => {
  let component: ChepeExpressComponent;
  let fixture: ComponentFixture<ChepeExpressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChepeExpressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChepeExpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
