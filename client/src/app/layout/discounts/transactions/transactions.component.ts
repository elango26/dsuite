import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  displayedColumns = ['sno','saleId','discountname','prodName','count','totalAmount'];
  dataSource: MatTableDataSource<any>;
  transactionList:any;
  searKey:string="";
  maxToDate:Date = new Date();
  saleDate:Date = new Date();
  totalAmount:number = 0;
  constructor(private commonService:CommonService,private datePipe: DatePipe) { }

  ngOnInit() {
      this.loadDiscTrans();
  }

  filterOpts(){

  }

  loadDiscTrans(){
    console.log(this.saleDate);
    let url = environment.urls.discountTrans+'?pdate='+this.datePipe.transform(this.saleDate,"yyyy-MM-dd");
    this.commonService.getMethod(url).subscribe((data:any)=>{
      if(data.code == 200)
        this.transactionList = data.data;

      this.transactionList = this.transactionList.filter(t=>t.sale_id != '' && t.discounts);
      this.totalAmount = this.transactionList.reduce((acc:number, value) => acc + value.total_amount, 0);
      //console.log(amt);
      this.dataSource = new MatTableDataSource(this.transactionList);
    });  
  }

  clear(){
    this.searKey = "";
    //this.dataSource.filter = this.searKey;
    this.filterOpts();
  }

}
