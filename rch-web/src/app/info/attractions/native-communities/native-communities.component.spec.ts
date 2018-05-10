import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NativeCommunitiesComponent } from './native-communities.component';

describe('NativeCommunitiesComponent', () => {
  let component: NativeCommunitiesComponent;
  let fixture: ComponentFixture<NativeCommunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NativeCommunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NativeCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
