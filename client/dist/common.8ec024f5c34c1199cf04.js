(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{Bboa:function(t,e,o){"use strict";o.d(e,"b",function(){return d}),o.d(e,"a",function(){return l});var i=o("gIcY"),n=o("BHnd"),s=(o("OlR4"),o("AytR")),r=o("p0Sj"),a=o("67Y/"),u=o("3y/w"),c=(o("UbLU"),o("BH1t"));function d(t){return function(e){return e.value&&!e.value[t]?{valid:!0}:null}}var l=function(){function t(t,e,o,n,s,r,a){this.commonService=t,this.snackBar=e,this.router=o,this.route=n,this.printerService=s,this.dialog=r,this.datePipe=a,this.displayedColumns=["sno","productName","quantity","rate","tax","amount","action"],this.transaction_desc=[],this.discount_desc=[],this.sale_type=u.d,this.custFormMaxDate=new Date,this.payment_types=[],this.roundoff_det={val:0,sym:"+"},this.common_rate_type="",this.form=new i.j({productName:new i.g("",[i.v.required,d("prod_name")]),quantity:new i.g("",i.v.required)}),this.custForm=new i.j({customerName:new i.g("",[i.v.required,d("customerName")]),curDate:new i.g(new Date,i.v.required)})}return t.prototype.ngOnInit=function(){var t=this;this.loadProduct(),this.loadCustomers(),this.loadDiscounts(),this.getTotalCost(),this.default_payment_type=u.c,u.h.forEach(function(e){"CREDIT"!=e&&t.payment_types.push({key:e,value:e})}),this.onChanges(),this.custField.nativeElement.focus()},t.prototype.handleKeyboardEvent=function(t){[120,121].indexOf(t.keyCode)>-1&&(t.preventDefault(),this.transaction_desc.length>0&&this._saveOrder(120==t.keyCode?"print":"save")),27==t.keyCode&&(t.preventDefault(),this.resetForm())},t.prototype.ngAfterViewInit=function(){var t=this;this.autoTrigger.panelClosingActions.subscribe(function(e){console.log("xxxxxx",e),console.log(t.autoTrigger),t.autoTrigger.activeOption&&(console.log(t.autoTrigger.activeOption.value),t.form.patchValue({productName:t.autoTrigger.activeOption.value}),t.form.patchValue({quantity:1}),t.quanField.nativeElement.focus(),t.quanField.nativeElement.select())})},t.prototype.clear=function(t,e){var o;this[t].patchValue(((o={})[e]="",o))},t.prototype.onChanges=function(){var t=this;this.custForm.get("customerName").valueChanges.subscribe(function(e){e.customerName&&t.payment_types.push({key:"CREDIT",value:"CREDIT"})})},t.prototype.loadDiscounts=function(){this.availableDiscounts=this.commonService.getDiscountList()},t.prototype.loadCustomers=function(){var t=this;this.commonService.getMethod(s.a.urls.getCustomer+"?isactive=yes").subscribe(function(e){t.customerList=e,t._callCustomerFilter()})},t.prototype.loadProduct=function(){var t=this;this.commonService.getMethod(s.a.urls.getProduct).subscribe(function(e){t.productList=e,t._callFilter()})},t.prototype.displayFn=function(t){return t?t.prod_name:void 0},t.prototype.loadCustomerRateType=function(t){var e=this;this.common_rate_type=t.common_ratetype?t.common_ratetype:u.d,this.commonService.getMethod(s.a.urls.getRateTypeByCustomer+"/"+t._id).subscribe(function(t){e.sale_type_arr=t})},t.prototype.displayCustomerFn=function(t){return t?t.customerName:void 0},t.prototype._callCustomerFilter=function(){var t=this;this.customerFilteredOptions=this.custForm.get("customerName").valueChanges.pipe(Object(r.a)(""),Object(a.a)(function(e){return e&&e.length>=1?t._custFilter(e):[]}))},t.prototype._callFilter=function(){var t=this;this.filteredOptions=this.form.get("productName").valueChanges.pipe(Object(r.a)(""),Object(a.a)(function(e){return e&&e.length>=1?(13==e.length&&(t.quanField.nativeElement.focus(),t.autoTrigger.closePanel()),t._filter(e)):[]}))},t.prototype._filter=function(t){var e="string"==typeof t?t.toLowerCase():"";return this.productList.filter(function(t){return t.prod_name.toLowerCase().includes(e)||t.barcode==e})},t.prototype._custFilter=function(t){var e="string"==typeof t?t.toLowerCase():"";return this.customerList.filter(function(t){return t.customerName.toLowerCase().includes(e)})},t.prototype.onSubmit=function(){if("VALID"==this.form.status&&this.form.value.quantity>0){var t=this.form.value.productName;if(this.sale_type_arr){var e=this.sale_type_arr.filter(function(e){return e.prod_id==t._id})[0];this.sale_type=e?e.type:this.common_rate_type}var o=this.commonService.getProductPrice(t._id,this.sale_type);if(null==o)return this.snackBar.open("Rate not found for this product!!","Notice",{duration:1e3}),!1;this.form.value.quantity+=this.transaction_desc.filter(function(e){return e.prod_id==t._id}).reduce(function(t,e){return t+e.prod_quan},0),this.transaction_desc=this.transaction_desc.filter(function(e){return e.prod_id!=t._id});var i=this._calculateDiscounts({form:this.form,cus_form:this.custForm,product:t,sale_type:this.sale_type});this.transaction_desc.push({rate_type:this.sale_type,prod_name:t.prod_name,prod_id:t._id,product_id:t.product_id,prod_quan:this.form.value.quantity,prod_rate_per_unit:o.price,tax:o.tax?o.tax:0,discount_id:i,prod_tax:o.tax?o.price*this.form.value.quantity*o.tax/100:0,sub_amount:o.price*this.form.value.quantity}),this.getTotalCost(),this.form.reset(),this.dataSource=new n.o(this.transaction_desc),this._callFilter(),this.prodField.nativeElement.focus()}else"object"==typeof this.form.value.productName&&(this.quanField.nativeElement.focus(),this.form.patchValue({quantity:1}),this.quanField.nativeElement.select())},t.prototype._calculateDiscounts=function(t){var e=this,o=[],i=null,n=this.datePipe.transform(new Date,"yyyy-MM-dd"),s=this.datePipe.transform(this.custForm.value.curDate,"yyyy-MM-dd");n==s&&this.availableDiscounts||this.commonService.getSearchDiscountList(s).subscribe(function(t){e.availableDiscounts=t});var r=[];if((o=this.availableDiscounts)&&o.length>0&&(r=o.filter(function(e){return e.buy_prod_id==t.product._id&&t.form.value.quantity>e.buy_count&&(e.applicable_customer.indexOf("all")>-1||e.applicable_customer.indexOf(t.cus_form.value.customerName.customer_id)>-1)})),r.length>0)switch(r[0].discount_type){case"P2P":var a=0,u=0,c=t.form.value.quantity;if(r[0].applicable_type.indexOf(t.sale_type)>=0){i=r[0]._id,u=Math.floor(c/r[0].buy_count),a=u*r[0].free_count;var d=r[0].free_product[0],l=this.commonService.getProductPrice(d._id,t.sale_type),p=this.discount_desc.filter(function(t){return t.discount_id==i});this.discount_desc.length>0&&p.length>0?this.discount_desc.map(function(t){t.discount_id==i&&(t.prod_count=a,t.total_amount=l.price*a)}):this.discount_desc.push({discount_id:r[0]._id,prod_id:d.product_id,prod_count:a,total_amount:l.price*a})}}return i},t.prototype._remove=function(t,e){this.transaction_desc.splice(e,1),t.discount_id&&""!=t.discount_id&&(this.discount_desc=this.discount_desc.filter(function(e){return e.discount_id!=t.discount_id}),this.transaction_desc=this.transaction_desc.filter(function(e){return e.discount_id!=t.discount_id})),this.getTotalCost(),this.dataSource=new n.o(this.transaction_desc)},t.prototype.getTotalDiscount=function(){return console.log("discount called"),this.discount_desc.map(function(t){return t.total_amount}).reduce(function(t,e){return t+e},0)},t.prototype.getTotalCost=function(){console.log("total called");var t=this.getTotalDiscount(),e=this.transaction_desc.map(function(t){return t.sub_amount}).reduce(function(t,e){return t+e},0)+this.transaction_desc.map(function(t){return t.prod_tax}).reduce(function(t,e){return t+e},0)-t,o=e%1;this.roundoff_det=o>=.5?{val:1-o,sym:"+"}:{val:-o,sym:""},this.gross_amt={discount:t,roundoff_sym:this.roundoff_det.sym,roundoff_val:this.roundoff_det.val,total:e+this.roundoff_det.val}},t.prototype._saveOrder=function(t){var e=this,o={customer_id:this.custForm.value.customerName._id,sale_date:this.custForm.value.curDate,total_amount:this.gross_amt.total,roundOff:this.roundoff_det,payment_type:this.default_payment_type,details:this.transaction_desc,discounts:this.discount_desc};this.transaction_desc=[],this.discount_desc=[],this.dataSource=new n.o(this.transaction_desc),this.commonService.postMethod(s.a.urls.postSales,o).subscribe(function(o){200==o.code?(e.snackBar.open("Saved successfully!!","Success",{duration:500}),e.lastSales={saleid:o.data.sale_id,saleamount:o.data.total_amount},"print"==t&&(e.printerService.printData={redirectUrl:"/transactions",format:"invoice",data:[o.data.sale_id],type:"SALES",date:new Date},e.router.navigate(["/layout",{outlets:{printpage:"printview"}}],{skipLocationChange:!0}))):e.snackBar.open("Error!!","Error",{duration:600})},function(t){e.snackBar.open(t,"Error",{duration:600})}),this.form.reset(),this.getTotalCost(),this.custForm=new i.j({customerName:new i.g("",i.v.required),curDate:new i.g(new Date,i.v.required)}),this._callCustomerFilter(),this._callFilter()},t.prototype.openSalesModal=function(t){this.dialog.open(c.a,{width:"500px",data:{saleid:t}}).afterClosed().subscribe(function(t){})},t.prototype.resetForm=function(){this.form.reset(),this.transaction_desc=[],this.discount_desc=[],this.dataSource=new n.o(this.transaction_desc),this.default_payment_type=u.c,this.custForm.setValue({customerName:"",curDate:new Date}),this.gross_amt={discount:0,roundoff_sym:"",roundoff_val:0,total:0}},t}()},YuTi:function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}}}]);