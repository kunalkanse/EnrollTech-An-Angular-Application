import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private userStoreService: UserStoreService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userStoreService.isAdmin$.pipe(
      map((isAdmin) => {
        if (isAdmin) {
          return true;
        }
        return this.router.createUrlTree(['/courses']);
      })
    );
  }
}
