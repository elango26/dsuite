import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatDialogRef } from '@angular/material';
//import { RouteObj } from 'src/app/interfaces/route';
import { Vendor } from 'src/app/interfaces/vendor';
import { Rate } from 'src/app/interfaces/rate';
import { Product } from 'src/app/interfaces/product';
import { CATEGORY, SUBCATEGORY, BRANDS, RATE_TYPE } from 'src/app/constants/contants';
import { CustomModalComponent } from './../custom-modal/custom-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  displayedColumns:any[];
  dataSource: MatTableDataSource<any>;
  rateList = [];
  form_details : any;
  products = [];
  options:any[];  
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private commonService: CommonService, public dialog: MatDialog) {
    this.displayedColumns = RATE_TYPE.rate_type;
    this.displayedColumns.unshift("prod_name");
    this.displayedColumns.push("action")
  }

  ngOnInit() {
    this.load();
    this.commonService.getMethod(environment.urls.getRateProducts).subscribe((data:Product[]) => {
      for(let val of data){
        let keyarr = {key:val._id,value:val.prod_name,retail_only: val.retail_only};
        this.products.push(keyarr);
      }
    });
    this.form_details = [];
  }

  load(){
    this.commonService.getMethod(environment.urls.getRateList).subscribe((data:any[]) => {
      this.rateList = data;
      this.dataSource = new MatTableDataSource(this.rateList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data, filter: string)  => {
        const accumulator = (currentTerm, key) => {
          return key === 'product' ? currentTerm + data.product.prod_name : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
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

  _editRate(row:any): void {
    this.form_details = [
      {
        "order": 1,
        "type": "select",
        "inputType": "dropdown",
        "name": "prod_name",
        "value": "",
        "placeholder": "Select Product",
        "validation": {
          "required": true
        },
        "options": this.products
      }
    ]
    
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '1300px',
      data: {source:"rate",formData:this.form_details.sort((a, b) => a.order - b.order),formTitle:"Rate",url:environment.urls.postRate,editRate:row}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      this.load();
    });
  }

  openDialog(): void {
    this.form_details = [
      {
        "order": 1,
        "type": "select",
        "inputType": "dropdown",
        "name": "prod_name",
        "value": "",
        "placeholder": "Select Product",
        "validation": {
          "required": true
        },
        "options": this.products
      }
    ]
    
    const dialogRef = this.dialog.open(CustomModalComponent, {
      width: '1300px',
      data: {source:"rate",formData:this.form_details.sort((a, b) => a.order - b.order),formTitle:"Rate",url:environment.urls.postRate}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      this.load();
    });
  }

}
