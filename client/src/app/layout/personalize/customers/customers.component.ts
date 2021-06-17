import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/interfaces/customer';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { MatSnackBar } from '@angular/material';
import { RouteObj } from 'src/app/interfaces/route';

/**
 * @title Drag&Drop custom placeholer
 */
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {

  customerList:Customer[];
  routes = [];
  selectedRoute = "";

  constructor(private commonService: CommonService, public snackBar:MatSnackBar){
    
  }

  ngOnInit() {
    this.loadCustomer(environment.urls.customerSort);
    this.commonService.getMethod(environment.urls.getRoute).subscribe((data:RouteObj[]) => {
      for(let val of data){
        //this.selectedRoute = val._id;
        let keyarr = {key:val._id,value:val.areaName};
        this.routes.push(keyarr);
      }
    });
  }

  onRouteChange(e:any){
    console.log('working'+e);
    this.loadCustomer(environment.urls.customerSort+'?route_id='+e);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(this.customerList, event.previousIndex, event.currentIndex);
  }

  loadCustomer(url:string){
    this.commonService.getMethod(url).subscribe((data:Customer[]) => {
      this.customerList = data;
      //this.customerList.sort((a, b) => a.index - b.index)
    });
  }

  onSubmit(){
    console.log(this.customerList);
    let data = {
      type: 'customer',
      arrayObject: this.customerList
    };
    this.commonService.postMethod(environment.urls.modifyIndex,data).subscribe((data:GenericResp) => {
      if(data.code == 200){
        this.snackBar.open("Updated index successfully!!!", "Success", {
          duration: 1000,
        });
      }
      console.log(data);
    },error =>{
      this.snackBar.open(error, "Error", {
        duration: 500,
      });
    })
  }
}

