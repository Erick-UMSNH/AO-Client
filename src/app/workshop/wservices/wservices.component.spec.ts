import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WservicesComponent } from './wservices.component';

describe('WservicesComponent', () => {
  let component: WservicesComponent;
  let fixture: ComponentFixture<WservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WservicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
