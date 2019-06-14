import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
//import { MatDialog, MatDialogRef, } from '@angular/material';
//import {MatGridListModule} from '@angular/material/grid-list';
import { CommonService } from 'src/app/services/common.service';
import { environment } from '../../../../environments/environment';
import { Payment } from 'src/app/interfaces/payments';
import { Customer } from 'src/app/interfaces/customer';
import { PAYMENT_TYPE } from '../../../constants/contants';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  displayedColumns = ['type','customer','amount'];
  dataSource: MatTableDataSource<Payment>;
  payment_type: any[];
  payments: Payment[];
  customerList: Customer[];
  customerFilteredOptions: Observable<Customer[]>;
  form:FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public commonService: CommonService, public snackBar:MatSnackBar) { }

  ngOnInit() {
    this.payment_type = PAYMENT_TYPE.map(val=>{
      return {
        key: val,
        value: val
      }
    });
    this.form = new FormGroup({
      'payment_type': new FormControl('',Validators.required),
      'customerName': new FormControl('',Validators.required),
      'amount': new FormControl('',Validators.required)
    });
    this.loadPayments();
    this.loadCustomers();
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

  loadPayments(){
    this.commonService.getMethod(environment.urls.getPayment).subscribe((data:Payment[]) => {
      this.payments = data;
      this.dataSource = new MatTableDataSource(this.payments);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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
        this.loadPayments();
        this.form.reset();
      },error =>{
        this.snackBar.open(error, "Error", {
          duration: 500,
        });
      });
    }
  }

}

