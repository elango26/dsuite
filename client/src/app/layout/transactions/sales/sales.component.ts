import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  productList: Product[];
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct(){
    this.commonService.getMethod(environment.urls.getProduct).subscribe((data:Product[]) => {
      this.productList = data;
      console.log(data);
      // CATEGORY.map(val => {
      //   return {
      //     key: val,
      //     value: val
      //   };
      // })
    });
  }

}
