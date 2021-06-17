import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';
import { RouteObj } from 'src/app/interfaces/route';

import { CommonModalComponent } from './../common-modal/common-modal.component';

import { CommonService } from 'src/app/services/common.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  displayedColumns = ['areaName'];
  dataSource: MatTableDataSource<RouteObj>;

  routes: RouteObj[];
  route_form_details : any;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public commonService: CommonService, public dialog:MatDialog) { }

  ngOnInit() {
    this.loadRoute();
  }

  loadRoute(){
    this.commonService.getMethod(environment.urls.getRoute).subscribe((data:RouteObj[]) => {
      this.routes = data;
      this.dataSource = new MatTableDataSource(this.routes);
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
    this.route_form_details = [{
      "order":1,
      "type": "input",
      "inputType": "text",
      "name": "areaName",
      "value":"",
      "placeholder": "Area Name",
      "validation": {
        "required": true
      }
    }];

    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '300px',
      data: {formData:this.route_form_details.sort((a, b) => a.order - b.order),formTitle:"Routes",url:environment.urls.postRoute }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadRoute();   
    });
  }

}
