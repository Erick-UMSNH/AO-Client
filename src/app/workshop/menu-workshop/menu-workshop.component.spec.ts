import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuWorkshopComponent } from './menu-workshop.component';

describe('MenuWorkshopComponent', () => {
  let component: MenuWorkshopComponent;
  let fixture: ComponentFixture<MenuWorkshopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuWorkshopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuWorkshopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
