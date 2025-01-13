import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '@app/auth/services/auth.service'; // Example AuthService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuthorized$: Observable<boolean>; // Observable to track authentication state

  constructor(private authService: AuthService) {
    this.isAuthorized$ = this.authService.isAuthorized$; // Subscribe to auth state
  }
}
