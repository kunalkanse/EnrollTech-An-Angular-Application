import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CoursesService } from './courses.service';

@Injectable({
  providedIn: 'root',
})
export class CoursesStoreService {
  private courses$$ = new BehaviorSubject<any[]>([]);
  private isLoading$$ = new BehaviorSubject<boolean>(false);

  public courses$ = this.courses$$.asObservable();
  public isLoading$ = this.isLoading$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll(): void {
    this.isLoading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(tap(() => this.isLoading$$.next(false)))
      .subscribe((courses) => this.courses$$.next(courses));
  }

  createCourse(course: any): void {
    this.coursesService.createCourse(course).subscribe(() => this.getAll());
  }

  editCourse(id: string, course: any): void {
    this.coursesService.editCourse(id, course).subscribe(() => this.getAll());
  }

  getCourse(id: string): Observable<any> {
    return this.coursesService.getCourse(id);
  }

  deleteCourse(id: string): void {
    this.coursesService.deleteCourse(id).subscribe(() => this.getAll());
  }

  filterCourses(filters: any): void {
    this.isLoading$$.next(true);
    this.coursesService
      .filterCourses(filters)
      .pipe(tap(() => this.isLoading$$.next(false)))
      .subscribe((filteredCourses) => this.courses$$.next(filteredCourses));
  }

  getAllAuthors(): Observable<any> {
    return this.coursesService.getAllAuthors();
  }

  createAuthor(author: any): Observable<any> {
    return this.coursesService.createAuthor(author);
  }

  getAuthorById(id: string): Observable<any> {
    return this.coursesService.getAuthorById(id);
  }

  deleteAuthor(id: string): Observable<any> {
    return this.coursesService.deleteAuthor(id)
  }
}
