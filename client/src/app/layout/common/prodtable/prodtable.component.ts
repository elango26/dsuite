import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';

import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { CATEGORY, SUBCATEGORY, BRANDS } from '../../../constants/contants';

@Component({
  selector: 'app-prodtable',
  templateUrl: './prodtable.component.html',
  styleUrls: ['./prodtable.component.scss']
})
export class ProdtableComponent implements OnInit {
  form: FormGroup;
  productList: Product[];
  strucProductList:any[];
  category:any[];
  subcategory:any[];
  brand:any[];
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.category = CATEGORY;
    this.subcategory = SUBCATEGORY;
    this.brand = BRANDS;
    this.loadProduct();
    let formC = {};
    formC["name"] = new FormControl("");
    this.form = new FormGroup(formC);
  }

  loadProduct(){
    let fieldsCtrls = {};
    this.commonService.getMethod(environment.urls.getProduct).subscribe((data:Product[]) => {
      //this.productList = data;
      let tempArr = [];
      for(let val of data){
        if(tempArr[val.category] == undefined )
          tempArr[val.category] = [];
        if(tempArr[val.category][val.sub_category] == undefined )
          tempArr[val.category][val.sub_category] = [];
        if(tempArr[val.category][val.sub_category][val.brand_name] == undefined )
          tempArr[val.category][val.sub_category][val.brand_name] = [];

        tempArr[val.category][val.sub_category][val.brand_name].push(val);
        fieldsCtrls[val.alias] = new FormControl(0);
      }
      this.form = new FormGroup(fieldsCtrls);
      console.log(fieldsCtrls);
      console.log(this.form);
      this.strucProductList = tempArr;
    });
  }

  onSubmit(){
    console.log("Click Sbmit");
    console.log(this.form.status);
    console.log(this.form.value);
  }

}
