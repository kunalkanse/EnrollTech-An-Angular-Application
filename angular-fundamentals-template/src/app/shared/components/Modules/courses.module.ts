import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { CourseFormComponent } from "../course-form/course-form.component";
import { CoursesComponent } from "@app/features/courses/courses.component";
import { CourseInfoComponent } from "@app/features/course-info/course-info.component";

const routes = [
  {
    path: '',
    component: CoursesComponent,
    canActivate: [AuthorizedGuard]
  },
  {
    path: 'addCourse',
    component: CourseFormComponent,
    canActivate: [AuthorizedGuard]
  },
  {
    path: ':id',
    component: CourseInfoComponent,
    canActivate: [AuthorizedGuard]
  },
  {
    path: 'edit/:id',
    component: CourseFormComponent,
    canActivate: [AuthorizedGuard]
  },
  {
    path: 'courses/:id',
    component: CourseInfoComponent,
    canActivate: [AuthorizedGuard]
  }
]

@NgModule({
  imports : [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CoursesModule{

}