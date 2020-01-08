import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Product } from 'src/app/interfaces/product';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input() data:any;
  products: Product[];
  report: any[];
  constructor(public commonService:CommonService, public router: Router) { }

  ngOnInit() { 
    this.products = this.commonService.getProductList();
    this.loadReport();
  }

  loadReport(){    
    this.report = [];
    if(this.data.data.length > 0){      
      for(let i=0;i<this.data.data.length;i++){
        let det = [];
        let rawdata = this.data.data;
        det['customername']=rawdata[i]._id.customer.customerName;        
        this.products.forEach(function(obj){
          let productsDet = rawdata[i].details.filter((orders:any)=>orders.prod_id==obj._id);
          det[obj._id] = productsDet.length > 0?productsDet[0]['prod_quan']:0;
        });
        this.report.push(det);
      }     
    }
    
    setTimeout(()=>{
      window.print();
      this.router.navigate([this.data.redirectUrl,{ outlets: { printpage: null }}],{ skipLocationChange: true });
    },1000);   
  }

}
