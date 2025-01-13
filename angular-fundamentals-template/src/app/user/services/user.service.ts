import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly baseUrl = 'http://localhost:4000'; // Update this to match your backend URL.

  constructor(private http: HttpClient) {}

  getUser(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users/me`);
  }
}
