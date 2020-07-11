import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  invoiceData:any[];
  @Input() data:any;

  constructor(public commonService: CommonService, public router: Router) {}

  ngOnInit() {
    this.loadInvoices();
  }

  getDiscountAmt(row:any):number{
    return row.reduce((acc,r)=> {
      return acc+r.total_amount;
    },0);
  }

  loadInvoices(){
    let data = {
      invoices: this.data.data,
      type: this.data.type
    };
    this.commonService.postMethod(environment.urls.printInvoices,data).subscribe((data:GenericResp)=>{
      console.log(data);
      if(data.code == 200)
        this.invoiceData = data.data;

      setTimeout(()=>{
        window.print();
        this.router.navigate([this.data.redirectUrl,{ outlets: { printpage: null }}],{ skipLocationChange: true });
      },1000);      
    });
  }

}
