import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';

import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.scss']
})
export class CommonModalComponent {
  form: FormGroup;
  title:string = "";
  url: string;
  httpMethod: string = "POST";
  constructor(public commonService:CommonService, public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CommonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public form_value: any) {
      this.title = form_value.formTitle;
      this.url = form_value.url;
      if(form_value.method)
        this.httpMethod = form_value.method;
      let fieldsCtrls = {};
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

  onSubmit(){
    if(this.form.status == "VALID"){   
      switch(this.httpMethod){
        case 'POST':
          this.commonService.postMethod(this.url,this.form.value).subscribe(data =>{
            this.onNoClick();
            this.snackBar.open("Saved successfully!!", "Success", {
              duration: 500,
            });
          },error =>{
            this.snackBar.open(error, "Error", {
              duration: 500,
            });
          });
          break;
        case 'PUT':
          console.log(this.form.value); //return false;
          this.commonService.putMethod(this.url+'/'+this.form.value._id,this.form.value).subscribe(data =>{
            this.onNoClick();
            this.snackBar.open("Updated successfully!!", "Success", {
              duration: 500,
            });
          },error =>{
            this.snackBar.open(error, "Error", {
              duration: 500,
            });
          });
          break;

        default:
          this.snackBar.open("No Method defined", "Error", {
            duration: 500,
          });
          break;
      }         
    }
  }

}
