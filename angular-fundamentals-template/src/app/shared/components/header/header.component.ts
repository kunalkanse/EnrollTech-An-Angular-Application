import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { UserStoreService } from '@app/user/services/user-store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName$ = this.userStoreService.name$;

  constructor(private userStoreService: UserStoreService, private authService:AuthService, private router:Router) {}

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error("Logout failed", err);
      }
    });
  }

  ngOnInit(): void {
    this.userStoreService.getUser();
  }
}
