import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { PrinterService } from 'src/app/services/printer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sales-report-pop',
  templateUrl: './sales-report-pop.component.html',
  styleUrls: ['./sales-report-pop.component.scss']
})
export class SalesReportPopComponent implements OnInit {

  saleid:string;
  saleData:any;
  constructor(@Inject(MAT_DIALOG_DATA) public dialog_data: any, public commonService:CommonService, public dialogRef: MatDialogRef<SalesReportPopComponent>,
  public printerService:PrinterService, public router:Router) { 
    this.loadInvoices(dialog_data.saleid);
  }

  ngOnInit() {
  }

  loadInvoices(saleid:string){
    let data = {
      invoices: [saleid],
      type: 'SALES'
    };
    this.commonService.postMethod(environment.urls.printInvoices,data).subscribe((data:GenericResp)=>{
      if(data.code == 200)
        this.saleData = data.data;    
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getDiscountAmt(row:any):number{
    return row.reduce((acc,r)=> {
      return acc+r.total_amount;
    },0);
  }

  callPrintModal(){  
    this.printerService.printData = {
      redirectUrl: '/transactions',
      format: 'invoice',
      data: [this.dialog_data.saleid],
      type: 'SALES',
      date: new Date() // dummy date
    }
    this.router.navigate(['/layout',{ outlets: { printpage: 'printview' }}],{ skipLocationChange: true });
  }

}
