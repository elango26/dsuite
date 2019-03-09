import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Customer } from 'src/app/interfaces/customer';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  displayedColumns = ['customerName', 'alias', 'route'];
  dataSource: MatTableDataSource<Customer>;

  public customerList: Customer[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonService: CommonService) {
    //this.customerList = [];
  }

  ngOnInit() {

      this.commonService.getMethod(environment.urls.getCustomer).subscribe((data: Customer[]) => {
          this.customerList = data;
          this.dataSource = new MatTableDataSource(this.customerList);
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
}

