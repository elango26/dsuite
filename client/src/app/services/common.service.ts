import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  httpGet(){
    return this.http.get('http://localhost:8081/getCustomerDetails')
  }
}
