import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoRepairsComponent } from './repo-repairs.component';

describe('RepoRepairsComponent', () => {
  let component: RepoRepairsComponent;
  let fixture: ComponentFixture<RepoRepairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RepoRepairsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoRepairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
