import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRepairComponent } from './detail-repair.component';

describe('DetailRepairComponent', () => {
  let component: DetailRepairComponent;
  let fixture: ComponentFixture<DetailRepairComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRepairComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
