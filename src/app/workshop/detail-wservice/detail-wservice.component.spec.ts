import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWserviceComponent } from './detail-wservice.component';

describe('DetailWserviceComponent', () => {
  let component: DetailWserviceComponent;
  let fixture: ComponentFixture<DetailWserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailWserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
