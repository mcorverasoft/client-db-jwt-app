import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarbottomComponent } from './navbarbottom.component';

describe('NavbarbottomComponent', () => {
  let component: NavbarbottomComponent;
  let fixture: ComponentFixture<NavbarbottomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavbarbottomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarbottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
