import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWserviceComponent } from './edit-wservice.component';

describe('EditWserviceComponent', () => {
  let component: EditWserviceComponent;
  let fixture: ComponentFixture<EditWserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditWserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
