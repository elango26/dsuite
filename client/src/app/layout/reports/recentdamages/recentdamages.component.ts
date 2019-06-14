import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recentdamages',
  templateUrl: './recentdamages.component.html',
  styleUrls: ['./recentdamages.component.scss']
})
export class RecentdamagesComponent implements OnInit {

  displayedColumns = [ 'sno','date', 'customerName', 'productName','actions'];
  dataSource: MatTableDataSource<any>;

  public damageList: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonService: CommonService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.commonService.getMethod(environment.urls.getDamage).subscribe((data) => {
      this.damageList = data;
      this.dataSource = new MatTableDataSource(this.damageList);
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

