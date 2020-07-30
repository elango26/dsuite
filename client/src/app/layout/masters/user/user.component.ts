import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material';

import { CommonModalComponent } from './../common-modal/common-modal.component';

import { CommonService } from 'src/app/services/common.service';
import { environment } from '../../../../environments/environment';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  displayedColumns = ['username','firstName','lastName','email','contactNo','role'];
  dataSource: MatTableDataSource<User>;

  users: User[];
  user_form_details : any;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public commonService: CommonService, public dialog:MatDialog) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers(){
    this.commonService.getMethod(environment.urls.getUser).subscribe((data:User[]) => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
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
    this.user_form_details = [{
      "order": 1,
      "type": "input",
      "inputType": "text",
      "name": "username",
      "value": "",
      "placeholder": "User Name",
      "validation": {
        "required": true
      }
    }, {
      "order": 2,
      "type": "input",
      "inputType": "password",
      "name": "password",
      "value": "",
      "placeholder": "Password",
      "validation": {
        "required": true
      }
    }, {
      "order": 3,
      "type": "input",
      "inputType": "text",
      "name": "firstName",
      "value": "",
      "placeholder": "First Name",
      "validation": {
        "required": true
      }
    }, {
      "order": 4,
      "type": "input",
      "inputType": "text",
      "name": "lastName",
      "value": "",
      "placeholder": "Last Name",
      "validation": {
        "required": false
      }
    }, {
      "order": 5,
      "type": "input",
      "inputType": "number",
      "name": "contactNo",
      "value": "",
      "placeholder": "Contact #1",
      "validation": {
        "required": true
      }
    }, {
      "order": 6,
      "type": "input",
      "inputType": "number",
      "name": "contactNo1",
      "value": "",
      "placeholder": "Contact #2",
      "validation": {
        "required": false
      }
    }, {
      "order": 7,
      "type": "input",
      "inputType": "email",
      "name": "email",
      "value": "",
      "placeholder": "Email",
      "validation": {
        "required": true
      }
    }, {
      "order": 8,
      "type": "select",
      "inputType": "dropdown",
      "name": "role",
      "value":"",
      "placeholder": "Role",
      "validation": {
        "required": true
      },
      "options": [{key:"ADMIN",value:"ADMIN"},{key:"USER",value:"USER"},{key:"SUPERADMIN",value:"SUPERADMIN"}]
    }];

    const dialogRef = this.dialog.open(CommonModalComponent, {
      width: '600px',
      data: {formData:this.user_form_details.sort((a, b) => a.order - b.order),formTitle:"Users",url:environment.urls.postUser }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUsers();   
    });
  }
}
