import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatSnackBar } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { GradeMngt } from 'src/app/interfaces/grade-mngt';
import { CommonModalComponent } from 'src/app/app-material/common-modal/common-modal.component';
import { ConfirmPopComponent } from 'src/app/app-material/confirm-pop/confirm-pop.component';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {
  displayedColumns = ['sno','emptyName','entryType','createdAt','count','actions'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  gradeList: GradeMngt[];
  newGradeEntry: any[];
  confirmBox: string = "YES";
  constructor(public commonService: CommonService, public dialog:MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loadGradeList();
    this.loadVariables();
  }

  loadGradeList(){
    this.commonService.getMethod(environment.urls.getGradeMngtList).subscribe((data:GenericResp) => {
      if(data.code == 200){
        this.gradeList = data.data;
        this.dataSource = new MatTableDataSource(this.gradeList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  editGrade(row:any):void {    
    this.newGradeEntry.map(inp => {
      inp.value = row[inp.name];
    });
    this.newGradeEntry.push({
      "order": 0,
      "type": "input",
      "inputType": "hidden",
      "name": "_id",
      "value": row._id,
      "placeholder": "_ID",
        "validation": {
          "required": true
        }
    });
    const dialogRef = this.dialog.open(CommonModalComponent, {
      //width: '300px',
      data: {formData:this.newGradeEntry.sort((a, b) => a.order - b.order),formTitle:"Edit",url:environment.urls.gradeUpdate,method:'PUT' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadGradeList();   
      this.loadVariables(); // refreh the variables
    });
  }

  newEntry():void {
    const dialogRef = this.dialog.open(CommonModalComponent, {
      //width: '300px',
      data: {formData:this.newGradeEntry.sort((a, b) => a.order - b.order),formTitle:"Adding Grades",url:environment.urls.saveGradeMngt }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadGradeList();   
    });
  }

  deleteEntry(row:any): void {
    console.log(row);
      const dialogRef = this.dialog.open(ConfirmPopComponent, {
        width: '250px',
        data: {confirm:this.confirmBox}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if(result && result == 'YES'){
          row.is_delete = 'YES';
          this.commonService.putMethod(environment.urls.gradeUpdate+'/'+row._id,row).subscribe((data:GenericResp)=>{
            if(data.code == 200){
              this.snackBar.open(data.message, "Success", {
                duration: 500,
              });
              this.loadGradeList();
            }else{
              this.snackBar.open(data.message, "Error", {
                duration: 500,
              });
            }
          });
        }
      });
  }

  getTotalQuan():number{
    return this.gradeList.reduce((acc,list) => (acc + list.count), 0);
  }

  loadVariables(){
    this.newGradeEntry = [{
      "order":1,
      "type": "input",
      "inputType": "text",
      "name": "emptyName",
      "value":"",
      "placeholder": "Grade Type Name",
      "validation": {
        "required": true
      }
    },{
      "order":2,
      "type": "input",
      "inputType": "number",
      "name": "count",
      "value":"",
      "placeholder": "Quantity",
      "validation": {
        "required": true
      }
    },{
      "order":3,
      "type": "select",
      "inputType": "dropdown",
      "name": "entryType",
      "value":"",
      "placeholder": "Entry Type",
      "validation": {
        "required": true
      },
      options:[
        {"key": "IN",
        "value": "IN"},
        {"key": "OUT",
        "value": "OUT"}
      ]
    },{
      "order":4,
      "type": "textarea",
      "inputType": "text",
      "name": "description",
      "value":"",
      "placeholder": "Description",
      "validation": {
        "required": true
      }
    },{
      "order":5,
      "type": "select",
      "inputType": "dropdown",
      "name": "is_active",
      "value":"",
      "placeholder": "Is Active",
      "validation": {
        "required": true
      },
      options:[
        {"key": "YES",
        "value": "YES"},
        {"key": "NO",
        "value": "NO"}
      ]
    }];
  }

}
