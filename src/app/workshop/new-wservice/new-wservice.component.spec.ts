import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWserviceComponent } from './new-wservice.component';

describe('NewWserviceComponent', () => {
  let component: NewWserviceComponent;
  let fixture: ComponentFixture<NewWserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewWserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewWserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
