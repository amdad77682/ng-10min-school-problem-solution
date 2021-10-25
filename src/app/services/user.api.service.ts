import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './users.service';

@Injectable()
export class UserApiService {
  constructor(private http: HttpClient) {}

  getUsers = (): any => {
    return [];
  };
}
