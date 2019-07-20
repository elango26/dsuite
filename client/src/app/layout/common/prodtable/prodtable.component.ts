import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { CATEGORY, SUBCATEGORY, BRANDS } from '../../../constants/contants';
import { TransactionDesc } from 'src/app/interfaces/transaction';

@Component({
  selector: 'app-prodtable',
  templateUrl: './prodtable.component.html',
  styleUrls: ['./prodtable.component.scss']
})
export class ProdtableComponent implements OnInit {
  form: FormGroup;
  productList: any[]=[];
  transaction_desc: TransactionDesc[]=[];
  strucProductList:any[];
  category:any[];
  subcategory:any[];
  brand:any[];
  customer:any;
  url:string;
  delDate:Date;
  constructor(private commonService: CommonService, public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProdtableComponent>,
    @Inject(MAT_DIALOG_DATA) public form_value: any) {
      this.customer = form_value.customer;
      this.url = form_value.url;
    }

  ngOnInit() {
    this.category = CATEGORY;
    this.subcategory = SUBCATEGORY;
    this.brand = BRANDS;
    this.loadProduct();
    this.delDate = new Date();
    let formC = {};
    formC["name"] = new FormControl("");
    this.form = new FormGroup(formC);
  }

  loadProduct(){
    let fieldsCtrls = {};
    this.commonService.getMethod(environment.urls.getProduct).subscribe((data:Product[]) => {      
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
        this.productList[val.alias] = {
          id:val._id,
          name:val.prod_name
        }
      }
      this.form = new FormGroup(fieldsCtrls);
      console.log(tempArr);
      this.strucProductList = tempArr;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){    
    console.log("Click Sbmit");
    console.log(this.form.status);
    console.log(this.form.value);
    if(this.form.status == "VALID"){
      for (let key in this.form.value) {
        let quan = this.form.value[key];
        if(quan > 0){
          let product = this.productList[key];        
          let trans_desc:TransactionDesc = {
            prod_name: product.name,
            prod_id : product.id,
            prod_quan : quan,
            prod_rate_per_unit : 0,
            tax: 0,
            prod_tax : 0,
            sub_amount : 0,
            is_delivered: false
          }
          this.transaction_desc.push(trans_desc);
        }
      }
      console.log(this.transaction_desc);
      let data = {
        customer_id: this.customer._id,
        order_date: this.delDate,
        details: this.transaction_desc
      }
      this.transaction_desc = [];
      this.form.reset();
      this.commonService.postMethod(this.url,data).subscribe(data =>{      
        this.snackBar.open("Saved successfully!!", "Success", {
          duration: 500,
        });
      },error =>{
        this.snackBar.open(error, "Error", {
          duration: 600,
        });
      });
    }  
  } 

}
