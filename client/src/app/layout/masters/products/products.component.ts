import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogRef } from '@angular/material';

import { Product } from 'src/app/interfaces/product';
import { CommonModalComponent } from './../common-modal/common-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  displayedColumns = ['prod_name', 'alias', 'brand_name'];
  dataSource: MatTableDataSource<Product>;

  customerList: Product[];
  product_form_details : any;
  routes=[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private commonService: CommonService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(){
    this.commonService.getMethod(environment.urls.getProduct).subscribe((data:Product[]) => {
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
    this.product_form_details = [{
      "order": 1,
      "type": "input",
      "inputType": "text",
      "name": "prod_name",
      "value": "",
      "placeholder": "Product Name",
      "validation": {
        "required": true
      }
    }, {
      "order": 2,
      "type": "input",
      "inputType": "text",
      "name": "alias",
      "value": "",
      "placeholder": "Alias",
      "validation": {
        "required": true
      }
    }, {
      "order": 3,
      "type": "select",
      "inputType": "dropdown",
      "name": "brand_name",
      "value": "",
      "placeholder": "Brand Name",
      "validation": {
        "required": true
      },
      "options": [{'key':'HATSUN','value':'HATSUN'},{'key':'AROKYA','value':'AROKYA'}]
    }, {
      "order": 4,
      "type": "select",
      "inputType": "dropdown",
      "name": "vendor_id",
      "value": "",
      "placeholder": "Vendor",
      "validation": {
        "required": true
      },
      "options": [{'key':'HAP','value':'HAP'}]
    }];
    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '600px',
      data: {formData:this.product_form_details.sort((a, b) => a.order - b.order),formTitle:"Products",url:environment.urls.postProduct}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      this.loadProduct();
    });
  }
}
