import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RATE_TYPE, DEFAULT_RATE_TYPE } from 'src/app/constants/contants';
import { CommonService } from 'src/app/services/common.service';
import { Rate } from 'src/app/interfaces/rate';
import { Product } from 'src/app/interfaces/product';
import { environment } from 'src/environments/environment';
import { Customer } from 'src/app/interfaces/customer';
import { GenericResp } from 'src/app/interfaces/genericResp';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})

export class CustomModalComponent {
  form: FormGroup;
  title:string = "";
  url: string;
  fieldList:any;
  isEdit:boolean = false;
  productList = [];
  edit_form:any;
  default_rate: string = DEFAULT_RATE_TYPE;
  constructor(public commonService:CommonService, public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CustomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public form_value: any) {

      this.title = form_value.formTitle;
      this.url = form_value.url;
      let fieldsCtrls = {};
      this.fieldList = {
        rates:[],
        mapping:[]
      };
      this.form = new FormGroup(fieldsCtrls);

      this.commonService.getMethod(environment.urls.getProduct).subscribe((data:Product[]) => {
        for(let val of data){
          let keyarr = {key:val._id,value:val.prod_name};
          this.productList.push(keyarr);
        }
        if(form_value.editRate){
          console.log(form_value.editRate);
          this.edit_form = form_value.editRate;
          this.isEdit = true;
          let cur_prod = {
            key: form_value.editRate.product._id,
            value: form_value.editRate.product.prod_name
          }
          this.fieldList.rates = this.requestFormat(cur_prod);
        }
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDropDownSelect(action,options,index){
    if(action == 'rate'){
      this.rateMapping(options,index);
    }else{
      //this.customerMapping(options,index);
    }
  }

  // assignCustomArray(type,indx){
  //   if((type == 'custom' && !this.fieldList.mapping[indx].custom) || 
  //   (type == 'custom' && this.fieldList.mapping[indx].custom && this.fieldList.mapping[indx].custom.length == 0)){
  //     this.fieldList.mapping[indx].custom = this.requestFormat({key:'all'});
  //   }
  // }

  // customerMapping(options,index){
  //   this.fieldList.mapping = [];
  //   let value = options[index];
  //   let rateType = [
  //                   { type:'retail',display:"Retail"},
  //                   { type:'wholesale1',display:"Wholesale 1"},
  //                   { type:'wholesale2',display:"Wholesale 2"},
  //                   { type:'purchase',display:"Purchase"},
  //                   { type:'custom',display:"Custom"}
  //                 ];
  //   if(value.key == 'all'){
  //     for (let single of options) {
  //         if(single.key != 'all'){
  //         let row = {
  //           customer_id : single.key,
  //           customer_name : single.value,
  //           type: '',
  //           rateType : rateType
  //         }
  //         this.fieldList.mapping.push(row);
  //         }
  //     }
  //   }else{
  //     let row = {
  //       customer_id : value.key,
  //       customer_name : value.value,
  //       type: '',
  //       rateType : rateType
  //     }
  //     this.fieldList.mapping.push(row);
  //   }
  // }

  requestFormat(value:any){
    let result = [];    
    let rateType = RATE_TYPE.rate_type.map(val => {return {key: val,value: val};});
    let rate = [];
    for (let type of rateType) {
      let tempAttr = {
        type : type.key,
        price : '',
        tax : '',
        title : type.value
      }
      if(type.value != DEFAULT_RATE_TYPE)
        tempAttr['margin_type'] = '';
      rate.push(tempAttr);
    }
    let row = {
      prod_id : value.key,
      prod_name : value.value,
      is_active: "YES",
      effective_date: new Date(),
      rate : rate
    }
    result.push(row);
    return result;
  }

  rateMapping(options:Customer[],index:any){
    
    this.fieldList.rates = [];
    let value = options[index];
    this.fieldList.rates = this.requestFormat(value);

  }

  onSubmit(){    
    if(this.isEdit){
      let data = {
        edit_form: this.edit_form.product.rate_avail
      }
      console.log(data);
      this.commonService.postMethod(environment.urls.updateBulkRate,data).subscribe(data =>{
        this.onNoClick();
        this.snackBar.open("Updated successfully!!", "Success", {
          duration: 500,
        });
      },error =>{
        this.snackBar.open(error, "Error", {
          duration: 500,
        });
      });
    }
    this.fieldList['defaultType'] = DEFAULT_RATE_TYPE;
    this.commonService.postMethod(this.url,this.fieldList).subscribe((data: GenericResp) =>{
      if(data.code == 200){
        this.onNoClick();
        this.snackBar.open(data.message, "Success", {
          duration: 500,
        });
      } else {
        this.snackBar.open(data.message, "Error", {
          duration: 500,
        });
      }
      
    },error =>{
      this.snackBar.open(error, "Error", {
        duration: 500,
      });
    });
  }

}


