import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogRef } from '@angular/material';
//import { RouteObj } from 'src/app/interfaces/route';
import { Vendor } from 'src/app/interfaces/vendor';
import { Product } from 'src/app/interfaces/product';
import { CATEGORY, SUBCATEGORY, BRANDS, MEASURE_UNIT } from 'src/app/constants/contants';
import { CommonModalComponent } from './../common-modal/common-modal.component';
import { FileuploadProcessComponent } from './FileUploadProcess/FileUploadProcess.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  displayedColumns = ['prod_name', 'alias', 'brand_name', 'category', 'sub_category','action'];
  dataSource: MatTableDataSource<Product>;

  productList: Product[];
  product_form_details : any;
  routes=[];
  vendors = [];
  options:any[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private commonService: CommonService, public dialog: MatDialog) {}

  ngOnInit() {
    this.initialize();
    this.loadProduct();
    this.commonService.getMethod(environment.urls.getVendor).subscribe((data:Vendor[]) => {
      for(let val of data){
        let keyarr = {key:val._id,value:val.vendorName};
        this.vendors.push(keyarr);
      }
    });
  }

  initialize(){
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
        "order": 6,
        "type": "select",
        "inputType": "dropdown",
        "name": "brand_name",
        "value": "",
        "placeholder": "Brand Name",
        "validation": {
          "required": true
        },
        "options": BRANDS.map(val => {
          return {
            key: val,
            value: val
          };
        })
      }, {
        "order": 9,
        "type": "select",
        "inputType": "dropdown",
        "name": "vendor_id",
        "value": "",
        "placeholder": "Vendor",
        "validation": {
          "required": true
        },
        "options": this.vendors
      }, {
        "order": 7,
        "type": "select",
        "inputType": "dropdown",
        "name": "category",
        "value": "",
        "placeholder": "Category",
        "validation": {
          "required": true
        },
        "options": CATEGORY.map(val => {
          return {
            key: val,
            value: val
          };
        })
      }, {
        "order": 8,
        "type": "select",
        "inputType": "dropdown",
        "name": "sub_category",
        "value": "",
        "placeholder": "Sub Category",
        "validation": {
          "required": true
        },
        "options": SUBCATEGORY.map(val => {
          return {
            key: val,
            value: val
          };
        })
      },
      {
        "order": 3,
        "type": "select",
        "inputType": "dropdown",
        "name": "measure_unit",
        "value": "",
        "placeholder": "Measurement",
        "validation": {
          "required": true
        },
        "options": MEASURE_UNIT
      },
      {
        "order": 4,
        "type": "input",
        "inputType": "number",
        "name": "volume_per_unit",
        "value": "",
        "placeholder": "Volume/Unit",
        "validation": {
          "required": true
        }
      },
      {
        "order": 5,
        "type": "input",
        "inputType": "number",
        "name": "quan_per_grade",
        "value": "",
        "placeholder": "Quantity/Grade",
        "validation": {
          "required": true
        }
      },{
        "order": 10,
        "type": "select",
        "inputType": "dropdown",
        "name": "is_retail",
        "value":"",
        "placeholder": "Is Retail Only?",
        "validation": {
          "required": true
        },
        "options": [{key:'YES',value:'YES'},{key:'NO',value:'NO'}]
      },{
        "order": 11,
        "type": "select",
        "inputType": "dropdown",
        "name": "leads_view",
        "value":"",
        "placeholder": "Leads view",
        "validation": {
          "required": true
        },
        "options": [{key:'YES',value:'YES'},{key:'NO',value:'NO'}]
      },
      {
        "order": 12,
        "type": "input",
        "inputType": "number",
        "name": "barcode",
        "value": "",
        "placeholder": "Bar Code",
        "validation": {
          "required": false
        }
      }
    ];
  }

  loadProduct(){
    this.commonService.getMethod(environment.urls.getProduct).subscribe((data:Product[]) => {
      this.productList = data;
      this.dataSource = new MatTableDataSource(this.productList);
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

  editProduct(row:any):void{
    this.initialize();
    this.product_form_details.map(inp => {
      inp.value = row[inp.name];
    });
    this.product_form_details.push(
      {
        "order": 0,
        "type": "input",
        "inputType": "hidden",
        "name": "_id",
        "value": row._id,
        "placeholder": "_ID",
          "validation": {
            "required": true
          }
      }
    );
    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '600px',
      data: {formData:this.product_form_details.sort((a, b) => a.order - b.order),formTitle:"Products",url:environment.urls.updateProduct,method:'PUT'}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      this.loadProduct();
    });
  }

  openDialog(): void {
    this.initialize();
    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '600px',
      data: {formData:this.product_form_details.sort((a, b) => a.order - b.order),formTitle:"Products",url:environment.urls.postProduct}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      this.loadProduct();
    });
  }

  openBulkDialog(): void {
    const dialogRef = this.dialog.open(FileuploadProcessComponent, {
      width: '600px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      // TO-DO
    });
  }
}
