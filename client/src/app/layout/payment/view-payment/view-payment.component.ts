import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Payment } from 'src/app/interfaces/payments';

@Component({
  selector: 'app-view-payment',
  templateUrl: './view-payment.component.html',
  styleUrls: ['./view-payment.component.scss']
})
export class ViewPaymentComponent implements OnInit {
  enableSearch:boolean = false;
  displayedColumns = ['type','amount','actions'];
  dataSource: MatTableDataSource<Payment>;
  payments: Payment[];
  dedicatedCustomer:boolean=false;
  maxToDate: Date = new Date();
  pDate: Date = new Date();
  searKey: string = "";
  confirmBox: string = "YES";
  delDate: Date;
  selRoute: string = "all";
  routes:any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private dialog: MatDialog,public commonService: CommonService, public snackBar:MatSnackBar,
    private datePipe: DatePipe,@Inject(MAT_DIALOG_DATA) public form_value: any) { }

  ngOnInit() {
    this.loadPayments(); 
  }

  addEvent(){
    console.log('test');
  }

  loadPayments(){
    var url = environment.urls.getPayment+'?pdate='+this.datePipe.transform(this.pDate,"dd-MM-yyyy");
    if(this.dedicatedCustomer){
      //url+="&cust_id="+this.currentCustomer._id;
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

}
