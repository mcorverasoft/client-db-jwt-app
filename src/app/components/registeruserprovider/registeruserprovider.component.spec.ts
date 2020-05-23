import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteruserproviderComponent } from './registeruserprovider.component';

describe('RegisteruserproviderComponent', () => {
  let component: RegisteruserproviderComponent;
  let fixture: ComponentFixture<RegisteruserproviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisteruserproviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteruserproviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
