import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-customers-view',
    templateUrl: './customers-view.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersViewComponent implements OnInit {

    @Output() backToLead = new EventEmitter<boolean>();
    @Input() data:any;
    @Input() pageIndex:any;
    displayedColumns = ['date', 'amount'];
    transactions:MatTableDataSource<any>;
    leadName:string;
    invoiceData:any[];
    invoiceView:boolean = false;

    constructor(public commonService: CommonService,public datePipe:DatePipe){

    }
    ngOnInit(){
        console.log(this.data);
        this.leadName = this.data.customerName;
        this.loadTransactions(this.data);        
    }

    loadTransactions(row:any){  
        var today = new Date();
        var limit = new Date(today.setDate(today.getDate() - 60)); 
        let fdate = this.datePipe.transform(limit,"yyyy-MM-dd");
        // this.commonService.getMethod(environment.urls.loadTransactionsNew+'?customer_id='+row._id+'&fdate='+fdate).subscribe((data:any) => {
        //     console.log(data);
        // });
        this.commonService.getMethod(environment.urls.loadTransactions+'?customer_id='+row._id).subscribe((data:any) => {
            // var temp = [];
            // for (let row of data.data) {
            //     if(!temp['customer'])
            //         temp['customer'] = {};
                
            //     if(!temp['customer'][row._id.date])
            //         temp['customer'][row._id.date] = {};                

            //     if(!temp['customer'][row._id.date]['credit'])
            //         temp['customer'][row._id.date]['credit'] = 0;

            //     if(!temp['customer'][row._id.date]['debit'])
            //         temp['customer'][row._id.date]['debit'] = 0;

            //     if(row.credit){
            //         temp['customer'][row._id.date]['credit'] += row.credit;
            //     }else if(row.debit){
            //         temp['customer'][row._id.date]['debit'] += row.debit;
            //     }
            // }
            // console.log(temp);
            this.transactions = new MatTableDataSource(data.data);
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