import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:any;
  constructor(private http: HttpClient) { 

      this.getMethod(environment.urls.getUser).subscribe((data) => {
        this.user = data[0] ?  data[0] : {};
      });
  }


  getMethod( url ){
    return this.http.get(url);
  }
}
