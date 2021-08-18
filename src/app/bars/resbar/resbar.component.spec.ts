import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResbarComponent } from './resbar.component';

describe('ResbarComponent', () => {
  let component: ResbarComponent;
  let fixture: ComponentFixture<ResbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
