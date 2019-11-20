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

  constructor(public commonService: CommonService, public route: Router) {}

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices(){
    let data = {
      invoices: this.data.saleid,
      type: this.data.type
    };
    this.commonService.postMethod(environment.urls.printInvoices,data).subscribe((data:GenericResp)=>{
      console.log(data);
      if(data.code == 200)
        this.invoiceData = data.data;

      setTimeout(()=>{
        window.print();
        this.route.navigate([this.data.redirectUrl,{ outlets: { printpage: null }}],{ skipLocationChange: true });
      },1000);      
    });
  }

}
