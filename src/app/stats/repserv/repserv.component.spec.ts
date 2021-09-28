import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepservComponent } from './repserv.component';

describe('RepservComponent', () => {
  let component: RepservComponent;
  let fixture: ComponentFixture<RepservComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepservComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepservComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
