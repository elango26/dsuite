import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { groupBy } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-view',
  templateUrl: './detail-view.component.html',
  styleUrls: ['./detail-view.component.scss']
})
export class DetailViewComponent implements OnInit {
  enableSearch:boolean = false;
  searKey: string = "";
  maxToDate = new Date();
  form:FormGroup;
  paymentList:any;
  displayedColumns = ['date','route','amount','users'];
  dataSource: MatTableDataSource<any>;
  constructor(public commonService:CommonService,private datePipe: DatePipe) { }

  ngOnInit() {
    this.initialize();
    this.loadPayments();
  }

  initialize(){
    this.form = new FormGroup({
      'fromDate': new FormControl(new Date(),Validators.required),
      'toDate': new FormControl(new Date(),Validators.required)
    });
  }

  loadPayments() {
    var url = environment.urls.getDetailPayment+'?fdate='+this.datePipe.transform(this.form.value.fromDate,"yyyy-MM-dd")+'&tdate='+this.datePipe.transform(this.form.value.toDate,"yyyy-MM-dd");
    this.commonService.getMethod(url).subscribe((data:any)=>{
      //console.log(data); 
      let consolidated = data.data.map(d=>({pdate:d._id.pdate,route:d.routename[0],amount:d.amount,users:this.groupBy(d.paymentss)}));      
      this.paymentList = consolidated.sort(function(a,b) { return new Date(b.pdate).getTime() - new Date(a.pdate).getTime()});
      console.log(this.paymentList);
      this.dataSource = new MatTableDataSource(this.paymentList);
    });
  }

  groupBy(pays:any){
    var result = [];
    pays.reduce(function(res, value) {
      if (!res[value.createdBy]) {
        res[value.createdBy] = { Id: value.createdBy, amount: 0, uname: value.users?value.users.username:'' };
        result.push(res[value.createdBy])
      }
      res[value.createdBy].amount += value.amount;
      return res;
    }, {});

    return result;
  }
  onSubmit(){
    //console.log(this.form);
    if(this.form.status == "VALID"){
      this.loadPayments();
    }
  }

  filterOpts(){

  }

}
