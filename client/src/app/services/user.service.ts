import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user:any;
  url = environment.urls.getUser;
  constructor(private http: HttpClient) {
    console.log('user called');
    let session_user = localStorage.getItem('userdetails');
    this.user = JSON.parse(session_user);
  }


  getMethod(){
    return this.http.get(this.url);
  }
}
