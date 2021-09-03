(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["print-layout-print-layout-module"],{

/***/ "./src/app/constants/contants.ts":
/*!***************************************!*\
  !*** ./src/app/constants/contants.ts ***!
  \***************************************/
/*! exports provided: CATEGORY, V_CATEGORY, SUBCATEGORY, BRANDS, MEASURE_UNIT, EXPENSE_TYPE, PAYMENT_TYPE, DEFAULT_RATE_TYPE, DEFAULT_PAYMENT_TYPE, RATE_TYPE, DISCOUNT_TYPE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CATEGORY", function() { return CATEGORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V_CATEGORY", function() { return V_CATEGORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SUBCATEGORY", function() { return SUBCATEGORY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BRANDS", function() { return BRANDS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MEASURE_UNIT", function() { return MEASURE_UNIT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXPENSE_TYPE", function() { return EXPENSE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAYMENT_TYPE", function() { return PAYMENT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_RATE_TYPE", function() { return DEFAULT_RATE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_PAYMENT_TYPE", function() { return DEFAULT_PAYMENT_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RATE_TYPE", function() { return RATE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DISCOUNT_TYPE", function() { return DISCOUNT_TYPE; });
var CATEGORY = ['Milk', 'Curd', 'Paneer', 'BM', 'Dairy', 'Drinks', 'Icecream'];
var V_CATEGORY = ['Milk', 'Curd', 'Paneer', 'BM']; //visible only in orders
var SUBCATEGORY = ['SM', 'FCM', 'TM', 'Cup', 'Pouch', 'Others', 'COW'];
var BRANDS = ['AROKYA', 'HATSUN'];
var MEASURE_UNIT = [{ 'key': 'KG', 'value': 'KILOGRAM' }, { 'key': 'ML', 'value': 'MILLILITRE' }];
var EXPENSE_TYPE = ['Fuel', 'Snacks', 'Stationery', 'Automobile', 'EB', 'Compensation', 'Others'];
var PAYMENT_TYPE = ['CASH', 'WALLET', 'CREDIT'];
var DEFAULT_RATE_TYPE = 'Retail';
var DEFAULT_PAYMENT_TYPE = 'CASH';
var RATE_TYPE = /** @class */ (function () {
    function RATE_TYPE() {
    }
    Object.defineProperty(RATE_TYPE, "rate_type", {
        get: function () {
            return ['Retail', 'Purchase', 'Wholesale', 'Silver', 'Gold', 'Diamond'];
        },
        enumerable: true,
        configurable: true
    });
    return RATE_TYPE;
}());

;
var DISCOUNT_TYPE = /** @class */ (function () {
    function DISCOUNT_TYPE() {
    }
    Object.defineProperty(DISCOUNT_TYPE, "discount_type", {
        get: function () {
            return ['Price', 'Percentage', 'P2P'];
            //P2P : Product to product
        },
        enumerable: true,
        configurable: true
    });
    return DISCOUNT_TYPE;
}());

;


/***/ }),

/***/ "./src/app/layout/print-layout/invoice/invoice.component.html":
/*!********************************************************************!*\
  !*** ./src/app/layout/print-layout/invoice/invoice.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"invoice\" *ngFor=\"let inv of invoiceData\">\n<table>\n    <tr>\n        <td><b>Bill No:</b> {{inv.sales.sale_id}}</td>\n        <td><b>Date:</b> {{inv.sales.sale_date | date:'medium':'IST'}}</td>\n    </tr>\n    <tr>\n        <td><b>To:</b> {{inv.sales.customer?inv.sales.customer.customerName:'Counter'}}</td>\n    </tr>\n    <tr>\n        <td><b>Payment Type:</b> CASH</td>\n    </tr>\n</table>\n<table>\n    <thead>\n        <tr>\n            <th>Sno</th>\n\t\t\t<th>Description</th>\n\t\t\t<th>Quantity</th>\n\t\t\t<th>Rate</th>\n\t\t\t<th>Tax</th>\n\t\t\t<th scope=\"col\">Amount</th>\n        </tr>\n    </thead>\n    <tbody>\n        <tr *ngFor=\"let desc of inv.details; let i = index\">\n\t\t\t<td>{{i+1}}</td>\n\t\t\t<td>{{desc.product.prod_name}}</td>\n\t\t\t<td>{{desc.prod_quan | number : '1.2-2'}}</td>\n\t\t\t<td>{{desc.prod_rate_per_unit|currency:'INR'}}</td>\n\t\t\t<td>{{desc.prod_tax|currency:'INR'}}</td>\n\t\t\t<td class=\"right-align\">{{desc.sub_amount|currency:'INR'}}</td>\n        </tr>\n        <tr>\n            <td colspan=\"5\" align=\"center\"><span class=\"span-text\">Discounts</span></td>\n            <td class=\"right-align\"><span class=\"span-text\">-{{getDiscountAmt(inv.sales.discount)|currency:'INR'}}</span></td>\n        </tr>\n    </tbody>\n    <tfoot>\n        <tr>\n            <th colspan=\"5\">Totals</th>\n            <td class=\"right-align\">{{inv.sales.total_amount|currency:'INR'}}</td>\n        </tr>\n    </tfoot>\n</table>\n</div>"

/***/ }),

/***/ "./src/app/layout/print-layout/invoice/invoice.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/layout/print-layout/invoice/invoice.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".invoice {\n  page-break-after: always; }\n\n.invoice:last-child {\n  page-break-after: avoid; }\n\n.span-text {\n  font-style: italic;\n  color: grey;\n  font-size: smaller; }\n\ntable tr.center-align {\n  text-align: center; }\n\ntable td.right-align {\n  text-align: right; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3ByaW50LWxheW91dC9pbnZvaWNlL0M6XFxsb2NhbGRpc2tcXG15d29ya1xcZHN1aXRlXFxjbGllbnQvc3JjXFxhcHBcXGxheW91dFxccHJpbnQtbGF5b3V0XFxpbnZvaWNlXFxpbnZvaWNlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQVcseUJBQXdCLEVBQUk7O0FBQ3ZDO0VBQXNCLHdCQUF1QixFQUFJOztBQUNqRDtFQUNJLG1CQUFrQjtFQUNsQixZQUFXO0VBQ1gsbUJBQWtCLEVBQ3JCOztBQUVEO0VBRVEsbUJBQWtCLEVBQ3JCOztBQUhMO0VBS1Esa0JBQWlCLEVBQ3BCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L3ByaW50LWxheW91dC9pbnZvaWNlL2ludm9pY2UuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaW52b2ljZSB7IHBhZ2UtYnJlYWstYWZ0ZXI6IGFsd2F5czsgfVxyXG4uaW52b2ljZTpsYXN0LWNoaWxkIHsgcGFnZS1icmVhay1hZnRlcjogYXZvaWQ7IH1cclxuLnNwYW4tdGV4dCB7XHJcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbiAgICBjb2xvcjogZ3JleTtcclxuICAgIGZvbnQtc2l6ZTogc21hbGxlcjtcclxufVxyXG5cclxudGFibGUge1xyXG4gICAgdHIuY2VudGVyLWFsaWduIHtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB9XHJcbiAgICB0ZC5yaWdodC1hbGlnbiB7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICB9XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/print-layout/invoice/invoice.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/layout/print-layout/invoice/invoice.component.ts ***!
  \******************************************************************/
/*! exports provided: InvoiceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InvoiceComponent", function() { return InvoiceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var InvoiceComponent = /** @class */ (function () {
    function InvoiceComponent(commonService, router) {
        this.commonService = commonService;
        this.router = router;
    }
    InvoiceComponent.prototype.ngOnInit = function () {
        this.loadInvoices();
    };
    InvoiceComponent.prototype.getDiscountAmt = function (row) {
        return row.reduce(function (acc, r) {
            return acc + r.total_amount;
        }, 0);
    };
    InvoiceComponent.prototype.loadInvoices = function () {
        var _this = this;
        var data = {
            invoices: this.data.data,
            type: this.data.type
        };
        this.commonService.postMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].urls.printInvoices, data).subscribe(function (data) {
            console.log(data);
            if (data.code == 200)
                _this.invoiceData = data.data;
            setTimeout(function () {
                window.print();
                _this.router.navigate([_this.data.redirectUrl, { outlets: { printpage: null } }], { skipLocationChange: true });
            }, 1000);
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], InvoiceComponent.prototype, "data", void 0);
    InvoiceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-invoice',
            template: __webpack_require__(/*! ./invoice.component.html */ "./src/app/layout/print-layout/invoice/invoice.component.html"),
            styles: [__webpack_require__(/*! ./invoice.component.scss */ "./src/app/layout/print-layout/invoice/invoice.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], InvoiceComponent);
    return InvoiceComponent;
}());



/***/ }),

/***/ "./src/app/layout/print-layout/print-layout-routing.module.ts":
/*!********************************************************************!*\
  !*** ./src/app/layout/print-layout/print-layout-routing.module.ts ***!
  \********************************************************************/
/*! exports provided: PrintLayoutRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrintLayoutRoutingModule", function() { return PrintLayoutRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _print_layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./print-layout.component */ "./src/app/layout/print-layout/print-layout.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    //{path:'',redirectTo:'printer'},
    {
        path: '',
        component: _print_layout_component__WEBPACK_IMPORTED_MODULE_2__["PrintLayoutComponent"]
    }
];
var PrintLayoutRoutingModule = /** @class */ (function () {
    function PrintLayoutRoutingModule() {
    }
    PrintLayoutRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], PrintLayoutRoutingModule);
    return PrintLayoutRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/print-layout/print-layout.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/layout/print-layout/print-layout.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<table>\n  <thead><tr><td>\n    <div class=\"header-space center-align\">\n      <p>M K DEEPAN MILK CENTER <br>\n      <!-- #5/455, Pari Street, <br>\n      Mugappair East, Ch - 600037. <br> -->\n      Contact - 9941153153 <br>\n      <!-- <b>GST NO.</b> 33DFWEFDSALFH23</p> -->\n    </div>\n  </td></tr></thead>\n  <tbody><tr><td>\n    <div class=\"content\">\n      <app-invoice *ngIf=\"formatType=='invoice'\" [data]=\"printdata\"></app-invoice>\n      <app-report *ngIf=\"formatType=='report'\" [data]=\"printdata\"></app-report>\n    </div>\n  </td></tr></tbody>\n  <tfoot><tr><td>\n    <div class=\"footer-space\">Goods once sold cannot be taken back!!</div>\n  </td></tr></tfoot>\n</table>\n\n<!-- <div class=\"header\">COOL HEADER</div>\n<div class=\"footer\">AWESOME FOOTER</div> -->"

/***/ }),

/***/ "./src/app/layout/print-layout/print-layout.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/layout/print-layout/print-layout.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".header {\n  position: fixed;\n  top: 0; }\n\n.footer {\n  position: fixed;\n  bottom: 0; }\n\n.center-align {\n  display: flex;\n  justify-content: center;\n  text-align: center; }\n\n@media screen {\n  :host {\n    display: none; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3ByaW50LWxheW91dC9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXHByaW50LWxheW91dFxccHJpbnQtbGF5b3V0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBO0VBQVUsZ0JBQWU7RUFBRSxPQUFNLEVBQUk7O0FBQ3JDO0VBQVUsZ0JBQWU7RUFBRSxVQUFTLEVBQUk7O0FBRXhDO0VBQ0ksY0FBYTtFQUNiLHdCQUF1QjtFQUN2QixtQkFBa0IsRUFDckI7O0FBQ0Q7RUFDRTtJQUNFLGNBQWEsRUFDZCxFQUFBIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L3ByaW50LWxheW91dC9wcmludC1sYXlvdXQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuaGVhZGVyLCAuaGVhZGVyLXNwYWNlLCAuZm9vdGVyLCAuZm9vdGVyLXNwYWNlIHsgXHJcbiAgLy9oZWlnaHQ6IDEwMHB4OyBcclxufVxyXG4uaGVhZGVyIHsgcG9zaXRpb246IGZpeGVkOyB0b3A6IDA7IH1cclxuLmZvb3RlciB7IHBvc2l0aW9uOiBmaXhlZDsgYm90dG9tOiAwOyB9XHJcblxyXG4uY2VudGVyLWFsaWduIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxufVxyXG5AbWVkaWEgc2NyZWVuIHtcclxuICA6aG9zdCB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG4gIH1cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/print-layout/print-layout.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/layout/print-layout/print-layout.component.ts ***!
  \***************************************************************/
/*! exports provided: PrintLayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrintLayoutComponent", function() { return PrintLayoutComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_printer_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/printer.service */ "./src/app/services/printer.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var PrintLayoutComponent = /** @class */ (function () {
    function PrintLayoutComponent(printerService, router) {
        this.printerService = printerService;
        this.router = router;
    }
    PrintLayoutComponent.prototype.ngOnInit = function () {
        if (this.printerService.printData) {
            switch (this.printerService.printData.format) {
                case 'invoice':
                    this.formatType = 'invoice';
                    this.printdata = this.printerService.printData;
                    break;
                case 'report':
                    this.formatType = 'report';
                    this.printdata = this.printerService.printData;
                    break;
                default:
                    console.log("default executed");
                    break;
            }
            //this.router.navigate(['/layout',{ outlets: { printpage: 'printview' }}],{ skipLocationChange: true });
            // switch(this.printerService.printData.format){
            //   case 'invoice':
            //     this.router.navigate(['/invoice']);
            //   default:
            //     return false;
            // }
        }
    };
    PrintLayoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-print-layout',
            template: __webpack_require__(/*! ./print-layout.component.html */ "./src/app/layout/print-layout/print-layout.component.html"),
            styles: [__webpack_require__(/*! ./print-layout.component.scss */ "./src/app/layout/print-layout/print-layout.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_printer_service__WEBPACK_IMPORTED_MODULE_1__["PrinterService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], PrintLayoutComponent);
    return PrintLayoutComponent;
}());



/***/ }),

/***/ "./src/app/layout/print-layout/print-layout.module.ts":
/*!************************************************************!*\
  !*** ./src/app/layout/print-layout/print-layout.module.ts ***!
  \************************************************************/
/*! exports provided: PrintLayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrintLayoutModule", function() { return PrintLayoutModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _print_layout_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./print-layout-routing.module */ "./src/app/layout/print-layout/print-layout-routing.module.ts");
/* harmony import */ var _invoice_invoice_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./invoice/invoice.component */ "./src/app/layout/print-layout/invoice/invoice.component.ts");
/* harmony import */ var _report_report_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./report/report.component */ "./src/app/layout/print-layout/report/report.component.ts");
/* harmony import */ var _print_layout_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./print-layout.component */ "./src/app/layout/print-layout/print-layout.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var PrintLayoutModule = /** @class */ (function () {
    function PrintLayoutModule() {
    }
    PrintLayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_invoice_invoice_component__WEBPACK_IMPORTED_MODULE_3__["InvoiceComponent"], _report_report_component__WEBPACK_IMPORTED_MODULE_4__["ReportComponent"], _print_layout_component__WEBPACK_IMPORTED_MODULE_5__["PrintLayoutComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _print_layout_routing_module__WEBPACK_IMPORTED_MODULE_2__["PrintLayoutRoutingModule"]
            ]
        })
    ], PrintLayoutModule);
    return PrintLayoutModule;
}());



/***/ }),

/***/ "./src/app/layout/print-layout/report/report.component.html":
/*!******************************************************************!*\
  !*** ./src/app/layout/print-layout/report/report.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<table>\r\n  <tr>\r\n    <td>Route: {{route}}</td>\r\n    <td>Date: {{reportDate | date:'mediumDate'}}</td>\r\n  </tr>\r\n</table>\r\n<table class=\"dotted\">  \r\n  <thead>\r\n    <tr *ngFor=\"let row of thList;let i=index\">\r\n      <th *ngIf=\"i==0\" [attr.rowspan]=\"4\" class=\"dotted wid-name\">Names {{index}}</th>      \r\n      <th *ngFor=\"let r of row\" class=\"dotted wid-product\" [attr.colspan]=\"r.count\">{{r.key}}</th>\r\n      <ng-container *ngIf=\"data.type=='LEADS' && i==0\">\r\n        <th [attr.rowspan]=\"3\" class=\"dotted wid-currency\" [attr.colspan]=\"extraTH.length\">Payments</th>\r\n      </ng-container>\r\n    </tr>\r\n    <tr>\r\n      <th *ngFor=\"let prod of reportProductList\" class=\"dotted wid-product\">{{prod.alias}}</th>\r\n      <ng-container *ngIf=\"data.type=='LEADS'\">\r\n        <th class=\"dotted wid-currency\" *ngFor=\"let th of extraTH\">{{th}}</th>\r\n      </ng-container>\r\n    </tr>\r\n    <!-- *ngFor=\"let cat of reportProductList | keyvalue; let i=index\"\r\n       <tr>\r\n      <th [attr.rowspan]=\"3\" class=\"dotted wid-name\">Names</th>\r\n      <ng-container *ngFor=\"let cat of reportProductList[0]\">\r\n        <th class=\"dotted wid-product\" [attr.colspan]=\"cat.count\">{{cat.category|slice:0:1}} - {{cat.brand|slice:0:1}}</th>\r\n      </ng-container>\r\n      <ng-container *ngIf=\"data.type=='LEADS'\">\r\n        <th [attr.rowspan]=\"2\" class=\"dotted wid-currency\" [attr.colspan]=\"extraTH.length\">Payments</th>\r\n      </ng-container>  \r\n    </tr> -->\r\n    <!-- <tr>\r\n      <ng-container *ngFor=\"let cat of reportProductList[1] | keyvalue\">\r\n        <th class=\"dotted wid-product\" [attr.colspan]=\"cat.value.count\" >{{cat.key}}</th>\r\n      </ng-container>  \r\n    </tr>\r\n    <tr>\r\n      <ng-container *ngFor=\"let cat of reportProductList[2]\">\r\n        <th class=\"dotted wid-product\" >{{cat.alias}}</th>\r\n      </ng-container>\r\n      <ng-container *ngIf=\"data.type=='LEADS'\">\r\n        <th class=\"dotted wid-currency\" *ngFor=\"let th of extraTH\">{{th}}</th>\r\n      </ng-container>  \r\n    </tr>   -->\r\n  </thead>  \r\n  <tbody>\r\n    <tr *ngFor=\"let cust of report\">\r\n      <td nowrap class=\"dotted\">{{cust.customername}}</td>\r\n      <ng-container *ngFor=\"let cat of reportProductList\">\r\n        <td class=\"dotted\" >{{(cust[cat._id] != 0)?cust[cat._id]:''}}</td>\r\n      </ng-container>   \r\n      <ng-container *ngIf=\"data.type=='LEADS'\">\r\n        <td class=\"dotted\">{{cust.old | number:'0.2-2'}}</td>\r\n        <td class=\"dotted\">{{cust.week | number:'0.2-2'}}</td>\r\n        <td class=\"dotted\">{{cust.today | number:'0.2-2'}}</td>      \r\n        <td class=\"dotted\">{{cust.old+cust.week+cust.today | number:'0.2-2'}}</td>\r\n        <td class=\"dotted\"></td>\r\n      </ng-container>   \r\n    </tr>\r\n  </tbody>\r\n</table>"

/***/ }),

/***/ "./src/app/layout/print-layout/report/report.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/layout/print-layout/report/report.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dotted {\n  border: dotted 0.02em grey;\n  text-align: center; }\n\ntable {\n  border-collapse: collapse;\n  /*This property collapses borders together*/ }\n\n.wid-name {\n  width: 200px !important; }\n\n.wid-product {\n  width: 30px;\n  font-size: x-small;\n  font-weight: lighter; }\n\n.wid-currency {\n  width: 60px; }\n\ntable {\n  font-family: monospace; }\n\n.dotted tbody tr:nth-child(even) {\n  background-color: #f2f2f2 !important; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3ByaW50LWxheW91dC9yZXBvcnQvQzpcXGxvY2FsZGlza1xcbXl3b3JrXFxkc3VpdGVcXGNsaWVudC9zcmNcXGFwcFxcbGF5b3V0XFxwcmludC1sYXlvdXRcXHJlcG9ydFxccmVwb3J0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksMkJBQTBCO0VBQzFCLG1CQUFrQixFQUNyQjs7QUFDRDtFQUNJLDBCQUF3QjtFQUFDLDRDQUE0QyxFQUN4RTs7QUFFRDtFQUNJLHdCQUF1QixFQUkxQjs7QUFFRDtFQUNJLFlBQVc7RUFDWCxtQkFBa0I7RUFDbEIscUJBQW9CLEVBQ3ZCOztBQUVEO0VBQ0ksWUFBVyxFQUNkOztBQUVEO0VBQ0ksdUJBQXNCLEVBQ3pCOztBQUVEO0VBQ0kscUNBQW1DLEVBQ3RDIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L3ByaW50LWxheW91dC9yZXBvcnQvcmVwb3J0LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmRvdHRlZHtcclxuICAgIGJvcmRlcjogZG90dGVkIDAuMDJlbSBncmV5O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbnRhYmxle1xyXG4gICAgYm9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlOy8qVGhpcyBwcm9wZXJ0eSBjb2xsYXBzZXMgYm9yZGVycyB0b2dldGhlciovXHJcbn1cclxuXHJcbi53aWQtbmFtZXtcclxuICAgIHdpZHRoOiAyMDBweCAhaW1wb3J0YW50O1xyXG4gICAgLy8gd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAgIC8vIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICAvLyB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxufVxyXG5cclxuLndpZC1wcm9kdWN0e1xyXG4gICAgd2lkdGg6IDMwcHg7XHJcbiAgICBmb250LXNpemU6IHgtc21hbGw7XHJcbiAgICBmb250LXdlaWdodDogbGlnaHRlcjtcclxufVxyXG5cclxuLndpZC1jdXJyZW5jeXtcclxuICAgIHdpZHRoOiA2MHB4O1xyXG59XHJcblxyXG50YWJsZSB7XHJcbiAgICBmb250LWZhbWlseTogbW9ub3NwYWNlOyAgICBcclxufVxyXG5cclxuLmRvdHRlZCB0Ym9keSB0cjpudGgtY2hpbGQoZXZlbil7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiNmMmYyZjIgIWltcG9ydGFudDtcclxufVxyXG5cclxuLy90cjpudGgtY2hpbGQoZXZlbikge2JhY2tncm91bmQtY29sb3I6ICNmMmYyZjI7fSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/print-layout/report/report.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/layout/print-layout/report/report.component.ts ***!
  \****************************************************************/
/*! exports provided: ReportComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportComponent", function() { return ReportComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_constants_contants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/constants/contants */ "./src/app/constants/contants.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ReportComponent = /** @class */ (function () {
    function ReportComponent(commonService, router) {
        this.commonService = commonService;
        this.router = router;
        this.extraTH = ['OLD', 'WEEK', 'TODAY', 'TOTAL', 'PAID'];
    }
    ReportComponent.prototype.ngOnInit = function () {
        console.log(this.data);
        this.products = this.commonService.getProductList().filter(function (p) { return p.leads_view == 'YES'; });
        this.reportDate = this.data.date;
        this.route = this.data.data.route;
        this.loadHeaders();
        this.loadReport();
    };
    ReportComponent.prototype.loadReport = function () {
        var _this = this;
        this.report = [];
        switch (this.data.type) {
            case 'SALES':
                if (this.data.data.length > 0) {
                    var _loop_1 = function (i) {
                        var det = [];
                        var rawdata = this_1.data.data;
                        det['customername'] = rawdata[i]._id.customer.customerName;
                        this_1.products.forEach(function (obj) {
                            var quantity = rawdata[i].details.filter(function (orders) { return orders.prod_id == obj._id; }).reduce(function (acc, val) { return acc + val.prod_quan; }, 0);
                            det[obj._id] = quantity > 0 ? quantity : 0;
                        });
                        this_1.report.push(det);
                    };
                    var this_1 = this;
                    for (var i = 0; i < this.data.data.length; i++) {
                        _loop_1(i);
                    }
                }
                break;
            case 'LEADS':
                if (this.data.data.sales.length > 0) {
                    var _loop_2 = function (i) {
                        var det = [];
                        var rawdata = this_2.data.data.sales;
                        det['customername'] = rawdata[i]._id.customer.customerName;
                        this_2.products.forEach(function (obj) {
                            var quantity = rawdata[i].details.filter(function (orders) { return orders.prod_id == obj._id; }).reduce(function (acc, val) { return acc + val.prod_quan; }, 0);
                            det[obj._id] = quantity > 0 ? quantity : 0;
                        });
                        if (this_2.data.data.account) {
                            var cr_dt = this_2.data.data.account.data;
                            var s_old = 0, s_week = 0, s_today = 0;
                            if (cr_dt.sales[rawdata[i]._id.customer._id]) {
                                if (cr_dt.sales[rawdata[i]._id.customer._id]['old'])
                                    s_old = cr_dt.sales[rawdata[i]._id.customer._id]['old'];
                                if (cr_dt.sales[rawdata[i]._id.customer._id]['week'])
                                    s_week = cr_dt.sales[rawdata[i]._id.customer._id]['week'];
                                if (cr_dt.sales[rawdata[i]._id.customer._id]['today'])
                                    s_today = cr_dt.sales[rawdata[i]._id.customer._id]['today'];
                            }
                            var p_old = 0, p_week = 0, p_today = 0;
                            if (cr_dt.payments[rawdata[i]._id.customer._id]) {
                                if (cr_dt.payments[rawdata[i]._id.customer._id]['old'])
                                    p_old = cr_dt.payments[rawdata[i]._id.customer._id]['old'];
                                if (cr_dt.payments[rawdata[i]._id.customer._id]['week'])
                                    p_week = cr_dt.payments[rawdata[i]._id.customer._id]['week'];
                                if (cr_dt.payments[rawdata[i]._id.customer._id]['today'])
                                    p_today = cr_dt.payments[rawdata[i]._id.customer._id]['today'];
                            }
                            var openings = 0;
                            if (cr_dt.openings[rawdata[i]._id.customer._id]) {
                                openings = cr_dt.openings[rawdata[i]._id.customer._id]['opening'];
                            }
                            det['old'] = (s_old + openings) - p_old;
                            det['week'] = s_week - p_week;
                            det['today'] = s_today - p_today;
                        }
                        this_2.report.push(det);
                    };
                    var this_2 = this;
                    for (var i = 0; i < this.data.data.sales.length; i++) {
                        _loop_2(i);
                    }
                }
                if (this.data.data.account) {
                    this.extraTD = this.data.data.account.data;
                }
                break;
        }
        setTimeout(function () {
            window.print();
            _this.router.navigate([_this.data.redirectUrl, { outlets: { printpage: null } }], { skipLocationChange: true });
        }, 1000);
    };
    ReportComponent.prototype.loadHeaders = function () {
        var products = {};
        //var cat2show = V_CATEGORY;
        this.products.forEach(function (obj) {
            if (src_app_constants_contants__WEBPACK_IMPORTED_MODULE_3__["V_CATEGORY"].indexOf(obj.category) > -1) { //condition to check only products shown in prodtable
                if (!products[obj.category]) {
                    products[obj.category] = {};
                    products[obj.category]['count'] = 0;
                }
                products[obj.category]['count'] += 1;
                if (!products[obj.category][obj.brand_name]) {
                    products[obj.category][obj.brand_name] = {};
                    products[obj.category][obj.brand_name]['count'] = 0;
                }
                products[obj.category][obj.brand_name]['count'] += 1;
                if (!products[obj.category][obj.brand_name][obj.sub_category]) {
                    products[obj.category][obj.brand_name][obj.sub_category] = [];
                    //products[obj.category][obj.brand_name][obj.sub_category]['count'] = 0;
                }
                //products[obj.category][obj.brand_name][obj.sub_category]['count'] += 1;
                products[obj.category][obj.brand_name][obj.sub_category].push(obj);
            }
        });
        //console.log(products);        
        var row1 = [], row2 = [], row3 = [], _products = [];
        for (var cat in products) {
            row1.push({
                'key': cat,
                'count': products[cat].count
            });
            for (var b in products[cat]) {
                if (b == 'count')
                    continue;
                row2.push({
                    'key': b,
                    'count': products[cat][b].count
                });
                for (var sub in products[cat][b]) {
                    if (sub == 'count')
                        continue;
                    row3.push({
                        'key': sub,
                        'count': products[cat][b][sub].length
                    });
                    _products = _products.concat(products[cat][b][sub]);
                }
            }
        }
        this.thList = [row1, row2, row3];
        this.reportProductList = _products;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], ReportComponent.prototype, "data", void 0);
    ReportComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-report',
            template: __webpack_require__(/*! ./report.component.html */ "./src/app/layout/print-layout/report/report.component.html"),
            styles: [__webpack_require__(/*! ./report.component.scss */ "./src/app/layout/print-layout/report/report.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], ReportComponent);
    return ReportComponent;
}());



/***/ }),

/***/ "./src/app/services/common.service.ts":
/*!********************************************!*\
  !*** ./src/app/services/common.service.ts ***!
  \********************************************/
/*! exports provided: CommonService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonService", function() { return CommonService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _loader_loader_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../loader/loader.service */ "./src/app/loader/loader.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var CommonService = /** @class */ (function () {
    function CommonService(http, userservice, datePipe) {
        var _this = this;
        this.http = http;
        this.userservice = userservice;
        this.datePipe = datePipe;
        console.log("service called");
        console.log(this.userservice);
        //this.user = this.getMethod(environment.urls.getUser);
        //fetch product details
        this.getMethod(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getProduct).subscribe(function (data) {
            _this.products = data;
        });
        // fetch rate 
        // this.getMethod(environment.urls.getRate).subscribe((data:Rate[]) => {
        //   this.product_rate = data;
        // });
        this.getMethod(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getRateList).subscribe(function (data) {
            _this.product_rate = data;
        });
        //fetch customers
        this.getMethod(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getCustomer).subscribe(function (data) {
            _this.customers = data;
        });
        //fetch discounts available now
        var cur_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        var q = "?isactive=YES&cur_date=" + cur_date;
        this.getMethod(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.discountList + q).subscribe(function (data) {
            console.log(data);
            _this.discounts = data;
        });
    }
    CommonService.prototype.getProductList = function () {
        return this.products;
    };
    CommonService.prototype.getCustomerList = function () {
        return this.customers;
    };
    CommonService.prototype.getDiscountList = function () {
        return this.discounts;
    };
    CommonService.prototype.getSearchDiscountList = function (date) {
        var q = "?isactive=YES&cur_date=" + date;
        return this.getMethod(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.discountList + q);
    };
    CommonService.prototype.getProductPrice = function (prod_id, type) {
        var product = this.product_rate.filter(function (key) { return key.product._id == prod_id; });
        //console.log(product);
        return product.length > 0 ? product[0]['product']['rate_active'][type] : null;
    };
    CommonService.prototype.getMethod = function (url) {
        //let header = new HttpHeaders({ "Authorization": "Bearer oooooososoos"});
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    CommonService.prototype.postMethod = function (url, data) {
        data['createdBy'] = this.userservice.user._id;
        //let header = new HttpHeaders({ "Authorization": "Bearer oooooososoos"});
        return this.http.post(url, data).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    CommonService.prototype.putMethod = function (url, data) {
        data['updatedBy'] = this.userservice.user._id;
        //let header = new HttpHeaders({ "Authorization": "Bearer oooooososoos"});
        return this.http.put(url, data).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
    };
    CommonService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error("Backend returned code " + error.status + ", " +
                ("body was: " + error.error));
        }
        // return an observable with a user-facing error message
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])('Something bad happened; please try again later..');
    };
    ;
    __decorate([
        Object(_loader_loader_service__WEBPACK_IMPORTED_MODULE_7__["LoaderEnabled"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], CommonService.prototype, "getMethod", null);
    __decorate([
        Object(_loader_loader_service__WEBPACK_IMPORTED_MODULE_7__["LoaderEnabled"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], CommonService.prototype, "postMethod", null);
    __decorate([
        Object(_loader_loader_service__WEBPACK_IMPORTED_MODULE_7__["LoaderEnabled"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, Object]),
        __metadata("design:returntype", void 0)
    ], CommonService.prototype, "putMethod", null);
    CommonService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"], _user_service__WEBPACK_IMPORTED_MODULE_5__["UserService"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"]])
    ], CommonService);
    return CommonService;
}());



/***/ }),

/***/ "./src/app/services/printer.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/printer.service.ts ***!
  \*********************************************/
/*! exports provided: PrinterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PrinterService", function() { return PrinterService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PrinterService = /** @class */ (function () {
    function PrinterService() {
    }
    PrinterService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], PrinterService);
    return PrinterService;
}());



/***/ })

}]);
//# sourceMappingURL=print-layout-print-layout-module.js.map