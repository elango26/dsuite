import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { DatePipe } from '@angular/common';
import * as _ from 'lodash';

@Component({
    selector: 'app-customers-view',
    templateUrl: './customers-view.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersViewComponent implements OnInit {

    @Output() backToLead = new EventEmitter<boolean>();
    @Input() data:any;
    @Input() pageIndex:any;
    displayedColumns = ['date', 'debit', 'credit', 'outstanding'];
    transactions:MatTableDataSource<any>;
    leadName:string;
    invoiceData:any[];
    invoiceView:boolean = false;

    constructor(public commonService: CommonService,public datePipe:DatePipe){

    }
    ngOnInit(){
        // console.log(this.data);
        this.leadName = this.data.customerName;
        this.loadTransactions(this.data);        
    }

    loadTransactions(row:any){
        var today = new Date();
        var limit = new Date(today.setDate(today.getDate() - 10));
        // let fdate = this.datePipe.transform(limit,"yyyy-MM-dd",'+0530');
        // this.commonService.getMethod(environment.urls.loadTransactionsNew+'?customer_id='+row._id+'&fdate='+fdate).subscribe((data:any) => {
        //     console.log(data);
        // });
        var transactionList = [];
        this.commonService.getMethod(environment.urls.loadTransactions+'?customer_id='+row._id).subscribe((data:any) => {
            if(data.code == 200){
                let allArray = [...data.data.credits, ...data.data.debits];
                // console.log(allArray);
                let outstanding = 0;
                transactionList = _.uniqWith(allArray, (pre, cur) => {
                    if(pre._id.date != "totalAmount" && cur._id.date != "totalAmount"){
                        pre._id.date = this.datePipe.transform(pre._id.date,"yyyy-MM-dd",'+0530');
                        cur._id.date = this.datePipe.transform(cur._id.date,"yyyy-MM-dd",'+0530');
                    }
                    if(pre._id.date == cur._id.date){
                        cur = _.merge(cur, pre);
                        return true;
                    }
                    return false;
                });
                let indexOfTotalAmt = transactionList.findIndex(arr => arr._id.date == "totalAmount");
                if(indexOfTotalAmt > -1){
                    const ledger = transactionList.splice(indexOfTotalAmt,1);
                    outstanding = ledger.reduce( (acc, l) => {
                        return acc + (l.debit - l.credit);
                    },0);
                }
                
                outstanding += data.data.openingBalance.reduce((acc, arr)=>{ return acc + arr.openingbalance},0);
                // console.log(outstanding);
                transactionList = _.orderBy(transactionList, 
                    [function(o) { return o._id.date; }],['asc']);
                // console.log(transactionList);
                if(transactionList.length > 0){
                    let os = outstanding;
                    const value = transactionList.map( arr => {
                        os = os + (arr.debit?arr.debit:0) - (arr.credit?arr.credit:0);
                        arr['outstanding'] =  os
                        return arr;
                    });
                    value.reverse();
                    // console.log(value);
                    this.transactions = new MatTableDataSource(value);
                }
            }
            // this.transactions = new MatTableDataSource(data.data);
        });
    }

    getDiscountAmt(row:any):number{
        return row.reduce((acc,r)=> {
          return acc+r.total_amount;
        },0);
    }

    backToLeadPage(){
        this.backToLead.emit(this.pageIndex);
    }

    backToTransaction(){
        this.invoiceView = false;
    }

    loadInvoice(row:any){
        if(row.debit){
            this.invoiceView = true;
            console.log(row);
            let data = {
                invoices: row.sale_ids,
                type: 'SALES'
            };
            this.commonService.postMethod(environment.urls.printInvoices,data).subscribe((data:GenericResp)=>{
            console.log(data);
            if(data.code == 200)
                this.invoiceData = data.data;
            });
        }
    }
}