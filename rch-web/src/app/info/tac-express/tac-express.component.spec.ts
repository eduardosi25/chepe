import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacExpressComponent } from './tac-express.component';

describe('TacExpressComponent', () => {
  let component: TacExpressComponent;
  let fixture: ComponentFixture<TacExpressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacExpressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacExpressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
