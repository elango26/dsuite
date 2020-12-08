import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-pop',
  templateUrl: './confirm-pop.component.html',
  styleUrls: ['./confirm-pop.component.scss']
})
export class ConfirmPopComponent implements OnInit {

  popUpLabel:string = "Are you sure want to delete?";
  constructor(
    public dialogRef: MatDialogRef<ConfirmPopComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if(data.label){
        this.popUpLabel = data.label;
      }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  ngOnInit(){

  }

}
