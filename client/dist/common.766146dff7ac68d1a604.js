(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{Bboa:function(t,e,i){"use strict";i.d(e,"b",function(){return d}),i.d(e,"a",function(){return p});var o=i("gIcY"),s=i("BHnd"),r=(i("OlR4"),i("AytR")),n=i("p0Sj"),a=i("67Y/"),u=i("3y/w"),c=(i("UbLU"),i("BH1t"));function d(t){return function(e){return e.value&&!e.value[t]?{valid:!0}:null}}var p=function(){function t(t,e,i,s,r,n,a){this.commonService=t,this.snackBar=e,this.router=i,this.route=s,this.printerService=r,this.dialog=n,this.datePipe=a,this.displayedColumns=["sno","productName","quantity","rate","tax","amount","action"],this.transaction_desc=[],this.discount_desc=[],this.sale_type=u.d,this.custFormMaxDate=new Date,this.payment_types=[],this.form=new o.h({productName:new o.f("",[o.t.required,d("prod_name")]),quantity:new o.f("",o.t.required)}),this.custForm=new o.h({customerName:new o.f("",[o.t.required,d("customerName")]),curDate:new o.f(new Date,o.t.required)})}return t.prototype.ngOnInit=function(){var t=this;this.loadProduct(),this.loadCustomers(),this.loadDiscounts(),this.default_payment_type=u.c,u.h.forEach(function(e){"CREDIT"!=e&&t.payment_types.push({key:e,value:e})}),this.onChanges(),this.custField.nativeElement.focus()},t.prototype.onChanges=function(){var t=this;this.custForm.get("customerName").valueChanges.subscribe(function(e){e.customerName&&t.payment_types.push({key:"CREDIT",value:"CREDIT"})})},t.prototype.loadDiscounts=function(){this.availableDiscounts=this.commonService.getDiscountList()},t.prototype.loadCustomers=function(){var t=this;this.commonService.getMethod(r.a.urls.getCustomer+"?isactive=yes").subscribe(function(e){t.customerList=e,t._callCustomerFilter()})},t.prototype.loadProduct=function(){var t=this;this.commonService.getMethod(r.a.urls.getProduct).subscribe(function(e){t.productList=e,t._callFilter()})},t.prototype.displayFn=function(t){return t?t.prod_name:void 0},t.prototype.loadCustomerRateType=function(t){var e=this;this.commonService.getMethod(r.a.urls.getRateTypeByCustomer+"/"+t._id).subscribe(function(t){e.sale_type_arr=t})},t.prototype.displayCustomerFn=function(t){return t?t.customerName:void 0},t.prototype._callCustomerFilter=function(){var t=this;this.customerFilteredOptions=this.custForm.get("customerName").valueChanges.pipe(Object(n.a)(""),Object(a.a)(function(e){return e&&e.length>=1?t._custFilter(e):[]}))},t.prototype._callFilter=function(){var t=this;this.filteredOptions=this.form.get("productName").valueChanges.pipe(Object(n.a)(""),Object(a.a)(function(e){return e&&e.length>=1?t._filter(e):[]}))},t.prototype._filter=function(t){var e="string"==typeof t?t.toLowerCase():"";return this.productList.filter(function(t){return t.prod_name.toLowerCase().includes(e)})},t.prototype._custFilter=function(t){var e="string"==typeof t?t.toLowerCase():"";return this.customerList.filter(function(t){return t.customerName.toLowerCase().includes(e)})},t.prototype.onSubmit=function(){if(console.log("submit"),"VALID"==this.form.status){var t=this.form.value.productName;if(this.sale_type_arr){var e=this.sale_type_arr.filter(function(e){return e.prod_id==t._id})[0];e&&(this.sale_type=e.type)}var i=this.commonService.getProductPrice(t._id,this.sale_type);if(null==i)return this.snackBar.open("Rate not found for this product!!","Notice",{duration:1e3}),!1;this.form.value.quantity+=this.transaction_desc.filter(function(e){return e.prod_id==t._id}).reduce(function(t,e){return t+e.prod_quan},0),this.transaction_desc=this.transaction_desc.filter(function(e){return e.prod_id!=t._id});var o=this._calculateDiscounts({form:this.form,cus_form:this.custForm,product:t,sale_type:this.sale_type});this.transaction_desc.push({rate_type:this.sale_type,prod_name:t.prod_name,prod_id:t._id,product_id:t.product_id,prod_quan:this.form.value.quantity,prod_rate_per_unit:i.price,tax:i.tax?i.tax:0,discount_id:o,prod_tax:i.tax?i.price*this.form.value.quantity*i.tax/100:0,sub_amount:i.price*this.form.value.quantity}),this.form.reset(),this.dataSource=new s.o(this.transaction_desc),this._callFilter(),this.prodField.nativeElement.focus()}},t.prototype._calculateDiscounts=function(t){var e=this,i=[],o=null,s=this.datePipe.transform(new Date,"yyyy-MM-dd"),r=this.datePipe.transform(this.custForm.value.curDate,"yyyy-MM-dd");s==r&&this.availableDiscounts||this.commonService.getSearchDiscountList(r).subscribe(function(t){e.availableDiscounts=t});var n=[];if((i=this.availableDiscounts)&&i.length>0&&(n=i.filter(function(e){return e.buy_prod_id==t.product._id&&t.form.value.quantity>=e.buy_count&&(e.applicable_customer.indexOf("all")>=0||e.applicable_customer.indexOf(t.cus_form.value.customerName._id))})),console.log(n),n.length>0)switch(n[0].discount_type){case"P2P":var a=0,u=0,c=t.form.value.quantity;if(n[0].applicable_type.indexOf(t.sale_type)>=0){o=n[0]._id,u=Math.floor(c/n[0].buy_count),a=u*n[0].free_count;var d=n[0].free_product[0],p=this.commonService.getProductPrice(d._id,t.sale_type);this.transaction_desc.push({rate_type:"Discount",prod_name:d.prod_name,prod_id:d._id,product_id:d.product_id,prod_quan:a,prod_rate_per_unit:p.price,discount_id:n[0]._id,tax:0,prod_tax:0,sub_amount:p.price*a});var l=this.discount_desc.filter(function(t){return t.discount_id==o});this.discount_desc.length>0&&l.length>0?this.discount_desc.map(function(t){t.discount_id==o&&(t.prod_count=a,t.total_amount=p.price*a)}):this.discount_desc.push({discount_id:n[0]._id,prod_id:d.product_id,prod_count:a,total_amount:p.price*a}),console.log(this.discount_desc)}}return o},t.prototype._remove=function(t,e){this.transaction_desc.splice(e,1),t.discount_id&&""!=t.discount_id&&(this.discount_desc=this.discount_desc.filter(function(e){return e.discount_id!=t.discount_id}),this.transaction_desc=this.transaction_desc.filter(function(e){return e.discount_id!=t.discount_id})),this.dataSource=new s.o(this.transaction_desc)},t.prototype.getTotalDiscount=function(){return this.discount_desc.map(function(t){return t.total_amount}).reduce(function(t,e){return t+e},0)},t.prototype.getTotalCost=function(){var t=this.getTotalDiscount();return this.transaction_desc.map(function(t){return t.sub_amount}).reduce(function(t,e){return t+e},0)+this.transaction_desc.map(function(t){return t.prod_tax}).reduce(function(t,e){return t+e},0)-t},t.prototype._saveOrder=function(t){var e=this,i={customer_id:this.custForm.value.customerName._id,sale_date:this.custForm.value.curDate,total_amount:this.getTotalCost(),payment_type:this.default_payment_type,details:this.transaction_desc,discounts:this.discount_desc};this.transaction_desc=[],this.discount_desc=[],this.dataSource=new s.o(this.transaction_desc),this.commonService.postMethod(r.a.urls.postSales,i).subscribe(function(i){200==i.code?(e.snackBar.open("Saved successfully!!","Success",{duration:500}),e.lastSales={saleid:i.data.sale_id,saleamount:i.data.total_amount},"print"==t&&(e.printerService.printData={redirectUrl:"/transactions",format:"invoice",data:[i.data.sale_id],type:"SALES",date:new Date},e.router.navigate(["/layout",{outlets:{printpage:"printview"}}],{skipLocationChange:!0}))):e.snackBar.open("Error!!","Error",{duration:600})},function(t){e.snackBar.open(t,"Error",{duration:600})}),this.form.reset(),this.custForm=new o.h({customerName:new o.f("",o.t.required),curDate:new o.f(new Date,o.t.required)}),this._callCustomerFilter(),this._callFilter()},t.prototype.openSalesModal=function(t){this.dialog.open(c.a,{width:"500px",data:{saleid:t}}).afterClosed().subscribe(function(t){})},t.prototype.resetForm=function(){this.form.reset(),this.transaction_desc=[],this.discount_desc=[],this.dataSource=new s.o(this.transaction_desc),this.default_payment_type=u.c,this.custForm.setValue({customerName:"",curDate:new Date})},t}()}}]);