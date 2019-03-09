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
  constructor(public commonService:CommonService, public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CommonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public form_value: any) {
      this.title = form_value.formTitle;
      this.url = form_value.url;
      let fieldsCtrls = {};
      for (let f of form_value.formData) {
        let validation = [];
        if(f.validation.required)
          validation.push(Validators.required);
        if (f.inputType != 'dropdown') {
          fieldsCtrls[f.name] = new FormControl(f.value || '', validation);
        } else {
          let opts = {};
          for (let opt of f.options) {
            opts[opt.key] = new FormControl(opt.value);
          }
          fieldsCtrls[f.name] = new FormGroup(opts)
        }
      }
    this.form = new FormGroup(fieldsCtrls);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    if(this.form.status == "VALID"){      
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
    }
  }

}
