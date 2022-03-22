import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { ProdtableComponent } from '../../common/prodtable/prodtable.component';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Product } from 'src/app/interfaces/product';
import { BootstrapService } from 'src/app/services/bootstrap.service';
//import { RouteObj } from 'src/app/interfaces/route';
import { PrinterService } from 'src/app/services/printer.service';
import { Router, NavigationEnd } from '@angular/router';
import { ConsViewComponent } from './cons-view/cons-view.component';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject } from 'rxjs';
//import { ConfirmPopComponent } from 'src/app/app-material/confirm-pop/confirm-pop.component';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesComponent implements OnInit {
  maxToDate: Date;
  delDate: Date;
  selRoute: string = "monthly";
  searKey: string = "";
  step = 0;
  routes:any;

  setStep(index: number) {
    //console.log(index);
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  deliveryList:BehaviorSubject<any[]> = new BehaviorSubject<any[]>(null);
  tempDeliveryList:any[];
  searDeliveryList:any[];
  productList:any[];
  consolidatedList:any[];
  enableSearch:boolean = false;
  //confirmBox: string = "YES";

  constructor(private datePipe: DatePipe, private commonService: CommonService, private dialog: MatDialog, private bootstrap:BootstrapService,
    private printerService: PrinterService, private router: Router, private userservice: UserService, private snackBar:MatSnackBar) { 
      this.router.events.subscribe(val => {
        if (val instanceof NavigationEnd && window.innerWidth <= 992 ) {
            //this.enableSearch = false;
        }
      });
      this.delDate = new Date();
  }

  ngOnInit() {
    this.routes = this.bootstrap.routes.map(function(val) {
      return {
        key:val._id,
        value:val.areaName
      }
    });
    this.routes.push({key:'all',value:'All'});
    this.addEvent();
    let tdy = new Date();
    tdy.setDate(tdy.getDate() +1);
    this.maxToDate = tdy;
  }

  public addEvent(){
    let q = '?order_date='+this.datePipe.transform(this.delDate,"yyyy-MM-dd")+"&route="+this.selRoute;
    //let q = '?order_date='+this.datePipe.transform(this.delDate,"yyyy-MM-dd")+"&route="+this.selRoute+"&search_key="+this.searKey;
    this.loadDelivers(q);
    //this.loadConsolidatedOrders(q);
  }

  private loadDelivers(query:string){    
    this.commonService.getMethod(environment.urls.getDeliveries+query).subscribe((data:any[])=>{
      this.searDeliveryList = data;
      this.applyFilter();
      //this.deliveryList.next(this.tempDeliveryList);
    });
  }

  // private loadConsolidatedOrders(query:string){
  //   this.commonService.getMethod(environment.urls.getConsolidatedOrderList+query).subscribe((data:any[])=>{  
  //     this.consolidatedList = data;    
  //     //this.generateCosolidatedList(data);
  //   });
  // }

  // private generateCosolidatedList(consList:any[]){
  //   //console.log("Product list");
  //   let list = this.commonService.getProductList();
  //   for(let key in list){
  //     let count = consList.find(cons => cons._id == list[key]._id);
  //     if(count){
  //       list[key]['count'] = count.count;
  //     }else{
  //       list[key]['count'] = 0;
  //     }
  //   }
  //   //console.log(list);
  //   this.consolidatedList = list;
  // }  

  public showConsolidated(){
    let q = '?order_date='+this.datePipe.transform(this.delDate,"yyyy-MM-dd")+"&route="+this.selRoute+"&search_key="+this.searKey;
    this.commonService.getMethod(environment.urls.getConsolidatedOrderList+q).subscribe((data:any[])=>{  
      this.consolidatedList = data;
      let route = this.routes.filter(r=>r.key == this.selRoute)[0].value;
      const dialogRef = this.dialog.open(ConsViewComponent, {
        width: '90%',
        // height:'100%',
        data: {cons_data:this.consolidatedList,route:route,date:this.delDate},
        //panelClass: 'custom-modalbox'
      });

      dialogRef.afterClosed().subscribe(result => {
        //reload
        //this.addEvent();
      });
    });    
  }

  clear(){
    this.searKey = '';
    //this.addEvent();
    this.applyFilter();
  }

  applyFilter() {
    this.tempDeliveryList = this.searDeliveryList;
    if(this.searKey != ''){
      this.tempDeliveryList = this.searDeliveryList.filter(val => val._id.customer.customerName.toLowerCase().indexOf(this.searKey.toLowerCase())>-1);
    }
    this.deliveryList.next(this.tempDeliveryList);
    //let dataList = this.tempDeliveryList;
    //this.deliveryList = dataList.filter((list:any)=>{
    //this.deliveryList = new BehaviorSubject(dataList.filter(list => list._id.customer.customerName.toLowerCase().indexOf(filterValue.toLowerCase()) > -1));
  }

  enablePlaceOrder(){
    if(this.userservice.user && this.userservice.user.role == "ADMIN"){
      return true;
    }else{
      return this.datePipe.transform(this.delDate,"yyyy-MM-dd") == this.datePipe.transform(new Date(),"yyyy-MM-dd");
    }
  }

  public editOrder(index:number,o:any){
    // console.log(this.tempDeliveryList[index]);
    // this.tempDeliveryList[index].details[0].prod_quan = 10;
    // this.deliveryList.next(this.tempDeliveryList);
    let isEdit = false;
    if(o._id.orders){
      isEdit = true;
    }
    const dialogRef = this.dialog.open(ProdtableComponent, {
      //width: '90%',
      //height:'80%',
      data: {order_date:this.delDate,order_details:o._id.orders,customer:o._id.customer,edit_details:o.details,url:environment.urls.postOrder,isEdit:isEdit,source:'delivery'},
      panelClass: 'custom-modalbox'
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
      //console.log(result);
      if(result){
        //console.log('yes');
        if(result.details){ // assign values if details avail
          this.tempDeliveryList[index].details = result.details;
          this.tempDeliveryList[index]._id.orders = result.orders;
        }else{ // if empty assign with empty default values
          delete this.tempDeliveryList[index]._id.orders;
          this.tempDeliveryList[index].details[0] = {};
        }        
        //console.log(this.tempDeliveryList);
        this.deliveryList.next(this.tempDeliveryList);
      }
      //this.addEvent();
    });
  }

  public placeOrder(){
    if(confirm('Make sure all the orders are delivered correctly, if yes click ok')){
      let data = {
        "orderdate":this.datePipe.transform(this.delDate,"yyyy-MM-dd"),
        "customerid":"all"
      }
      //environment.urls.postOrderSales
      this.commonService.postMethod(environment.urls.postOrderSales,data).subscribe((data:GenericResp)=>{
        if(data.code == 200){
          this.snackBar.open(data.message, "Success", {
            duration: 1000,
          });
          //redirect to dashboard
          this.router.navigate(['/layout/dashboard'],{ skipLocationChange: true });
          //this.addEvent(); // commentted due to unwanted load time in deliveries page
        }else{
          this.snackBar.open(data.message, "Error", {
            duration: 1000,
          });
        }      
      });
    }
  }

  callPrintModal(){
    console.log('printer called');
    const dialogRef = this.dialog.open(DeliveriesPrintComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {      
      var q = result.data.map(function(obj){
        return obj.key;
      }).join(",");
      var route_name = result.data.map(function(obj){
        return obj.value;
      }).join(",");
      let query = '?order_date='+this.datePipe.transform(this.delDate,"yyyy-MM-dd")+"&route="+q;
      this.commonService.getMethod(environment.urls.getDeliveries+query).subscribe((data:any[])=>{
        data['route'] = route_name;
        this.printerService.printData = {
          redirectUrl: '/orders',
          format: 'report',
          data: data,
          type: 'SALES',
          date: this.delDate
        }
        this.router.navigate(['/layout',{ outlets: { printpage: 'printview' }}],{ skipLocationChange: true });
      });      
      
    });
  }

}

@Component({
  selector: 'print-deliveries',
  templateUrl: './print-deliveries.component.html',
  styleUrls: ['./deliveries.component.scss']
})
export class DeliveriesPrintComponent implements OnInit {
  routes: any[];
  masterCheck: boolean = false;
  constructor(public bootstrap:BootstrapService, public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeliveriesPrintComponent>){}
  ngOnInit(){
    this.routes = this.bootstrap.routes.map(function(val) {
      return {
        checked: false,
        key:val._id,
        value:val.areaName
      }
    });
  }

  isAllSelected(){
    this.masterCheck = this.routes.every(function(item:any) {
      return item.checked == true;
    })
  }

  checkUncheckAll(){
    this.routes.forEach(obj => {
      obj.checked = this.masterCheck;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  print(){
    var selectedList = this.routes.filter(function(obj){
      return obj.checked == true;
    });
    this.dialogRef.close({ data: selectedList });
  }
}
