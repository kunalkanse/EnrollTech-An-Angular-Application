import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared/shared.module';
import { AppComponent } from '@app/app.component';
import { CourseInfoComponent } from '@features/course-info/course-info.component';
import { NotAuthorizedGuard } from '@app/auth/guards/not-authorized.guard';
import { AuthorizedGuard } from '@app/auth/guards/authorized.guard';
import { CoursesStoreService } from '@app/services/courses-store.service';
import { CoursesService } from '@app/services/courses.service';
import { CoursesComponent } from './features/courses/courses.component';
import { CourseListComponent } from './features/courses/course-list/course-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/services/auth.service';
import { AppRoute } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { coursesReducer } from './store/courses/courses.reducer';
import { CoursesEffects } from './store/courses/courses.effects';

@NgModule({
  declarations: [AppComponent, CourseInfoComponent,CoursesComponent, CourseListComponent],
  imports: [
    BrowserModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    AppRoute,
    StoreModule.forRoot({courses:coursesReducer}),
    EffectsModule.forRoot([CoursesEffects]),
  ],
  providers: [
    AuthorizedGuard, 
    NotAuthorizedGuard, 
    CoursesService, 
    CoursesStoreService, 
    AuthService,
    { provide: Window, useValue: window },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}