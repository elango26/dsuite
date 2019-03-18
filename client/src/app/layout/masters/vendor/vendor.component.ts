import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Vendor } from 'src/app/interfaces/vendor';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogRef } from '@angular/material';

import { CommonModalComponent } from './../common-modal/common-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  displayedColumns = ['vendorName', 'firstName', 'contactPerson', 'contactNo'];
  dataSource: MatTableDataSource<Vendor>;

  vendorList: Vendor[];
  vendor_form_details : any;
  routes=[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonService: CommonService, public dialog: MatDialog) {
    //this.customerList = [];
  }

  ngOnInit() {
    this.loadVendor();
  }

  loadVendor(){
    this.commonService.getMethod(environment.urls.getVendor).subscribe((data:Vendor[]) => {
      this.vendorList = data;
      this.dataSource = new MatTableDataSource(this.vendorList);
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
    this.vendor_form_details = [{
      "order": 1,
      "type": "input",
      "inputType": "text",
      "name": "vendorName",
      "value":"",
      "placeholder": "Vendor Name",
      "validation": {
        "required": true
      }
    }, {
      "order": 6,
      "type": "input",
      "inputType": "text",
      "name": "contactPerson",
      "value":"",
      "placeholder": "Contact Person",
      "validation": {
        "required": true
      }
    }, {
      "order": 2,
      "type": "input",
      "inputType": "text",
      "name": "firstName",
      "value":"",
      "placeholder": "Proprietor First Name",
      "validation": {
        "required": true
      }
    }, {
      "order": 3,
      "type": "input",
      "inputType": "text",
      "name": "lastName",
      "value":"",
      "placeholder": "Proprietor  Last Name",
      "validation": {
        "required": true
      }
    }, {
      "order": 4,
      "type": "input",
      "inputType": "number",
      "name": "contactNo",
      "value":"",
      "placeholder": "Contact #1",
      "validation": {
        "required": true
      }
    }, {
      "order": 5,
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
      "order": 9,
      "type": "input",
      "inputType": "number",
      "name": "pincode",
      "value":"",
      "placeholder": "Pincode",
      "validation": {
        "required": true
      }
    }];

    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '600px',
      data: {formData:this.vendor_form_details.sort((a, b) => a.order - b.order),formTitle:"Vendors",url:environment.urls.postVendor}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      this.loadVendor();
    });
  }

}
