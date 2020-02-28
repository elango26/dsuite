import { Component, OnInit, ElementRef, EventEmitter, ViewChild, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { objValidator } from '../../transactions/sales/sales.component';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TransactionDesc, Sales } from 'src/app/interfaces/transaction';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { PrinterService } from 'src/app/services/printer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {
  displayedColumns = ['sno','productName','quantity','rate','tax','amount','action'];
  dataSource: MatTableDataSource<TransactionDesc>;
  form: FormGroup;
  productList: Product[];
  filteredOptions: Observable<Product[]>;
  transaction_desc: TransactionDesc[]=[];
  sale_type: string = "Retail";
  sale_type_arr: any[];
  @Input() data : any;
  @Output() closeEditPage = new EventEmitter<boolean>();
  @ViewChild("productName") prodField: ElementRef;

  constructor(private commonService: CommonService, public snackBar: MatSnackBar,private router: Router,public printerService: PrinterService) {
    this.form = new FormGroup({
      'productName': new FormControl('',[Validators.required,objValidator('prod_name')]),
      'quantity': new FormControl('',Validators.required)
    });
   }

  ngOnInit() {
    console.log(this.data);
    this.loadProduct();
    this.loadData();
    if(this.data.customer_id) //for customers alone
      this.loadCustomerRateType(this.data.customer_id);
  }

  //load customer rate type for all products
  public loadCustomerRateType(cust_id){
    this.commonService.getMethod(environment.urls.getRateTypeByCustomer+'/'+cust_id).subscribe((data:any) => {
      this.sale_type_arr = data;
    });
  }

  loadData(){
    this.transaction_desc = this.data.details;
    this.dataSource = new MatTableDataSource(this.data.details);    
  }

  loadProduct(){
    this.commonService.getMethod(environment.urls.getProduct).subscribe((data:Product[]) => {
      this.productList = data;
      this._callFilter();  
    });
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

  displayFn(prod?: Product): string | undefined {
    return prod ? prod.prod_name : undefined;
  }

  getTotalCost():number {
    return this.transaction_desc.filter((t)=> t.is_delete == 'NO').map(t => t.sub_amount).reduce((acc, value) => acc + value, 0)+this.transaction_desc.filter((t)=> t.is_delete == 'NO').map(t => t.prod_tax).reduce((acc, value) => acc + value, 0);
  }

  loadReportPage(){
    this.closeEditPage.emit(false)
  }

  _remove(n:number):void{
    // this.transaction_desc.splice(n,1);
    // this.dataSource = new MatTableDataSource(this.transaction_desc);
    console.log(n);
    console.log(this.transaction_desc[n].is_delete);
    this.transaction_desc[n].is_delete = "YES";
    console.log(this.transaction_desc);
    let transaction_desc = this.transaction_desc.filter(function(trans){
      return trans.is_delete == "NO";
    });
    console.log(this.transaction_desc);
    this.dataSource = new MatTableDataSource(transaction_desc); 
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
        rate_type: this.sale_type,
        prod_name:product.prod_name,
        prod_id : product._id,
        product_id: product.product_id,
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

  _saveOrder(type:string):void{  
    console.log(this.transaction_desc);
    
    let data: Sales = {
      customer_id: this.data.customer_id,
      sale_date: this.data.sale_date,
      total_amount: this.getTotalCost(),
      details: this.transaction_desc
    }
    this.transaction_desc = [];
    this.dataSource = new MatTableDataSource(this.transaction_desc);
     
    this.commonService.putMethod(environment.urls.updateSales+'/'+this.data._id,data).subscribe((data:GenericResp) =>{  
      if(data.code == 200){
        this.snackBar.open("Updated successfully!!", "Success", {
          duration: 500,
        });
        //print
        if(type == 'print'){
          this.printerService.printData = {
            redirectUrl: '/transactions',
            format: 'invoice',
            data: [data.data.sale_id],
            type: 'SALES',
            date: new Date() // dummy date
          }
          this.router.navigate(['/layout',{ outlets: { printpage: 'printview' }}],{ skipLocationChange: true });
        }  
      }else{
        this.snackBar.open("Error!!", "Error", {
          duration: 600,
        });
      }
      
    },error =>{
      this.snackBar.open(error, "Error", {
        duration: 600,
      });
    });   
    this.form.reset();
    //after reset call filters
    this._callFilter();  
    this.loadReportPage();
  } 

}
