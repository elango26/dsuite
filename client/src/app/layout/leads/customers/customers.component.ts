import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Customer } from 'src/app/interfaces/customer';
import { Leads } from 'src/app/interfaces/leads';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { ProdtableComponent } from '../../common/prodtable/prodtable.component';
import { PaymentsComponent } from '../../payment/payments/payments.component';

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

  constructor(private commonService: CommonService, private dialog: MatDialog) {
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
}

