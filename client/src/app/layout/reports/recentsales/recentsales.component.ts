import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { PrinterService } from 'src/app/services/printer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recentsales',
  templateUrl: './recentsales.component.html',
  styleUrls: ['./recentsales.component.scss']
})
export class RecentsalesComponent implements OnInit {

  displayedColumns = [ 'sno','date', 'customerName', 'amount','actions'];
  dataSource: MatTableDataSource<any>;

  public salesList: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonService: CommonService, private dialog: MatDialog, public printerService:PrinterService, public router: Router) {
  }

  ngOnInit() {
    this.commonService.getMethod(environment.urls.getRecentSales).subscribe((data) => {
      this.salesList = data;
      this.dataSource = new MatTableDataSource(this.salesList);
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

  openOrderModal(){
    // const dialogRef = this.dialog.open(ProdtableComponent, {
    //   width: '800px',
    //   data: {}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   //reload
    // });
  }

  print(saleid:string){
    this.printerService.printData = {
      redirectUrl: '/reports',
      format: 'invoice',
      data: [saleid],
      type: 'SALES'
    }
    this.router.navigate(['/layout',{ outlets: { printpage: 'printview' }}],{ skipLocationChange: true });
  }

}
