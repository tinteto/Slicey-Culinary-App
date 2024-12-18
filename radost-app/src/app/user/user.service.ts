import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
import { AuthUser } from '../types/user';
import { environment } from 'src/environments/environment.development';

const apiUrl = environment.apiUrl 


@Injectable({
  providedIn: 'root'
})

export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<AuthUser | undefined>(undefined);
  private user$ = this.user$$.asObservable();


  user: AuthUser | undefined; 
  userKey = 'userData';

  userSubscription: Subscription;
  

get isLogged(): boolean {
    return !!this.user;
}


  constructor(private http: HttpClient) {
  // this.getToken(); 
   //чрез този subscription запазваме user-a в обект, по този начин gettera isLogged() разбира дали има user и не се губи юзъра на рефреш
   this.userSubscription = this.user$.subscribe((user) => {
   this.user = user //! тук се записва ъпдейтнатия user
  });
  }

  
public getToken(): string | null {
  return localStorage.getItem(this.userKey);
}

//   , 
//   { headers: new HttpHeaders({
//     'Content-Type':  'application/json',
//     'X-Authorization': this.getToken() as string,
//  })
// }


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
.post<AuthUser>(`${apiUrl}/users/register`,  { username, email, password, repassword }) //тук изпращаме тези 4 данни
//между тези двете операции минава през интерсептора и сетва headerOptions(x-authorization: token and content type: application/json)
.pipe(tap((user) => { 
localStorage.setItem(this.userKey, user.accessToken); //на връщането на рикуеста сетваме accessToken
this.user$$.next(user);
}));
}


getUserProfile() {
  return this.http.get<AuthUser>(`${apiUrl}/users/me`)
  .pipe(tap((user) => {
    this.user$$.next(user);
  }));
}

updateUserProfile( username: string, email: string) {
  return this.http.put<AuthUser>(`${apiUrl}/users/me`, { username, email})
  .pipe(tap((user) => {
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

ngOnDestroy(): void {
  this.userSubscription.unsubscribe(); //зачистваме всичко щом service-a умре
}
}
