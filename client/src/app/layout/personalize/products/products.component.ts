import {Component} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { MatSnackBar } from '@angular/material';
import { Product } from 'src/app/interfaces/product';

/**
 * @title Drag&Drop custom placeholer
 */
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  productList:Product[];

  constructor(private commonService: CommonService, public snackBar:MatSnackBar){
    
  }

  ngOnInit() {
    this.loadProduct();
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    moveItemInArray(this.productList, event.previousIndex, event.currentIndex);
  }

  loadProduct(){
    this.commonService.getMethod(environment.urls.productSort).subscribe((data:Product[]) => {
      this.productList = data;
      this.productList.sort((a, b) => a.index - b.index)
    });
  }

  onSubmit(){
    console.log(this.productList);
    let data = {
      type: 'product',
      arrayObject: this.productList
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


