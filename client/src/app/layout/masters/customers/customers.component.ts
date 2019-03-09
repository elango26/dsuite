import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Customer } from 'src/app/interfaces/customer';
import { Route } from 'src/app/interfaces/route';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogRef } from '@angular/material';

import { CommonModalComponent } from './../common-modal/common-modal.component';
import { environment } from 'src/environments/environment';
import { RoutesComponent } from '../routes/routes.component';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  displayedColumns = ['customerName', 'alias', 'route'];
  dataSource: MatTableDataSource<Customer>;

  customerList: Customer[];
  customer_form_details : any;
  routes=[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonService: CommonService, public dialog: MatDialog) {
    //this.customerList = [];
  }

  ngOnInit() {
    this.loadCustomer();
    this.commonService.getMethod(environment.urls.getRoute).subscribe((data:Route[]) => {
      for(let val of data){
        let keyarr = {key:val.areaName,value:val.areaName};
        this.routes.push(keyarr);
      }
    });
  }

  loadCustomer(){
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

  openDialog(): void {
    this.customer_form_details = [{
      "type": "input",
      "inputType": "text",
      "name": "customerName",
      "value":"",
      "placeholder": "Customer Name",
      "validation": {
        "required": false
      }
    }, {
      "type": "input",
      "inputType": "text",
      "name": "alias",
      "value":"",
      "placeholder": "Alias",
      "validation": {
        "required": true
      }
    }, {
      "type": "input",
      "inputType": "text",
      "name": "firstName",
      "value":"",
      "placeholder": "First Name",
      "validation": {
        "required": true
      }
    }, {
      "type": "input",
      "inputType": "text",
      "name": "lastName",
      "value":"",
      "placeholder": "Last Name",
      "validation": {
        "required": true
      }
    }, {
      "type": "input",
      "inputType": "number",
      "name": "contactNo",
      "value":"",
      "placeholder": "Contact #1",
      "validation": {
        "required": true
      }
    }, {
      "type": "input",
      "inputType": "number",
      "name": "contactNo1",
      "value":"",
      "placeholder": "Contact #2",
      "validation": {
        "required": false
      }
    }, {
      "type": "textarea",
      "inputType": "textarea",
      "name": "address",
      "value":"",
      "placeholder": "Address",
      "validation": {
        "required": true
      }
    }, {
      "type": "input",
      "inputType": "text",
      "name": "city",
      "value":"",
      "placeholder": "City",
      "validation": {
        "required": true
      }
    }, {
      "type": "input",
      "inputType": "number",
      "name": "pincode",
      "value":"",
      "placeholder": "Pincode",
      "validation": {
        "required": true
      }
    }, {
      "type": "select",
      "inputType": "dropdown",
      "name": "route",
      "value":"",
      "placeholder": "Route",
      "validation": {
        "required": true
      },
      "options": this.routes
    }];

    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '600px',
      data: {formData:this.customer_form_details,formTitle:"Customers",url:environment.urls.postCustomer}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      this.loadCustomer();
    });
  }
}
