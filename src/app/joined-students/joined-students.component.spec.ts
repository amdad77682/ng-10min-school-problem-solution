import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedStudentsComponent } from './joined-students.component';

describe('JoinedStudentsComponent', () => {
  let component: JoinedStudentsComponent;
  let fixture: ComponentFixture<JoinedStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinedStudentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
