import { ActionReducerMap } from '@ngrx/store';
import { coursesReducer } from './courses.reducer';
import { CoursesEffects } from './courses.effects';
import { CoursesState } from './courses.reducer';

export interface State {
  courses: CoursesState;
}

export const reducers: ActionReducerMap<State> = {
  courses: coursesReducer,
};

export const effects = [
  CoursesEffects,
];
