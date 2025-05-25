import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import baseUrl from './helper';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  private http = inject(HttpClient);

  // add user
  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }

  // get user
  public getSingleUser(username: any) {
    return this.http.get(`${baseUrl}/user/${username}`)
  }

  // update user
  public updateUser(user: any) {
    return this.http.put(`${baseUrl}/user/${user.id}`, user);
  }

  // verify password
  public verifyPassword(oldPassword: any, user: any): Observable<boolean> {
    return this.http.put(`${baseUrl}/verify-password/${oldPassword}`, user).pipe(
      map(response => response as boolean)
    );
  }

  // update password
  public updatePassword(newPassword: any, user: any) {
    return this.http.put(`${baseUrl}/update-password/${newPassword}`, user);
  }

}
