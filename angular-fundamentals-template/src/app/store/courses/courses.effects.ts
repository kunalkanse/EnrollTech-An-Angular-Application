import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { CoursesService } from '../../services/courses.service';
import { Router } from '@angular/router';

import { CoursesStateFacade } from '../../store/courses/courses.facade';
import * as fromActions from './courses.actions';

@Injectable()
export class CoursesEffects {
    constructor(
        private actions$: Actions,
        private coursesService: CoursesService,
        private router: Router,
        private coursesStateFacade: CoursesStateFacade
      ) {}

      getAll$ = createEffect(() =>
        this.actions$.pipe(
          ofType(fromActions.requestAllCourses),
          switchMap(() =>
            this.coursesService.getAll().pipe(
              map(courses => fromActions.requestAllCoursesSuccess({ courses })),
              catchError(error => of(fromActions.requestAllCoursesFail({ error })))
            )
          )
        )
      );

      filteredCourses$ = createEffect(() =>
        this.actions$.pipe(
          ofType(fromActions.requestFilteredCourses),
          switchMap(action =>
            this.coursesStateFacade.allCourses$.pipe(
              map(courses =>
                courses.filter(course =>
                  course.title.toLowerCase().includes(action.searchValue.toLowerCase())
                )
              ),
              map(filteredCourses => fromActions.requestFilteredCoursesSuccess({ courses: filteredCourses }))
            )
          )
        )
      );

    
      getSpecificCourse$ = createEffect(() =>
        this.actions$.pipe(
          ofType(fromActions.requestSingleCourse),
          switchMap(action =>
            this.coursesService.getCourse(action.id).pipe( 
              map(course => fromActions.requestSingleCourseSuccess({ course })),
              catchError(error => of(fromActions.requestSingleCourseFail({ error })))
            )
          )
        )
      );

      deleteCourse$ = createEffect(() =>
        this.actions$.pipe(
          ofType(fromActions.requestDeleteCourse),
          switchMap(action =>
            this.coursesService.deleteCourse(action.id).pipe(
              map(() => fromActions.requestAllCourses()),
              catchError(error => of(fromActions.requestDeleteCourseFail({ error })))
            )
          )
        )
      );
    
      editCourse$ = createEffect(() =>
        this.actions$.pipe(
          ofType(fromActions.requestEditCourse),
          switchMap(action =>
            this.coursesService.editCourse(action.course.id, action.course).pipe( // Pass both id and course
              map(() => fromActions.requestEditCourseSuccess({ course: action.course })),
              catchError(error => of(fromActions.requestEditCourseFail({ error })))
            )
          )
        )
      );

      createCourse$ = createEffect(() =>
        this.actions$.pipe(
          ofType(fromActions.requestCreateCourse),
          switchMap(action =>
            this.coursesService.createCourse(action.course).pipe(
              map(() => fromActions.requestCreateCourseSuccess({ course: action.course })),
              catchError(error => of(fromActions.requestCreateCourseFail({ error })))
            )
          )
        )
      );
    
      redirectToTheCoursesPage$ = createEffect(
        () =>
          this.actions$.pipe(
            ofType(
              fromActions.requestCreateCourseSuccess,
              fromActions.requestEditCourseSuccess,
              fromActions.requestSingleCourseFail
            ),
            tap(() => {
              this.router.navigate(['/courses']);
            })
          ),
        { dispatch: false }
      );
    }
