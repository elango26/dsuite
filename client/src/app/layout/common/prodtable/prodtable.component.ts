import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { CATEGORY, SUBCATEGORY, BRANDS, DEFAULT_RATE_TYPE } from '../../../constants/contants';
import { TransactionDesc } from 'src/app/interfaces/transaction';
import { Customer } from 'src/app/interfaces/customer';

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
  edit_details:any;
  order_details:any;
  isEdit:boolean = false;
  sale_type_arr: any[];
  selectedCategory:string;
  constructor(private datePipe: DatePipe, private commonService: CommonService, public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ProdtableComponent>,
    @Inject(MAT_DIALOG_DATA) public form_value: any) {
      this.loadCustomerRateType(form_value.customer);
      this.customer = form_value.customer;
      this.url = form_value.url;
      switch(form_value.source){
        case 'leads':
          this.delDate = new Date();
          this.delDate.setDate(this.delDate.getDate() + 1);
          this.loadExistingOrder(this.customer,this.delDate);
          break;
        case 'delivery':
          this.delDate = new Date(form_value.order_date);
          this.isEdit = form_value.isEdit;
          this.edit_details = form_value.edit_details;
          this.order_details = form_value.order_details;
          break;
        default:
          this.delDate = new Date();
          this.delDate.setDate(this.delDate.getDate() + 1);
      }
    }

  ngOnInit() {
    this.category = CATEGORY;
    this.subcategory = SUBCATEGORY;
    this.brand = BRANDS;
    this.loadProduct();    
    let formC = {};
    formC["name"] = new FormControl("");
    this.form = new FormGroup(formC);
  }

  public loadCustomerRateType(cust:Customer){
    console.log("customer rate type loaded");
    this.commonService.getMethod(environment.urls.getRateTypeByCustomer+'/'+cust._id).subscribe((data:any) => {
      this.sale_type_arr = data;
    });
  }

  loadExistingOrder(cust:any,reqDate:any){
    //console.log(this.datePipe.transform(reqDate,"yyyy-MM-dd"));
    let query = '?id='+cust._id+'&searchDate='+this.datePipe.transform(reqDate,"yyyy-MM-dd")+"&delivered=NO";
    this.commonService.getMethod(environment.urls.searchOrder+query).subscribe((data:any)=>{
      if(data.length > 0){
        this.isEdit = true;
        this.edit_details = data[0].details;
        this.order_details = data[0];
      }
    });
  }

  public repeatOrder(){
    console.log('repeat order');
    let query = '?id='+this.customer._id+'&searchDate='+this.datePipe.transform(new Date(),"yyyy-MM-dd")+"&delivered=YES";
    this.commonService.getMethod(environment.urls.searchOrder+query).subscribe((data:any)=>{
      if(data.length > 0){
        this.isEdit = true;
        this.edit_details = data[0].details;
        this.order_details = data[0];
        this.loadProduct();    
      }else{
        this.snackBar.open("No Orders found!!", "Success", {
          duration: 500,
        });
      }
    });
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

          val['class'] = '';
        if(this.isEdit){
          let quan = this.edit_details.filter((det:any) => det.prod_id == val._id);
          if(quan.length > 0){
            val['class'] = "input-bg-color";
            fieldsCtrls[val.alias] = new FormControl(quan[0]['prod_quan']);
          }else{
            fieldsCtrls[val.alias] = new FormControl(0);
          }
        }else{
          fieldsCtrls[val.alias] = new FormControl(0);
        }

        tempArr[val.category][val.sub_category][val.brand_name].push(val);
        
        this.productList[val.alias] = {
          id:val._id,
          product_id:val.product_id,
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
          let rate_type = this.sale_type_arr.filter(key => key.prod_id == product.id);
          let trans_desc:TransactionDesc = {
            rate_type: (rate_type.length > 0)?rate_type[0].type:DEFAULT_RATE_TYPE,
            prod_name: product.name,
            prod_id : product.id,
            product_id: product.product_id,
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
      if(this.transaction_desc.length > 0){
        let data = {
          customer_id: this.customer._id,
          order_date: this.delDate,
          details: this.transaction_desc
        }

        if(this.order_details && this.isEdit)
          data['_id'] = this.order_details._id;
        
        this.commonService.postMethod(this.url,data).subscribe(resp =>{    
          this.transaction_desc = [];
          this.form.reset();  
          this.snackBar.open("Saved successfully!!", "Success", {
            duration: 500,
          });
        },error =>{
          this.snackBar.open(error, "Error", {
            duration: 600,
          });
        });
      } else {
        this.snackBar.open("Please enter order", "Error", {
          duration: 1000,
        });
      }
      this.dialogRef.close();
    }  
  } 

}
