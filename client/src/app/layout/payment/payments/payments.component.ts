import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
//import {MatGridListModule} from '@angular/material/grid-list';
import { CommonService } from 'src/app/services/common.service';
import { environment } from '../../../../environments/environment';
import { Payment } from 'src/app/interfaces/payments';
import { Customer } from 'src/app/interfaces/customer';
import { PAYMENT_TYPE } from '../../../constants/contants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { ConfirmPopComponent } from 'src/app/app-material/confirm-pop/confirm-pop.component';

export function ValidateUrl(control: AbstractControl) {
  if (control.value && !control.value.customerName) {
    return { validUrl: true };
  }
  return null;
}
export interface outstandingDetails {
  amount: number;
  classname: string;
}
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})

export class PaymentsComponent implements OnInit {
  displayedColumns = ['type','amount','actions'];
  dataSource: MatTableDataSource<Payment>;
  payment_type: any[];
  payments: Payment[];
  customerList: Customer[];
  customerFilteredOptions: Observable<Customer[]>;
  form:FormGroup;
  outstandingDet: outstandingDetails = {
    amount:0,
    classname: 'negative-amt'
  };
  currentCustomer:Customer;
  dedicatedCustomer:boolean=false;
  maxToDate: Date = new Date();
  pDate: Date = new Date();
  searKey: string = "";
  confirmBox: string = "YES";
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,public commonService: CommonService, public snackBar:MatSnackBar,
    public dialogRef:MatDialogRef<PaymentsComponent>,private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public form_value: any) {
    if(form_value.customer){
      this.currentCustomer = form_value.customer;
      this.dedicatedCustomer = true;
    }      
  }

  ngOnInit() {
//    this.dataSource.filterPredicate = (data, filter: string) => data.customer[0].customerName.toLowerCase().includes(filter) || data.payment_type.toString() === filter;
    this.payment_type = PAYMENT_TYPE.map(val=>{
      return {
        key: val,
        value: val
      }
    });
    this.form = new FormGroup({
      'payment_type': new FormControl('',Validators.required),
      'customerName': new FormControl('',[Validators.required,ValidateUrl]),
      'amount': new FormControl('',Validators.required)
    });
    this.loadPayments(); 
    if(this.dedicatedCustomer){
      this.displayedColumns.unshift('date');
      this.form.controls['customerName'].setValue(this.currentCustomer);
      this.outstandingApi(this.currentCustomer._id);
    }else{
      this.displayedColumns.unshift('customer');
      this.loadCustomers();
      this.loadOutstandingAmount();
    }    
  }

  editPayment(p:any){
    const dialogRef = this.dialog.open(ConfirmPopComponent, {
      width: '250px',
      data: {confirm:this.confirmBox}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result == 'YES'){
        let data = {};
        this.commonService.putMethod(environment.urls.deletePayment+'/'+p._id,data).subscribe((data:GenericResp) =>{  
          if(data.code == 200){
            this.snackBar.open("Deleted successfully!!", "Success", {
              duration: 1000,
            });
          }
          this.loadPayments(); 
        });
      }
    });    
    //this.form.controls['customerName'].setValue(this.currentCustomer);
  }

  loadCustomers(){
    this.commonService.getMethod(environment.urls.getCustomer).subscribe((data:Customer[]) => {
      this.customerList = data;
      this._callCustomerFilter();  
    });
  }

  private _callCustomerFilter(){
    this.customerFilteredOptions = this.form.get("customerName").valueChanges
      .pipe(
        startWith(''),
        map(value => (value && value.length >= 1) ?this._custFilter(value):[])
      );
  }

  private _custFilter(value: string): Customer[] {
    let filterValue = (typeof value == 'string')?value.toLowerCase():"";
    return this.customerList.filter(customer => customer.customerName.toLowerCase().includes(filterValue));
  }

  displayCustomerFn(cust?: Customer): string | undefined {
    return cust ? cust.customerName : undefined;
  }

  
  private loadOutstandingAmount(){
    this.form.get('customerName').valueChanges.subscribe(val => {
      if(val && val._id){
        this.outstandingApi(val._id);
      }      
    });    
  }

  private outstandingApi(cust_id:string){
    this.commonService.getMethod(environment.urls.getOutstanding+'?cust_id='+cust_id).subscribe((data:GenericResp)=>{
      if(data.code == 200){
        let outstanding = data.data.total_sales - data.data.total_payment;
        this.outstandingDet = {
          amount: outstanding,
          classname: (outstanding <= 0)?'negative-amt':'positive-amt'
        }
      }      
    });
  }

  loadPayments(){
    var url = environment.urls.getPayment+'?pdate='+this.datePipe.transform(this.pDate,"yyyy-MM-dd");
    if(this.dedicatedCustomer){
      url+="&cust_id="+this.currentCustomer._id;
    }
    this.commonService.getMethod(url).subscribe((data:Payment[]) => {
      this.payments = data;
      this.dataSource = new MatTableDataSource(this.payments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;      
      // this.dataSource.filterPredicate = (data, filter: string) => {
      //   return data.payment_type == filter;
      // };
      this.dataSource.filterPredicate = (data, filter: string)  => {
        const accumulator = (currentTerm, key) => {
          return key === 'customer' ? currentTerm + data.customer[0].customerName : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }

  clear(){
    this.searKey = "";
    this.dataSource.filter = this.searKey;
  }

  closeModal(){
    if(!this.dedicatedCustomer){
      this.outstandingDet = {
        amount:0,
        classname: 'negative-amt'
      };
      this.form.reset();
    }else{
      this.dialogRef.close();
    }    
  }

  submit_form(){
    console.log(this.form);
    if(this.form.status && this.form.status=="VALID"){
      let data:any = {
        customer_id:this.form.value.customerName._id,
        amount:this.form.value.amount,
        payment_type:this.form.value.payment_type
      }
      
      this.commonService.postMethod(environment.urls.postPayment,data).subscribe(data =>{        
        this.snackBar.open("Saved successfully!!", "Success", {
          duration: 500,
        });
        if(this.dedicatedCustomer){
          this.closeModal();
        }else{
          this.loadPayments();
          this.outstandingDet = {
            amount:0,
            classname: 'negative-amt'
          };
          this.form.reset();
        }        
      },error =>{
        this.snackBar.open(error, "Error", {
          duration: 500,
        });
      });
    }
  }

}

