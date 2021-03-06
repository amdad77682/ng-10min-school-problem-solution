import { Injectable } from '@angular/core';

export class User {
  constructor(public name: string) {}
}

const you = new User('you');
const other = new User('other');

@Injectable({
  providedIn: 'root',
})
export class SwitchTeacherService {
  user: User = other;

  getUser() {
    return (this.user = this.user === you ? you : other);
  }
  upateUser(user: User) {
    return (this.user = user);
  }
}
