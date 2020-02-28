import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Customer } from 'src/app/interfaces/customer';
import { Leads } from 'src/app/interfaces/leads';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { ProdtableComponent } from '../../common/prodtable/prodtable.component';
import { PaymentsComponent } from '../../payment/payments/payments.component';
import { BootstrapService } from 'src/app/services/bootstrap.service';
import { Observable, forkJoin } from 'rxjs';
import { PrinterService } from 'src/app/services/printer.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  displayedColumns = ['customerName', 'alias', 'route','totalAmount','actions'];
  dataSource: MatTableDataSource<Customer>;

  public customerList: Customer[];
  showLeadsPage:boolean = true;
  rowData:any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonService: CommonService, private dialog: MatDialog, private printerService:PrinterService,
    private datePipe: DatePipe, private router: Router) {
    //this.customerList = [];
  }

  ngOnInit() {
    this.loadLeads();
  }

  private loadLeads(){
    this.commonService.getMethod(environment.urls.getLeads).subscribe((data: Leads[]) => {
      this.customerList = data;
      this.dataSource = new MatTableDataSource(this.customerList);
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

  openOrderModal(customer:Leads){
    console.log(customer);
    const dialogRef = this.dialog.open(ProdtableComponent, {
      width: 'auto',
      height:'auto',
      data: {customer:customer,url:environment.urls.postOrder,source:'leads'},
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
    });
  }

  openPaymentModal(customer:Leads){
    console.log(customer);
    const dialogRef = this.dialog.open(PaymentsComponent, {
      width: 'auto',
      height:'auto',
      data: {customer:customer,source:'leads'},
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadLeads();
    });
  }

  viewCustomerPage(row){
    this.showLeadsPage = false;
    this.rowData = row;
  }

  resetLeadsPage(e){
    console.log(e);
    this.showLeadsPage = true;
  }

  callPrintModal(){
    console.log('printer called');
    const dialogRef = this.dialog.open(SheetPrintComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {    
      let data = {};  
      var q = result.data.map(function(obj){
        return obj.key;
      }).join(",");
      let cur_date = new Date();
      let query = '?sale_date='+this.datePipe.transform(cur_date,"yyyy-MM-dd")+"&route="+q;
      let sales_report = this.commonService.getMethod(environment.urls.salesReport+query);  //order details
      let lead_report = this.commonService.getMethod(environment.urls.leadReport); //account details with tdy,week,old
      forkJoin([sales_report, lead_report]).subscribe(results => {        
        data = {
          'sales':results[0],
          'account':results[1]
        }
        this.printerService.printData = {
          redirectUrl: '/leads',
          format: 'report',
          data: data,
          type: 'LEADS',
          date: cur_date
        }
        this.router.navigate(['/layout',{ outlets: { printpage: 'printview' }}],{ skipLocationChange: true });
      });
    });
  }

}

@Component({
  selector: 'print-sheet',
  templateUrl: './print-sheet.component.html',
  styleUrls: ['./customers.component.scss']
})
export class SheetPrintComponent implements OnInit {
  routes: any[];
  masterCheck: boolean = false;
  constructor(public bootstrap:BootstrapService, public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<SheetPrintComponent>){}
  ngOnInit(){
    this.routes = this.bootstrap.routes.map(function(val) {
      return {
        checked: false,
        key:val._id,
        value:val.areaName
      }
    });
  }

  isAllSelected(){
    this.masterCheck = this.routes.every(function(item:any) {
      return item.checked == true;
    })
  }

  checkUncheckAll(){
    this.routes.forEach(obj => {
      obj.checked = this.masterCheck;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  print(){
    var selectedList = this.routes.filter(function(obj){
      return obj.checked == true;
    });
    this.dialogRef.close({ data: selectedList });
  }
}
