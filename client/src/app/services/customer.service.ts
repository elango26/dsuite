import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Customer } from '../interfaces/customer';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

 // apiUrl = environment.apiUrl+'/customer';

  constructor(private http:HttpClient) {
    
  }

  /*
  * get customer list
  */
  getCustomers (){

    //return this.http.get(this.apiUrl+'/customerlist');

  }

}
