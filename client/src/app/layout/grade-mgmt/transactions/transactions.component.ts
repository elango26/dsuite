import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CommonService } from 'src/app/services/common.service';
import { MatDialog, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';
import { PrinterService } from 'src/app/services/printer.service';
import { UserService } from 'src/app/services/user.service';
import { BootstrapService } from 'src/app/services/bootstrap.service';
import { environment } from 'src/environments/environment';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { CustomerGradeTrans, GradeTrans } from 'src/app/interfaces/grade-mngt';
import { ConfirmPopComponent } from 'src/app/app-material/confirm-pop/confirm-pop.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})

export class TransactionsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['sno','customer','balance','delivered','received'];
  dataSource: MatTableDataSource<CustomerGradeTrans>;
  
  enableSearch:boolean = false;
  routes:any;
  customerGradeList:any[];
  delDate: Date;
  maxToDate: Date;
  selRoute: string = "all";
  searKey: string = "";
  confirmBox: string = "YES";

  constructor(private datePipe: DatePipe, private commonService: CommonService, private dialog: MatDialog, private bootstrap:BootstrapService,
    private printerService: PrinterService, private router: Router, private userservice: UserService, private snackBar:MatSnackBar) { }

  ngOnInit() {
    this.delDate = new Date();
    this.routes = this.bootstrap.routes.map(function(val) {
      return {
        key:val._id,
        value:val.areaName
      }
    });
    this.routes.push({key:'all',value:'All'});
    this.addEvent();
    let tdy = new Date();
    //tdy.setDate(tdy.getDate() +1);
    this.maxToDate = tdy;
  }

  showConsolidated(){
    console.log('assessment');
  }

  public addEvent(){
    let q = '?q_date='+this.datePipe.transform(this.delDate,"yyyy-MM-dd")+"&route="+this.selRoute+"&search_key="+this.searKey;
    this.loadGradeList(q);
  }

  private loadGradeList(query:string){    
    this.commonService.getMethod(environment.urls.getGradeTransList+query).subscribe((data:GenericResp)=>{
      if(data.code == 200){
        if(data.data)
          this.customerGradeList = data.data.sort((a, b) => (a.customer[0].index > b.customer[0].index) ? 1 : (a.customer[0].index === b.customer[0].index) ? ((a.size > b.size) ? 1 : -1) : -1 );

        // this.customerGradeList.map(t => {
        //   let temp:GradeTrans = {
        //     customer_id:"",
        //     count:0,
        //     transaction:"",
        //     description:""
        //   }
        //   let temp1:GradeTrans = {
        //     customer_id:"",
        //     count:0,
        //     transaction:"",
        //     description:""
        //   }
        //   if(!t.delivered)
        //     t.delivered = temp;
        //   if(!t.received)
        //     t.received = temp1;
        // });
        console.log(this.customerGradeList);
        this.dataSource = new MatTableDataSource(this.customerGradeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }else{
        this.snackBar.open(data.message, "Error", {
          duration: 500,
        });
      }
    });
  }

  onsubmit(){    
    console.log(this.customerGradeList);
    //return false;
    let current_date = this.datePipe.transform(this.delDate,"yyyy-MM-dd");
    let live_date = this.datePipe.transform(new Date(),"yyyy-MM-dd");
    if(current_date != live_date){
      const dialogRef = this.dialog.open(ConfirmPopComponent, {
        width: '250px',
        data: {confirm:this.confirmBox,label:'You are making changes for previous days. Sure want to continue?'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result && result == 'YES'){
          this.transApiSubmit();
        }
      });
    } else {
      this.transApiSubmit();
    }  
    
  }

  transApiSubmit(){
    let temp:GradeTrans[] = [];
    let current_date = this.datePipe.transform(this.delDate,"yyyy-MM-dd");
    this.customerGradeList.forEach(list => {
      if(list.c_deliver){
        let del = {
          'customer_id':list.customer[0].customer_id,
          'count':list.c_deliver?list.c_deliver:0,
          'transaction':'OUT',
          'description':'',
          't_date': current_date
        }
        temp.push(del);
        //console.log(t);
      }
      if(list.c_receive){
        let rec = {
          'customer_id':list.customer[0].customer_id,
          'count':list.c_receive?list.c_receive:0,
          'transaction':'IN',
          'description':'',
          't_date': current_date
        }
        temp.push(rec);
        //console.log(t1);
      }
    });
    
    let data = {'trans':temp};
    this.commonService.postMethod(environment.urls.saveGradeTrans,data).subscribe((data:GenericResp) => {
      if(data.code == 200){
        this.snackBar.open(data.message, "Success", {
          duration: 500,
        });
      }else{
        this.snackBar.open(data.message, "Error", {
          duration: 500,
        });
      }
      //refresh
      this.addEvent();
    });
  }

  getTotal(inp:string){
    switch(inp){
      case 'balance':
        return this.customerGradeList.reduce((acc,list) => (acc+list.t_deliver),0) - this.customerGradeList.reduce((acc,list) => (acc+list.t_receive),0);
        break;
      case 'deliver':
        return this.customerGradeList.reduce((acc,list) => (acc+list.c_deliver),0);
        break;
      case 'receive':
        return this.customerGradeList.reduce((acc,list) => (acc+list.c_receive),0);
        break;
    }
  }

  clear():void{
    this.searKey = '';
    this.addEvent();
  }

}
