import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElFuerteComponent } from './el-fuerte.component';

describe('ElFuerteComponent', () => {
  let component: ElFuerteComponent;
  let fixture: ComponentFixture<ElFuerteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElFuerteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElFuerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
