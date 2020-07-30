import { Component, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { Product } from 'src/app/interfaces/product';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { catchError } from 'rxjs/operators';

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
  reportProductList: any;
  thList: any;
  extraTH = ['OLD','WEEK','TODAY','TOTAL','PAID'];
  extraTD: any;
  constructor(public commonService:CommonService, public router: Router) { }

  ngOnInit() { 
    this.products = this.commonService.getProductList();    
    this.reportDate = this.data.date;
    this.route = this.data.data.route;
    this.loadHeaders();
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
              let quantity = rawdata[i].details.filter((orders:any)=>orders.prod_id==obj._id).reduce((acc,val)=>acc+val.prod_quan,0);
              det[obj._id] = quantity > 0?quantity:0;
            });            
            this.report.push(det);
          }     
        }
        break;
      case 'LEADS':
        if(this.data.data.sales.length > 0){      
          for(let i=0;i<this.data.data.sales.length;i++){
            let det = [];
            let rawdata = this.data.data.sales;
            det['customername']=rawdata[i]._id.customer.customerName;        
            this.products.forEach(function(obj){
              let quantity = rawdata[i].details.filter((orders:any)=>orders.prod_id==obj._id).reduce((acc,val)=>acc+val.prod_quan,0);
              det[obj._id] = quantity > 0?quantity:0;
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

  loadHeaders(){
    var products = {};
    this.products.forEach(function(obj){
      if(!products[obj.category]){
        products[obj.category] = {};
        products[obj.category]['count'] = 0;
      }
      products[obj.category]['count'] += 1;
      if(!products[obj.category][obj.brand_name]){
        products[obj.category][obj.brand_name] = {};
        products[obj.category][obj.brand_name]['count'] = 0;
      }
      products[obj.category][obj.brand_name]['count'] += 1;
      if(!products[obj.category][obj.brand_name][obj.sub_category]){
        products[obj.category][obj.brand_name][obj.sub_category] = [];
        //products[obj.category][obj.brand_name][obj.sub_category]['count'] = 0;
      }
      //products[obj.category][obj.brand_name][obj.sub_category]['count'] += 1;
      products[obj.category][obj.brand_name][obj.sub_category].push(obj);

    });
    console.log(products);        

    let row1 = [],row2=[],row3=[],_products=[];
    for(let cat in products){
      row1.push({
        'key': cat,
        'count': products[cat].count
      });
      for(let b in products[cat]){
        if(b == 'count')
          continue;
        row2.push({
          'key': b,
          'count': products[cat][b].count
        });
        for(let sub in products[cat][b]){
          if(sub == 'count')
            continue;
          row3.push({
            'key': sub,
            'count': products[cat][b][sub].length
          });
          
          _products = _products.concat(products[cat][b][sub]);
        }
      } 
    }

    this.thList = [row1,row2,row3];
    this.reportProductList = _products;
  }

}
