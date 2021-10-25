import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserService } from '../services/users.service';

@Component({
  selector: 'app-joined-students',
  templateUrl: './joined-students.component.html',
  styleUrls: ['./joined-students.component.css'],
})
export class JoinedStudentsComponent implements OnInit {
  @Input() users$: Observable<User[]>;
  constructor() {}

  ngOnInit(): void {
    console.log('----', this.users$);
  }
}
