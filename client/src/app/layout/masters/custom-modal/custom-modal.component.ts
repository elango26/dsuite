import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

import { CommonService } from 'src/app/services/common.service';
import { Rate } from 'src/app/interfaces/rate';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})

export class CustomModalComponent {
  form: FormGroup;
  title:string = "";
  url: string;
  dropList:any;
  fieldList:any;
  constructor(public commonService:CommonService, public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CustomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public form_value: any) {
      this.title = form_value.formTitle;
      this.url = form_value.url;
      this.dropList = (form_value.dropList) ? form_value.dropList : false;
      let fieldsCtrls = {};
      this.fieldList = {
        rates:[]
      };
      for (let f of form_value.formData) {
        let validation = [];
        if(f.validation.required)
          validation.push(Validators.required);
        //if (f.inputType != 'dropdown') {
          fieldsCtrls[f.name] = new FormControl(f.value || '', validation);
        // } else {
        //   let opts = {};
        //   for (let opt of f.options) {
        //     opts[opt.key] = new FormControl(opt.value);
        //   }
        //   fieldsCtrls[f.name] = new FormGroup(opts)
        // }
      }
    this.form = new FormGroup(fieldsCtrls);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDropDownSelect(options,index){
    
    this.fieldList.rates = [];
    let value = options[index];
    let rateType = ['retail','wholesale1','wholesale2','purchase'];
    let placeholde = {'retail':'Retail','wholesale1':'Wholesale 1','wholesale2':"Wholesale 2",'purchase':'Purchase'};
    let rate = [];
    for (let type of rateType) {
      rate.push(
        {
          type : type,
          price : '',
          tax : '',
          priceText : placeholde[type]+ ' Price',
          taxText :  placeholde[type]+ ' Tax'
        }
      );
    }
  
    if(value.key == 'all'){
      for (let single of options) {
         if(single.key != 'all'){
          let row = {
            prod_id : single.key,
            prod_name : single.value,
            rate : rate
          }
          this.fieldList.rates.push(row);
         }
      }
    }else{
      let row = {
        prod_id : value.key,
        prod_name : value.value,
        rate : rate
      }
      this.fieldList.rates.push(row);
    }
    
  }

  onSubmit(){
 
    if(this.form.status == "VALID"){  
      
      this.commonService.postMethod(this.url,this.fieldList).subscribe(data =>{
        this.onNoClick();
        this.snackBar.open("Saved successfully!!", "Success", {
          duration: 500,
        });
      },error =>{
        this.snackBar.open(error, "Error", {
          duration: 500,
        });
      });
    }
  }

}


