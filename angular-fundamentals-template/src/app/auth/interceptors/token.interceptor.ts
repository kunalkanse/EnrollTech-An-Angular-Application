import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SessionStorageService } from '@app/auth/services/session-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.sessionStorageService.getToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Unauthorized request, logging out...');
          this.sessionStorageService.clearToken();
          this.router.navigate(['/login']);
        }

        return throwError(() => error);
      })
    );
  }
}
