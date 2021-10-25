import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/users.service';

@Component({
  selector: 'app-joined-students',
  templateUrl: './joined-students.component.html',
  styleUrls: ['./joined-students.component.css'],
})
export class JoinedStudentsComponent implements OnInit {
  constructor(public state: UserService) {}

  ngOnInit(): void {
    console.log('----', this.state.getUsers());
  }
}
