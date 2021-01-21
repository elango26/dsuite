import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { PrinterService } from 'src/app/services/printer.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { GenericResp } from 'src/app/interfaces/genericResp';

@Component({
  selector: 'app-recentsales',
  templateUrl: './recentsales.component.html',
  styleUrls: ['./recentsales.component.scss']
})
export class RecentsalesComponent implements OnInit {

  displayedColumns = [ 'sno','date', 'customerName', 'amount','actions'];
  dataSource: MatTableDataSource<any>;
  editView:boolean = false;
  editData: any;
  selectedDate = new Date();
  custFormMaxDate = new Date();

  public salesList: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonService: CommonService, private dialog: MatDialog, private datePipe: DatePipe, public printerService:PrinterService, public router: Router, public snackbar:MatSnackBar) {
  }

  ngOnInit() {
    this.loadRecentSales();
  }

  loadRecentSales(){
    console.log(this.selectedDate);
    let date = this.datePipe.transform(this.selectedDate,"yyyy-MM-dd");
    this.commonService.getMethod(environment.urls.getRecentSales+'?date='+date).subscribe((data:GenericResp) => {
      if(data.code == 200){
        this.salesList = data.data;
        this.dataSource = new MatTableDataSource(this.salesList);
        this.dataSource.paginator = this.paginator;
        //this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data, filter: string)  => {
          const accumulator = (currentTerm, key) => {
            return key === 'customerDetail' ? currentTerm + data.customerDetail[0].customerName : currentTerm + data[key];
          };
          const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
          // Transform the filter by converting it to lowercase and removing whitespace.
          const transformedFilter = filter.trim().toLowerCase();
          return dataStr.indexOf(transformedFilter) !== -1;
        };
        if(data.message != ''){
          this.snackbar.open("Success","No records found!!",{
            duration: 1000
          });
        }
      } else {
        this.snackbar.open("Failure","Some error!!",{
          duration: 1000
        });
      }  
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

  editSales(row:any){
    this.editView = true;
    this.editData = row;
  }

  backToReport(e){
    this.editView = false;
    this.loadRecentSales();
  }

  print(saleid:string){
    this.printerService.printData = {
      redirectUrl: '/reports',
      format: 'invoice',
      data: [saleid],
      type: 'SALES',
      date: new Date() // dummy date
    }
    this.router.navigate(['/layout',{ outlets: { printpage: 'printview' }}],{ skipLocationChange: true });
  }

}
