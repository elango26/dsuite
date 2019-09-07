import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';
import { MatTableDataSource,MatSnackBar } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { Customer } from 'src/app/interfaces/customer';
import { TransactionDesc, Sales } from 'src/app/interfaces/transaction';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
//import { CATEGORY, SUBCATEGORY, BRANDS } from '../../../constants/contants';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  displayedColumns = ['sno','productName','quantity','rate','tax','amount','action'];
  dataSource: MatTableDataSource<TransactionDesc>;

  form: FormGroup;
  custForm: FormGroup;
  productList: Product[];
  customerList: Customer[];
  transaction_desc: TransactionDesc[]=[];
  filteredOptions: Observable<Product[]>;
  customerFilteredOptions: Observable<Customer[]>;
  sale_type: string = "Retail";
  sale_type_arr: any[];

  @ViewChild("productName") prodField: ElementRef;
  constructor(private commonService: CommonService, public snackBar: MatSnackBar) { 
    this.form = new FormGroup({
      'productName': new FormControl('',Validators.required),
      'quantity': new FormControl('',Validators.required)
    });
    this.custForm = new FormGroup({
      'customerName': new FormControl('',Validators.required),
      'curDate': new FormControl(new Date(),Validators.required)
    });
  }

  ngOnInit() {
    // this.productList = this.commonService.products;
    // this._callFilter();  
    this.loadProduct();
    this.loadCustomers();
  }

  loadCustomers(){
    this.commonService.getMethod(environment.urls.getCustomer).subscribe((data:Customer[]) => {
      this.customerList = data;
      this._callCustomerFilter();  
    });
  }

  loadProduct(){
    this.commonService.getMethod(environment.urls.getProduct).subscribe((data:Product[]) => {
      this.productList = data;
      this._callFilter();  
    });
  }

  displayFn(prod?: Product): string | undefined {
    return prod ? prod.prod_name : undefined;
  }

  //load customer rate type for all products
  public loadCustomerRateType(cust:Customer){
    this.commonService.getMethod(environment.urls.getRateTypeByCustomer+'/'+cust._id).subscribe((data:any) => {
      this.sale_type_arr = data;
    });
  }

  displayCustomerFn(cust?: Customer): string | undefined {
    return cust ? cust.customerName : undefined;
  }  

  private _callCustomerFilter(){
    this.customerFilteredOptions = this.custForm.get("customerName").valueChanges
      .pipe(
        startWith(''),
        map(value => (value && value.length >= 1) ?this._custFilter(value):[])
      );
  }

  private _callFilter(){
    this.filteredOptions = this.form.get("productName").valueChanges
      .pipe(
        startWith(''),
        map(value => (value && value.length >= 1) ? this._filter(value):[])
      );
  }

  private _filter(value: string): Product[] {
    let filterValue = (typeof value == 'string')?value.toLowerCase():"";
    return this.productList.filter(option => option.prod_name.toLowerCase().includes(filterValue));
  }

  private _custFilter(value: string): Customer[] {
    let filterValue = (typeof value == 'string')?value.toLowerCase():"";
    return this.customerList.filter(customer => customer.customerName.toLowerCase().includes(filterValue));
  }

  onSubmit(){
    console.log('submit');
    if(this.form.status == "VALID"){
      let product = this.form.value.productName;
      if(this.sale_type_arr){
        let customer_rate_type = this.sale_type_arr.filter(key => key.prod_id == product._id)[0]; //find customer rate type
        this.sale_type = customer_rate_type.type;
      }
      let rate = this.commonService.getProductPrice(product._id,this.sale_type); // find rate based oo type

      console.log("final rate"+rate);
      let trans_desc:TransactionDesc = {
        prod_name:product.prod_name,
        prod_id : product._id,
        prod_quan : this.form.value.quantity,
        prod_rate_per_unit : rate.price,
        tax: rate.tax?rate.tax:0,
        prod_tax : rate.tax ? (rate.price * this.form.value.quantity)*rate.tax/100:0,
        sub_amount : (rate.price * this.form.value.quantity)
      }
      this.transaction_desc.push(trans_desc);

      this.form.reset();      
      this.dataSource = new MatTableDataSource(this.transaction_desc);      
      this._callFilter();
      this.prodField.nativeElement.focus();
    }    
  }

  _remove(n:number):void{
    this.transaction_desc.splice(n,1);
    this.dataSource = new MatTableDataSource(this.transaction_desc);
  }

  getTotalCost():number {
    return this.transaction_desc.map(t => t.sub_amount).reduce((acc, value) => acc + value, 0)+this.transaction_desc.map(t => t.prod_tax).reduce((acc, value) => acc + value, 0);
  }

  _saveOrder(type:string):void{
    let data: Sales = {
      customer_id: this.custForm.value.customerName._id,
      sale_date: this.custForm.value.curDate,
      total_amount: this.getTotalCost(),
      details: this.transaction_desc
    }
    this.transaction_desc = [];
    this.dataSource = new MatTableDataSource(this.transaction_desc);
    this.form.reset();
    this.custForm.reset();
    this.commonService.postMethod(environment.urls.postSales,data).subscribe(data =>{      
      this.snackBar.open("Saved successfully!!", "Success", {
        duration: 500,
      });
    },error =>{
      this.snackBar.open(error, "Error", {
        duration: 600,
      });
    });
  }

}
