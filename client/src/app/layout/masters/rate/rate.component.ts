import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Route } from 'src/app/interfaces/route';
import { Vendor } from 'src/app/interfaces/vendor';
import { Product } from 'src/app/interfaces/product';
import { CATEGORY, SUBCATEGORY, BRANDS } from 'src/app/constants/contants';
import { CustomModalComponent } from './../custom-modal/custom-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {

  displayedColumns = ['prod_name', 'retail', 'wholesale1', 'wholesale2', 'purchase'];
  dataSource: MatTableDataSource<Product>;

  rateList : any;
  form_details : any;
  products = [
    {"key": "all","value": "All"},
    {"key": "5c8f940bed3f0b247cbf9643","value": "curd"},
    {"key": "5c8f940bed3f0b247cbf9ddd643","value": "Milk"}
  ];
  options:any[];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private commonService: CommonService, public dialog: MatDialog) { }

  ngOnInit() {
    this.loadProduct();
    // this.commonService.getMethod(environment.urls.getRateProducts).subscribe((data:Product[]) => {
    //   if(data.length > 1) this.products.push({key:'all',value:'All Products'});
    //   for(let val of data){
    //     let keyarr = {key:val._id,value:val.prod_name};
    //    // this.products.push(keyarr);
    //   }
    // });
    this.form_details = [];
  }

  loadProduct(){
    this.commonService.getMethod(environment.urls.getProduct).subscribe((data:Product[]) => {
      for(let val of data){
       // this.rateList.push(val);
      }
      this.dataSource = new MatTableDataSource(this.rateList);
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
    this.form_details = [
      {
        "order": 1,
        "type": "select",
        "inputType": "dropdown",
        "name": "prod_name",
        "value": "",
        "placeholder": "Product Name",
        "validation": {
          "required": true
        },
        "options": this.products
      }
  ]
    
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '1300px',
      data: {dropList:true,formData:this.form_details.sort((a, b) => a.order - b.order),formTitle:"Rate",url:environment.urls.postRate}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      this.loadProduct();
    });
  }

}
