import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnTogetherWithStudentnComponent } from './learn-together-with-studentn.component';

describe('LearnTogetherWithStudentnComponent', () => {
  let component: LearnTogetherWithStudentnComponent;
  let fixture: ComponentFixture<LearnTogetherWithStudentnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearnTogetherWithStudentnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearnTogetherWithStudentnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
