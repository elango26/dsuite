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
  reportDate: Date;
  route: string;
  //report page
  extraTH = ['OLD','WEEK','TODAY','TOTAL','PAID'];
  extraTD: any;
  constructor(public commonService:CommonService, public router: Router) { }

  ngOnInit() { 
    this.products = this.commonService.getProductList();
    this.reportDate = this.data.date;
    this.route = this.data.data.route;
    this.loadReport();
  }

  loadReport(){    
    this.report = [];
    switch(this.data.type){
      case 'SALES':
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
        break;
      case 'LEADS':
        console.log(this.data);
        if(this.data.data.sales.length > 0){      
          for(let i=0;i<this.data.data.sales.length;i++){
            let det = [];
            let rawdata = this.data.data.sales;
            det['customername']=rawdata[i]._id.customer.customerName;        
            this.products.forEach(function(obj){
              let productsDet = rawdata[i].details.filter((orders:any)=>orders.prod_id==obj._id);
              det[obj._id] = productsDet.length > 0?productsDet[0]['prod_quan']:0;
            });
            if(this.data.data.account){
              let cr_dt = this.data.data.account.data;
              let s_old=0,s_week=0,s_today = 0;
              if(cr_dt.sales[rawdata[i]._id.customer._id]){
                if(cr_dt.sales[rawdata[i]._id.customer._id]['old'])
                  s_old = cr_dt.sales[rawdata[i]._id.customer._id]['old'];
                if(cr_dt.sales[rawdata[i]._id.customer._id]['week'])
                  s_week = cr_dt.sales[rawdata[i]._id.customer._id]['week'];
                if(cr_dt.sales[rawdata[i]._id.customer._id]['today'])
                  s_today = cr_dt.sales[rawdata[i]._id.customer._id]['today'];
              }

              let p_old=0,p_week=0,p_today = 0;
              if(cr_dt.payments[rawdata[i]._id.customer._id]){
                if(cr_dt.payments[rawdata[i]._id.customer._id]['old'])
                  p_old = cr_dt.payments[rawdata[i]._id.customer._id]['old'];
                if(cr_dt.payments[rawdata[i]._id.customer._id]['week'])
                  p_week = cr_dt.payments[rawdata[i]._id.customer._id]['week'];
                if(cr_dt.payments[rawdata[i]._id.customer._id]['today'])
                  p_today = cr_dt.payments[rawdata[i]._id.customer._id]['today'];
              }       
              
              let openings = 0;
              if(cr_dt.openings[rawdata[i]._id.customer._id]){
                openings = cr_dt.openings[rawdata[i]._id.customer._id]['opening'];
              }
              
              det['old'] = (s_old + openings) - p_old;
              det['week'] = s_week - p_week;
              det['today'] = s_today - p_today;
            }
            this.report.push(det);
          }     
        }

        if(this.data.data.account){ 
          this.extraTD = this.data.data.account.data;
        }
        
        break;
    }    
    
    setTimeout(()=>{
      window.print();
      this.router.navigate([this.data.redirectUrl,{ outlets: { printpage: null }}],{ skipLocationChange: true });
    },1000);   
  }

}
