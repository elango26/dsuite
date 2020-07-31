import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } 
    from '@angular/forms';
import { MatTableDataSource,MatSnackBar, MatDialog } from '@angular/material';
import { CommonService } from 'src/app/services/common.service';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { Customer } from 'src/app/interfaces/customer';
import { TransactionDesc, Sales, DiscountTransaction } from 'src/app/interfaces/transaction';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { formControlBinding } from '@angular/forms/src/directives/reactive_directives/form_control_directive';
import { DEFAULT_RATE_TYPE,PAYMENT_TYPE,DEFAULT_PAYMENT_TYPE } from '../../../constants/contants';
import { Router, ActivatedRoute } from '@angular/router';
import { PrinterService } from 'src/app/services/printer.service';
import { GenericResp } from 'src/app/interfaces/genericResp';
import { SalesReportPopComponent } from '../../common/sales-report-pop/sales-report-pop.component';
import { keyValuesToMap } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { DatePipe } from '@angular/common';
import { NG_DIRECTIVE_DEF } from '@angular/core/src/render3/fields';

export function objValidator(obj:any): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value && !control.value[obj]) {
          return { 'valid': true };
      }
      return null;
  };
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
  displayedColumns = ['sno','productName','quantity','rate','tax','amount','action'];
  dataSource: MatTableDataSource<TransactionDesc>;

  form: FormGroup;
  custForm: FormGroup;
  productList: Product[];
  customerList: Customer[];
  transaction_desc: TransactionDesc[]=[];
  discount_desc: DiscountTransaction[]=[];
  filteredOptions: Observable<Product[]>;
  customerFilteredOptions: Observable<Customer[]>;
  sale_type: string = DEFAULT_RATE_TYPE;
  sale_type_arr: any[];
  lastSales:any;
  custFormMaxDate = new Date();
  availableDiscounts: any[];
  payment_types: any[]=[];
  default_payment_type:string;

  @ViewChild("productName") prodField: ElementRef;
  constructor(private commonService: CommonService, public snackBar: MatSnackBar,private router: Router, private route: ActivatedRoute, 
    public printerService: PrinterService, public dialog: MatDialog, private datePipe: DatePipe) { 
    this.form = new FormGroup({
      'productName': new FormControl('',[Validators.required,objValidator('prod_name')]),
      'quantity': new FormControl('',Validators.required)
    });
    this.custForm = new FormGroup({
      'customerName': new FormControl('',[Validators.required,objValidator('customerName')]),
      'curDate': new FormControl(new Date(),Validators.required)
    });
  }

  ngOnInit() {
    // this.productList = this.commonService.products;
    // this._callFilter();  
    this.loadProduct();
    this.loadCustomers();
    this.loadDiscounts(); 
    this.default_payment_type = DEFAULT_PAYMENT_TYPE;
    PAYMENT_TYPE.forEach(t=>{
      if(t != 'CREDIT'){
        this.payment_types.push({
          key: t,
          value: t
        })
      }
    });
    //"POS0000013"
    // this.lastSales = {
    //   saleid: "POS0000013",
    //   saleamount: "768"
    // }
    this.onChanges();
  }

  onChanges() : void{
    this.custForm.get('customerName').valueChanges.subscribe(val => {
      if(val.customerName){
        this.payment_types.push({key:'CREDIT',value:'CREDIT'});
      }
    });
  }

  loadDiscounts(){
    //this.availableDiscounts = this.commonService.getSearchDiscountList(this.custForm.value.curDate);
    this.availableDiscounts = this.commonService.getDiscountList();
  }

  loadCustomers(){
    this.commonService.getMethod(environment.urls.getCustomer).subscribe((data:Customer[]) => {
      this.customerList = data;
      this._callCustomerFilter();  
    });
  }

  loadProduct(){
    this.commonService.getMethod(environment.urls.getProduct).subscribe((data:Product[]) => {
      this.productList = data;
      this._callFilter();  
    });
  }

  displayFn(prod?: Product): string | undefined {
    return prod ? prod.prod_name : undefined;
  }

  //load customer rate type for all products
  public loadCustomerRateType(cust:Customer){
    this.commonService.getMethod(environment.urls.getRateTypeByCustomer+'/'+cust._id).subscribe((data:any) => {
      this.sale_type_arr = data;
    });
  }

  displayCustomerFn(cust?: Customer): string | undefined {
    return cust ? cust.customerName : undefined;
  }  

  private _callCustomerFilter(){
    this.customerFilteredOptions = this.custForm.get("customerName").valueChanges
      .pipe(
        startWith(''),
        map(value => (value && value.length >= 1) ?this._custFilter(value):[])
      );
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

  private _custFilter(value: string): Customer[] {
    let filterValue = (typeof value == 'string')?value.toLowerCase():"";
    return this.customerList.filter(customer => customer.customerName.toLowerCase().includes(filterValue));
  }

  onSubmit(){
    console.log('submit');
    if(this.form.status == "VALID"){
      let product = this.form.value.productName;
      if(this.sale_type_arr){
        let customer_rate_type = this.sale_type_arr.filter(key => key.prod_id == product._id)[0]; //find customer rate type
        if(customer_rate_type)
          this.sale_type = customer_rate_type.type;
      }
      let rate = this.commonService.getProductPrice(product._id,this.sale_type); // find rate based oo type

      if(rate == null){
        this.snackBar.open("Rate not found for this product!!", "Notice", {
          duration: 1000,
        });
        return false;
      }
      //replace and sum the existing product added
      // let descs = this.transaction_desc;
      // let exist_quan = 0;
      // for(let key in descs){
      //   if(descs[key].prod_id == product._id){
      //     exist_quan += descs[key].prod_quan;
      //     this.transaction_desc.splice(parseInt(key),1);
      //   }
      // }
      // this.form.value.quantity += exist_quan;
      this.form.value.quantity += this.transaction_desc.filter(d=>d.prod_id == product._id).reduce((acc,val)=> {return acc+val.prod_quan},0);
      this.transaction_desc = this.transaction_desc.filter(d=> d.prod_id != product._id);
      
      // discounts calculation
      let var_for_dis = {
        form: this.form,
        cus_form: this.custForm,
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
        sub_amount : (rate.price * this.form.value.quantity)
      }
      this.transaction_desc.push(trans_desc);

      this.form.reset();      
      this.dataSource = new MatTableDataSource(this.transaction_desc);      
      //console.log(this.transaction_desc.length);
      this._callFilter();
      this.prodField.nativeElement.focus();
    }    
  }

  _calculateDiscounts(vars:any):string{
    let discounts = [],_did = null;
    let sys_date = this.datePipe.transform(new Date(),'yyyy-MM-dd');
    let sale_date = this.datePipe.transform(this.custForm.value.curDate,'yyyy-MM-dd');
  
    if( sys_date != sale_date || !this.availableDiscounts){         
      this.commonService.getSearchDiscountList(sale_date).subscribe((data:any[]) => {
        this.availableDiscounts = data;
      }); 
    }

    discounts = this.availableDiscounts;
    let matching = [];
    if(discounts && discounts.length > 0){
      matching = discounts.filter(dis => {
        return dis.buy_prod_id == vars.product._id && 
                vars.form.value.quantity >= dis.buy_count &&
                (dis.applicable_customer.indexOf('all') >= 0 || dis.applicable_customer.indexOf(vars.cus_form.value.customerName._id))
              })
    }
    console.log(matching);
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
              discount_id: matching[0]._id,
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

  _remove(row:any,n:number):void{
    this.transaction_desc.splice(n,1);
    //console.log(row);
    if(row.discount_id && row.discount_id != ''){
      this.discount_desc = this.discount_desc.filter(dis=>dis.discount_id != row.discount_id);
      this.transaction_desc = this.transaction_desc.filter(t=>t.discount_id != row.discount_id);
    }
    this.dataSource = new MatTableDataSource(this.transaction_desc);
  }

  getTotalDiscount():number{
    return this.discount_desc.map(d => d.total_amount).reduce((acc, value) => acc + value, 0);
  }

  getTotalCost():number {
    let discounts = this.getTotalDiscount();
    return (this.transaction_desc.map(t => t.sub_amount).reduce((acc, value) => acc + value, 0)+this.transaction_desc.map(t => t.prod_tax).reduce((acc, value) => acc + value, 0)) - discounts;
  }

  _saveOrder(type:string):void{      
    let data: Sales = {
      customer_id: this.custForm.value.customerName._id,
      sale_date: this.custForm.value.curDate,
      total_amount: this.getTotalCost(),
      payment_type: this.default_payment_type,
      details: this.transaction_desc,
      discounts: this.discount_desc
    }
    this.transaction_desc = [];
    this.discount_desc = [];
    this.dataSource = new MatTableDataSource(this.transaction_desc);
     
    this.commonService.postMethod(environment.urls.postSales,data).subscribe((data:GenericResp) =>{  
      if(data.code == 200){
        this.snackBar.open("Saved successfully!!", "Success", {
          duration: 500,
        });

        //last sales show
        //"POS0000013"
        this.lastSales = {
          saleid: data.data.sale_id,
          saleamount: data.data.total_amount
        }

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
        this.snackBar.open("Error!!", "Error", {
          duration: 600,
        });
      }
      
    },error =>{
      this.snackBar.open(error, "Error", {
        duration: 600,
      });
    });   
    this.form.reset();
    //reset form
    this.custForm = new FormGroup({
      'customerName': new FormControl('',Validators.required),
      'curDate': new FormControl(new Date(),Validators.required)
    });
    //after reset call filters
    this._callCustomerFilter();  
    this._callFilter();  
  }

  //sales report page
  openSalesModal(saleid:string){
    const dialogRef = this.dialog.open(SalesReportPopComponent, {
      width: '500px',
      data: {saleid:saleid}
    });

    dialogRef.afterClosed().subscribe(result => {
      //reload
    });
  }

}
