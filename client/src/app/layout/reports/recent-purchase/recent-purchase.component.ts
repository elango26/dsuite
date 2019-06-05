import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recent-purchase',
  templateUrl: './recent-purchase.component.html',
  styleUrls: ['./recent-purchase.component.scss']
})
export class RecentPurchaseComponent implements OnInit {

  displayedColumns = [ 'sno','date', 'vendorName', 'amount','actions'];
  dataSource: MatTableDataSource<any>;

  public purchaseList: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonService: CommonService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.commonService.getMethod(environment.urls.getRecentPurchase).subscribe((data) => {
      this.purchaseList = data;
      this.dataSource = new MatTableDataSource(this.purchaseList);
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

}
