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

@Component({
  selector: 'app-customer-mapping',
  templateUrl: './customer-mapping.component.html',
  styleUrls: ['./customer-mapping.component.scss']
})
export class CustomerMappingComponent implements OnInit {

  displayedColumns = ['customer_name', 'rate_type', 'view'];
  dataSource: MatTableDataSource<Rate>;

  list = [];
  form_details : any;
  customers = [];
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
    this.commonService.getMethod(environment.urls.getRateMapping).subscribe((data:CustomerMapping[]) => {
      
      this.list = data;
      this.dataSource = new MatTableDataSource(this.list);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.commonService.getMethod(environment.urls.getMappingCustomers).subscribe((data:Customer[]) => {
      if(data.length > 1) this.customers.push({key:'all',value:'All Customers'});
      for(let val of data){
        let keyarr = {key:val._id,value:val.customerName};
        this.customers.push(keyarr);
      }
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

  openDialog(): void {
    this.form_details = [
      {
        "order": 1,
        "type": "select",
        "inputType": "dropdown",
        "name": "customer_name",
        "value": "",
        "placeholder": "Select Customer",
        "validation": {
          "required": true
        },
        "options": this.customers
      }
  ]
    
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '1300px',
      data: {dispalay:'customerMapping',formData:this.form_details.sort((a, b) => a.order - b.order),formTitle:"Rate",url:environment.urls.postRateMapping}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      this.load();
    });
  }


}
