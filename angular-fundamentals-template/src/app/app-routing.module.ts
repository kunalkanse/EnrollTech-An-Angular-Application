import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthorizedGuard } from './auth/guards/not-authorized.guard';
import { AuthorizedGuard } from './auth/guards/authorized.guard';
import { LoginFormComponent } from './shared/components';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    canActivate: [NotAuthorizedGuard],
    loadChildren: () => import('./shared/components/Modules/login.module').then(m => m.LoginModule),
  },
  {
    path: 'registration',
    canActivate: [NotAuthorizedGuard],
    loadChildren: () => import('./shared/components/Modules/registration.module').then(m => m.RegistrationModule),
  },
  {
    path: 'courses',
    canActivate: [AuthorizedGuard],
    loadChildren: () => import('./shared/components/Modules/courses.module').then(m => m.CoursesModule),
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoute {}
