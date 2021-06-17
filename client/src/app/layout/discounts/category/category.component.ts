import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { PrinterService } from 'src/app/services/printer.service';
import { Router } from '@angular/router';
import { CommonModalComponent } from '../../../app-material/common-modal/common-modal.component';
import { Product } from 'src/app/interfaces/product';
import { DISCOUNT_TYPE, RATE_TYPE } from 'src/app/constants/contants';
import { Customer } from 'src/app/interfaces/customer';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  displayedColumns = [ 'sno','discount_name', 'buy_product', 'free_product','period','actions'];
  //discount_name = name and time
  //buy_prod = both buy and free
  dataSource: MatTableDataSource<any>;
  editView:boolean = false;
  editData: any;
  products: Product[];
  customers: Customer[];

  public salesList: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonService: CommonService, private dialog: MatDialog, public printerService:PrinterService, public router: Router) {
  }

  ngOnInit() {
    this.loadDiscounts();    
  }

  loadDiscounts(){
    //discountList
    this.commonService.getMethod(environment.urls.discountList).subscribe((data) => {
      this.salesList = data;
      this.dataSource = new MatTableDataSource(this.salesList);
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

  editSales(row:any){
    this.editView = true;
    this.editData = row;
  }

  backToReport(e){
    this.editView = false;
    this.loadDiscounts();
  }

  prepareJson():any{
    this.products = this.commonService.getProductList();
    this.customers = this.commonService.getCustomerList();
    let custom_arr = this.customers.map(obj=>{return{key:obj.customer_id,value:obj.customerName +'-'+obj.routes.areaName}});
    custom_arr.unshift({key:'all',value:'All'});
    let form_details = [{
      "order": 1,
      "type": "select",
      "inputType": "dropdown",
      "name": "buy_prod_id",
      "value":"",
      "placeholder": "Product to Buy",
      "validation": {
        "required": true
      },
      "options": this.products.map(obj=>{return{key:obj._id,value:obj.prod_name}})
    },{
      "order": 2,
      "type": "input",
      "inputType": "number",
      "name": "buy_count",
      "value":"",
      "placeholder": "Buy Count",
      "validation": {
        "required": true
      }
    },{
      "order": 3,
      "type": "select",
      "inputType": "dropdown",
      "name": "free_prod_id",
      "value":"",
      "placeholder": "Product to Offer",
      "validation": {
        "required": true
      },
      "options": this.products.map(obj=>{return{key:obj._id,value:obj.prod_name}})
    },{
      "order": 4,
      "type": "input",
      "inputType": "number",
      "name": "free_count",
      "value":"",
      "placeholder": "Units to offer",
      "validation": {
        "required": true
      }
    }, {
      "order": 5,
      "type": "select",
      "inputType": "dropdown",
      "name": "discount_type",
      "value":"",
      "placeholder": "Discount Type",
      "validation": {
        "required": true
      },
      "options": DISCOUNT_TYPE.discount_type.map(val => {return {key:val,value:val}})
    }, {
      "order": 6,
      "type": "input",
      "inputType": "text",
      "name": "discount_name",
      "value":"",
      "placeholder": "Discount Name",
      "validation": {
        "required": true
      }
    }, {
      "order": 7,
      "type": "multiple",
      "inputType": "dropdown",
      "name": "applicable_type",
      "value":"",
      "placeholder": "Applicable Rate Type",
      "validation": {
        "required": true
      },
      "options": RATE_TYPE.rate_type.map(val => {return {key:val,value:val}})
    }, {
      "order": 8,
      "type": "multiple",
      "inputType": "dropdown",
      "name": "applicable_customer",
      "value":"",
      "placeholder": "Applicable Customers",
      "validation": {
        "required": true
      },
      "options": custom_arr
    }, {
      "order": 9,
      "type": "date",
      "inputType": "date",
      "name": "from_date",
      "value":"",
      "placeholder": "From Date",
      //"min_date": new Date(),
      "validation": {
        "required": true
      }
    }, {
      "order": 10,
      "type": "date",
      "inputType": "date",
      "name": "to_date",
      "value":"",
      "placeholder": "To Date",
      "min_date": new Date(),
      "validation": {
        "required": false
      }
    }];
    return form_details;
  }


  openDialog(): void {    

    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '600px',
      data: {formData:this.prepareJson().sort((a, b) => a.order - b.order),formTitle:"Discount Creation",url:environment.urls.discountCreate,method:'POST'}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      this.loadDiscounts();
    });
  }

  editDiscount(row:any){
    console.log(row);
    let form_detail = this.prepareJson();
    form_detail.map(inp => {
      inp.value = row[inp.name];
    });
    form_detail.push({
      "order": 11,
      "type": "select",
      "inputType": "dropdown",
      "name": "is_active",
      "value":row['is_active'],
      "placeholder": "Is Active",
      "validation": {
        "required": true
      },
      "options": [{key:'YES',value:'YES'},{key:'NO',value:'NO'}]
    });
    form_detail.push({
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
   
    
    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '600px',
      data: {formData:form_detail.sort((a, b) => a.order - b.order),formTitle:"Discount Edit",url:environment.urls.discountUpdate,method:'PUT'}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      this.loadDiscounts();
    });
  }

}

