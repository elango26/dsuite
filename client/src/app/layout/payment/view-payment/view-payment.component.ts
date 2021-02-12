import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Payment } from 'src/app/interfaces/payments';
import { BootstrapService } from 'src/app/services/bootstrap.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.scss']
})
export class ViewPaymentComponent implements OnInit {
  enableSearch:boolean = false;
  displayedColumns = ['customer','type','amount','createdBy','actions'];
  dataSource: MatTableDataSource<Payment>;
  payments: Payment[];
  tempPayment: Payment[];
  dedicatedCustomer:boolean=false;
  maxToDate: Date = new Date();
  pDate: Date = new Date();
  searKey: string = "";
  confirmBox: string = "YES";
  delDate: Date;
  selRoute: string = "all";
  selUser: string = "all";
  routes:any;
  usersList:any;
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
    return (this.tempPayment.map(t => t.amount).reduce((acc, value) => acc + value, 0));
  }

  filterOpts(){
    //console.log(this.selUser);
    this.tempPayment = this.payments;
    if(this.selUser != 'all'){
      this.tempPayment = this.tempPayment.filter(val => val.createdBy == this.selUser);
    } 

    if(this.selRoute !='all'){
      this.tempPayment = this.tempPayment.filter(val => val.customer[0].route == this.selRoute);
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
    this.dataSource = new MatTableDataSource(payments);
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

}
