import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Customers, Customer } from 'src/app/interfaces/customer';
import { CustomerService } from 'src/app/services/customer.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  displayedColumns = ['customerName', 'alias', 'route'];
  dataSource: MatTableDataSource<Customer>;

  customerList: Customer[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customerService: CustomerService) {
    this.customerList = [];
  }

  ngOnInit() {

      this.customerService.getCustomers().subscribe(data => {
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

