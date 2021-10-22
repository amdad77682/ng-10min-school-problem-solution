import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherModeSelectionComponent } from './teacher-mode-selection.component';

describe('TeacherModeSelectionComponent', () => {
  let component: TeacherModeSelectionComponent;
  let fixture: ComponentFixture<TeacherModeSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherModeSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherModeSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
