import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } 
    from '@angular/forms';
import { MatTableDataSource,MatSnackBar } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { TransactionDesc, Purchase } from 'src/app/interfaces/transaction';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { Vendor } from 'src/app/interfaces/vendor';
//import { CATEGORY, SUBCATEGORY, BRANDS } from '../../../constants/contants';

export function objValidator(obj:any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value && !control.value[obj]) {
          return { 'valid': true };
      }
      return null;
  };
}

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})

export class PurchaseComponent implements OnInit {
  displayedColumns = ['sno','productName','quantity','rate','tax','amount','action'];
  dataSource: MatTableDataSource<TransactionDesc>;

  form: FormGroup;
  vendorForm: FormGroup;
  productList: Product[];
  vendorList: Vendor[];
  transaction_desc: TransactionDesc[]=[];
  filteredOptions: Observable<Product[]>;
  vendorFilteredOptions: Observable<Vendor[]>;
  purchase_type: string = "Purchase";
  custFormMaxDate = new Date();

  @ViewChild("productName") prodField: ElementRef;
  constructor(private commonService: CommonService, public snackBar: MatSnackBar) { 
    this.form = new FormGroup({
      'productName': new FormControl('',[Validators.required,objValidator('prod_name')]),
      'quantity': new FormControl('',Validators.required)
    });
    this.vendorForm = new FormGroup({
      'vendorName': new FormControl('',[Validators.required,objValidator('vendorName')]),
      'curDate': new FormControl(new Date(),Validators.required)
    });
  }

  ngOnInit() {
    // this.productList = this.commonService.products;
    // this._callFilter();  
    this.loadProduct();
    this.loadVendors();
  }

  loadVendors(){
    this.commonService.getMethod(environment.urls.getVendor).subscribe((data:Vendor[]) => {
      this.vendorList = data;
      this._callVendorFilter();  
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

  displayVendorFn(cust?: Vendor): string | undefined {
    return cust ? cust.vendorName : undefined;
  }

  private _callVendorFilter(){
    this.vendorFilteredOptions = this.vendorForm.get("vendorName").valueChanges
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

  private _custFilter(value: string): Vendor[] {
    let filterValue = (typeof value == 'string')?value.toLowerCase():"";
    return this.vendorList.filter(vendor => vendor.vendorName.toLowerCase().includes(filterValue));
  }

  onSubmit(){
    if(this.form.status == "VALID"){
      let product = this.form.value.productName;
      let rate = this.commonService.getProductPrice(product._id,this.purchase_type); // find rate based oo type
      console.log(rate);
      let trans_desc:TransactionDesc = {
        rate_type: 'Purchase',
        prod_name:product.prod_name,
        prod_id : product._id,
        product_id:product.product_id,
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
    let data: Purchase = {
      vendor_id: this.vendorForm.value.vendorName._id,
      purchase_date: this.vendorForm.value.curDate,
      total_amount: this.getTotalCost(),
      details: this.transaction_desc
    }
    this.transaction_desc = [];
    this.dataSource = new MatTableDataSource(this.transaction_desc);
    this.form.reset();
    //reset form
    this.vendorForm = new FormGroup({
      'vendorName': new FormControl('',Validators.required),
      'curDate': new FormControl(new Date(),Validators.required)
    });
    // filter options after reset
    this._callVendorFilter();  
    this._callFilter();  
    this.commonService.postMethod(environment.urls.postPurchase,data).subscribe(data =>{      
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

