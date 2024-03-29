import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder } 
    from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';

import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { CATEGORY, SUBCATEGORY, BRANDS, DEFAULT_RATE_TYPE, V_CATEGORY } from '../../../constants/contants';
import { TransactionDesc } from 'src/app/interfaces/transaction';
import { Customer } from 'src/app/interfaces/customer';
import { OrdersRoutingModule } from '../../orders/orders-routing.module';
import { GenericResp } from 'src/app/interfaces/genericResp';

@Component({
  selector: 'app-prodtable',
  templateUrl: './prodtable.component.html',
  styleUrls: ['./prodtable.component.scss']
})
export class ProdtableComponent implements OnInit {
  form: FormGroup;
  productList: any[]=[];
  transaction_desc: TransactionDesc[]=[];
  strucProductList:any;
  category:any[];
  subcategory:any[];
  brand:any[];
  customer:any;
  url:string;
  delDate:Date;
  edit_details:any;
  order_details:any;
  isEdit:boolean = false;
  isRepeat:boolean = false;
  sale_type_arr: any[];
  selectedCategory:string;
  availableDiscounts: any[];
  orderby:any[];
  products: Product[];
  common_rate_type:string = '';
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
          // this.isEdit = form_value.isEdit;
          // this.edit_details = form_value.edit_details;
          // this.order_details = form_value.order_details;
          // this.loadProduct();
          this.loadExistingOrder(this.customer,this.delDate);
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
    //commented due to late load issue
    //this.loadProduct();
    this.loadDiscounts();  
    let formC = {};
    formC["name"] = new FormControl("");
    this.form = new FormGroup(formC);
  }

  loadDiscounts(){
    let date = this.datePipe.transform(this.delDate,"yyyy-MM-dd");
    this.commonService.getSearchDiscountList(date).subscribe(data=>{
      this.availableDiscounts = data;
    });
  }

  public loadCustomerRateType(cust:Customer){
    console.log("customer rate type loaded");
    this.common_rate_type = cust.common_ratetype?cust.common_ratetype:DEFAULT_RATE_TYPE;
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
      this.loadProduct();
    });
  }

  public repeatOrder(){
    console.log('repeat order');
    // let prevDate = new Date();
    // prevDate.setDate(this.delDate.getDate() - 1);
    // commentted since day first of every month got issues
    let prevDate = new Date(this.delDate.getTime() - 86400000);
    let query = '?id='+this.customer._id+'&searchDate='+this.datePipe.transform(prevDate,"yyyy-MM-dd")+"&delivered=YES";
    //let query = '?id='+this.customer._id+'&searchDate='+this.datePipe.transform(new Date(),"yyyy-MM-dd")+"&delivered=YES";
    this.commonService.getMethod(environment.urls.searchOrder+query).subscribe((data:any)=>{
      if(data.length > 0){
        //this.isEdit = true;
        this.isRepeat = true;
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
      data = data.filter(d=>d.leads_view == 'YES');
      this.products = data;    
      let tempArr = [];
      for(let val of data){
        if(tempArr[val.category] == undefined )
          tempArr[val.category] = [];
        if(tempArr[val.category][val.sub_category] == undefined )
          tempArr[val.category][val.sub_category] = [];
        if(tempArr[val.category][val.sub_category][val.brand_name] == undefined )
          tempArr[val.category][val.sub_category][val.brand_name] = [];

          val['class'] = '';
        if(this.isEdit || this.isRepeat){
          let quan = this.edit_details.filter((det:any) => det.prod_id == val._id).reduce((acc,val) => acc + val.prod_quan ,0);
          //console.log(quan);
          if(quan > 0){
            val['class'] = "input-bg-color";
            fieldsCtrls[val.product_id] = new FormControl(quan);
          }else{
            fieldsCtrls[val.product_id] = new FormControl(0);
          }
        }else{
          fieldsCtrls[val.product_id] = new FormControl(0);
        }

        tempArr[val.category][val.sub_category][val.brand_name].push(val);
        
        this.productList[val.product_id] = {
          id:val._id,
          product_id:val.product_id,
          name:val.prod_name
        }
      }
      this.form = new FormGroup(fieldsCtrls);      
      //order by hardcoded
      //let tempArr1 = {};
      //let orderby = CATEGORY;
      // console.log(orderby);
      // for(let key of orderby){
      //   if(tempArr[key])
      //     tempArr1[key] = tempArr[key];
      // }
      // console.log(tempArr1);
      // this.strucProductList = tempArr1;
      // console.log(tempArr);
      this.strucProductList = tempArr;
      this.orderby = V_CATEGORY;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  resetForm(){
    console.log("hit");
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].patchValue(0);
    });
  }

  onSubmit(){
    // console.log("Click Sbmit");
    //console.log(this.form.status);
    // console.log(this.form.value);
    if(this.form.status == "VALID"){
      for (let key in this.form.value) {
        let quan = this.form.value[key];
        if(quan > 0){          
          let product = this.productList[key];  
          let rate_type = this.sale_type_arr.filter(key => key.prod_id == product.id);
          let rate_type_iden = (rate_type.length > 0)?rate_type[0].type:this.common_rate_type;
          // let vars = {
          //   quantity: quan,
          //   customer_id: this.customer._id,
          //   product_id: product.id,
          //   sale_type: rate_type_iden
          // };
          //let _did = '';
          //let _did = this._calculateDiscounts(vars);
          let trans_desc:TransactionDesc = {
            rate_type: rate_type_iden,
            prod_name: product.name,
            prod_id : product.id,
            product_id: product.product_id,
            prod_quan : quan,
            prod_rate_per_unit : 0,
            tax: 0,
            prod_tax : 0,
            sub_amount : 0,
            //discount_id : _did,
            is_delivered: false
          }
          this.transaction_desc.push(trans_desc);
        }
      }
      if(this.transaction_desc.length > 0 || this.isEdit){
        let data;
        if(this.transaction_desc.length == 0){
          data = {
            _id: this.order_details._id,
            is_delete: 'YES',
            customer_id: this.customer._id,
            order_date: this.delDate,
            details: this.transaction_desc
          }
        } else {
          data = {
            customer_id: this.customer._id,
            order_date: this.delDate,
            details: this.transaction_desc
          }
  
          if(this.order_details && this.isEdit)
            data['_id'] = this.order_details._id;
        }        
        
        //console.log(data);
        this.commonService.postMethod(this.url,data).subscribe((resp:GenericResp) =>{
          if(resp.code == 200){
            this.transaction_desc = [];
            this.form.reset();
            if(resp.data.details){
              resp.data.details.map(det => {
                det['products'] = this.products.filter(p=>p._id == det.prod_id)[0];
              })
            }
            this.dialogRef.close(resp.data);
            this.snackBar.open("Saved successfully!!", "Success", {
              duration: 500,
            });
          }else{
            this.snackBar.open(resp.message, "Error", {
              duration: 600,
            });
            this.dialogRef.close();
          }          
        },error =>{
          this.snackBar.open(error, "Error", {
            duration: 600,
          });
          this.dialogRef.close();
        });
      } else {
        this.snackBar.open("Please enter order", "Error", {
          duration: 1000,
        });
        //this.dialogRef.close();
      }      
    } else {
      this.snackBar.open("Please check the input given!!", "Error", {
        duration: 1000,
      });
    }  
  } 

  _calculateDiscounts(vars:any):string{
    let discounts = [],_did = null;
    discounts = this.availableDiscounts;
    let matching = [];
    if(discounts && discounts.length > 0){
      matching = discounts.filter(dis => {
        return dis.buy_prod_id == vars.product_id && 
                vars.quantity >= dis.buy_count &&
                (dis.applicable_customer.indexOf('all') >= 0 || dis.applicable_customer.indexOf(vars.customer_id))
              })
    }
    //console.log(matching);
    if(matching.length > 0){
      //_did = matching[0]._id;
      switch(matching[0].discount_type){
        case 'P2P':
          let free_count = 0;
          let quotient = 0;
          let purchased_quan = vars.quantity;
          if(matching[0].applicable_type.indexOf(vars.sale_type) >=0){
            _did = matching[0]._id;
            quotient = Math.floor(purchased_quan / matching[0].buy_count);
            free_count = quotient * matching[0].free_count;

            let free_product = matching[0].free_product[0];
            let rate = this.commonService.getProductPrice(free_product._id,vars.sale_type);
            // let trans_desc:TransactionDesc = {
            //   rate_type: 'Discount',
            //   prod_name: free_product.prod_name,
            //   prod_id : free_product._id,
            //   product_id: free_product.product_id,
            //   prod_quan : free_count,
            //   prod_rate_per_unit : 0,
            //   tax: 0,
            //   prod_tax : 0,
            //   sub_amount : 0,
            //   discount_id : _did,
            //   is_delivered: false
            // }
            // this.transaction_desc.push(trans_desc);
          }
          break;
        case 'Price':
          break;
        case 'Percentage':
          break;
        default:
          break;
      }
    }
    return _did;
  }

}
