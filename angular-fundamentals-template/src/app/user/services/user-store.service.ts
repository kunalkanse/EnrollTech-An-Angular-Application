import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string | null>(null);
  private isAdmin$$ = new BehaviorSubject<boolean>(false);

  public name$: Observable<string | null> = this.name$$.asObservable();
  public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser(): void {
    this.userService.getUser().subscribe((user: any) => {
      this.name$$.next(user.result.name.split(" ")[0]);
      this.isAdmin$$.next(user.isAdmin);
    });
  }
}
