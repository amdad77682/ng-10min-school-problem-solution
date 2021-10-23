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
  user = you;

  getUser() {
    return (this.user = this.user === you ? you : other);
  }
}
