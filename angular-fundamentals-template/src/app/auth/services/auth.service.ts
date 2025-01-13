import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';

const API_URL = 'http://localhost:4000';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    private isAuthorized$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.hasToken());
    public isAuthorized$: Observable<boolean> = this.isAuthorized$$.asObservable();

    constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) {}

    login(user: { name: string, email: string, password: string }): Observable<any> {
        return this.http.post<any>(`${API_URL}/login`, user).pipe(
            tap(response => {
                const token = response.result.split(" ")[1];
                console.log(token);
                this.sessionStorageService.setToken(token);
                this.isAuthorized$$.next(true);                
            }),
            catchError(error => {
                console.error('Login failed', error);
                throw error;
            })
        );
    }

    logout(): Observable<any> {
        return this.http.delete<any>(`${API_URL}/logout`, {
            headers: {
                'Authorization': `Bearer ${this.sessionStorageService.getToken()}`
            }
        }).pipe(
            tap(() => {
                this.sessionStorageService.clearToken();
                this.isAuthorized$$.next(false);
            }),
            catchError(error => {
                console.error('Logout failed', error);
                throw error;
            })
        );
    }

    register(user: { name: string, email: string, password: string }): Observable<any> {
        return this.http.post<any>(`${API_URL}/register`, user).pipe(
            tap(response => {
                // Handle post-register actions (e.g., auto-login)
            }),
            catchError(error => {
                console.error('Registration failed', error);
                throw error;
            })
        );
    }

    get isAuthorized(): boolean {
        return this.isAuthorized$$.getValue();
    }

    set isAuthorized(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    private hasToken(): boolean {
        return this.sessionStorageService.getToken() !== null;
    }

    getLoginUrl(): string {
        return `${API_URL}/login`;
    }
}
