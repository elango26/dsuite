import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { Customer } from 'src/app/interfaces/customer';
import { RouteObj } from 'src/app/interfaces/route';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogRef } from '@angular/material';

import { CommonModalComponent } from './../common-modal/common-modal.component';
import { environment } from 'src/environments/environment';
import { RoutesComponent } from '../routes/routes.component';
import { ConfirmPopComponent } from 'src/app/app-material/confirm-pop/confirm-pop.component';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { RATE_TYPE } from 'src/app/constants/contants';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  displayedColumns = ['customerName', 'alias', 'route','actions'];
  dataSource: MatTableDataSource<Customer>;

  customerList: Customer[];
  customer_form_details : any;
  routes=[];
  confirmBox: string = "YES";
  selRoute: string = "all";
  available_ratetype=[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonService: CommonService, public dialog: MatDialog, public snackBar: MatSnackBar) {
    
  }

  ngOnInit() {
    this.loadCustomer();
    this.commonService.getMethod(environment.urls.getRoute).subscribe((data:RouteObj[]) => {
      for(let val of data){
        let keyarr = {key:val._id,value:val.areaName};
        this.routes.push(keyarr);
      }
      //this.routes.push({key:'all',value:'All'});
    });

    this.available_ratetype = RATE_TYPE.rate_type.map(function(arr) { return {'key':arr,'value':arr}});
    //console.log(this.available_ratetype);
  }

  loadCustomer(){
    this.commonService.getMethod(environment.urls.getCustomer+"?route="+this.selRoute).subscribe((data:Customer[]) => {
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
    this.loadVariables();

    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '600px',
      data: {formData:this.customer_form_details.sort((a, b) => a.order - b.order),formTitle:"Customers",url:environment.urls.postCustomer}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      this.loadCustomer();
    });
  }

  deleteEntry(row:any): void {
    console.log(row);
      const dialogRef = this.dialog.open(ConfirmPopComponent, {
        width: '250px',
        data: {confirm:this.confirmBox}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result && result == 'YES'){
          row.is_delete = 'YES';
          row.is_active = 'NO';
          this.commonService.putMethod(environment.urls.updateCustomer+'/'+row._id,row).subscribe((data:GenericResp)=>{
            if(data.code == 200){
              this.snackBar.open(data.message, "Success", {
                duration: 500,
              });
              this.loadCustomer();
            }else{
              this.snackBar.open(data.message, "Error", {
                duration: 500,
              });
            }
          });
        }
      });
  }

  editCustomer(row:any):void {    
    this.loadVariables();
    this.customer_form_details.map(inp => {
      inp.value = row[inp.name];
    });
    this.customer_form_details.push({
      "order": 0,
      "type": "input",
      "inputType": "hidden",
      "name": "_id",
      "value": row._id,
      "placeholder": "_ID",
        "validation": {
          "required": true
        }
    });
    this.customer_form_details.push({
      "order": 10,
      "type": "select",
      "inputType": "dropdown",
      "name": "is_active",
      "value":row.is_active,
      "placeholder": "Is Active",
      "validation": {
        "required": true
      },
      "options": [{key:'YES',value:'YES'},{key:'NO',value:'NO'}]
    });
    const dialogRef = this.dialog.open(CommonModalComponent, {
      //width: '300px',
      data: {formData:this.customer_form_details.sort((a, b) => a.order - b.order),formTitle:"Edit",url:environment.urls.updateCustomer,method:'PUT' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadCustomer();   
      this.loadVariables(); // refreh the variables
    });
  }

  loadVariables(){
    this.customer_form_details = [{
      "order": 1,
      "type": "input",
      "inputType": "text",
      "name": "customerName",
      "value":"",
      "placeholder": "Customer Name",
      "validation": {
        "required": true
      }
    }, {
      "order": 2,
      "type": "input",
      "inputType": "text",
      "name": "alias",
      "value":"",
      "placeholder": "Alias",
      "validation": {
        "required": true
      }
    }, {
      "order": 3,
      "type": "input",
      "inputType": "text",
      "name": "firstName",
      "value":"",
      "placeholder": "First Name",
      "validation": {
        "required": true
      }
    }, {
      "order": 4,
      "type": "input",
      "inputType": "text",
      "name": "lastName",
      "value":"",
      "placeholder": "Last Name",
      "validation": {
        "required": true
      }
    }, {
      "order": 5,
      "type": "input",
      "inputType": "number",
      "name": "contactNo",
      "value":"",
      "placeholder": "Contact #1",
      "validation": {
        "required": true
      }
    }, {
      "order": 6,
      "type": "input",
      "inputType": "number",
      "name": "contactNo1",
      "value":"",
      "placeholder": "Contact #2",
      "validation": {
        "required": false
      }
    }, {
      "order": 7,
      "type": "textarea",
      "inputType": "textarea",
      "name": "address",
      "value":"",
      "placeholder": "Address",
      "validation": {
        "required": true
      }
    }, {
      "order": 8,
      "type": "input",
      "inputType": "text",
      "name": "city",
      "value":"",
      "placeholder": "City",
      "validation": {
        "required": true
      }
    }, {
      "order": 10,
      "type": "input",
      "inputType": "number",
      "name": "pincode",
      "value":"",
      "placeholder": "Pincode",
      "validation": {
        "required": true
      }
    }, {
      "order": 9,
      "type": "select",
      "inputType": "dropdown",
      "name": "route",
      "value":"",
      "placeholder": "Route",
      "validation": {
        "required": true
      },
      "options": this.routes
    }, {
      "order": 11,
      "type": "select",
      "inputType": "dropdown",
      "name": "common_ratetype",
      "value":"",
      "placeholder": "Rate Type",
      "validation": {
        "required": true
      },
      "options": this.available_ratetype
    }];
  }
}
