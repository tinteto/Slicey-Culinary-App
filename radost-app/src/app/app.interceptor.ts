import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';
import { ErrorService } from './core/error/error.service';


const apiUrl = environment.apiUrl //взимам си url-a от обекта environment

@Injectable()
export class AppInterceptor implements HttpInterceptor {
userKey = 'userKey';

constructor(private userService: UserService, private errorService: ErrorService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


// const token = localStorage.getItem(this.userKey);

const token = this.userService.getToken();
  
 //request.url.startsWith('/users')
 //url: request.url.replace('/users', apiUrl),
  
 if (token != null) {
    request = request.clone({
   setHeaders: {'X-Authorization': token }
  });
  }

if (token && !request.headers.has('Content-Type')) {
    request = request.clone({
      setHeaders: {'Content-Type': 'application/json'}
});
}

   console.log(request); //принтира всички заявки, които правим

    //!error handling
    return next.handle(request).pipe(
      catchError((error) => {
        if(error.status === 401) {
          this.router.navigate(['/auth/login']); //ако не съм оторизиран за даденото събитие ме препраща към логин формата
        } else {
          this.errorService.setError(error);
          this.router.navigate(['/error']);
        }
        return [error]; //винаги връща масив от грешки
      })
    );
    }    
}

export const appInterceptorProvider: Provider = {
  useClass: AppInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS,
};
