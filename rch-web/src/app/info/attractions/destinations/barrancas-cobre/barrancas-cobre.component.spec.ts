import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrancasCobreComponent } from './barrancas-cobre.component';

describe('BarrancasCobreComponent', () => {
  let component: BarrancasCobreComponent;
  let fixture: ComponentFixture<BarrancasCobreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrancasCobreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrancasCobreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
