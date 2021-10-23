import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-teacher-mode-selection',
  templateUrl: './teacher-mode-selection.component.html',
  styleUrls: ['./teacher-mode-selection.component.css'],
})
export class TeacherModeSelectionComponent implements OnInit {
  @Output() changed = new EventEmitter<boolean>();
  constructor() {}

  ngOnInit(): void {}
}
