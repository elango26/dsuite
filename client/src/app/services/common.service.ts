import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { Product } from 'src/app/interfaces/product';
import { Rate } from 'src/app/interfaces/rate';
import { RateMapping } from '../interfaces/rateMapping';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  products:Product[];
  product_rate:Rate[];
  rate_type:RateMapping[];
  constructor(private http: HttpClient,private userservice: UserService) {
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
   }
  
  getProductList(){
    return this.products;
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
