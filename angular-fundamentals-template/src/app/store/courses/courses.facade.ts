import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromActions from './courses.actions';
import * as fromSelectors from './courses.selectors';
import { Course } from '@app/Models/course.model';
import { CoursesState } from './courses.reducer';

@Injectable({
  providedIn: 'root',
})
export class CoursesStateFacade {
  isAllCoursesLoading$: Observable<boolean> = this.store.pipe(select(fromSelectors.isAllCoursesLoadingSelector));
  isSingleCourseLoading$: Observable<boolean> = this.store.pipe(select(fromSelectors.isSingleCourseLoadingSelector));
  isSearchingState$: Observable<boolean> = this.store.pipe(select(fromSelectors.isSearchingStateSelector));
  courses$: Observable<any> = this.store.pipe(select(fromSelectors.getCourses));
  allCourses$: Observable<Course[]> = this.store.pipe(select(fromSelectors.getAllCourses));
  course$: Observable<Course> = this.store.pipe(select(fromSelectors.getCourse));
  errorMessage$: Observable<string> = this.store.pipe(select(fromSelectors.getErrorMessage));

  constructor(private store: Store<CoursesState>) {}

  // Methods to dispatch actions
  getAllCourses(): void {
    this.store.dispatch(fromActions.requestAllCourses());
  }

  getSingleCourse(id: string): void {
    this.store.dispatch(fromActions.requestSingleCourse({ id })); // Changed here to match your action
  }

  getFilteredCourses(searchValue: string): void {
    this.store.dispatch(fromActions.requestFilteredCourses({ searchValue }));
  }

  editCourse(course: Course, id: string): void {
    this.store.dispatch(fromActions.requestEditCourse({ course, id }));
  }
  

  createCourse(course: Course): void {
    this.store.dispatch(fromActions.requestCreateCourse({ course }));
  }

  deleteCourse(id: string): void {
    this.store.dispatch(fromActions.requestDeleteCourse({ id }));
  }
}
