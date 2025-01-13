import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // To redirect after successful registration
import { AuthService } from '@app/auth/services/auth.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent {
  registrationForm!: FormGroup;

  constructor(private authService: AuthService, private router:Router){}

  ngOnInit() {
    this.registrationForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onRegistrationFormSubmit() {
    if (this.registrationForm.valid) {  
      const user = this.registrationForm.value; 
      this.authService.register(user).subscribe({
        next: (response) => {
          this.router.navigate(['/login']); 
        },
        error: (error) => {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
      });
    } else {
      alert('Please fill all required fields correctly.');
    }
  }
}