import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserApiService } from './user.api.service';

export class User {
  id?: number;
  name: string;
}
@Injectable()
export class UserService {
  newUser = new User();
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private api: UserApiService) {}

  getUsers() {
    this.api
      .getUsers()
      .subscribe((data: any) =>
        this.usersSubject.next(data.map(this.mapUsers).sort(this.sortUsers))
      );
  }

  removeUser(user: User) {
    const userFilter = this.filterUsers(user);
    this.usersSubject.next(this.usersSubject.getValue().filter(userFilter));
  }

  addUser(user: User) {
    user.id = Math.floor(Math.random() * 5000);
    const users = this.usersSubject.getValue();
    users.push(user);
    this.usersSubject.next(users.sort(this.sortUsers));
    this.newUser = new User();
  }

  private mapUsers = (user: User) => Object.assign(new User(), user);
  private sortUsers = (userA: User, userB: User) =>
    userA.name > userB.name ? 1 : -1;
  private filterUsers = (user: User) => (u: User) => u.id !== user.id;
}
