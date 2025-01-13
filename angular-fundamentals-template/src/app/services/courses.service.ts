import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { SessionStorageService } from '@app/auth/services/session-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {}

  private getHeaders(): HttpHeaders {
    const token = this.sessionStorageService.getToken();

    if (!token) {
      throw new Error('Authorization token is missing');
    }

    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });
  }

  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses/all`, { headers: this.getHeaders() });
  }

  createCourse(course: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/courses/add`, course, { headers: this.getHeaders() });
  }

  editCourse(id: string, course: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/courses/${id}`, course, { headers: this.getHeaders() });
  }

  getCourse(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses/${id}`, { headers: this.getHeaders() });
  }

  deleteCourse(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/courses/${id}`, { headers: this.getHeaders() });
  }

  filterCourses(filters: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/courses/filter`, { params: filters, headers: this.getHeaders() });
  }

  getAllAuthors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/authors/all`, { headers: this.getHeaders() });
  }

  createAuthor(author: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/authors/add`, author, { headers: this.getHeaders() });
  }

  getAuthorById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/authors/${id}`, { headers: this.getHeaders() });
  }

  deleteAuthor(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/authors/${id}`, { headers: this.getHeaders() });
  }
}