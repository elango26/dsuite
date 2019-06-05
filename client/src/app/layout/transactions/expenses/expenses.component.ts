import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
//import { MatDialog, MatDialogRef, } from '@angular/material';
//import {MatGridListModule} from '@angular/material/grid-list';
import { CommonService } from 'src/app/services/common.service';
import { environment } from '../../../../environments/environment';
import { Expense } from 'src/app/interfaces/expense';
import { EXPENSE_TYPE } from '../../../constants/contants';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {
  displayedColumns = ['type','description','amount'];
  dataSource: MatTableDataSource<Expense>;

  expenses: Expense[];
  form:FormGroup;
  expense_types:any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public commonService: CommonService, public snackBar:MatSnackBar) { }

  ngOnInit() {
    this.expense_types = EXPENSE_TYPE.map(val => {
      return {
        key: val,
        value: val
      }
    });
    this.form = new FormGroup({
      'type': new FormControl('',Validators.required),
      'description': new FormControl('',Validators.required),
      'amount': new FormControl('',Validators.required)
    });
    this.loadExpenses();
  }

  loadExpenses(){
    this.commonService.getMethod(environment.urls.getExpense).subscribe((data:Expense[]) => {
      this.expenses = data;
      this.dataSource = new MatTableDataSource(this.expenses);
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

  submit_form(){
    console.log(this.form);
    if(this.form.status && this.form.status=="VALID"){
      this.commonService.postMethod(environment.urls.postExpense,this.form.value).subscribe(data =>{        
        this.snackBar.open("Saved successfully!!", "Success", {
          duration: 500,
        });
        this.loadExpenses();
        this.form.reset();
      },error =>{
        this.snackBar.open(error, "Error", {
          duration: 500,
        });
      });
    }
  }

}
