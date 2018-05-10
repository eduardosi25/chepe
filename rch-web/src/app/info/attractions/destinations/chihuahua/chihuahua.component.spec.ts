import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChihuahuaComponent } from './chihuahua.component';

describe('ChihuahuaComponent', () => {
  let component: ChihuahuaComponent;
  let fixture: ComponentFixture<ChihuahuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChihuahuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChihuahuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
