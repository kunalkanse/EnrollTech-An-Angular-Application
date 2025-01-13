import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // <-- If using forms
import { RegistrationFormComponent } from '../registration-form/registration-form.component';

const routes: Routes = [
  {
    path: '',
    component: RegistrationFormComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,            
    ReactiveFormsModule,      
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class RegistrationModule { }
