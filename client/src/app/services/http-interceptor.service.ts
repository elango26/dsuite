import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { UserService } from './user.service';

@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {
  constructor(private userservice:UserService) { }

  logout(){
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('userdetails'); 
    this.userservice.user = {};
    location.reload(true);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log('--LoaderHttpInterceptor')
    //LoaderService.showLoader();

    if(this.userservice.user && this.userservice.user.token != ''){
      req = req.clone({
        setHeaders: { 
            Authorization: `Bearer ${this.userservice.user.token}`
        }
      });
    }

    return next.handle(req).pipe(
      map(res => {
        return res;
      }),
      catchError(error => {
        if(error.status == 400 && error.error.message == "Invalid token"){
          this.logout();
        }
        return throwError(error);
      })
    )
  }
}