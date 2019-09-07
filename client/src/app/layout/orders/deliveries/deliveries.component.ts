import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { ProdtableComponent } from '../../common/prodtable/prodtable.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {

  delDate: Date;
  step = 0;

  setStep(index: number) {
    console.log(index);
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  deliveryList:any[];

  constructor(private datePipe: DatePipe, private commonService: CommonService, private dialog: MatDialog) { 
    this.delDate = new Date();
  }

  ngOnInit() {
    this.loadDelivers();    
  }

  public addEvent(etype,event){
    this.loadDelivers();
  }

  private loadDelivers(){
    let q = '?order_date='+this.datePipe.transform(this.delDate,"yyyy-MM-dd");
    this.commonService.getMethod(environment.urls.getDeliveries+q).subscribe((data:any[])=>{
      this.deliveryList = data;
    });
  }

  public editOrder(o:any){
    console.log(o);
    let isEdit = false;
    if(o._id.orders){
      isEdit = true;
    }
    const dialogRef = this.dialog.open(ProdtableComponent, {
      width: 'auto',
      height:'auto',
      data: {order_date:this.delDate,order_details:o._id.orders,customer:o._id.customer,edit_details:o.details,url:environment.urls.postOrder,isEdit:isEdit,source:'delivery'},
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
    });
  }

}
