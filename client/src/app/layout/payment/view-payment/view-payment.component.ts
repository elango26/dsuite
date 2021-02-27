import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Payment } from 'src/app/interfaces/payments';
import { BootstrapService } from 'src/app/services/bootstrap.service';
import { User } from 'src/app/interfaces/user';
import { ConfirmPopComponent } from 'src/app/app-material/confirm-pop/confirm-pop.component';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.scss']
})
export class ViewPaymentComponent implements OnInit {
  enableSearch:boolean = false;
  displayedColumns = ['customer','type','amount','createdBy','actions'];
  dataSource: any;
  //dataSource: MatTableDataSource<Payment[]>;
  payments: Payment[];
  tempPayment: Payment[];
  dedicatedCustomer:boolean=false;
  maxToDate: Date = new Date();
  pDate: Date = new Date();
  searKey: string = "";
  confirmBox: string = "YES";
  delDate: Date = new Date();
  selRoute: string = "all";
  selUser: string = "all";
  routes:any;
  usersList:any;
  form:FormGroup;
  controls:FormArray;
  list$: BehaviorSubject<Payment[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private dialog: MatDialog,private bootstrap:BootstrapService,public commonService: CommonService, public snackBar:MatSnackBar,
    private datePipe: DatePipe,@Inject(MAT_DIALOG_DATA) public form_value: any) { }

  ngOnInit() {
    this.loadMasters();
    this.loadPayments(); 
  }

  loadMasters(){
    this.routes = this.bootstrap.routes.map(function(val) {
      return {
        key:val._id,
        value:val.areaName
      }
    });
    this.routes.push({key:'all',value:'All'});

    this.commonService.getMethod(environment.urls.getUser).subscribe((data:any)=> {
      this.usersList = data.map(function(val) {
        return {
          key:val._id,
          value:val.username
        }
      });
      this.usersList.push({key:'all',value:'All'});
    });    
  }

  addEvent(){
    console.log('test');
  }

  getTotalCost(){
    if(this.tempPayment && this.tempPayment.length > 0)
      return (this.tempPayment.map(t => t.amount).reduce((acc, value) => acc + value, 0));
    return 0;
  }

  filterOpts(){
    this.tempPayment = this.payments.map( obj => ({...obj, isEdit:false}));
    
    if(this.selUser != 'all'){
      this.tempPayment = this.tempPayment.filter(val => val.createdBy == this.selUser);
    } 

    if(this.selRoute !='all'){
      this.tempPayment = this.tempPayment.filter(val => val.customer[0].route == this.selRoute);
    }

    if(this.searKey != ''){
      this.tempPayment = this.tempPayment.filter(pay => {
        return pay.customer[0].customerName.toLowerCase().indexOf(this.searKey.toLowerCase()) > -1
      });
    }
    
    this.loadTable(this.tempPayment);
  }

  loadPayments(){
    var url = environment.urls.getPayment+'?pdate='+this.datePipe.transform(this.delDate,"dd-MM-yyyy");
    if(this.dedicatedCustomer){
      //url+="&cust_id="+this.currentCustomer._id;
    }
    this.commonService.getMethod(url).subscribe((data:Payment[]) => {
      this.payments = data;    
      this.filterOpts();
    });
  }

  loadTable(payments:any){
    const toGrp = payments.map(row => {
      return new FormGroup({
        _id: new FormControl(row._id,Validators.required),
        amount: new FormControl(row.amount,Validators.required)
      },{updateOn: "blur"});
    });
    this.controls = new FormArray(toGrp);
    this.list$ = new BehaviorSubject(payments);
    //this.dataSource = new MatTableDataSource(payments);
    //this.dataSource.data = payments;
    this.dataSource = this.list$;
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;      
    // this.dataSource.filterPredicate = (data, filter: string) => {
    //   return data.payment_type == filter;
    // };
    // this.dataSource.filterPredicate = (data, filter: string)  => {
    //   const accumulator = (currentTerm, key) => {
    //     return key === 'customer' ? currentTerm + data.customer[0].customerName : currentTerm + data[key];
    //   };
    //   const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
    //   // Transform the filter by converting it to lowercase and removing whitespace.
    //   const transformedFilter = filter.trim().toLowerCase();
    //   return dataStr.indexOf(transformedFilter) !== -1;
    // };
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
    //this.dataSource.filter = this.searKey;
    this.filterOpts();
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

  getControl(index, fieldName) {
    return this.controls.at(index).get(fieldName) as FormControl;
  }

  updateField(index:any,field:any) {
    const payment_id = this.getControl(index, '_id');
    const new_amount = this.getControl(index, field);
    const old_value = this.tempPayment[index]['amount'];
    //console.log(payment_id.value+'---'+new_amount.value+'--'+old_value);
    if(new_amount.valid && old_value != new_amount.value){
      //console.log(new_amount.value);
      const dialogRef = this.dialog.open(ConfirmPopComponent, {
        width: '250px',
        data: {confirm:this.confirmBox,label:'Do you want to update the amount?'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result && result == 'YES'){
          let data = {
            'amount': new_amount.value
          };
          this.commonService.putMethod(environment.urls.updatePayment+'/'+payment_id.value,data).subscribe((data:GenericResp) =>{  
            //console.log(data);
            if(data.code == 200){
              this.snackBar.open("Updated successfully!!", "Success", {
                duration: 1000,
              });
              // this.controls.at(index).patchValue({
              //   'amount': new_amount.value
              // });
              //console.log(new_amount.value);
              this.tempPayment[index]['amount']=new_amount.value;
              //console.log(this.tempPayment);
              this.list$.next(this.tempPayment);
            }
          });
        }
      });
    }
  }

  // updateField(index, field) {
  //   const control = this.getControl(index, field);
  //   if (control.valid) {
  //     this.core.update(index,field,control.value);
  //   }

  //  }

  // getControl(index, fieldName) {
  //   const a  = this.controls.at(index).get(fieldName) as FormControl;
  //   return this.controls.at(index).get(fieldName) as FormControl;
  // }

}
