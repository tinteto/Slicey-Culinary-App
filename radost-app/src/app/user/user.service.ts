import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { AuthUser } from '../types/user';
import { environment } from 'src/environments/environment.development';

const apiUrl = environment.apiUrl //взимам си url-a от обекта environment


@Injectable({
  providedIn: 'root'
})

export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<AuthUser | undefined>(undefined);
  private user$ = this.user$$.asObservable();


  user: AuthUser | undefined; //! to add types
  userKey = 'userKey'; //това е в localStorage ключа на логнатия user
  userSubscription: Subscription;
  


public getToken(): string | null {
return localStorage.getItem(this.userKey);
}

// public setToken(token: string): void {
//   localStorage.setItem(this.userKey, token)
// }


  get isLogged(): boolean {
    return !!this.user;
  }


  constructor(private http: HttpClient) {
   //чрез този subscription запазваме user-a в обект, по този начин gettera isLogged() разбира дали има user и не се губи юзъра на рефреш
   this.userSubscription = this.user$.subscribe((user) => {
   this.user = user;
  })
  }


  
  login(email: string, password: string) {
return this.http
.post<AuthUser>(`${apiUrl}/users/login`, { email, password })
.pipe(tap((user) => {
 localStorage.setItem(this.userKey, user.accessToken);
 this.user$$.next(user);
}));
}



 register(username: string, email: string, password: string, repassword: string) {
return this.http
.post<AuthUser>(`${apiUrl}/users/register`,  { username, email, password, repassword })
.pipe(tap((user) => {
localStorage.setItem(this.userKey, user.accessToken);
this.user$$.next(user);

}));
}


logout() { //{} връща празен обект
  return this.http
  .get(`${apiUrl}/users/logout`)
  .pipe(tap(() => {
  localStorage.removeItem(this.userKey); 
  this.user$$.next(undefined);

  }));
}

getUserProfile() {
  return this.http.get<AuthUser>(`${apiUrl}/users/me`)
  .pipe(tap((user) => {
    this.user$$.next(user);
  }));
}

updateUserProfile(username: string, email: string) {
  return this.http.put<AuthUser>(`${apiUrl}/users/me`, { username, email})
  .pipe(tap((user) => {
this.user$$.next(user);
  }));
}


ngOnDestroy(): void {
  this.userSubscription.unsubscribe(); //зачистваме всичко щом service-a умре
}
}
