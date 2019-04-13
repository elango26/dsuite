import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  user:any;
  constructor(private http: HttpClient,private userservice: UserService) {
     // this.user = this.getMethod(environment.urls.getUser);
   }

  getMethod( url ){
    return this.http.get(url);
  }

  postMethod( url, data){
    // common for all post creation
    //console.log('this.user',this.user);
    data['createdBy'] = '5cb1765cd833d31d8c81157d';//this.user.user._id;
    return this.http.post(url,data).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

}
