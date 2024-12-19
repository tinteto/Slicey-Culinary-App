import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserService } from './user/user.service';
import { Router } from '@angular/router';
import { ErrorService } from './core/error/error.service';


const apiUrl = environment.apiUrl;

@Injectable()
export class AppInterceptor implements HttpInterceptor {
userKey = 'userKey';

constructor(private userService: UserService, private errorService: ErrorService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


// const token = localStorage.getItem(this.userKey);

const token = this.userService.getToken();
  
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

 //  console.log(request);

    return next.handle(request).pipe(
      catchError((error) => {
        if(error.status === 401) {
          this.router.navigate(['/auth/login']); 
        } else if (error.status === 403) {
        localStorage.clear();
        this.router.navigate(['/auth/login']);
        } else {
          this.errorService.setError(error);
          this.router.navigate(['/error']);
        }
        return [error]; 
      })
    );
    }    
}

export const appInterceptorProvider: Provider = {
  useClass: AppInterceptor,
  multi: true,
  provide: HTTP_INTERCEPTORS,
};
