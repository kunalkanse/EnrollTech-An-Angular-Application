import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent{
  @ViewChild("loginForm") public loginForm!: NgForm;

  constructor(private authService: AuthService,private router: Router){}

  onLoginFormSubmitted(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }

    const user = {
      email: loginForm.value.email,
      password: loginForm.value.password,
      name: '',
      role: 'user'
    }

    this.authService.login(user).subscribe(
      (response) => {
        // Handle successful login (e.g., navigate to dashboard)\
        this.router.navigate(['/courses']); 
      },
      (error) => {
        // Handle error (e.g., show an error message)
      }
    );
  }
}
