(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{OlR4:function(l,n,u){"use strict";u.d(n,"a",function(){return c});var t=u("XlPw"),e=u("9Z1F"),o=u("AytR"),r=u("qfBg"),i=u("CcnG"),a=u("t/Na"),c=function(){function l(l,n){var u=this;this.http=l,this.userservice=n,console.log("service called"),this.getMethod(o.a.urls.getProduct).subscribe(function(l){u.products=l}),this.getMethod(o.a.urls.getRateList).subscribe(function(l){u.product_rate=l})}return l.prototype.getProductList=function(){return this.products},l.prototype.getProductPrice=function(l,n){var u=this.product_rate.filter(function(n){return n.product._id==l});return u.length>0?u[0].product.rate_active[n]:null},l.prototype.getMethod=function(l){return this.http.get(l)},l.prototype.postMethod=function(l,n){return n.createdBy=this.userservice.user._id,this.http.post(l,n).pipe(Object(e.a)(this.handleError))},l.prototype.putMethod=function(l,n){return n.updatedBy=this.userservice.user._id,this.http.put(l,n).pipe(Object(e.a)(this.handleError))},l.prototype.handleError=function(l){return l.error instanceof ErrorEvent?console.error("An error occurred:",l.error.message):console.error("Backend returned code "+l.status+", body was: "+l.error),Object(t.a)("Something bad happened; please try again later.")},l.ngInjectableDef=i.W({factory:function(){return new l(i.ab(a.c),i.ab(r.a))},token:l,providedIn:"root"}),l}()},UbLU:function(l,n,u){"use strict";u.d(n,"a",function(){return e});var t=u("CcnG"),e=function(){function l(){}return l.ngInjectableDef=t.W({factory:function(){return new l},token:l,providedIn:"root"}),l}()},qfBg:function(l,n,u){"use strict";u.d(n,"a",function(){return r});var t=u("AytR"),e=u("CcnG"),o=u("t/Na"),r=function(){function l(l){this.http=l,this.url=t.a.urls.getUser,console.log("user called");var n=localStorage.getItem("userdetails");this.user=JSON.parse(n)}return l.prototype.getMethod=function(){return this.http.get(this.url)},l.ngInjectableDef=e.W({factory:function(){return new l(e.ab(o.c))},token:l,providedIn:"root"}),l}()},wUSC:function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),e=function(){return function(){}}(),o=u("pMnS"),r=u("Ip0R"),i=u("OlR4"),a=u("AytR"),c=function(){function l(l,n){this.commonService=l,this.router=n}return l.prototype.ngOnInit=function(){this.loadInvoices()},l.prototype.loadInvoices=function(){var l=this;this.commonService.postMethod(a.a.urls.printInvoices,{invoices:this.data.data,type:this.data.type}).subscribe(function(n){console.log(n),200==n.code&&(l.invoiceData=n.data),setTimeout(function(){window.print(),l.router.navigate([l.data.redirectUrl,{outlets:{printpage:null}}],{skipLocationChange:!0})},1e3)})},l}(),s=u("ZYCi"),d=t.rb({encapsulation:0,styles:[[".invoice[_ngcontent-%COMP%]{page-break-after:always}.invoice[_ngcontent-%COMP%]:last-child{page-break-after:avoid}"]],data:{}});function b(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,16,"tr",[],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Lb(2,null,["",""])),(l()(),t.tb(3,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Lb(4,null,["",""])),(l()(),t.tb(5,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t.Lb(6,null,["",""])),t.Hb(7,2),(l()(),t.tb(8,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t.Lb(9,null,["",""])),t.Hb(10,2),(l()(),t.tb(11,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t.Lb(12,null,["",""])),t.Hb(13,2),(l()(),t.tb(14,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t.Lb(15,null,["",""])),t.Hb(16,2)],null,function(l,n){l(n,2,0,n.context.index+1),l(n,4,0,n.context.$implicit.product.prod_name);var u=t.Mb(n,6,0,l(n,7,0,t.Db(n.parent.parent,1),n.context.$implicit.prod_quan,"1.2-2"));l(n,6,0,u);var e=t.Mb(n,9,0,l(n,10,0,t.Db(n.parent.parent,2),n.context.$implicit.prod_rate_per_unit,"INR"));l(n,9,0,e);var o=t.Mb(n,12,0,l(n,13,0,t.Db(n.parent.parent,2),n.context.$implicit.prod_tax,"INR"));l(n,12,0,o);var r=t.Mb(n,15,0,l(n,16,0,t.Db(n.parent.parent,2),n.context.$implicit.sub_amount,"INR"));l(n,15,0,r)})}function p(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,47,"div",[["class","invoice"]],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,21,"table",[],null,null,null,null,null)),(l()(),t.tb(2,0,null,null,20,"tbody",[],null,null,null,null,null)),(l()(),t.tb(3,0,null,null,9,"tr",[],null,null,null,null,null)),(l()(),t.tb(4,0,null,null,3,"td",[],null,null,null,null,null)),(l()(),t.tb(5,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Bill No:"])),(l()(),t.Lb(7,null,[" ",""])),(l()(),t.tb(8,0,null,null,4,"td",[],null,null,null,null,null)),(l()(),t.tb(9,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Date:"])),(l()(),t.Lb(11,null,[" ",""])),t.Hb(12,3),(l()(),t.tb(13,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),t.tb(14,0,null,null,3,"td",[],null,null,null,null,null)),(l()(),t.tb(15,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["To:"])),(l()(),t.Lb(17,null,[" ",""])),(l()(),t.tb(18,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),t.tb(19,0,null,null,3,"td",[],null,null,null,null,null)),(l()(),t.tb(20,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Payment Type:"])),(l()(),t.Lb(-1,null,[" CASH"])),(l()(),t.tb(23,0,null,null,24,"table",[],null,null,null,null,null)),(l()(),t.tb(24,0,null,null,13,"thead",[],null,null,null,null,null)),(l()(),t.tb(25,0,null,null,12,"tr",[],null,null,null,null,null)),(l()(),t.tb(26,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Sno"])),(l()(),t.tb(28,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Description"])),(l()(),t.tb(30,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Quantity"])),(l()(),t.tb(32,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Rate"])),(l()(),t.tb(34,0,null,null,1,"th",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Tax"])),(l()(),t.tb(36,0,null,null,1,"th",[["scope","col"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Amount"])),(l()(),t.tb(38,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,b)),t.sb(40,278528,null,0,r.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null),(l()(),t.tb(41,0,null,null,6,"tfoot",[],null,null,null,null,null)),(l()(),t.tb(42,0,null,null,5,"tr",[],null,null,null,null,null)),(l()(),t.tb(43,0,null,null,1,"th",[["colspan","5"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Totals"])),(l()(),t.tb(45,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t.Lb(46,null,["",""])),t.Hb(47,2)],function(l,n){l(n,40,0,n.context.$implicit.details)},function(l,n){l(n,7,0,n.context.$implicit.sales.sale_id);var u=t.Mb(n,11,0,l(n,12,0,t.Db(n.parent,0),n.context.$implicit.sales.sale_date,"medium","IST"));l(n,11,0,u),l(n,17,0,n.context.$implicit.sales.customer?n.context.$implicit.sales.customer.customerName:"Counter");var e=t.Mb(n,46,0,l(n,47,0,t.Db(n.parent,2),n.context.$implicit.sales.total_amount,"INR"));l(n,46,0,e)})}function f(l){return t.Nb(0,[t.Fb(0,r.f,[t.w]),t.Fb(0,r.g,[t.w]),t.Fb(0,r.d,[t.w]),(l()(),t.kb(16777216,null,null,1,null,p)),t.sb(4,278528,null,0,r.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null)],function(l,n){l(n,4,0,n.component.invoiceData)},null)}var h=function(){function l(l,n){this.commonService=l,this.router=n,this.extraTH=["OLD","WEEK","TODAY","TOTAL","PAID"]}return l.prototype.ngOnInit=function(){this.products=this.commonService.getProductList(),this.reportDate=this.data.date,this.route=this.data.data.route,this.loadHeaders(),this.loadReport()},l.prototype.loadReport=function(){var l=this;switch(this.report=[],this.data.type){case"SALES":if(this.data.data.length>0)for(var n=function(l){var n=[],t=u.data.data;n.customername=t[l]._id.customer.customerName,u.products.forEach(function(u){var e=t[l].details.filter(function(l){return l.prod_id==u._id});n[u._id]=e.length>0?e[0].prod_quan:0}),u.report.push(n)},u=this,t=0;t<this.data.data.length;t++)n(t);break;case"LEADS":if(this.data.data.sales.length>0){var e=function(l){var n=[],u=o.data.data.sales;if(n.customername=u[l]._id.customer.customerName,o.products.forEach(function(t){var e=u[l].details.filter(function(l){return l.prod_id==t._id});n[t._id]=e.length>0?e[0].prod_quan:0}),o.data.data.account){var t=o.data.data.account.data,e=0,r=0,i=0;t.sales[u[l]._id.customer._id]&&(t.sales[u[l]._id.customer._id].old&&(e=t.sales[u[l]._id.customer._id].old),t.sales[u[l]._id.customer._id].week&&(r=t.sales[u[l]._id.customer._id].week),t.sales[u[l]._id.customer._id].today&&(i=t.sales[u[l]._id.customer._id].today));var a=0,c=0,s=0;t.payments[u[l]._id.customer._id]&&(t.payments[u[l]._id.customer._id].old&&(a=t.payments[u[l]._id.customer._id].old),t.payments[u[l]._id.customer._id].week&&(c=t.payments[u[l]._id.customer._id].week),t.payments[u[l]._id.customer._id].today&&(s=t.payments[u[l]._id.customer._id].today));var d=0;t.openings[u[l]._id.customer._id]&&(d=t.openings[u[l]._id.customer._id].opening),n.old=e+d-a,n.week=r-c,n.today=i-s}o.report.push(n)},o=this;for(t=0;t<this.data.data.sales.length;t++)e(t)}this.data.data.account&&(this.extraTD=this.data.data.account.data)}setTimeout(function(){window.print(),l.router.navigate([l.data.redirectUrl,{outlets:{printpage:null}}],{skipLocationChange:!0})},1e3)},l.prototype.loadHeaders=function(){var l={};this.products.forEach(function(n){l[n.category]||(l[n.category]={},l[n.category].count=0),l[n.category].count+=1,l[n.category][n.brand_name]||(l[n.category][n.brand_name]={},l[n.category][n.brand_name].count=0),l[n.category][n.brand_name].count+=1,l[n.category][n.brand_name][n.sub_category]||(l[n.category][n.brand_name][n.sub_category]=[]),l[n.category][n.brand_name][n.sub_category].push(n)}),console.log(l);var n=[],u=[],t=[],e=[];for(var o in l)for(var r in n.push({key:o,count:l[o].count}),l[o])if("count"!=r)for(var i in u.push({key:r,count:l[o][r].count}),l[o][r])"count"!=i&&(t.push({key:i,count:l[o][r][i].length}),e=e.concat(l[o][r][i]));this.thList=[n,u,t],this.reportProductList=e},l}(),m=t.rb({encapsulation:0,styles:[[".dotted[_ngcontent-%COMP%]{border:.02em dotted grey;text-align:center}table[_ngcontent-%COMP%]{border-collapse:collapse;font-family:monospace}.wid-name[_ngcontent-%COMP%]{width:200px!important}.wid-product[_ngcontent-%COMP%]{width:30px;font-size:x-small;font-weight:lighter}.wid-currency[_ngcontent-%COMP%]{width:60px}"]],data:{}});function g(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"th",[["class","dotted wid-name"]],[[1,"rowspan",0]],null,null,null,null)),(l()(),t.Lb(1,null,["Names ",""]))],null,function(l,n){var u=n.component;l(n,0,0,4),l(n,1,0,u.index)})}function y(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"th",[["class","dotted wid-product"]],[[1,"colspan",0]],null,null,null,null)),(l()(),t.Lb(1,null,["",""]))],null,function(l,n){l(n,0,0,n.context.$implicit.count),l(n,1,0,n.context.$implicit.key)})}function _(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,2,null,null,null,null,null,null,null)),(l()(),t.tb(1,0,null,null,1,"th",[["class","dotted wid-currency"]],[[1,"rowspan",0],[1,"colspan",0]],null,null,null,null)),(l()(),t.Lb(-1,null,["Payments"]))],null,function(l,n){l(n,1,0,3,n.component.extraTH.length)})}function v(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,6,"tr",[],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,g)),t.sb(2,16384,null,0,r.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null),(l()(),t.kb(16777216,null,null,1,null,y)),t.sb(4,278528,null,0,r.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null),(l()(),t.kb(16777216,null,null,1,null,_)),t.sb(6,16384,null,0,r.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null)],function(l,n){var u=n.component;l(n,2,0,0==n.context.index),l(n,4,0,n.context.$implicit),l(n,6,0,"LEADS"==u.data.type&&0==n.context.index)},null)}function L(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"th",[["class","dotted wid-product"]],null,null,null,null,null)),(l()(),t.Lb(1,null,["",""]))],null,function(l,n){l(n,1,0,n.context.$implicit.alias)})}function x(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"th",[["class","dotted wid-currency"]],null,null,null,null,null)),(l()(),t.Lb(1,null,["",""]))],null,function(l,n){l(n,1,0,n.context.$implicit)})}function w(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,2,null,null,null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,x)),t.sb(2,278528,null,0,r.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null),(l()(),t.kb(0,null,null,0))],function(l,n){l(n,2,0,n.component.extraTH)},null)}function O(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,2,null,null,null,null,null,null,null)),(l()(),t.tb(1,0,null,null,1,"td",[["class","dotted"]],null,null,null,null,null)),(l()(),t.Lb(2,null,["",""]))],null,function(l,n){l(n,2,0,0!=n.parent.context.$implicit[n.context.$implicit._id]?n.parent.context.$implicit[n.context.$implicit._id]:"")})}function P(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,13,null,null,null,null,null,null,null)),(l()(),t.tb(1,0,null,null,2,"td",[["class","dotted"]],null,null,null,null,null)),(l()(),t.Lb(2,null,["",""])),t.Hb(3,2),(l()(),t.tb(4,0,null,null,2,"td",[["class","dotted"]],null,null,null,null,null)),(l()(),t.Lb(5,null,["",""])),t.Hb(6,2),(l()(),t.tb(7,0,null,null,2,"td",[["class","dotted"]],null,null,null,null,null)),(l()(),t.Lb(8,null,["",""])),t.Hb(9,2),(l()(),t.tb(10,0,null,null,2,"td",[["class","dotted"]],null,null,null,null,null)),(l()(),t.Lb(11,null,["",""])),t.Hb(12,2),(l()(),t.tb(13,0,null,null,0,"td",[["class","dotted"]],null,null,null,null,null))],null,function(l,n){var u=t.Mb(n,2,0,l(n,3,0,t.Db(n.parent.parent,1),n.parent.context.$implicit.old,"0.2-2"));l(n,2,0,u);var e=t.Mb(n,5,0,l(n,6,0,t.Db(n.parent.parent,1),n.parent.context.$implicit.week,"0.2-2"));l(n,5,0,e);var o=t.Mb(n,8,0,l(n,9,0,t.Db(n.parent.parent,1),n.parent.context.$implicit.today,"0.2-2"));l(n,8,0,o);var r=t.Mb(n,11,0,l(n,12,0,t.Db(n.parent.parent,1),n.parent.context.$implicit.old+n.parent.context.$implicit.week+n.parent.context.$implicit.today,"0.2-2"));l(n,11,0,r)})}function k(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,6,"tr",[],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,1,"td",[["class","dotted"],["nowrap",""]],null,null,null,null,null)),(l()(),t.Lb(2,null,["",""])),(l()(),t.kb(16777216,null,null,1,null,O)),t.sb(4,278528,null,0,r.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null),(l()(),t.kb(16777216,null,null,1,null,P)),t.sb(6,16384,null,0,r.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null)],function(l,n){var u=n.component;l(n,4,0,u.reportProductList),l(n,6,0,"LEADS"==u.data.type)},function(l,n){l(n,2,0,n.context.$implicit.customername)})}function S(l){return t.Nb(0,[t.Fb(0,r.f,[t.w]),t.Fb(0,r.g,[t.w]),(l()(),t.tb(2,0,null,null,7,"table",[],null,null,null,null,null)),(l()(),t.tb(3,0,null,null,6,"tbody",[],null,null,null,null,null)),(l()(),t.tb(4,0,null,null,5,"tr",[],null,null,null,null,null)),(l()(),t.tb(5,0,null,null,1,"td",[],null,null,null,null,null)),(l()(),t.Lb(6,null,["Route: ",""])),(l()(),t.tb(7,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t.Lb(8,null,["Date: ",""])),t.Hb(9,2),(l()(),t.tb(10,0,null,null,11,"table",[["class","dotted"]],null,null,null,null,null)),(l()(),t.tb(11,0,null,null,7,"thead",[],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,v)),t.sb(13,278528,null,0,r.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null),(l()(),t.tb(14,0,null,null,4,"tr",[],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,L)),t.sb(16,278528,null,0,r.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null),(l()(),t.kb(16777216,null,null,1,null,w)),t.sb(18,16384,null,0,r.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null),(l()(),t.tb(19,0,null,null,2,"tbody",[],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,k)),t.sb(21,278528,null,0,r.n,[t.S,t.P,t.u],{ngForOf:[0,"ngForOf"]},null)],function(l,n){var u=n.component;l(n,13,0,u.thList),l(n,16,0,u.reportProductList),l(n,18,0,"LEADS"==u.data.type),l(n,21,0,u.report)},function(l,n){var u=n.component;l(n,6,0,u.route);var e=t.Mb(n,8,0,l(n,9,0,t.Db(n,0),u.reportDate,"mediumDate"));l(n,8,0,e)})}var M=u("UbLU"),D=function(){function l(l,n){this.printerService=l,this.router=n}return l.prototype.ngOnInit=function(){if(this.printerService.printData)switch(this.printerService.printData.format){case"invoice":this.formatType="invoice",this.printdata=this.printerService.printData;break;case"report":this.formatType="report",this.printdata=this.printerService.printData;break;default:console.log("default executed")}},l}(),N=t.rb({encapsulation:0,styles:[[".footer[_ngcontent-%COMP%], .footer-space[_ngcontent-%COMP%], .header[_ngcontent-%COMP%], .header-space[_ngcontent-%COMP%]{height:100px}.header[_ngcontent-%COMP%]{position:fixed;top:0}.footer[_ngcontent-%COMP%]{position:fixed;bottom:0}.center-align[_ngcontent-%COMP%]{display:flex;justify-content:center;text-align:center}@media screen{[_nghost-%COMP%]{display:none}}"]],data:{}});function I(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"app-invoice",[],null,null,null,f,d)),t.sb(1,114688,null,0,c,[i.a,s.l],{data:[0,"data"]},null)],function(l,n){l(n,1,0,n.component.printdata)},null)}function C(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"app-report",[],null,null,null,S,m)),t.sb(1,114688,null,0,h,[i.a,s.l],{data:[0,"data"]},null)],function(l,n){l(n,1,0,n.component.printdata)},null)}function $(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,29,"table",[],null,null,null,null,null)),(l()(),t.tb(1,0,null,null,15,"thead",[],null,null,null,null,null)),(l()(),t.tb(2,0,null,null,14,"tr",[],null,null,null,null,null)),(l()(),t.tb(3,0,null,null,13,"td",[],null,null,null,null,null)),(l()(),t.tb(4,0,null,null,12,"div",[["class","header-space center-align"]],null,null,null,null,null)),(l()(),t.tb(5,0,null,null,11,"p",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["M K DEEPAN MILK CENTER "])),(l()(),t.tb(7,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,[" #5/455, Pari Street, "])),(l()(),t.tb(9,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,[" Mugappair East, Ch - 600037. "])),(l()(),t.tb(11,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,[" Contact - 9941153153 "])),(l()(),t.tb(13,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t.tb(14,0,null,null,1,"b",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["GST NO."])),(l()(),t.Lb(-1,null,[" 33DFWEFDSALFH23"])),(l()(),t.tb(17,0,null,null,7,"tbody",[],null,null,null,null,null)),(l()(),t.tb(18,0,null,null,6,"tr",[],null,null,null,null,null)),(l()(),t.tb(19,0,null,null,5,"td",[],null,null,null,null,null)),(l()(),t.tb(20,0,null,null,4,"div",[["class","content"]],null,null,null,null,null)),(l()(),t.kb(16777216,null,null,1,null,I)),t.sb(22,16384,null,0,r.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null),(l()(),t.kb(16777216,null,null,1,null,C)),t.sb(24,16384,null,0,r.o,[t.S,t.P],{ngIf:[0,"ngIf"]},null),(l()(),t.tb(25,0,null,null,4,"tfoot",[],null,null,null,null,null)),(l()(),t.tb(26,0,null,null,3,"tr",[],null,null,null,null,null)),(l()(),t.tb(27,0,null,null,2,"td",[],null,null,null,null,null)),(l()(),t.tb(28,0,null,null,1,"div",[["class","footer-space"]],null,null,null,null,null)),(l()(),t.Lb(-1,null,["Goods once sold cannot be taken back!!"]))],function(l,n){var u=n.component;l(n,22,0,"invoice"==u.formatType),l(n,24,0,"report"==u.formatType)},null)}function F(l){return t.Nb(0,[(l()(),t.tb(0,0,null,null,1,"app-print-layout",[],null,null,null,$,N)),t.sb(1,114688,null,0,D,[M.a,s.l],null,null)],function(l,n){l(n,1,0)},null)}var E=t.pb("app-print-layout",D,F,{},{},[]),T=function(){return function(){}}();u.d(n,"PrintLayoutModuleNgFactory",function(){return H});var H=t.qb(e,[],function(l){return t.Ab([t.Bb(512,t.j,t.fb,[[8,[o.a,E]],[3,t.j],t.z]),t.Bb(4608,r.q,r.p,[t.w,[2,r.B]]),t.Bb(1073742336,r.c,r.c,[]),t.Bb(1073742336,s.o,s.o,[[2,s.u],[2,s.l]]),t.Bb(1073742336,T,T,[]),t.Bb(1073742336,e,e,[]),t.Bb(1024,s.j,function(){return[[{path:"",component:D}]]},[])])})}}]);