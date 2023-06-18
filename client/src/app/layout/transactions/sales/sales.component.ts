import { Directive, Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl, ValidatorFn } 
    from '@angular/forms';
import { MatTableDataSource,MatSnackBar, MatDialog, MatAutocompleteTrigger } from '@angular/material';
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
import { gross_amount } from 'src/app/interfaces/sales';

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
  roundoff_det: any = {val:0,sym:'+'};
  gross_amt:gross_amount;
  common_rate_type:string = '';

  @ViewChild("productName") prodField: ElementRef;
  @ViewChild("quantity") quanField: ElementRef;
  @ViewChild("customerName") custField: ElementRef;
  @ViewChild('typehead', {read:MatAutocompleteTrigger})  autoTrigger: MatAutocompleteTrigger;

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
    this.getTotalCost(); // load init values
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
    this.custField.nativeElement.focus();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    let validKeycodes = [120,121];
    if(validKeycodes.indexOf(event.keyCode) > -1 ){
      event.preventDefault();
      if(this.transaction_desc.length > 0){
        let type = event.keyCode == 120 ? 'print':'save';        
        this._saveOrder(type);      
      }
    }

    //reset
    if(event.keyCode == 27){
      event.preventDefault();
      this.resetForm();
    }
  }

  ngAfterViewInit()
  {
    
    this.autoTrigger.panelClosingActions.subscribe( x =>{
      console.log('xxxxxx',x);
      console.log(this.autoTrigger);
      if (this.autoTrigger.activeOption)
      {
        console.log(this.autoTrigger.activeOption.value);
        this.form.patchValue({'productName':this.autoTrigger.activeOption.value});
        this.form.patchValue({'quantity':1});
        this.quanField.nativeElement.focus();
        this.quanField.nativeElement.select();
      }
    } )
  }

  clear(key:string,name:string){
    this[key].patchValue({[name]:''});
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
    this.commonService.getMethod(environment.urls.getCustomer+'?isactive=yes').subscribe((data:Customer[]) => {
      this.customerList = data;
      this._callCustomerFilter();  
    });
  }

  loadProduct(){
    this.commonService.getMethod(environment.urls.getProduct+'?getRetailPrice=true').subscribe((data:Product[]) => {
      this.productList = data;
      this._callFilter();  
    });
  }

  displayFn(prod?: Product): string | undefined {
    return prod ? prod.prod_name : undefined;
  }

  //load customer rate type for all products
  public loadCustomerRateType(cust:Customer){
    //assign global rate_type here
    this.common_rate_type = cust.common_ratetype?cust.common_ratetype:DEFAULT_RATE_TYPE;
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
        map(value => {
          if(value && value.length >= 1){
            if(value.length == 13){
              let prod = this._filter(value);
              if(prod.length > 0) {
                this.form.controls['productName'].setValue(prod[0]);
                this.quanField.nativeElement.focus();
                this.autoTrigger.closePanel();
              }       
            } else 
            return this._filter(value);
          }else{
            return [];
          }
        })
      );
  }

  private _filter(value: string): Product[] {
    let filterValue = (typeof value == 'string')?value.toLowerCase():"";
    return this.productList.filter(option => option.prod_name.toLowerCase().includes(filterValue) || option.barcode == filterValue);
  }

  private _custFilter(value: string): Customer[] {
    let filterValue = (typeof value == 'string')?value.toLowerCase():"";
    return this.customerList.filter(customer => customer.customerName.toLowerCase().includes(filterValue));
  }

  onSubmit(){
    // console.log('submit');
    if(this.form.status == "VALID" && this.form.value.quantity > 0){
      let product = this.form.value.productName;
      if(this.sale_type_arr){
        let customer_rate_type = this.sale_type_arr.filter(key => key.prod_id == product._id)[0]; //find customer rate type
        if(customer_rate_type){
          this.sale_type = customer_rate_type.type;
        } else { //take common rate_type for this customer
          this.sale_type = this.common_rate_type;
        }          
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
      this.getTotalCost();

      this.form.reset();      
      this.dataSource = new MatTableDataSource(this.transaction_desc);      
      //console.log(this.transaction_desc.length);
      this._callFilter();
      this.prodField.nativeElement.focus();
    } else if(typeof this.form.value.productName == 'object'){
      this.quanField.nativeElement.focus();
      this.form.patchValue({'quantity':1});
      this.quanField.nativeElement.select();
      //while changing abv code check method ngAfterViewInit
    }
  }

  _calculateDiscounts(vars:any):string{
    let discounts = [],_did = null;
    let sys_date = this.datePipe.transform(new Date(),'yyyy-MM-dd');
    let sale_date = this.datePipe.transform(this.custForm.value.curDate,'yyyy-MM-dd');
  
    if( sys_date != sale_date || !this.availableDiscounts){   //if sale date is diff or discount not loaded     
      this.commonService.getSearchDiscountList(sale_date).subscribe((data:any[]) => {
        this.availableDiscounts = data;
      }); 
    }

    discounts = this.availableDiscounts;
    let matching = [];
    if(discounts && discounts.length > 0){
      matching = discounts.filter(function(dis) { return dis.buy_prod_id == vars.product._id && vars.form.value.quantity > dis.buy_count && (dis.applicable_customer.indexOf('all') > -1 || dis.applicable_customer.indexOf(vars.cus_form.value.customerName.customer_id) > -1)});
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
            // let trans_desc:TransactionDesc = {
            //   rate_type: 'Discount',
            //   prod_name:free_product.prod_name,
            //   prod_id : free_product._id,
            //   product_id: free_product.product_id,
            //   prod_quan : free_count,
            //   prod_rate_per_unit : rate.price,
            //   discount_id: matching[0]._id,
            //   tax: 0,
            //   prod_tax : 0,
            //   sub_amount : rate.price * free_count
            // }
            // this.transaction_desc.push(trans_desc);

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
            //console.log(this.discount_desc);
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
    this.getTotalCost();
    this.dataSource = new MatTableDataSource(this.transaction_desc);
  }

  getTotalDiscount():number{
    console.log('discount called');
    return this.discount_desc.map(d => d.total_amount).reduce((acc, value) => acc + value, 0);
  }



  getTotalCost():void {
    console.log('total called');
    let discounts = this.getTotalDiscount();
    let actual_amt = (this.transaction_desc.map(t => t.sub_amount).reduce((acc, value) => acc + value, 0)+this.transaction_desc.map(t => t.prod_tax).reduce((acc, value) => acc + value, 0)) - discounts;
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

  _saveOrder(type:string):void{      
    let data: Sales = {
      customer_id: this.custForm.value.customerName._id,
      sale_date: this.custForm.value.curDate,
      total_amount: this.gross_amt.total, //this.getTotalCost(),
      roundOff: this.roundoff_det,
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
    this.getTotalCost();
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

  resetForm(){
    //this.custForm.reset();
    this.form.reset();
    this.transaction_desc = [];
    this.discount_desc = [];
    this.dataSource = new MatTableDataSource(this.transaction_desc);
    this.default_payment_type = DEFAULT_PAYMENT_TYPE;
    this.custForm.setValue({'customerName':'','curDate':new Date()});
    this.gross_amt = {
      discount: 0,
      roundoff_sym: '',
      roundoff_val: 0,
      total: 0
    };
    // reset rate array if its loaded for any other customer
    this.sale_type_arr = undefined;
    this.sale_type = DEFAULT_RATE_TYPE;
    // this.custForm = new FormGroup({
    //   'customerName': new FormControl('',[Validators.required,objValidator('customerName')]),
    //   'curDate': new FormControl(new Date(),Validators.required)
    // });
  }

}