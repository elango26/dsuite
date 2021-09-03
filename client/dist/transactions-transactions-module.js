(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["transactions-transactions-module"],{

/***/ "./src/app/layout/transactions/damages/damages.component.html":
/*!********************************************************************!*\
  !*** ./src/app/layout/transactions/damages/damages.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-header>\r\n      <mat-card-title class=\"invoice-title\">Returns / Spoilages</mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content>      \r\n        <form [formGroup]=\"custForm\" >\r\n          <section class=\"example-section\">\r\n              <mat-form-field class=\"example-margin customer-col\">\r\n                  <input type=\"text\" autofocus placeholder=\"Customer Name\" aria-label=\"Number\" matInput formControlName=\"customerName\" [matAutocomplete]=\"customer\">\r\n                  <mat-autocomplete autoActiveFirstOption (optionSelected)='loadCustomerRateType($event.option.value)' #customer=\"matAutocomplete\" [displayWith]=\"displayCustomerFn\">\r\n                    <mat-option *ngFor=\"let customer of customerFilteredOptions | async\"  [value]=\"customer\">\r\n                      {{customer.customerName}}-{{customer.routes.areaName}}-{{customer.customer_id|slice:-3}}\r\n                    </mat-option>\r\n                  </mat-autocomplete>\r\n              </mat-form-field>\r\n              <mat-form-field class=\"example-margin date-col\">\r\n                <input matInput disabled [max]=\"custFormMaxDate\" [matDatepicker]=\"picker\" placeholder=\"Choose a date\" formControlName=\"curDate\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n                <mat-datepicker disabled=\"false\" #picker></mat-datepicker>\r\n              </mat-form-field>\r\n          </section>\r\n        </form>    \r\n    </mat-card-content>\r\n<mat-card class=\"desc-bg\">\r\n  <mat-card-content>\r\n    <form [formGroup]=\"form\" (keyup.enter)=\"onSubmit()\">\r\n      <section class=\"example-section\">\r\n          <mat-form-field class=\"example-margin prod-col\">\r\n              <input type=\"text\" #productName placeholder=\"Product Name / Code\" aria-label=\"Number\" matInput formControlName=\"productName\" [matAutocomplete]=\"auto\">\r\n              <mat-autocomplete autoActiveFirstOption #auto=\"matAutocomplete\" [displayWith]=\"displayFn\">\r\n                <mat-option *ngFor=\"let option of filteredOptions | async\"  [value]=\"option\">\r\n                  {{option.prod_name}}\r\n                </mat-option>\r\n              </mat-autocomplete>\r\n          </mat-form-field>\r\n          <mat-form-field class=\"example-margin quantity-col\">\r\n            <input matInput formControlName=\"quantity\" placeholder=\"Quantity\" type=\"number\">\r\n          </mat-form-field>\r\n      </section>\r\n    </form>\r\n  </mat-card-content>\r\n\r\n  <div class=\"mat-elevation-z8\">\r\n  <table mat-table [dataSource]=\"dataSource\">\r\n\r\n      <ng-container matColumnDef=\"sno\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> S No </th>\r\n          <td mat-cell *matCellDef=\"let row;let i = index;\" > {{i+1}} </td>\r\n          <!-- <td mat-footer-cell *matFooterCellDef>  </td> -->\r\n      </ng-container>\r\n\r\n      <!-- Progress Column -->\r\n      <ng-container matColumnDef=\"productName\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Product Name </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.prod_name}} </td>\r\n          <!-- <td mat-footer-cell *matFooterCellDef>  </td> -->\r\n      </ng-container>\r\n\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"quantity\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Quantity</th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.prod_quan | number : '1.2-2'}} </td>\r\n            <!-- <td mat-footer-cell *matFooterCellDef>  </td> -->\r\n        </ng-container>\r\n\r\n        <!-- Name Column -->\r\n      <ng-container matColumnDef=\"rate\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Rate </th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.prod_rate_per_unit|currency:'INR'}} </td>\r\n            <!-- <td mat-footer-cell *matFooterCellDef> Total </td> -->\r\n        </ng-container>\r\n\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"tax\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Tax </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.prod_tax|currency:'INR'}}@{{row.tax|number : '1.2-2'}}%</td>\r\n          <!-- <td mat-footer-cell *matFooterCellDef>  </td> -->\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"amount\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Amount </th>\r\n        <td mat-cell *matCellDef=\"let row\"> {{row.sub_amount|currency:'INR'}}</td>\r\n        <!-- <td mat-footer-cell *matFooterCellDef> {{getTotalCost()|currency:'INR'}} </td> -->\r\n      </ng-container>   \r\n      <ng-container matColumnDef=\"is_delivered\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Is Delivered </th>\r\n        <td mat-cell *matCellDef=\"let row; let n = index\">\r\n          <!-- <span (click)=\"_remove(n)\"><i class=\"material-icons\">\r\n            delete_forever\r\n            </i></span> -->\r\n            <mat-checkbox [(ngModel)]=\"row.is_delivered\"></mat-checkbox>\r\n        </td>\r\n        <!-- <td mat-footer-cell *matFooterCellDef>  </td> -->\r\n      </ng-container> \r\n      <ng-container matColumnDef=\"action\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Action </th>\r\n        <td mat-cell *matCellDef=\"let row; let n = index\">\r\n          <span (click)=\"_remove(n)\"><i class=\"material-icons\">\r\n            delete_forever\r\n            </i></span>\r\n        </td>\r\n        <!-- <td mat-footer-cell *matFooterCellDef>  </td> -->\r\n      </ng-container> \r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns;\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n      <!-- <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr> -->\r\n  </table>\r\n  <ng-container *ngIf=\"!dataSource || transaction_desc.length === 0\">\r\n      <mat-card class=\"norecords\">Please add products !!</mat-card>\r\n  </ng-container>\r\n  </div>\r\n  </mat-card>\r\n  <br>\r\n  <div class=\"pull-right\">\r\n    <button mat-raised-button color=\"primary\" [disabled]=\"!dataSource || transaction_desc.length === 0\" (click)=\"_saveOrder('print')\">Print</button>\r\n    <button mat-raised-button color=\"primary\" [disabled]=\"!dataSource || transaction_desc.length === 0\" (click)=\"_saveOrder('save')\">Save</button>\r\n  </div>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/layout/transactions/damages/damages.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/layout/transactions/damages/damages.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.prod-col {\n  width: 70%; }\n\n.quantity-col {\n  width: 30%; }\n\n.customer-col {\n  width: 70%;\n  font-size: 1.34em; }\n\n.date-col {\n  width: 30%;\n  font-size: 1.34em; }\n\n.example-margin {\n  margin: 10px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n.norecords {\n  text-align: center;\n  font: menu; }\n\n.desc-bg {\n  background-color: rgba(221, 60, 60, 0.349); }\n\n.invoice-title {\n  font-weight: bold;\n  font-size: 2em;\n  padding-bottom: 1em; }\n\n.pull-right {\n  display: block;\n  text-align: right; }\n\n.pull-right button {\n    margin-left: 0.23em; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RyYW5zYWN0aW9ucy9kYW1hZ2VzL0M6XFxsb2NhbGRpc2tcXG15d29ya1xcZHN1aXRlXFxjbGllbnQvc3JjXFxhcHBcXGxheW91dFxcdHJhbnNhY3Rpb25zXFxkYW1hZ2VzXFxkYW1hZ2VzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBVyxFQUNkOztBQUVEO0VBQ0ksZ0JBQWU7RUFDZixZQUFXLEVBQ2Q7O0FBR0Q7RUFDSSxjQUFhO0VBQ2Isc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxXQUFVO0VBQ1Ysa0JBQWlCLEVBRXBCOztBQUNEO0VBQ0ksV0FBVTtFQUNWLGtCQUFpQixFQUVwQjs7QUFDRDtFQUNJLGFBQVksRUFDZjs7QUFFRDtFQUNJLGlCQUFnQixFQUNuQjs7QUFFRDtFQUNJLG1CQUFrQjtFQUNsQixXQUFVLEVBQ2I7O0FBRUQ7RUFDSSwyQ0FBMEMsRUFDN0M7O0FBRUQ7RUFDSSxrQkFBaUI7RUFDakIsZUFBYztFQUNkLG9CQUFtQixFQUN0Qjs7QUFFRDtFQUNJLGVBQWE7RUFDYixrQkFBaUIsRUFJcEI7O0FBTkQ7SUFJUSxvQkFBbUIsRUFDdEIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvdHJhbnNhY3Rpb25zL2RhbWFnZXMvZGFtYWdlcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ubWF0LWZvcm0tZmllbGQge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcblxyXG4uZXhhbXBsZS1zZWN0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiA2MHB4O1xyXG59XHJcblxyXG4ucHJvZC1jb2x7XHJcbiAgICB3aWR0aDogNzAlO1xyXG59XHJcblxyXG4ucXVhbnRpdHktY29se1xyXG4gICAgd2lkdGg6IDMwJTtcclxufVxyXG5cclxuLmN1c3RvbWVyLWNvbHtcclxuICAgIHdpZHRoOiA3MCU7XHJcbiAgICBmb250LXNpemU6IDEuMzRlbTtcclxuICAgIFxyXG59XHJcbi5kYXRlLWNvbHtcclxuICAgIHdpZHRoOiAzMCU7XHJcbiAgICBmb250LXNpemU6IDEuMzRlbTtcclxuICAgIFxyXG59XHJcbi5leGFtcGxlLW1hcmdpbiB7XHJcbiAgICBtYXJnaW46IDEwcHg7XHJcbn1cclxuXHJcbi5jbGVhcnBpeCB7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcblxyXG4ubm9yZWNvcmRze1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udDogbWVudTtcclxufVxyXG5cclxuLmRlc2MtYmd7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDIyMSwgNjAsIDYwLCAwLjM0OSk7XHJcbn1cclxuXHJcbi5pbnZvaWNlLXRpdGxle1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBmb250LXNpemU6IDJlbTtcclxuICAgIHBhZGRpbmctYm90dG9tOiAxZW07XHJcbn1cclxuXHJcbi5wdWxsLXJpZ2h0e1xyXG4gICAgZGlzcGxheTpibG9jaztcclxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgYnV0dG9ue1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwLjIzZW07XHJcbiAgICB9XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/transactions/damages/damages.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/layout/transactions/damages/damages.component.ts ***!
  \******************************************************************/
/*! exports provided: objValidator, DamagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objValidator", function() { return objValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DamagesComponent", function() { return DamagesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import { CATEGORY, SUBCATEGORY, BRANDS } from '../../../constants/contants';
function objValidator(obj) {
    return function (control) {
        if (control.value && !control.value[obj]) {
            return { 'valid': true };
        }
        return null;
    };
}
var DamagesComponent = /** @class */ (function () {
    function DamagesComponent(commonService, snackBar) {
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.displayedColumns = ['sno', 'productName', 'quantity', 'is_delivered', 'action'];
        this.transaction_desc = [];
        this.sale_type = "Retail";
        this.custFormMaxDate = new Date();
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'productName': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, objValidator('prod_name')]),
            'quantity': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required])
        });
        this.custForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'customerName': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, objValidator('customerName')]),
            'curDate': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](new Date(), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required)
        });
    }
    DamagesComponent.prototype.ngOnInit = function () {
        // this.productList = this.commonService.products;
        // this._callFilter();  
        this.loadProduct();
        this.loadCustomers();
    };
    DamagesComponent.prototype.loadCustomers = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getCustomer).subscribe(function (data) {
            _this.customerList = data;
            _this._callCustomerFilter();
        });
    };
    DamagesComponent.prototype.loadProduct = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getProduct).subscribe(function (data) {
            _this.productList = data;
            _this._callFilter();
        });
    };
    DamagesComponent.prototype.displayFn = function (prod) {
        return prod ? prod.prod_name : undefined;
    };
    DamagesComponent.prototype.displayCustomerFn = function (cust) {
        return cust ? cust.customerName : undefined;
    };
    DamagesComponent.prototype._callCustomerFilter = function () {
        var _this = this;
        this.customerFilteredOptions = this.custForm.get("customerName").valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return (value && value.length >= 1) ? _this._custFilter(value) : []; }));
    };
    DamagesComponent.prototype._callFilter = function () {
        var _this = this;
        this.filteredOptions = this.form.get("productName").valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return (value && value.length >= 1) ? _this._filter(value) : []; }));
    };
    DamagesComponent.prototype._filter = function (value) {
        var filterValue = (typeof value == 'string') ? value.toLowerCase() : "";
        return this.productList.filter(function (option) { return option.prod_name.toLowerCase().includes(filterValue); });
    };
    DamagesComponent.prototype._custFilter = function (value) {
        var filterValue = (typeof value == 'string') ? value.toLowerCase() : "";
        return this.customerList.filter(function (customer) { return customer.customerName.toLowerCase().includes(filterValue); });
    };
    //load customer rate type for all products
    DamagesComponent.prototype.loadCustomerRateType = function (cust) {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getRateTypeByCustomer + '/' + cust._id).subscribe(function (data) {
            _this.sale_type_arr = data;
        });
    };
    DamagesComponent.prototype.onSubmit = function () {
        if (this.form.status == "VALID") {
            var product_1 = this.form.value.productName;
            if (this.sale_type_arr) {
                var customer_rate_type = this.sale_type_arr.filter(function (key) { return key.prod_id == product_1._id; })[0]; //find customer rate type
                this.sale_type = customer_rate_type.type;
            }
            var rate = this.commonService.getProductPrice(product_1._id, this.sale_type); // find rate based oo type
            console.log(rate);
            var trans_desc = {
                rate_type: this.sale_type,
                prod_name: product_1.prod_name,
                prod_id: product_1._id,
                product_id: product_1.product_id,
                prod_quan: this.form.value.quantity,
                prod_rate_per_unit: rate.price,
                tax: 0,
                prod_tax: 0,
                sub_amount: (rate.price * this.form.value.quantity),
                is_delivered: true
            };
            this.transaction_desc.push(trans_desc);
            this.form.reset();
            this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.transaction_desc);
            this._callFilter();
            this.prodField.nativeElement.focus();
        }
    };
    DamagesComponent.prototype._remove = function (n) {
        this.transaction_desc.splice(n, 1);
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.transaction_desc);
    };
    DamagesComponent.prototype.getTotalCost = function () {
        return this.transaction_desc.map(function (t) { return t.sub_amount; }).reduce(function (acc, value) { return acc + value; }, 0) + this.transaction_desc.map(function (t) { return t.prod_tax; }).reduce(function (acc, value) { return acc + value; }, 0);
    };
    DamagesComponent.prototype._saveOrder = function (type) {
        var _this = this;
        var data = {
            customer_id: this.custForm.value.customerName._id,
            damage_date: this.custForm.value.curDate,
            total_amount: this.getTotalCost(),
            details: this.transaction_desc
        };
        this.transaction_desc = [];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.transaction_desc);
        this.form.reset();
        //reset form
        this.custForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'customerName': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
            'curDate': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](new Date(), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required)
        });
        //call filter after form reset
        this._callCustomerFilter();
        this._callFilter();
        this.commonService.postMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.postDamage, data).subscribe(function (data) {
            _this.snackBar.open("Saved successfully!!", "Success", {
                duration: 500,
            });
        }, function (error) {
            _this.snackBar.open(error, "Error", {
                duration: 600,
            });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("productName"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], DamagesComponent.prototype, "prodField", void 0);
    DamagesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-damages',
            template: __webpack_require__(/*! ./damages.component.html */ "./src/app/layout/transactions/damages/damages.component.html"),
            styles: [__webpack_require__(/*! ./damages.component.scss */ "./src/app/layout/transactions/damages/damages.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"]])
    ], DamagesComponent);
    return DamagesComponent;
}());



/***/ }),

/***/ "./src/app/layout/transactions/expenses/expenses.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/layout/transactions/expenses/expenses.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutGap=\"0.2%\" fxLayoutAlign=\"center\">\n    <mat-card >\n        <mat-card-header>\n            <mat-card-title>Expenses</mat-card-title>\n        </mat-card-header>\n        <mat-card-content flex=\"50\">\n            <section class=\"example-section\">\n                <mat-form-field class=\"example-margin\">\n                    <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\n                </mat-form-field>\n            </section>\n        </mat-card-content>\n        \n        <div class=\"mat-elevation-z8\" flex=\"50\">\n            <table mat-table [dataSource]=\"dataSource\" matSort>\n        \n                <!-- <ng-container matColumnDef=\"sno\">\n                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Area Name </th>\n                    <td mat-cell *matCellDef=\"let row\" [style.color]=\"row.areaName\"> {{row.areaName}} </td>\n                </ng-container> -->\n\n                <ng-container matColumnDef=\"type\">\n                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Type </th>\n                    <td mat-cell *matCellDef=\"let row\"> {{row.type}} </td>\n                </ng-container>\n\n                <ng-container matColumnDef=\"description\">\n                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Description </th>\n                    <td mat-cell *matCellDef=\"let row\"> {{row.description}} </td>\n                </ng-container>\n\n                <ng-container matColumnDef=\"amount\">\n                    <th mat-header-cell *matHeaderCellDef mat-sort-header> Amount </th>\n                    <td mat-cell *matCellDef=\"let row\" > {{row.amount | currency:'INR'}} </td>\n                </ng-container>\n        \n                <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n                <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n            </table>\n        \n            <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\n        </div>\n    </mat-card>\n\n    <mat-card>\n        <form [formGroup]=\"form\" (ngSubmit)=\"submit_form()\">\n        <mat-card-header>\n            <mat-card-title>Add New Expense</mat-card-title>\n        </mat-card-header>\n        <mat-card-content flex=\"50\">\n            <section class=\"example-section\">\n                <mat-form-field class=\"example-margin\">\n                    <mat-select matInput placeholder=\"Type\" formControlName=\"type\">\n                            <mat-option *ngFor=\"let opt of expense_types\" [value]=\"opt.key\">{{opt.value}}</mat-option>\n                    </mat-select>\n                </mat-form-field>\n            </section>\n            <section class=\"example-section\">\n                <mat-form-field class=\"example-margin\">\n                    <textarea matInput rows=\"4\" placeholder=\"Description\" formControlName=\"description\"></textarea>\n                </mat-form-field>\n            </section>\n            <section class=\"example-section\">\n                <mat-form-field class=\"example-margin\">\n                    <input matInput (keyup)=\"applyFilter($event.target.value)\" formControlName=\"amount\" placeholder=\"Amount\">\n                </mat-form-field>\n            </section>\n            <section class=\"example-section\">\n                <button type=\"submit\" mat-raised-button color=\"primary\">Submit</button>\n            </section>\n\n        </mat-card-content>\n        </form>\n    </mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/transactions/expenses/expenses.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/layout/transactions/expenses/expenses.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\ntd,\nth {\n  width: 25%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 80px; }\n\n.example-margin {\n  margin: 15px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n.mat-card {\n  width: 90%; }\n\n.mat-cell {\n  text-align: left; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RyYW5zYWN0aW9ucy9leHBlbnNlcy9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXHRyYW5zYWN0aW9uc1xcZXhwZW5zZXNcXGV4cGVuc2VzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBVyxFQUNkOztBQUVEO0VBQ0ksZ0JBQWU7RUFDZixZQUFXLEVBQ2Q7O0FBRUQ7O0VBRUksV0FBVSxFQUNiOztBQUVEO0VBQ0ksY0FBYTtFQUNiLHNCQUFxQjtFQUNyQixvQkFBbUI7RUFDbkIsYUFBWSxFQUNmOztBQUVEO0VBQ0ksYUFBWSxFQUNmOztBQUVEO0VBQ0ksaUJBQWdCLEVBQ25COztBQUVEO0VBQ0ksV0FBUyxFQUNaOztBQUVEO0VBQ0ksaUJBQWdCLEVBQ25CIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L3RyYW5zYWN0aW9ucy9leHBlbnNlcy9leHBlbnNlcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ubWF0LWZvcm0tZmllbGQge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRkLFxyXG50aCB7XHJcbiAgICB3aWR0aDogMjUlO1xyXG59XHJcblxyXG4uZXhhbXBsZS1zZWN0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiA4MHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1tYXJnaW4ge1xyXG4gICAgbWFyZ2luOiAxNXB4O1xyXG59XHJcblxyXG4uY2xlYXJwaXgge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxufVxyXG5cclxuLm1hdC1jYXJke1xyXG4gICAgd2lkdGg6OTAlO1xyXG59XHJcblxyXG4ubWF0LWNlbGx7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59Il19 */"

/***/ }),

/***/ "./src/app/layout/transactions/expenses/expenses.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/layout/transactions/expenses/expenses.component.ts ***!
  \********************************************************************/
/*! exports provided: ExpensesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpensesComponent", function() { return ExpensesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _constants_contants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants/contants */ "./src/app/constants/contants.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { MatDialog, MatDialogRef, } from '@angular/material';
//import {MatGridListModule} from '@angular/material/grid-list';




var ExpensesComponent = /** @class */ (function () {
    function ExpensesComponent(commonService, snackBar) {
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.displayedColumns = ['type', 'description', 'amount'];
    }
    ExpensesComponent.prototype.ngOnInit = function () {
        this.expense_types = _constants_contants__WEBPACK_IMPORTED_MODULE_4__["EXPENSE_TYPE"].map(function (val) {
            return {
                key: val,
                value: val
            };
        });
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"]({
            'type': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required),
            'description': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required),
            'amount': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required)
        });
        this.loadExpenses();
    };
    ExpensesComponent.prototype.loadExpenses = function () {
        var _this = this;
        this.commonService.getMethod(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.getExpense).subscribe(function (data) {
            _this.expenses = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.expenses);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    ExpensesComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ExpensesComponent.prototype.submit_form = function () {
        var _this = this;
        console.log(this.form);
        if (this.form.status && this.form.status == "VALID") {
            this.commonService.postMethod(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.postExpense, this.form.value).subscribe(function (data) {
                _this.snackBar.open("Saved successfully!!", "Success", {
                    duration: 500,
                });
                _this.loadExpenses();
                _this.form.reset();
            }, function (error) {
                _this.snackBar.open(error, "Error", {
                    duration: 500,
                });
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], ExpensesComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], ExpensesComponent.prototype, "sort", void 0);
    ExpensesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-expenses',
            template: __webpack_require__(/*! ./expenses.component.html */ "./src/app/layout/transactions/expenses/expenses.component.html"),
            styles: [__webpack_require__(/*! ./expenses.component.scss */ "./src/app/layout/transactions/expenses/expenses.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], ExpensesComponent);
    return ExpensesComponent;
}());



/***/ }),

/***/ "./src/app/layout/transactions/openingbalance/openingbalance.component.html":
/*!**********************************************************************************!*\
  !*** ./src/app/layout/transactions/openingbalance/openingbalance.component.html ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-header>\n      <mat-card-title>Opening Balances</mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n      <section class=\"example-section\">\n          <mat-form-field class=\"example-margin\">\n              <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\n          </mat-form-field>\n      </section>\n  </mat-card-content>\n\n  <div class=\"mat-elevation-z8\">\n  <table mat-table [dataSource]=\"dataSource\" matSort>\n\n      <!-- Color Column -->\n      <ng-container matColumnDef=\"customerName\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Customer Name </th>\n          <td mat-cell *matCellDef=\"let row\" > {{row.customer.customerName}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"route\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Route </th>\n        <td mat-cell *matCellDef=\"let row\" > {{row.customer.route.areaName}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"amount\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Amount </th>\n        <td mat-cell *matCellDef=\"let row\" > {{row.amount|currency:'INR'}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"action\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header>Action</th>\n        <td mat-cell *matCellDef=\"let row\" > \n          <a (click)=\"openOrderModal(row)\"><mat-icon class=\"sidenav-icon\">edit</mat-icon></a> \n        </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n  </table>\n\n  <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\n  </div>\n  <div class=\"clearpix\"> \n    <button mat-raised-button color =\"primary\" (click)=\"openDialog()\">Add New</button>\n  </div>\n</mat-card>"

/***/ }),

/***/ "./src/app/layout/transactions/openingbalance/openingbalance.component.scss":
/*!**********************************************************************************!*\
  !*** ./src/app/layout/transactions/openingbalance/openingbalance.component.scss ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\ntd,\nth {\n  width: 25%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RyYW5zYWN0aW9ucy9vcGVuaW5nYmFsYW5jZS9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXHRyYW5zYWN0aW9uc1xcb3BlbmluZ2JhbGFuY2VcXG9wZW5pbmdiYWxhbmNlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBVyxFQUNkOztBQUVEO0VBQ0ksZ0JBQWU7RUFDZixZQUFXLEVBQ2Q7O0FBRUQ7O0VBRUksV0FBVSxFQUNiOztBQUVEO0VBQ0ksY0FBYTtFQUNiLHNCQUFxQjtFQUNyQixvQkFBbUI7RUFDbkIsYUFBWSxFQUNmOztBQUVEO0VBQ0ksYUFBWSxFQUNmOztBQUVEO0VBQ0ksaUJBQWdCLEVBQ25CIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L3RyYW5zYWN0aW9ucy9vcGVuaW5nYmFsYW5jZS9vcGVuaW5nYmFsYW5jZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ubWF0LWZvcm0tZmllbGQge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRkLFxyXG50aCB7XHJcbiAgICB3aWR0aDogMjUlO1xyXG59XHJcblxyXG4uZXhhbXBsZS1zZWN0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiA2MHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1tYXJnaW4ge1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG59XHJcblxyXG4uY2xlYXJwaXgge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/layout/transactions/openingbalance/openingbalance.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/layout/transactions/openingbalance/openingbalance.component.ts ***!
  \********************************************************************************/
/*! exports provided: OpeningbalanceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OpeningbalanceComponent", function() { return OpeningbalanceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _masters_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../masters/common-modal/common-modal.component */ "./src/app/layout/masters/common-modal/common-modal.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var OpeningbalanceComponent = /** @class */ (function () {
    function OpeningbalanceComponent(commonService, dialog) {
        this.commonService = commonService;
        this.dialog = dialog;
        this.displayedColumns = ['customerName', 'route', 'amount', 'action'];
        this.customers = [];
    }
    OpeningbalanceComponent.prototype.ngOnInit = function () {
        this.loadRoute();
        this.loadCustomers();
    };
    OpeningbalanceComponent.prototype.loadCustomers = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.getCustomer).subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var val = data_1[_i];
                var keyarr = { key: val._id, value: val.customerName };
                _this.customers.push(keyarr);
            }
        });
    };
    OpeningbalanceComponent.prototype.loadRoute = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.getOb).subscribe(function (data) {
            _this.balances = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.balances);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    OpeningbalanceComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    OpeningbalanceComponent.prototype.openDialog = function () {
        var _this = this;
        this.balance_entry_detail = [{
                "order": 1,
                "type": "select",
                "inputType": "dropdown",
                "name": "customer_id",
                "value": "",
                "placeholder": "Customer",
                "validation": {
                    "required": true
                },
                "options": this.customers
            },
            {
                "order": 2,
                "type": "textarea",
                "inputType": "textarea",
                "name": "description",
                "value": "",
                "placeholder": "Description",
                "validation": {
                    "required": true
                }
            },
            {
                "order": 3,
                "type": "input",
                "inputType": "number",
                "name": "amount",
                "value": "",
                "placeholder": "Amount",
                "validation": {
                    "required": true
                }
            }
        ];
        var dialogRef = this.dialog.open(_masters_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_4__["CommonModalComponent"], {
            width: '500px',
            data: { formData: this.balance_entry_detail.sort(function (a, b) { return a.order - b.order; }), formTitle: "Opening Balance", url: src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.postOb }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.loadRoute();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], OpeningbalanceComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], OpeningbalanceComponent.prototype, "sort", void 0);
    OpeningbalanceComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-openingbalance',
            template: __webpack_require__(/*! ./openingbalance.component.html */ "./src/app/layout/transactions/openingbalance/openingbalance.component.html"),
            styles: [__webpack_require__(/*! ./openingbalance.component.scss */ "./src/app/layout/transactions/openingbalance/openingbalance.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], OpeningbalanceComponent);
    return OpeningbalanceComponent;
}());



/***/ }),

/***/ "./src/app/layout/transactions/purchase/purchase.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/layout/transactions/purchase/purchase.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-header>\r\n      <mat-card-title class=\"invoice-title\">Purchase</mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content>      \r\n        <form [formGroup]=\"vendorForm\" >\r\n          <section class=\"example-section\">\r\n              <mat-form-field class=\"example-margin customer-col\">\r\n                  <input type=\"text\" autofocus placeholder=\"Vendor Name\" aria-label=\"Number\" matInput formControlName=\"vendorName\" [matAutocomplete]=\"vendor\">\r\n                  <mat-autocomplete autoActiveFirstOption #vendor=\"matAutocomplete\" [displayWith]=\"displayVendorFn\">\r\n                    <mat-option *ngFor=\"let vendor of vendorFilteredOptions | async\"  [value]=\"vendor\">\r\n                      {{vendor.vendorName}}\r\n                    </mat-option>\r\n                  </mat-autocomplete>\r\n              </mat-form-field>\r\n              <mat-form-field class=\"example-margin date-col\">\r\n                <input matInput disabled [max]=\"custFormMaxDate\" [matDatepicker]=\"picker\" placeholder=\"Choose a date\" formControlName=\"curDate\">\r\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n                <mat-datepicker disabled=\"false\" #picker></mat-datepicker>\r\n              </mat-form-field>\r\n          </section>\r\n        </form>    \r\n    </mat-card-content>\r\n<mat-card class=\"desc-bg\">\r\n  <mat-card-content>\r\n    <form [formGroup]=\"form\" (keyup.enter)=\"onSubmit()\">\r\n      <section class=\"example-section\">\r\n          <mat-form-field class=\"example-margin prod-col\">\r\n              <input type=\"text\" #productName placeholder=\"Product Name / Code\" aria-label=\"Number\" matInput formControlName=\"productName\" [matAutocomplete]=\"auto\">\r\n              <mat-autocomplete autoActiveFirstOption #auto=\"matAutocomplete\" [displayWith]=\"displayFn\">\r\n                <mat-option *ngFor=\"let option of filteredOptions | async\"  [value]=\"option\">\r\n                  {{option.prod_name}}\r\n                </mat-option>\r\n              </mat-autocomplete>\r\n          </mat-form-field>\r\n          <mat-form-field class=\"example-margin quantity-col\">\r\n            <input matInput formControlName=\"quantity\" placeholder=\"Quantity\" type=\"number\">\r\n          </mat-form-field>\r\n      </section>\r\n    </form>\r\n  </mat-card-content>\r\n\r\n  <div class=\"mat-elevation-z8\">\r\n  <table mat-table [dataSource]=\"dataSource\">\r\n\r\n      <ng-container matColumnDef=\"sno\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> S No </th>\r\n          <td mat-cell *matCellDef=\"let row;let i = index;\" > {{i+1}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>  </td>\r\n      </ng-container>\r\n\r\n      <!-- Progress Column -->\r\n      <ng-container matColumnDef=\"productName\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Product Name </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.prod_name}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>  </td>\r\n      </ng-container>\r\n\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"quantity\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Quantity</th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.prod_quan | number : '1.2-2'}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>  </td>\r\n        </ng-container>\r\n\r\n        <!-- Name Column -->\r\n      <ng-container matColumnDef=\"rate\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Rate </th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.prod_rate_per_unit|currency:'INR'}} </td>\r\n            <td mat-footer-cell *matFooterCellDef> Total </td>\r\n        </ng-container>\r\n\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"tax\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Tax </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.prod_tax|currency:'INR'}}@{{row.tax|number : '1.2-2'}}%</td>\r\n          <td mat-footer-cell *matFooterCellDef>  </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"amount\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Amount </th>\r\n        <td mat-cell *matCellDef=\"let row\"> {{row.sub_amount|currency:'INR'}}</td>\r\n        <td mat-footer-cell *matFooterCellDef> {{getTotalCost()|currency:'INR'}} </td>\r\n      </ng-container>   \r\n      \r\n      <ng-container matColumnDef=\"action\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Action </th>\r\n        <td mat-cell *matCellDef=\"let row; let n = index\">\r\n          <span (click)=\"_remove(n)\"><i class=\"material-icons\">\r\n            delete_forever\r\n            </i></span>\r\n        </td>\r\n        <td mat-footer-cell *matFooterCellDef>  </td>\r\n      </ng-container> \r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns;\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n      <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n  </table>\r\n  <ng-container *ngIf=\"!dataSource || transaction_desc.length === 0\">\r\n      <mat-card class=\"norecords\">Please add products !!</mat-card>\r\n  </ng-container>\r\n  </div>\r\n  </mat-card>\r\n  <br>\r\n  <div class=\"pull-right\">\r\n    <button mat-raised-button color=\"primary\" [disabled]=\"!dataSource || transaction_desc.length === 0\" (click)=\"_saveOrder('print')\">Print</button>\r\n    <button mat-raised-button color=\"primary\" [disabled]=\"!dataSource || transaction_desc.length === 0\" (click)=\"_saveOrder('save')\">Save</button>\r\n  </div>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/layout/transactions/purchase/purchase.component.scss":
/*!**********************************************************************!*\
  !*** ./src/app/layout/transactions/purchase/purchase.component.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.prod-col {\n  width: 70%; }\n\n.quantity-col {\n  width: 30%; }\n\n.customer-col {\n  width: 70%;\n  font-size: 1.34em; }\n\n.date-col {\n  width: 30%;\n  font-size: 1.34em; }\n\n.example-margin {\n  margin: 10px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n.norecords {\n  text-align: center;\n  font: menu; }\n\n.desc-bg {\n  background-color: #d4d5dd; }\n\n.invoice-title {\n  font-weight: bold;\n  font-size: 2em;\n  padding-bottom: 1em; }\n\n.pull-right {\n  display: block;\n  text-align: right; }\n\n.pull-right button {\n    margin-left: 0.23em; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RyYW5zYWN0aW9ucy9wdXJjaGFzZS9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXHRyYW5zYWN0aW9uc1xccHVyY2hhc2VcXHB1cmNoYXNlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBVyxFQUNkOztBQUVEO0VBQ0ksZ0JBQWU7RUFDZixZQUFXLEVBQ2Q7O0FBR0Q7RUFDSSxjQUFhO0VBQ2Isc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxXQUFVO0VBQ1Ysa0JBQWlCLEVBRXBCOztBQUNEO0VBQ0ksV0FBVTtFQUNWLGtCQUFpQixFQUVwQjs7QUFDRDtFQUNJLGFBQVksRUFDZjs7QUFFRDtFQUNJLGlCQUFnQixFQUNuQjs7QUFFRDtFQUNJLG1CQUFrQjtFQUNsQixXQUFVLEVBQ2I7O0FBRUQ7RUFDSSwwQkFBb0MsRUFDdkM7O0FBRUQ7RUFDSSxrQkFBaUI7RUFDakIsZUFBYztFQUNkLG9CQUFtQixFQUN0Qjs7QUFFRDtFQUNJLGVBQWE7RUFDYixrQkFBaUIsRUFJcEI7O0FBTkQ7SUFJUSxvQkFBbUIsRUFDdEIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvdHJhbnNhY3Rpb25zL3B1cmNoYXNlL3B1cmNoYXNlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5tYXQtZm9ybS1maWVsZCB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuXHJcbi5leGFtcGxlLXNlY3Rpb24ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBoZWlnaHQ6IDYwcHg7XHJcbn1cclxuXHJcbi5wcm9kLWNvbHtcclxuICAgIHdpZHRoOiA3MCU7XHJcbn1cclxuXHJcbi5xdWFudGl0eS1jb2x7XHJcbiAgICB3aWR0aDogMzAlO1xyXG59XHJcblxyXG4uY3VzdG9tZXItY29se1xyXG4gICAgd2lkdGg6IDcwJTtcclxuICAgIGZvbnQtc2l6ZTogMS4zNGVtO1xyXG4gICAgXHJcbn1cclxuLmRhdGUtY29se1xyXG4gICAgd2lkdGg6IDMwJTtcclxuICAgIGZvbnQtc2l6ZTogMS4zNGVtO1xyXG4gICAgXHJcbn1cclxuLmV4YW1wbGUtbWFyZ2luIHtcclxuICAgIG1hcmdpbjogMTBweDtcclxufVxyXG5cclxuLmNsZWFycGl4IHtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuXHJcbi5ub3JlY29yZHN7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250OiBtZW51O1xyXG59XHJcblxyXG4uZGVzYy1iZ3tcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyMTIsIDIxMywgMjIxKTtcclxufVxyXG5cclxuLmludm9pY2UtdGl0bGV7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtc2l6ZTogMmVtO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDFlbTtcclxufVxyXG5cclxuLnB1bGwtcmlnaHR7XHJcbiAgICBkaXNwbGF5OmJsb2NrO1xyXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XHJcbiAgICBidXR0b257XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDAuMjNlbTtcclxuICAgIH1cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/transactions/purchase/purchase.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/layout/transactions/purchase/purchase.component.ts ***!
  \********************************************************************/
/*! exports provided: objValidator, PurchaseComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objValidator", function() { return objValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PurchaseComponent", function() { return PurchaseComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//import { CATEGORY, SUBCATEGORY, BRANDS } from '../../../constants/contants';
function objValidator(obj) {
    return function (control) {
        if (control.value && !control.value[obj]) {
            return { 'valid': true };
        }
        return null;
    };
}
var PurchaseComponent = /** @class */ (function () {
    function PurchaseComponent(commonService, snackBar) {
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.displayedColumns = ['sno', 'productName', 'quantity', 'rate', 'tax', 'amount', 'action'];
        this.transaction_desc = [];
        this.purchase_type = "Purchase";
        this.custFormMaxDate = new Date();
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'productName': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, objValidator('prod_name')]),
            'quantity': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required)
        });
        this.vendorForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'vendorName': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, objValidator('vendorName')]),
            'curDate': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](new Date(), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required)
        });
    }
    PurchaseComponent.prototype.ngOnInit = function () {
        // this.productList = this.commonService.products;
        // this._callFilter();  
        this.loadProduct();
        this.loadVendors();
    };
    PurchaseComponent.prototype.loadVendors = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getVendor).subscribe(function (data) {
            _this.vendorList = data;
            _this._callVendorFilter();
        });
    };
    PurchaseComponent.prototype.loadProduct = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getProduct).subscribe(function (data) {
            _this.productList = data;
            _this._callFilter();
        });
    };
    PurchaseComponent.prototype.displayFn = function (prod) {
        return prod ? prod.prod_name : undefined;
    };
    PurchaseComponent.prototype.displayVendorFn = function (cust) {
        return cust ? cust.vendorName : undefined;
    };
    PurchaseComponent.prototype._callVendorFilter = function () {
        var _this = this;
        this.vendorFilteredOptions = this.vendorForm.get("vendorName").valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return (value && value.length >= 1) ? _this._custFilter(value) : []; }));
    };
    PurchaseComponent.prototype._callFilter = function () {
        var _this = this;
        this.filteredOptions = this.form.get("productName").valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return (value && value.length >= 1) ? _this._filter(value) : []; }));
    };
    PurchaseComponent.prototype._filter = function (value) {
        var filterValue = (typeof value == 'string') ? value.toLowerCase() : "";
        return this.productList.filter(function (option) { return option.prod_name.toLowerCase().includes(filterValue); });
    };
    PurchaseComponent.prototype._custFilter = function (value) {
        var filterValue = (typeof value == 'string') ? value.toLowerCase() : "";
        return this.vendorList.filter(function (vendor) { return vendor.vendorName.toLowerCase().includes(filterValue); });
    };
    PurchaseComponent.prototype.onSubmit = function () {
        if (this.form.status == "VALID") {
            var product = this.form.value.productName;
            var rate = this.commonService.getProductPrice(product._id, this.purchase_type); // find rate based oo type
            console.log(rate);
            var trans_desc = {
                rate_type: 'Purchase',
                prod_name: product.prod_name,
                prod_id: product._id,
                product_id: product.product_id,
                prod_quan: this.form.value.quantity,
                prod_rate_per_unit: rate.price,
                tax: rate.tax ? rate.tax : 0,
                prod_tax: rate.tax ? (rate.price * this.form.value.quantity) * rate.tax / 100 : 0,
                sub_amount: (rate.price * this.form.value.quantity)
            };
            this.transaction_desc.push(trans_desc);
            this.form.reset();
            this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.transaction_desc);
            this._callFilter();
            this.prodField.nativeElement.focus();
        }
    };
    PurchaseComponent.prototype._remove = function (n) {
        this.transaction_desc.splice(n, 1);
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.transaction_desc);
    };
    PurchaseComponent.prototype.getTotalCost = function () {
        return this.transaction_desc.map(function (t) { return t.sub_amount; }).reduce(function (acc, value) { return acc + value; }, 0) + this.transaction_desc.map(function (t) { return t.prod_tax; }).reduce(function (acc, value) { return acc + value; }, 0);
    };
    PurchaseComponent.prototype._saveOrder = function (type) {
        var _this = this;
        var data = {
            vendor_id: this.vendorForm.value.vendorName._id,
            purchase_date: this.vendorForm.value.curDate,
            total_amount: this.getTotalCost(),
            details: this.transaction_desc
        };
        this.transaction_desc = [];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.transaction_desc);
        this.form.reset();
        //reset form
        this.vendorForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'vendorName': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
            'curDate': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](new Date(), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required)
        });
        // filter options after reset
        this._callVendorFilter();
        this._callFilter();
        this.commonService.postMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.postPurchase, data).subscribe(function (data) {
            _this.snackBar.open("Saved successfully!!", "Success", {
                duration: 500,
            });
        }, function (error) {
            _this.snackBar.open(error, "Error", {
                duration: 600,
            });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("productName"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], PurchaseComponent.prototype, "prodField", void 0);
    PurchaseComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-purchase',
            template: __webpack_require__(/*! ./purchase.component.html */ "./src/app/layout/transactions/purchase/purchase.component.html"),
            styles: [__webpack_require__(/*! ./purchase.component.scss */ "./src/app/layout/transactions/purchase/purchase.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"]])
    ], PurchaseComponent);
    return PurchaseComponent;
}());



/***/ }),

/***/ "./src/app/layout/transactions/transactions-routing.module.ts":
/*!********************************************************************!*\
  !*** ./src/app/layout/transactions/transactions-routing.module.ts ***!
  \********************************************************************/
/*! exports provided: TransactionsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionsRoutingModule", function() { return TransactionsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _sales_sales_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sales/sales.component */ "./src/app/layout/transactions/sales/sales.component.ts");
/* harmony import */ var _purchase_purchase_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./purchase/purchase.component */ "./src/app/layout/transactions/purchase/purchase.component.ts");
/* harmony import */ var _expenses_expenses_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./expenses/expenses.component */ "./src/app/layout/transactions/expenses/expenses.component.ts");
/* harmony import */ var _damages_damages_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./damages/damages.component */ "./src/app/layout/transactions/damages/damages.component.ts");
/* harmony import */ var _openingbalance_openingbalance_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./openingbalance/openingbalance.component */ "./src/app/layout/transactions/openingbalance/openingbalance.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: '',
        redirectTo: 'sales',
        pathMatch: 'full'
    },
    {
        path: 'sales',
        component: _sales_sales_component__WEBPACK_IMPORTED_MODULE_2__["SalesComponent"]
    },
    {
        path: 'purchase',
        component: _purchase_purchase_component__WEBPACK_IMPORTED_MODULE_3__["PurchaseComponent"]
    },
    {
        path: 'expenses',
        component: _expenses_expenses_component__WEBPACK_IMPORTED_MODULE_4__["ExpensesComponent"]
    },
    {
        path: 'damages',
        component: _damages_damages_component__WEBPACK_IMPORTED_MODULE_5__["DamagesComponent"]
    },
    {
        path: 'openingbalance',
        component: _openingbalance_openingbalance_component__WEBPACK_IMPORTED_MODULE_6__["OpeningbalanceComponent"]
    }
];
var TransactionsRoutingModule = /** @class */ (function () {
    function TransactionsRoutingModule() {
    }
    TransactionsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], TransactionsRoutingModule);
    return TransactionsRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/transactions/transactions.module.ts":
/*!************************************************************!*\
  !*** ./src/app/layout/transactions/transactions.module.ts ***!
  \************************************************************/
/*! exports provided: TransactionsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionsModule", function() { return TransactionsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/grid-list */ "./node_modules/@angular/material/esm5/grid-list.es5.js");
/* harmony import */ var _transactions_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./transactions-routing.module */ "./src/app/layout/transactions/transactions-routing.module.ts");
/* harmony import */ var _sales_sales_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./sales/sales.component */ "./src/app/layout/transactions/sales/sales.component.ts");
/* harmony import */ var _purchase_purchase_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./purchase/purchase.component */ "./src/app/layout/transactions/purchase/purchase.component.ts");
/* harmony import */ var _expenses_expenses_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./expenses/expenses.component */ "./src/app/layout/transactions/expenses/expenses.component.ts");
/* harmony import */ var _damages_damages_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./damages/damages.component */ "./src/app/layout/transactions/damages/damages.component.ts");
/* harmony import */ var _common_dsuite_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../common/dsuite.module */ "./src/app/layout/common/dsuite.module.ts");
/* harmony import */ var _openingbalance_openingbalance_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./openingbalance/openingbalance.component */ "./src/app/layout/transactions/openingbalance/openingbalance.component.ts");
/* harmony import */ var _masters_masters_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../masters/masters.module */ "./src/app/layout/masters/masters.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var TransactionsModule = /** @class */ (function () {
    function TransactionsModule() {
    }
    TransactionsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_sales_sales_component__WEBPACK_IMPORTED_MODULE_9__["SalesComponent"], _purchase_purchase_component__WEBPACK_IMPORTED_MODULE_10__["PurchaseComponent"], _expenses_expenses_component__WEBPACK_IMPORTED_MODULE_11__["ExpensesComponent"], _damages_damages_component__WEBPACK_IMPORTED_MODULE_12__["DamagesComponent"], _openingbalance_openingbalance_component__WEBPACK_IMPORTED_MODULE_14__["OpeningbalanceComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _transactions_routing_module__WEBPACK_IMPORTED_MODULE_8__["TransactionsRoutingModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatAutocompleteModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginatorModule"],
                _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_7__["MatGridListModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIconModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"].withConfig({ addFlexToParent: false }),
                _common_dsuite_module__WEBPACK_IMPORTED_MODULE_13__["DsuiteModule"],
                _masters_masters_module__WEBPACK_IMPORTED_MODULE_15__["MastersModule"]
            ],
        })
    ], TransactionsModule);
    return TransactionsModule;
}());



/***/ })

}]);
//# sourceMappingURL=transactions-transactions-module.js.map