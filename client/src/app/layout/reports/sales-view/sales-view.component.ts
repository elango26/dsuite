import { DatePipe } from '@angular/common';
import { Component, OnInit, Pipe, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { BootstrapService } from 'src/app/services/bootstrap.service';
import { CommonService } from 'src/app/services/common.service';
import { PrinterService } from 'src/app/services/printer.service';
import { environment } from 'src/environments/environment';
@Pipe({name: 'round'})
export class RoundPipe {
  transform (input:number) {
    return Math.floor(input);
  }
}
@Component({
  selector: 'app-sales-view',
  templateUrl: './sales-view.component.html',
  styleUrls: ['./sales-view.component.scss']
})
export class SalesViewComponent implements OnInit {

  saleDate: Date = new Date();
  selRoute: string = "all";
  searKey:string = "";
  maxToDate: Date;
  routes:any;

  displayedColumns: string[] = ['sno', 'category', 'product', 'grade', 'piece'];
  dataSource: MatTableDataSource<any>;
  consolidatedData: any;
  enableSearch:boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private commonService: CommonService, private printerService:PrinterService,
    private datePipe: DatePipe, private router: Router, private bootstrap:BootstrapService) { }

  ngOnInit() {
    this.routes = this.bootstrap.routes.map(function(val) {
      return {
        key:val._id,
        value:val.areaName
      }
    });
    this.routes.push({key:'all',value:'All'});
    this.showConsolidated();
  }

  public showConsolidated(){
    let q = '?sale_date='+this.datePipe.transform(this.saleDate,"yyyy-MM-dd")+"&route="+this.selRoute+"&search_key="+this.searKey;
    this.commonService.getMethod(environment.urls.getConsolidatedSaleList+q).subscribe((data:any[])=>{
      //console.log(data);
      this.consolidatedData = data;
      //let route = this.routes.filter(r=>r.key == this.saleDate)[0].value;
      this.dataSource = new MatTableDataSource(this.consolidatedData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = (data, filter: string)  => {
        const accumulator = (currentTerm, key) => {
          return key === 'products' ? currentTerm + data[key].prod_name : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        // Transform the filter by converting it to lowercase and removing whitespace.
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };
    });    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
