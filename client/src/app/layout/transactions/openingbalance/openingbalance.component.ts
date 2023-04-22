import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { CommonModalComponent } from '../../masters/common-modal/common-modal.component';

@Component({
  selector: 'app-openingbalance',
  templateUrl: './openingbalance.component.html',
  styleUrls: ['./openingbalance.component.scss']
})
export class OpeningbalanceComponent implements OnInit {
  
  displayedColumns = ['customerName','route','amount','financial_year','action'];
  dataSource: MatTableDataSource<any>;

  balances: any[];
  balance_entry_detail : any;
  customers = [];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public commonService: CommonService, public dialog:MatDialog) { }

  ngOnInit() {
    this.loadRoute();
    this.loadCustomers();
  }

  loadCustomers(){
    this.commonService.getMethod(environment.urls.getCustomer).subscribe((data:any) => {
      for(let val of data){
        let keyarr = {key:val._id,value:val.customerName};
        this.customers.push(keyarr);
      }
    });
  }

  loadRoute(){
    this.commonService.getMethod(environment.urls.getOb).subscribe((data:any[]) => {
      this.balances = data;
      this.dataSource = new MatTableDataSource(this.balances);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    this.balance_entry_detail = [{
      "order":1,
      "type": "select",
      "inputType": "dropdown",
      "name": "customer_id",
      "value": "",
      "placeholder": "Customer",
      "validation": {
        "required": true
      },
      "options":this.customers
    },
    {
      "order":2,
      "type": "textarea",
      "inputType": "textarea",
      "name": "description",
      "value":"",
      "placeholder": "Description",
      "validation": {
        "required": true
      }
    },
    {
      "order":3,
      "type": "input",
      "inputType": "number",
      "name": "amount",
      "value":"",
      "placeholder": "Amount",
      "validation": {
        "required": true
      }
    }
  ];

    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '500px',
      data: {formData:this.balance_entry_detail.sort((a, b) => a.order - b.order),formTitle:"Opening Balance",url:environment.urls.postOb }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadRoute();   
    });
  }

}
