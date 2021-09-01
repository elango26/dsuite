import { DatePipe } from '@angular/common';
import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { BootstrapService } from 'src/app/services/bootstrap.service';
import { CommonService } from 'src/app/services/common.service';
import { PrinterService } from 'src/app/services/printer.service';
import { environment } from 'src/environments/environment';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, Color, Label } from 'ng2-charts'
import { CATEGORY } from 'src/app/constants/contants';
@Pipe({name: 'round'})
export class RoundPipe {
  transform (input:number) {
    return Math.floor(input);
  }
}
@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.scss']
})
export class SalesViewComponent implements OnInit {
  @ViewChild("baseChart") chart: BaseChartDirective;
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels:Label[]=[];
  public pieChartData:number[]=[];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.6)', 'rgba(0,255,0,0.6)', 'rgba(0,0,255,0.6)','rgba(191,63,63,0.6)','rgba(63,63,191,0.6)','rgba(191,63,63,0.6)','rgba(191,63,191,0.6)'],
    },
  ];
  //bar chart
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public chartReady:boolean=false;
  // public barChartLabels: Label[] = ['2006-08-01', '2007-08-01', '2008-08-01', '2009-08-01', '2010-08-01', '2011-08-01', '2012-08-01'];
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];
  public barChartData: ChartDataSets[] = [];
  // public barChartData: ChartDataSets[] = [
  //   { data: [65.9, 59, 80, 81, 56.09, 55, 40], label: 'Milk' },
  //   { data: [28, 48.8888, 40, 19, 86.00002, 27, 90], label: 'Curd' },
  //   { data: [28, 48, 40, 19.67, 86, 27, 90], label: 'PN' },
  //   { data: [28, 48, 40.9009, 19, 86, 27, 90], label: 'BM' },
  //   { data: [28, 48.677, 40, 19, 86, 27, 90], label: 'ICE' },
  // ];
  

  saleFDate: Date = new Date();
  saleTDate: Date = new Date();
  diffDays: number = 1;
  selRoute: string = "all";
  searKey:string = "";
  maxToDate: Date;
  routes:any;
  selClause:string='sum';

  displayedColumns: string[] = ['sno', 'category', 'product', 'grade', 'piece','litrekg'];
  dataSource: MatTableDataSource<any>;
  consolidatedData: any;
  resultByDate:any;
  //enableSearch:boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private commonService: CommonService, private printerService:PrinterService,
    private datePipe: DatePipe, private router: Router, private bootstrap:BootstrapService) { }

  ngOnInit() {    
    this.routes = this.bootstrap.routes.map(function(val) {
      return {
        key:val._id,
        value:val.areaName
      }
    });
    this.routes.push({key:'all',value:'All'});
    this.showConsolidated();
  }

  cumulativeCalc(){
    // const fdate = this.datePipe.transform(this.saleFDate,"yyyy-MM-dd");
    // const tdate = this.datePipe.transform(this.saleTDate,"yyyy-MM-dd")
    // const diffTime = Math.abs(new Date(tdate).getTime()-new Date(fdate).getTime());
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    this.consolidatedData.map(d=> {
      if(this.selClause == "avg"){
        d.modified_count = d.count / (this.diffDays + 1);
        d.modified_total_value = d.total_value / (this.diffDays + 1);
      }else{
        d['modified_count'] = d.count;
        d['modified_total_value'] = d.total_value;
      }
    });
    this.dataSourceCall();
  }

  public showConsolidated(){
    //console.log(this.selClause);
    //console.log(this.saleTDate.getTime()-this.saleFDate.getTime());
    const fdate = this.datePipe.transform(this.saleFDate,"yyyy-MM-dd");
    const tdate = this.datePipe.transform(this.saleTDate,"yyyy-MM-dd");
    const diffTime = Math.abs(new Date(tdate).getTime()-new Date(fdate).getTime());
    this.diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    // console.log(diffTime + " milliseconds");
    // console.log(diffDays + " days");
    let q = '?Fdate='+fdate+'&Tdate='+tdate+"&route="+this.selRoute+"&search_key="+this.searKey;
    this.commonService.getMethod(environment.urls.getConsolidatedSaleList+q).subscribe((data:any[])=>{
      //console.log(data);
      this.resultByDate = data;
      this.consolidatedData = this.groupBy(data);      
      this.organizeData(this.consolidatedData);
      //let route = this.routes.filter(r=>r.key == this.saleDate)[0].value;
      this.dataSourceCall();
    });    
  }

  organizeData(data:any){
    // const fdate = this.datePipe.transform(this.saleFDate,"yyyy-MM-dd");
    // const tdate = this.datePipe.transform(this.saleTDate,"yyyy-MM-dd")
    // const diffTime = Math.abs(new Date(tdate).getTime()-new Date(fdate).getTime());
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return data.map(d=> {
      switch(d.products.measure_unit){
        case 'ML':
          d['total_value'] = d.count*d.products.volume_per_unit/1000;
          break; 
        case 'KG':
          d['total_value'] = d.count*d.products.volume_per_unit;
          break;
        default:
          d['total_value'] = d.count*d.products.volume_per_unit;
          break;
      }
      if(this.selClause == "avg"){
        d['modified_count'] = d.count / (this.diffDays + 1);
        d['modified_total_value'] = d.total_value / (this.diffDays + 1);
      }else{
        d['modified_count'] = d.count;
        d['modified_total_value'] = d.total_value;
      }
    });
  }
  
  groupBy(datas:any){
    var result = [];
    datas.reduce(function(res, value) {
      if (!res[value._id.prod_id]) {
        res[value._id.prod_id] = { _id: value._id.prod_id, count: 0, products: value.products };
        result.push(res[value._id.prod_id])
      }
      res[value._id.prod_id].count += value.count;
      return res;
    }, {});

    return result;
  }

  // BarChartGroup(datas:any){
  //   var result = [];
  //   datas.reduce(function(res, value) {
  //     if (!res[value._id.s_date]) {
  //       res[value._id.prod_id] = { _id: value._id.prod_id, count: 0, products: value.products };
  //       result.push(res[value._id.prod_id])
  //     }
  //     res[value._id.prod_id].count += value.count;
  //     return res;
  //   }, {});

  //   return result;
  // }

  dataSourceCall(){    
    // console.log(this.consolidatedData);
    let pieData=this.consolidatedData.reduce(function(temp,d){
      if(!temp[d.products.category])
        temp[d.products.category] = {category:d.products.category,value:0};
      temp[d.products.category]['value'] += d.modified_total_value;
      return temp;
    },{});
    //reset 
    if(this.pieChartLabels.length > 0){
      this.pieChartLabels.splice(0);
      this.pieChartData.splice(0);
    }
    for (let key in pieData) {
      this.pieChartLabels.push(key);
      this.pieChartData.push(pieData[key].value.toFixed(2));
    }
    
    let barData={};
    for(let i=0;i<this.resultByDate.length;i++){
      let d=this.resultByDate[i];
      let key = d._id.s_date +'|'+d.products.category;
      switch(d.products.measure_unit){
        case 'ML':
          d['total_value'] = d.count*d.products.volume_per_unit/1000;
          break; 
        case 'KG':
          d['total_value'] = d.count*d.products.volume_per_unit;
          break;
        default:
          d['total_value'] = d.count*d.products.volume_per_unit;
          break;
      }
      if(!barData[key])
        barData[key] = {count:0,total_value:0};      
      barData[key]['count']+=d.count;
      barData[key]['total_value']+=d.total_value;
    }   

    // console.log(barData);
    // var helper = {};
    // var result = this.resultByDate.reduce((r,o)=>{
    //   var key = o._id.s_date + '-' + o.products.category;
    //   switch(o.products.measure_unit){
    //     case 'ML':
    //       o['total_value'] = o.count*o.products.volume_per_unit/1000;
    //       break; 
    //     case 'KG':
    //       o['total_value'] = o.count*o.products.volume_per_unit;
    //       break;
    //     default:
    //       o['total_value'] = o.count*o.products.volume_per_unit;
    //       break;
    //   }
    //   if(!helper[key]) {
    //     helper[key] = {date:o._id.s_date,category:o.products.category,count:o.count,total_value:o.total_value} // create a copy of o
    //     r.push(helper[key]);
    //   } else {
    //     helper[key].count += o.count;
    //     helper[key].total_value += o.total_value;
    //   }    
    //   return r;
    // }, []);
    // console.log(result);
    // console.log(this.resultByDate);
    //reset 
    if(this.barChartLabels.length > 0){
      // this.barChartLabels.splice(0);
      // this.barChartData.splice(0);
      this.barChartLabels.length = 0;
      this.barChartData.length = 0;
    }

    let category_loop = 0,temp:ChartDataSets[]=[];
    CATEGORY.forEach(cat => {
      let datavals = [];
      // this.barChartData[category_loop] = {};  
      // this.barChartData[category_loop].label = cat;
      // this.barChartData[category_loop].data = [];
      for(let i=new Date(this.saleFDate);i<=new Date(this.saleTDate);i.setDate(i.getDate() + 1)){
        //console.log(new Date(i));
        let loopDate = this.datePipe.transform(i,"yyyy-MM-dd");
        if(category_loop == 0)
          this.barChartLabels.push(loopDate);
       
        let key = loopDate+'|'+cat;
        if(barData[key]){
          // this.barChartData[category_loop].data.push(barData[key].total_value);
          datavals.push(barData[key].total_value);
        }else{
          datavals.push(0); 
          // this.barChartData[category_loop].data.push(0);
        }     
      }
      // let temp = ;
      //this.barChartData.push({data:datavals,label:cat});
      temp.push({data:datavals,label:cat});
      category_loop++;
    });
    this.barChartData.push(...temp);
    
    this.chartReady = true;
    // console.log(this.chart);
    if (this.chart !== undefined) {      
      // console.log('writting');
      // this.chart.chart.destroy();
      // this.chart.chart = 0;
      // this.chart.labels.splice(0);
      // this.chart.datasets.splice(0);
      this.chart.datasets = this.barChartData;
      this.chart.labels = this.barChartLabels;
      this.chart.ngOnInit();
    }
    // console.log(this.barChartData)
    // console.log(this.barChartLabels)

    this.dataSource = new MatTableDataSource(this.consolidatedData);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data, filter: string)  => {
      const accumulator = (currentTerm, key) => {
        return key === 'products' ? currentTerm + data[key].prod_name : currentTerm + data[key];
      };
      const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
      return dataStr.indexOf(transformedFilter) !== -1;
    };
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
