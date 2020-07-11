import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { Product } from 'src/app/interfaces/product';
import { Rate } from 'src/app/interfaces/rate';
import { RateMapping } from '../interfaces/rateMapping';
import { Customer } from '../interfaces/customer';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  products:Product[];
  customers: Customer[];
  product_rate:Rate[];
  rate_type:RateMapping[];
  discounts: any[];
  constructor(private http: HttpClient,private userservice: UserService,private datePipe:DatePipe) {
    console.log("service called");
    //this.user = this.getMethod(environment.urls.getUser);
    //fetch product details
    this.getMethod(environment.urls.getProduct).subscribe((data:Product[]) => {
      this.products = data;
    });
    // fetch rate 
    // this.getMethod(environment.urls.getRate).subscribe((data:Rate[]) => {
    //   this.product_rate = data;
    // });
    this.getMethod(environment.urls.getRateList).subscribe((data:any[]) => {
      this.product_rate = data;
    });

    //fetch customers
    this.getMethod(environment.urls.getCustomer).subscribe((data:Customer[]) => {
      this.customers = data;
    });

    //fetch discounts available now
    let cur_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    let q = "?isactive=YES&cur_date="+cur_date;
    this.getMethod(environment.urls.discountList+q).subscribe((data:any[]) => {
      this.discounts = data;
    });
   }
  
  getProductList(){
    return this.products;
  }

  getCustomerList(){
    return this.customers;
  }

  getDiscountList(){
    return this.discounts;
  }

  getSearchDiscountList(date:string):any{
    let q = "?isactive=YES&cur_date="+date;
    return this.getMethod(environment.urls.discountList+q);
  }

  getProductPrice(prod_id:string,type:string): Rate{
    let product = this.product_rate.filter((key:any) => key.product._id == prod_id);
    //console.log(product);
    return product.length > 0 ? product[0]['product']['rate_active'][type]:null;
  }

  getMethod( url:string){
    return this.http.get(url);
  }

  postMethod( url:string, data:any){
    data['createdBy'] = this.userservice.user._id;
    return this.http.post(url,data).pipe(
      catchError(this.handleError)
    );
  }

  putMethod( url:string, data:any){
    data['updatedBy'] = this.userservice.user._id;
    return this.http.put(url,data).pipe(
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
