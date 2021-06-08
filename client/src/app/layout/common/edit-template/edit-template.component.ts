import { Component, OnInit, ElementRef, EventEmitter, ViewChild, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { objValidator } from '../../transactions/sales/sales.component';
import { MatSnackBar, MatTableDataSource } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TransactionDesc, Sales, DiscountTransaction } from 'src/app/interfaces/transaction';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { PrinterService } from 'src/app/services/printer.service';
import { Router } from '@angular/router';
import { DEFAULT_RATE_TYPE, PAYMENT_TYPE } from '../../../constants/contants';
import { DatePipe } from '@angular/common';
import { gross_amount } from 'src/app/interfaces/sales';

@Component({
  selector: 'app-edit-template',
  templateUrl: './edit-template.component.html',
  styleUrls: ['./edit-template.component.scss']
})
export class EditTemplateComponent implements OnInit {
  displayedColumns = ['sno','productName','quantity','rate','tax','amount','action'];
  dataSource: MatTableDataSource<TransactionDesc>;
  form: FormGroup;
  productList: Product[];
  filteredOptions: Observable<Product[]>;
  transaction_desc: TransactionDesc[]=[];
  del_transaction_desc: TransactionDesc[]=[];
  discount_desc: DiscountTransaction[]=[];
  availableDiscounts: any[];
  sale_type: string = DEFAULT_RATE_TYPE;
  sale_type_arr: any[];
  default_payment_type:string;
  payment_types: any[];
  roundoff_det: any = {val:0,sym:'+'};
  gross_amt:gross_amount;
  @Input() data : any;
  @Output() closeEditPage = new EventEmitter<boolean>();
  @ViewChild("productName") prodField: ElementRef;

  constructor(private commonService: CommonService, public snackBar: MatSnackBar,private router: Router,
    public printerService: PrinterService, private datePipe: DatePipe) {
    this.form = new FormGroup({
      'productName': new FormControl('',[Validators.required,objValidator('prod_name')]),
      'quantity': new FormControl('',Validators.required)
    });
   }

  ngOnInit() {
    console.log(this.data);
    this.loadProduct();
    this.loadData();
    this.loadDiscounts();
    this.getTotalCost(); // load init values
    this.payment_types = PAYMENT_TYPE.map(val => {
      return {
        key: val,
        value: val
      }
    });
    this.default_payment_type = this.data.payment_type;
    if(this.data.customer_id) //for customers alone
      this.loadCustomerRateType(this.data.customer_id);
  }

  //load customer rate type for all products
  public loadCustomerRateType(cust_id){
    this.commonService.getMethod(environment.urls.getRateTypeByCustomer+'/'+cust_id).subscribe((data:any) => {
      this.sale_type_arr = data;
    });
  }

  loadData(){
    this.discount_desc = this.data.discount;
    this.transaction_desc = this.data.details;
    this.dataSource = new MatTableDataSource(this.data.details);    
  }

  loadDiscounts(){
    let date = this.datePipe.transform(this.data.sale_date,"yyyy-MM-dd");
    this.commonService.getSearchDiscountList(date).subscribe(data=>{
      this.availableDiscounts = data;
    });
    //this.availableDiscounts = this.commonService.getDiscountList();
  }

  loadProduct(){
    this.commonService.getMethod(environment.urls.getProduct).subscribe((data:Product[]) => {
      this.productList = data;
      this._callFilter();  
    });
  }

  private _callFilter(){
    this.filteredOptions = this.form.get("productName").valueChanges
      .pipe(
        startWith(''),
        map(value => (value && value.length >= 1) ? this._filter(value):[])
      );
  }

  private _filter(value: string): Product[] {
    let filterValue = (typeof value == 'string')?value.toLowerCase():"";
    return this.productList.filter(option => option.prod_name.toLowerCase().includes(filterValue));
  }

  displayFn(prod?: Product): string | undefined {
    return prod ? prod.prod_name : undefined;
  }

  getTotalCost():void {
    let discounts = this.getTotalDiscount();
    let actual_amt =  this.transaction_desc.filter((t)=> t.is_delete == 'NO').map(t => t.sub_amount).reduce((acc, value) => acc + value, 0)+this.transaction_desc.filter((t)=> t.is_delete == 'NO').map(t => t.prod_tax).reduce((acc, value) => acc + value, 0) - discounts;
    let roundoff = actual_amt % 1;
    if(roundoff >= 0.5){
      this.roundoff_det = {
        val:(1-roundoff),
        sym: '+'
      }
    }else{
      this.roundoff_det = {
        val:-roundoff,
        sym: ''
      }      
    }
    this.gross_amt = {
      discount: discounts,
      roundoff_sym: this.roundoff_det.sym,
      roundoff_val: this.roundoff_det.val,
      total: actual_amt + this.roundoff_det.val
    }
    //return actual_amt + this.roundoff_det.val;
  }

  loadReportPage(){
    this.closeEditPage.emit(false)
  }

  _remove(n:number):void{
    //console.log(this.transaction_desc);
    // this.transaction_desc.splice(n,1);
    // this.dataSource = new MatTableDataSource(this.transaction_desc);
    let row = this.transaction_desc[n];
    row.is_delete = "YES";
  
    if(row.discount_id && row.discount_id != ''){
      this.discount_desc.map(d=> {
        if(d.discount_id == row.discount_id)
          d.is_delete = "YES"
      });

      this.transaction_desc.map(t => {
        if(t.discount_id == row.discount_id)
          t.is_delete = "YES"
      })
    }
    if(row._id){
      this.del_transaction_desc.push(row);
    }    
    this.transaction_desc = this.transaction_desc.filter(trans => trans.is_delete == "NO");
    this.discount_desc = this.discount_desc.filter(d => d.is_delete == "NO");
    this.getTotalCost();
    this.dataSource = new MatTableDataSource(this.transaction_desc); 
  }

  onSubmit(){
    console.log('submit');
    if(this.form.status == "VALID"){
      let product = this.form.value.productName;
      if(this.sale_type_arr){
        let customer_rate_type = this.sale_type_arr.filter(key => key.prod_id == product._id); //find customer rate type
        if(customer_rate_type.length > 0 )
          this.sale_type = customer_rate_type[0].type;
      }
      let rate = this.commonService.getProductPrice(product._id,this.sale_type); // find rate based oo type
      if(rate == null){
        this.snackBar.open("Rate not found for this product!!", "Notice", {
          duration: 1000,
        });
        return false;
      }

      //replace and sum the existing product added
      this.form.value.quantity += this.transaction_desc.filter(d=>d.prod_id == product._id).reduce((acc,val)=> {return acc+val.prod_quan},0);
      this.transaction_desc = this.transaction_desc.filter(d=> d.prod_id != product._id);
      // discounts calculation
      let var_for_dis = {
        form: this.form,
        customer_id: this.data.customer_id,
        product: product,
        sale_type: this.sale_type
      }
      let discount_id = this._calculateDiscounts(var_for_dis);
      // discounts end
      let trans_desc:TransactionDesc = {
        rate_type: this.sale_type,
        prod_name:product.prod_name,
        prod_id : product._id,
        product_id: product.product_id,
        prod_quan : this.form.value.quantity,
        prod_rate_per_unit : rate.price,
        tax: rate.tax?rate.tax:0,
        discount_id:discount_id,
        prod_tax : rate.tax ? (rate.price * this.form.value.quantity)*rate.tax/100:0,
        sub_amount : (rate.price * this.form.value.quantity),
        is_delete: 'NO'
      }
      this.transaction_desc.push(trans_desc);
      this.getTotalCost();
      this.form.reset();      
      this.dataSource = new MatTableDataSource(this.transaction_desc);      
      this._callFilter();
      this.prodField.nativeElement.focus();
    }    
  }

  _calculateDiscounts(vars:any):string{
    let discounts = [],_did = null;
    // let sys_date = this.datePipe.transform(new Date(),'yyyy-MM-dd');
    // let sale_date = this.datePipe.transform(this.custForm.value.curDate,'yyyy-MM-dd');
  
    // if( sys_date != sale_date || !this.availableDiscounts){         
    //   this.commonService.getSearchDiscountList(sale_date).subscribe((data:any[]) => {
    //     this.availableDiscounts = data;
    //   }); 
    // }

    discounts = this.availableDiscounts;
    let matching = [];
    if(discounts && discounts.length > 0){
      matching = discounts.filter(dis => {
        return dis.buy_prod_id == vars.product._id && 
                vars.form.value.quantity >= dis.buy_count &&
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
          let purchased_quan = vars.form.value.quantity;
          if(matching[0].applicable_type.indexOf(vars.sale_type) >=0){
            _did = matching[0]._id;
            quotient = Math.floor(purchased_quan / matching[0].buy_count);
            free_count = quotient * matching[0].free_count;

            let free_product = matching[0].free_product[0];
            let rate = this.commonService.getProductPrice(free_product._id,vars.sale_type);
            let trans_desc:TransactionDesc = {
              rate_type: 'Discount',
              prod_name:free_product.prod_name,
              prod_id : free_product._id,
              product_id: free_product.product_id,
              prod_quan : free_count,
              prod_rate_per_unit : rate.price,
              discount_id: _did,
              tax: 0,
              prod_tax : 0,
              sub_amount : rate.price * free_count
            }
            this.transaction_desc.push(trans_desc);

            let exist = this.discount_desc.filter(d=> d.discount_id == _did);
            if(this.discount_desc.length >0 && exist.length >0){
              this.discount_desc.map(d=>{
                if(d.discount_id == _did){
                  d.prod_count = free_count;
                  d.total_amount = rate.price * free_count
                }
              })
            }else{
              let discount_desc:DiscountTransaction = {
                discount_id: matching[0]._id,
                prod_id: free_product.product_id,
                prod_count: free_count,
                total_amount: rate.price * free_count
              }

              this.discount_desc.push(discount_desc);
            }
            console.log(this.discount_desc);
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

  _saveOrder(type:string):void{  
    //console.log(this.transaction_desc);
    
    let data: Sales = {
      customer_id: this.data.customer_id,
      sale_date: this.data.sale_date,
      total_amount: this.gross_amt.total, //this.getTotalCost(),
      roundOff: this.roundoff_det,
      details: this.transaction_desc.concat(this.del_transaction_desc),
      payment_type: this.default_payment_type,
      discounts: this.discount_desc
    }
    this.transaction_desc = [];
    this.dataSource = new MatTableDataSource(this.transaction_desc);
     
    this.commonService.putMethod(environment.urls.updateSales+'/'+this.data._id,data).subscribe((data:GenericResp) =>{  
      if(data.code == 200){
        this.snackBar.open("Updated successfully!!", "Success", {
          duration: 1000,
        });
        //print
        if(type == 'print'){
          this.printerService.printData = {
            redirectUrl: '/transactions',
            format: 'invoice',
            data: [data.data.sale_id],
            type: 'SALES',
            date: new Date() // dummy date
          }
          this.router.navigate(['/layout',{ outlets: { printpage: 'printview' }}],{ skipLocationChange: true });
        }  
      }else{
        this.snackBar.open("Error!!", data.message, {
          duration: 1000,
        });
      }
      
    },error =>{
      this.snackBar.open(error, "Error", {
        duration: 1000,
      });
    });   
    this.form.reset();
    //after reset call filters
    this._callFilter();  
    this.loadReportPage();
  } 
  getTotalDiscount():number{
    return this.discount_desc.map(d => d.total_amount).reduce((acc, value) => acc + value, 0);
  }

}
