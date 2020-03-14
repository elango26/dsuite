import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { RateMapping } from 'src/app/interfaces/rateMapping';
import { environment } from 'src/environments/environment';
import { RATE_TYPE } from 'src/app/constants/contants';

@Component({
  selector: 'app-rate-mapping',
  templateUrl: './rate-mapping.component.html',
  styleUrls: ['./rate-mapping.component.scss']
})
export class RateMappingComponent implements OnInit {

  productList: RateMapping[];
  displayedColumns = ['product_name', 'rate_type','action'];
  dataSource: MatTableDataSource<RateMapping>;
  rateType: any;
  edit_value: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public commonService:CommonService, public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RateMappingComponent>,
    @Inject(MAT_DIALOG_DATA) public form_value: any) {
      this.edit_value = form_value;
      this.loadMappings(form_value.customer_id);
    }

  ngOnInit() {
    this.rateType = RATE_TYPE.rate_type.map(val =>{
      return {
        key: val,
        value: val
      }
    })
  }

  loadMappings(id:string){
    this.commonService.getMethod(environment.urls.getRateByCustomer+'/'+id).subscribe((data:RateMapping[])=>{
      this.productList = data;
      this.dataSource = new MatTableDataSource(this.productList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    // this.commonService.getMethod(environment.urls.getProduct).subscribe((data:Product[])=>{
    //   this.productList = data;
    //   this.dataSource = new MatTableDataSource(this.productList);
    //   this.dataSource.paginator = this.paginator;
    //   this.dataSource.sort = this.sort;
    // });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }

  assignValues(row:any,e:string){
    if(row.rates.length > 0){
      row.rates[0].type = e;
    }else{
      let rate = {
        customer_id: this.edit_value.customer_id,
        prod_id: row._id,
        type: e
      }
      row.rates[0] = rate;
    }
  }

  applyAll(row:any){
    let selectedType = row.rates[0].type;
    for(let i=0;i<this.productList.length;i++){
      if(this.productList[i].rates.length > 0){
        this.productList[i].rates[0].type = selectedType;
      }else{
        let rate = {
          customer_id: this.edit_value.customer_id,
          prod_id: this.productList[i]._id,
          type: selectedType
        }
        this.productList[i].rates[0] = rate;
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit():void{
    console.log(this.productList);
    this.commonService.postMethod(this.edit_value.url,this.productList).subscribe(data =>{
      this.onNoClick();
      this.snackBar.open("Updated successfully!!", "Success", {
        duration: 500,
      });
    },error =>{
      this.snackBar.open(error, "Error", {
        duration: 500,
      });
    });
  }

}
