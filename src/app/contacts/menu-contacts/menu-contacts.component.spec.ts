import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuContactsComponent } from './menu-contacts.component';

describe('MenuContactsComponent', () => {
  let component: MenuContactsComponent;
  let fixture: ComponentFixture<MenuContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
