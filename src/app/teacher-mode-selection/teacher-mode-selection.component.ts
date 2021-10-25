import { Component, Input, OnInit } from '@angular/core';
import { SwitchTeacherService, User } from '../services/switch-teacher.service';

@Component({
  selector: 'app-teacher-mode-selection',
  templateUrl: './teacher-mode-selection.component.html',
  styleUrls: ['./teacher-mode-selection.component.css'],
})
export class TeacherModeSelectionComponent implements OnInit {
  @Input() teacher_mode: boolean;
  @Input() gotoTeacherMode: any;

  current_user$: User;

  constructor(private userData: SwitchTeacherService) {}

  ngOnInit() {
    this.current_user$ = this.userData.getUser();
  }
  ngOnChanges() {
    console.log(this.current_user$);
  }
  onSwitchMode(event: any) {
    const other = new User('other');
    const you = new User('you');
    this.current_user$ = this.userData.upateUser(
      event.target.checked ? you : other
    );
    console.log(this.current_user$);
    this.gotoTeacherMode();
  }
  isCurrentUserAsu() {
    const you = new User('you');
    return this.current_user$ == you ? true : false;
  }
}
