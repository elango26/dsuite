import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Rate } from 'src/app/interfaces/rate';
import { Product } from 'src/app/interfaces/product';
import { CustomerMapping } from 'src/app/interfaces/customermapping';
import { Customer } from 'src/app/interfaces/customer';
import { CustomModalComponent } from './../custom-modal/custom-modal.component';
import { environment } from 'src/environments/environment';
import { RateMappingComponent } from '../rate-mapping/rate-mapping.component';

@Component({
  selector: 'app-customer-mapping',
  templateUrl: './customer-mapping.component.html',
  styleUrls: ['./customer-mapping.component.scss']
})
export class CustomerMappingComponent implements OnInit {

  displayedColumns = ['customer_name', 'view'];
  dataSource: MatTableDataSource<Customer>;
  customerList: Customer[];
  form_details : any;
  options:any[];
  rateTranslate = {'retail':'Retail','wholesale1':'Wholesale 1','wholesale2':"Wholesale 2",'purchase':'Purchase','custom':'Custom'};
    
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private commonService: CommonService, public dialog: MatDialog) { }

  ngOnInit() {
    this.load();
    this.form_details = [];
  }

  load(){
    // this.commonService.getMethod(environment.urls.getRateMapping).subscribe((data:CustomerMapping[]) => {
    // });

    this.commonService.getMethod(environment.urls.getCustomer).subscribe((data:Customer[]) => {
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

  openDialog(id:string): void {    
    const dialogRef = this.dialog.open(RateMappingComponent, {
      width: '1300px',
      data: {customer_id:id,formTitle:"Rate Mapping",url:environment.urls.postRateMapping}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      this.load();
    });
  }


}
