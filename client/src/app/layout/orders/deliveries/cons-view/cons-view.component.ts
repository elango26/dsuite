import {Component, OnInit, ViewChild, Inject, Pipe} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CommonService } from 'src/app/services/common.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
@Pipe({name: 'round'})
export class RoundPipe {
  transform (input:number) {
    return Math.floor(input);
  }
}
@Component({
  selector: 'app-cons-view',
  templateUrl: './cons-view.component.html',
  styleUrls: ['./cons-view.component.scss']
})
export class ConsViewComponent implements OnInit {
  displayedColumns: string[] = ['sno', 'category', 'product', 'grade', 'piece'];
  dataSource: MatTableDataSource<any>;
  consolidatedData: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private commonService: CommonService, 
    public dialogRef: MatDialogRef<ConsViewComponent>, 
    @Inject(MAT_DIALOG_DATA) public form_value: any) {
      if(form_value.cons_data)
        this.consolidatedData = form_value.cons_data;
      this.dataSource = new MatTableDataSource(this.consolidatedData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    
  }

  onNoClick(){
    this.dialogRef.close();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}