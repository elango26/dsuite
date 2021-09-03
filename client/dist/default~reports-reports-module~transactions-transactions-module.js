(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~reports-reports-module~transactions-transactions-module"],{

/***/ "./src/app/layout/transactions/sales/sales.component.html":
/*!****************************************************************!*\
  !*** ./src/app/layout/transactions/sales/sales.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-header class=\"align-flex-center\">\r\n      <mat-card-title class=\"invoice-title\">Sales Invoice</mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content class=\"content-font-size\">      \r\n        <form [formGroup]=\"custForm\">\r\n          <section class=\"example-section\">\r\n              <mat-form-field class=\"example-margin customer-col\">\r\n                  <input type=\"text\" #customerName placeholder=\"Customer Name\" aria-label=\"Number\" matInput formControlName=\"customerName\" [matAutocomplete]=\"customer\">\r\n                  <button tabindex=\"-1\" mat-icon-button matSuffix (click)=\"clear('custForm','customerName')\">\r\n                    <mat-icon>{{custForm.value.customerName?'clear':''}}</mat-icon>\r\n                  </button>\r\n                  <mat-autocomplete autoActiveFirstOption (optionSelected)='loadCustomerRateType($event.option.value)' #customer=\"matAutocomplete\" [displayWith]=\"displayCustomerFn\">\r\n                    <mat-option *ngFor=\"let customer of customerFilteredOptions | async\"  [value]=\"customer\">\r\n                      {{customer.customerName}}-{{customer.routes.areaName}}-{{customer.customer_id|slice:-3}}\r\n                    </mat-option>\r\n                  </mat-autocomplete>\r\n              </mat-form-field>\r\n              <mat-form-field class=\"example-margin date-col\">\r\n                <input tabindex=\"-1\" matInput disabled [max]=\"custFormMaxDate\" [matDatepicker]=\"picker\" placeholder=\"Choose a date\" formControlName=\"curDate\">\r\n                <mat-datepicker-toggle tabindex=\"-1\" matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n                <mat-datepicker disabled=\"false\" #picker></mat-datepicker>\r\n              </mat-form-field>\r\n          </section>\r\n        </form>    \r\n    </mat-card-content>\r\n<mat-card class=\"desc-bg\">\r\n  <mat-card-content>\r\n    <form [formGroup]=\"form\" (keyup.enter)=\"onSubmit()\">\r\n      <section class=\"example-section\">\r\n          <mat-form-field class=\"example-margin prod-col\">\r\n              <input type=\"text\" #typehead #productName placeholder=\"Product Name / Code\" aria-label=\"Number\" matInput formControlName=\"productName\" [matAutocomplete]=\"auto\">\r\n              <!-- <button mat-icon-button matSuffix (click)=\"clear('form','productName')\"> -->\r\n                <mat-icon mat-icon-button matSuffix (click)=\"clear('form','productName')\">{{form.value.productName?'clear':''}}</mat-icon>\r\n              <!-- </button> -->\r\n              <mat-autocomplete autoActiveFirstOption #auto=\"matAutocomplete\" [displayWith]=\"displayFn\">\r\n                <mat-option *ngFor=\"let option of filteredOptions | async\"  [value]=\"option\">\r\n                  {{option.prod_name}}\r\n                </mat-option>\r\n              </mat-autocomplete>\r\n          </mat-form-field>\r\n          <mat-form-field class=\"example-margin quantity-col\">\r\n            <input matInput #quantity formControlName=\"quantity\" placeholder=\"Quantity\" type=\"number\">\r\n          </mat-form-field>\r\n      </section>\r\n    </form>\r\n  </mat-card-content>\r\n\r\n  <div class=\"mat-elevation-z8\">\r\n  <table mat-table [dataSource]=\"dataSource\">\r\n\r\n      <ng-container matColumnDef=\"sno\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> S No </th>\r\n          <td mat-cell *matCellDef=\"let row;let i = index;\" > {{i+1}} </td>\r\n          <td mat-footer-cell *matFooterCellDef>  </td>\r\n      </ng-container>\r\n\r\n      <!-- Progress Column -->\r\n      <ng-container matColumnDef=\"productName\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Product Name </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.prod_name}} </td>\r\n          <td mat-footer-cell *matFooterCellDef> <span class=\"span-text\"> Round off </span> <br> <span class=\"span-text\">Discounts</span> </td>\r\n      </ng-container>\r\n\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"quantity\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Quantity</th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.prod_quan | number : '1.2-2'}} </td>\r\n            <td mat-footer-cell *matFooterCellDef> <span class=\"span-text\"> {{gross_amt.roundoff_sym}} {{gross_amt.roundoff_val|currency:'INR'}} </span> <br> <span class=\"span-text\">- {{gross_amt.discount|currency:'INR'}}</span></td>\r\n        </ng-container>\r\n\r\n        <!-- Name Column -->\r\n      <ng-container matColumnDef=\"rate\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Rate </th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.prod_rate_per_unit|currency:'INR'}} </td>\r\n            <td mat-footer-cell *matFooterCellDef>  </td>\r\n        </ng-container>\r\n\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"tax\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Tax </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.prod_tax|currency:'INR'}}@{{row.tax|number : '1.2-2'}}%</td>\r\n          <td mat-footer-cell *matFooterCellDef> Total </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"amount\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Amount </th>\r\n        <td mat-cell *matCellDef=\"let row\"> {{row.sub_amount|currency:'INR'}}</td>\r\n        <!-- <td mat-footer-cell *matFooterCellDef> Discounts </td> -->\r\n        <td mat-footer-cell *matFooterCellDef class=\"align-right\"> {{gross_amt.total|currency:'INR'}} </td>\r\n      </ng-container>   \r\n      \r\n      <ng-container matColumnDef=\"action\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Action </th>\r\n        <td mat-cell *matCellDef=\"let row; let n = index\">\r\n          <span (click)=\"_remove(row,n)\"><i class=\"material-icons anchor\">\r\n            delete_forever\r\n            </i></span>\r\n        </td>\r\n        <td mat-footer-cell *matFooterCellDef>  </td>\r\n      </ng-container> \r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns;\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n      <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\r\n  </table>\r\n  <ng-container *ngIf=\"!dataSource || transaction_desc.length === 0\">\r\n      <mat-card class=\"norecords\">Please add products !!</mat-card>\r\n  </ng-container>\r\n  </div>\r\n  </mat-card>\r\n  <br>\r\n  <div>\r\n    <a *ngIf=\"lastSales\" class=\"anchor\" (click)=\"openSalesModal(lastSales.saleid)\">Last Sales: {{lastSales.saleamount | currency:'INR'}}</a>\r\n    <!-- <a class=\"anchor\">450.00</a> -->\r\n    <div class=\"margin-left\">\r\n      <mat-form-field>\r\n      <mat-select matInput name=\"payment_type\" [(ngModel)]=\"default_payment_type\" placeholder=\"Payment Type\">\r\n        <mat-option *ngFor=\"let opt of payment_types\" [value]=\"opt.key\">{{opt.value}}</mat-option>\r\n      </mat-select>\r\n      </mat-form-field>\r\n    </div>\r\n  </div>\r\n  <div class=\"pull-right\">\r\n    <button mat-raised-button color=\"default\" (click)=\"resetForm()\">Reset</button>\r\n    <button mat-raised-button color=\"primary\" [disabled]=\"!dataSource || transaction_desc.length === 0\" (click)=\"_saveOrder('print')\">Print</button>\r\n    <button mat-raised-button color=\"primary\" [disabled]=\"!dataSource || transaction_desc.length === 0\" (click)=\"_saveOrder('save')\">Save</button>\r\n  </div>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/layout/transactions/sales/sales.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/layout/transactions/sales/sales.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.prod-col {\n  width: 70%; }\n\n.quantity-col {\n  width: 30%; }\n\n.customer-col {\n  width: 70%;\n  font-size: 1.34em; }\n\n.date-col {\n  width: 30%;\n  font-size: 1.34em; }\n\n.example-margin {\n  margin: 10px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n.norecords {\n  text-align: center;\n  font: menu; }\n\n.desc-bg {\n  background-color: #BEC4EE; }\n\n.invoice-title {\n  font-weight: bold;\n  font-size: 1.5em;\n  padding-bottom: 0.3em; }\n\n.pull-right {\n  display: block;\n  text-align: right; }\n\n.pull-right button {\n    margin-left: 0.23em; }\n\n.span-text {\n  font-style: italic;\n  color: grey;\n  font-size: smaller; }\n\n.anchor {\n  cursor: pointer; }\n\n.margin-left {\n  width: 50%;\n  margin-left: 50%; }\n\n.mat-elevation-z8 {\n  overflow: auto; }\n\n.align-flex-center {\n  display: flex;\n  align-items: center;\n  justify-content: center; }\n\n.content-font-size {\n  font-size: 0.9em; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3RyYW5zYWN0aW9ucy9zYWxlcy9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXHRyYW5zYWN0aW9uc1xcc2FsZXNcXHNhbGVzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBVyxFQUNkOztBQUVEO0VBQ0ksZ0JBQWU7RUFDZixZQUFXLEVBQ2Q7O0FBR0Q7RUFDSSxjQUFhO0VBQ2Isc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxXQUFVO0VBQ1Ysa0JBQWlCLEVBRXBCOztBQUNEO0VBQ0ksV0FBVTtFQUNWLGtCQUFpQixFQUVwQjs7QUFDRDtFQUNJLGFBQVksRUFDZjs7QUFFRDtFQUNJLGlCQUFnQixFQUNuQjs7QUFFRDtFQUNJLG1CQUFrQjtFQUNsQixXQUFVLEVBQ2I7O0FBRUQ7RUFDSSwwQkFBeUIsRUFDNUI7O0FBRUQ7RUFDSSxrQkFBaUI7RUFDakIsaUJBQWdCO0VBQ2hCLHNCQUFxQixFQUN4Qjs7QUFFRDtFQUNJLGVBQWE7RUFDYixrQkFBaUIsRUFJcEI7O0FBTkQ7SUFJUSxvQkFBbUIsRUFDdEI7O0FBR0w7RUFDSSxtQkFBa0I7RUFDbEIsWUFBVztFQUNYLG1CQUFrQixFQUNyQjs7QUFFRDtFQUNJLGdCQUFlLEVBQ2xCOztBQUVEO0VBQ0ksV0FBVTtFQUNWLGlCQUFnQixFQUNuQjs7QUFFRDtFQUNJLGVBQWMsRUFDakI7O0FBRUQ7RUFDSSxjQUFhO0VBQ2Isb0JBQW1CO0VBQ25CLHdCQUF1QixFQUMxQjs7QUFFRDtFQUNJLGlCQUFnQixFQUNuQiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC90cmFuc2FjdGlvbnMvc2FsZXMvc2FsZXMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLm1hdC1mb3JtLWZpZWxkIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG5cclxuLmV4YW1wbGUtc2VjdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGhlaWdodDogNjBweDtcclxufVxyXG5cclxuLnByb2QtY29se1xyXG4gICAgd2lkdGg6IDcwJTtcclxufVxyXG5cclxuLnF1YW50aXR5LWNvbHtcclxuICAgIHdpZHRoOiAzMCU7XHJcbn1cclxuXHJcbi5jdXN0b21lci1jb2x7XHJcbiAgICB3aWR0aDogNzAlO1xyXG4gICAgZm9udC1zaXplOiAxLjM0ZW07XHJcbiAgICBcclxufVxyXG4uZGF0ZS1jb2x7XHJcbiAgICB3aWR0aDogMzAlO1xyXG4gICAgZm9udC1zaXplOiAxLjM0ZW07XHJcbiAgICBcclxufVxyXG4uZXhhbXBsZS1tYXJnaW4ge1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG59XHJcblxyXG4uY2xlYXJwaXgge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxufVxyXG5cclxuLm5vcmVjb3Jkc3tcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQ6IG1lbnU7XHJcbn1cclxuXHJcbi5kZXNjLWJne1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0JFQzRFRTtcclxufVxyXG5cclxuLmludm9pY2UtdGl0bGV7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtc2l6ZTogMS41ZW07XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMC4zZW07XHJcbn1cclxuXHJcbi5wdWxsLXJpZ2h0e1xyXG4gICAgZGlzcGxheTpibG9jaztcclxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xyXG4gICAgYnV0dG9ue1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwLjIzZW07XHJcbiAgICB9XHJcbn1cclxuXHJcbi5zcGFuLXRleHQge1xyXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xyXG4gICAgY29sb3I6IGdyZXk7XHJcbiAgICBmb250LXNpemU6IHNtYWxsZXI7XHJcbn1cclxuXHJcbi5hbmNob3Ige1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG59XHJcblxyXG4ubWFyZ2luLWxlZnQge1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICAgIG1hcmdpbi1sZWZ0OiA1MCU7XHJcbn1cclxuXHJcbi5tYXQtZWxldmF0aW9uLXo4IHtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG59XHJcblxyXG4uYWxpZ24tZmxleC1jZW50ZXJ7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG59XHJcblxyXG4uY29udGVudC1mb250LXNpemUge1xyXG4gICAgZm9udC1zaXplOiAwLjllbTtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/transactions/sales/sales.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/layout/transactions/sales/sales.component.ts ***!
  \**************************************************************/
/*! exports provided: objValidator, SalesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objValidator", function() { return objValidator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SalesComponent", function() { return SalesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _constants_contants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../constants/contants */ "./src/app/constants/contants.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_printer_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/printer.service */ "./src/app/services/printer.service.ts");
/* harmony import */ var _common_sales_report_pop_sales_report_pop_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../common/sales-report-pop/sales-report-pop.component */ "./src/app/layout/common/sales-report-pop/sales-report-pop.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











function objValidator(obj) {
    return function (control) {
        if (control.value && !control.value[obj]) {
            return { 'valid': true };
        }
        return null;
    };
}
var SalesComponent = /** @class */ (function () {
    function SalesComponent(commonService, snackBar, router, route, printerService, dialog, datePipe) {
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.router = router;
        this.route = route;
        this.printerService = printerService;
        this.dialog = dialog;
        this.datePipe = datePipe;
        this.displayedColumns = ['sno', 'productName', 'quantity', 'rate', 'tax', 'amount', 'action'];
        this.transaction_desc = [];
        this.discount_desc = [];
        this.sale_type = _constants_contants__WEBPACK_IMPORTED_MODULE_6__["DEFAULT_RATE_TYPE"];
        this.custFormMaxDate = new Date();
        this.payment_types = [];
        this.roundoff_det = { val: 0, sym: '+' };
        this.common_rate_type = '';
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'productName': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, objValidator('prod_name')]),
            'quantity': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required)
        });
        this.custForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'customerName': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required, objValidator('customerName')]),
            'curDate': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](new Date(), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required)
        });
    }
    SalesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this.productList = this.commonService.products;
        // this._callFilter();  
        this.loadProduct();
        this.loadCustomers();
        this.loadDiscounts();
        this.getTotalCost(); // load init values
        this.default_payment_type = _constants_contants__WEBPACK_IMPORTED_MODULE_6__["DEFAULT_PAYMENT_TYPE"];
        _constants_contants__WEBPACK_IMPORTED_MODULE_6__["PAYMENT_TYPE"].forEach(function (t) {
            if (t != 'CREDIT') {
                _this.payment_types.push({
                    key: t,
                    value: t
                });
            }
        });
        //"POS0000013"
        // this.lastSales = {
        //   saleid: "POS0000013",
        //   saleamount: "768"
        // }
        this.onChanges();
        this.custField.nativeElement.focus();
    };
    SalesComponent.prototype.handleKeyboardEvent = function (event) {
        var validKeycodes = [120, 121];
        if (validKeycodes.indexOf(event.keyCode) > -1) {
            event.preventDefault();
            if (this.transaction_desc.length > 0) {
                var type = event.keyCode == 120 ? 'print' : 'save';
                this._saveOrder(type);
            }
        }
        //reset
        if (event.keyCode == 27) {
            event.preventDefault();
            this.resetForm();
        }
    };
    SalesComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.autoTrigger.panelClosingActions.subscribe(function (x) {
            if (_this.autoTrigger.activeOption) {
                //console.log(this.autoTrigger.activeOption.value);
                _this.form.patchValue({ 'productName': _this.autoTrigger.activeOption.value });
                _this.form.patchValue({ 'quantity': 1 });
                _this.quanField.nativeElement.focus();
                _this.quanField.nativeElement.select();
            }
        });
    };
    SalesComponent.prototype.clear = function (key, name) {
        var _a;
        this[key].patchValue((_a = {}, _a[name] = '', _a));
    };
    SalesComponent.prototype.onChanges = function () {
        var _this = this;
        this.custForm.get('customerName').valueChanges.subscribe(function (val) {
            if (val.customerName) {
                _this.payment_types.push({ key: 'CREDIT', value: 'CREDIT' });
            }
        });
    };
    SalesComponent.prototype.loadDiscounts = function () {
        //this.availableDiscounts = this.commonService.getSearchDiscountList(this.custForm.value.curDate);
        this.availableDiscounts = this.commonService.getDiscountList();
    };
    SalesComponent.prototype.loadCustomers = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getCustomer + '?isactive=yes').subscribe(function (data) {
            _this.customerList = data;
            _this._callCustomerFilter();
        });
    };
    SalesComponent.prototype.loadProduct = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getProduct).subscribe(function (data) {
            _this.productList = data;
            _this._callFilter();
        });
    };
    SalesComponent.prototype.displayFn = function (prod) {
        return prod ? prod.prod_name : undefined;
    };
    //load customer rate type for all products
    SalesComponent.prototype.loadCustomerRateType = function (cust) {
        var _this = this;
        //assign global rate_type here
        this.common_rate_type = cust.common_ratetype ? cust.common_ratetype : _constants_contants__WEBPACK_IMPORTED_MODULE_6__["DEFAULT_RATE_TYPE"];
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getRateTypeByCustomer + '/' + cust._id).subscribe(function (data) {
            _this.sale_type_arr = data;
        });
    };
    SalesComponent.prototype.displayCustomerFn = function (cust) {
        return cust ? cust.customerName : undefined;
    };
    SalesComponent.prototype._callCustomerFilter = function () {
        var _this = this;
        this.customerFilteredOptions = this.custForm.get("customerName").valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return (value && value.length >= 1) ? _this._custFilter(value) : []; }));
    };
    SalesComponent.prototype._callFilter = function () {
        var _this = this;
        this.filteredOptions = this.form.get("productName").valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (value) { return (value && value.length >= 1) ? _this._filter(value) : []; }));
    };
    SalesComponent.prototype._filter = function (value) {
        var filterValue = (typeof value == 'string') ? value.toLowerCase() : "";
        return this.productList.filter(function (option) { return option.prod_name.toLowerCase().includes(filterValue) || option.barcode == filterValue; });
        //bar code scanning
        //let filterValue;
        // if(typeof value == 'string'){
        //   filterValue = value.toLowerCase();
        // }
    };
    SalesComponent.prototype._custFilter = function (value) {
        var filterValue = (typeof value == 'string') ? value.toLowerCase() : "";
        return this.customerList.filter(function (customer) { return customer.customerName.toLowerCase().includes(filterValue); });
    };
    SalesComponent.prototype.onSubmit = function () {
        // console.log('submit');
        if (this.form.status == "VALID" && this.form.value.quantity > 0) {
            var product_1 = this.form.value.productName;
            if (this.sale_type_arr) {
                var customer_rate_type = this.sale_type_arr.filter(function (key) { return key.prod_id == product_1._id; })[0]; //find customer rate type
                if (customer_rate_type) {
                    this.sale_type = customer_rate_type.type;
                }
                else { //take common rate_type for this customer
                    this.sale_type = this.common_rate_type;
                }
            }
            var rate = this.commonService.getProductPrice(product_1._id, this.sale_type); // find rate based oo type
            if (rate == null) {
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
            this.form.value.quantity += this.transaction_desc.filter(function (d) { return d.prod_id == product_1._id; }).reduce(function (acc, val) { return acc + val.prod_quan; }, 0);
            this.transaction_desc = this.transaction_desc.filter(function (d) { return d.prod_id != product_1._id; });
            // discounts calculation
            var var_for_dis = {
                form: this.form,
                cus_form: this.custForm,
                product: product_1,
                sale_type: this.sale_type
            };
            var discount_id = this._calculateDiscounts(var_for_dis);
            // discounts end
            var trans_desc = {
                rate_type: this.sale_type,
                prod_name: product_1.prod_name,
                prod_id: product_1._id,
                product_id: product_1.product_id,
                prod_quan: this.form.value.quantity,
                prod_rate_per_unit: rate.price,
                tax: rate.tax ? rate.tax : 0,
                discount_id: discount_id,
                prod_tax: rate.tax ? (rate.price * this.form.value.quantity) * rate.tax / 100 : 0,
                sub_amount: (rate.price * this.form.value.quantity)
            };
            this.transaction_desc.push(trans_desc);
            this.getTotalCost();
            this.form.reset();
            this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.transaction_desc);
            //console.log(this.transaction_desc.length);
            this._callFilter();
            this.prodField.nativeElement.focus();
        }
        else if (typeof this.form.value.productName == 'object') {
            this.quanField.nativeElement.focus();
            this.form.patchValue({ 'quantity': 1 });
            this.quanField.nativeElement.select();
            //while changing abv code check method ngAfterViewInit
        }
    };
    SalesComponent.prototype._calculateDiscounts = function (vars) {
        var _this = this;
        var discounts = [], _did = null;
        var sys_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
        var sale_date = this.datePipe.transform(this.custForm.value.curDate, 'yyyy-MM-dd');
        if (sys_date != sale_date || !this.availableDiscounts) { //if sale date is diff or discount not loaded     
            this.commonService.getSearchDiscountList(sale_date).subscribe(function (data) {
                _this.availableDiscounts = data;
            });
        }
        discounts = this.availableDiscounts;
        var matching = [];
        if (discounts && discounts.length > 0) {
            matching = discounts.filter(function (dis) { return dis.buy_prod_id == vars.product._id && vars.form.value.quantity > dis.buy_count && (dis.applicable_customer.indexOf('all') > -1 || dis.applicable_customer.indexOf(vars.cus_form.value.customerName.customer_id) > -1); });
        }
        //console.log(matching);
        if (matching.length > 0) {
            //_did = matching[0]._id;
            switch (matching[0].discount_type) {
                case 'P2P':
                    var free_count_1 = 0;
                    var quotient = 0;
                    var purchased_quan = vars.form.value.quantity;
                    if (matching[0].applicable_type.indexOf(vars.sale_type) >= 0) {
                        _did = matching[0]._id;
                        quotient = Math.floor(purchased_quan / matching[0].buy_count);
                        free_count_1 = quotient * matching[0].free_count;
                        var free_product = matching[0].free_product[0];
                        var rate_1 = this.commonService.getProductPrice(free_product._id, vars.sale_type);
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
                        var exist = this.discount_desc.filter(function (d) { return d.discount_id == _did; });
                        if (this.discount_desc.length > 0 && exist.length > 0) {
                            this.discount_desc.map(function (d) {
                                if (d.discount_id == _did) {
                                    d.prod_count = free_count_1;
                                    d.total_amount = rate_1.price * free_count_1;
                                }
                            });
                        }
                        else {
                            var discount_desc = {
                                discount_id: matching[0]._id,
                                prod_id: free_product.product_id,
                                prod_count: free_count_1,
                                total_amount: rate_1.price * free_count_1
                            };
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
    };
    SalesComponent.prototype._remove = function (row, n) {
        this.transaction_desc.splice(n, 1);
        //console.log(row);
        if (row.discount_id && row.discount_id != '') {
            this.discount_desc = this.discount_desc.filter(function (dis) { return dis.discount_id != row.discount_id; });
            this.transaction_desc = this.transaction_desc.filter(function (t) { return t.discount_id != row.discount_id; });
        }
        this.getTotalCost();
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.transaction_desc);
    };
    SalesComponent.prototype.getTotalDiscount = function () {
        console.log('discount called');
        return this.discount_desc.map(function (d) { return d.total_amount; }).reduce(function (acc, value) { return acc + value; }, 0);
    };
    SalesComponent.prototype.getTotalCost = function () {
        console.log('total called');
        var discounts = this.getTotalDiscount();
        var actual_amt = (this.transaction_desc.map(function (t) { return t.sub_amount; }).reduce(function (acc, value) { return acc + value; }, 0) + this.transaction_desc.map(function (t) { return t.prod_tax; }).reduce(function (acc, value) { return acc + value; }, 0)) - discounts;
        var roundoff = actual_amt % 1;
        if (roundoff >= 0.5) {
            this.roundoff_det = {
                val: (1 - roundoff),
                sym: '+'
            };
        }
        else {
            this.roundoff_det = {
                val: -roundoff,
                sym: ''
            };
        }
        this.gross_amt = {
            discount: discounts,
            roundoff_sym: this.roundoff_det.sym,
            roundoff_val: this.roundoff_det.val,
            total: actual_amt + this.roundoff_det.val
        };
        //return actual_amt + this.roundoff_det.val;
    };
    SalesComponent.prototype._saveOrder = function (type) {
        var _this = this;
        var data = {
            customer_id: this.custForm.value.customerName._id,
            sale_date: this.custForm.value.curDate,
            total_amount: this.gross_amt.total,
            roundOff: this.roundoff_det,
            payment_type: this.default_payment_type,
            details: this.transaction_desc,
            discounts: this.discount_desc
        };
        this.transaction_desc = [];
        this.discount_desc = [];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.transaction_desc);
        this.commonService.postMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.postSales, data).subscribe(function (data) {
            if (data.code == 200) {
                _this.snackBar.open("Saved successfully!!", "Success", {
                    duration: 500,
                });
                //last sales show
                //"POS0000013"
                _this.lastSales = {
                    saleid: data.data.sale_id,
                    saleamount: data.data.total_amount
                };
                //print
                if (type == 'print') {
                    _this.printerService.printData = {
                        redirectUrl: '/transactions',
                        format: 'invoice',
                        data: [data.data.sale_id],
                        type: 'SALES',
                        date: new Date() // dummy date
                    };
                    _this.router.navigate(['/layout', { outlets: { printpage: 'printview' } }], { skipLocationChange: true });
                }
            }
            else {
                _this.snackBar.open("Error!!", "Error", {
                    duration: 600,
                });
            }
        }, function (error) {
            _this.snackBar.open(error, "Error", {
                duration: 600,
            });
        });
        this.form.reset();
        this.getTotalCost();
        //reset form
        this.custForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'customerName': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
            'curDate': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](new Date(), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required)
        });
        //after reset call filters
        this._callCustomerFilter();
        this._callFilter();
    };
    //sales report page
    SalesComponent.prototype.openSalesModal = function (saleid) {
        var dialogRef = this.dialog.open(_common_sales_report_pop_sales_report_pop_component__WEBPACK_IMPORTED_MODULE_9__["SalesReportPopComponent"], {
            width: '500px',
            data: { saleid: saleid }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //reload
        });
    };
    SalesComponent.prototype.resetForm = function () {
        //this.custForm.reset();
        this.form.reset();
        this.transaction_desc = [];
        this.discount_desc = [];
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](this.transaction_desc);
        this.default_payment_type = _constants_contants__WEBPACK_IMPORTED_MODULE_6__["DEFAULT_PAYMENT_TYPE"];
        this.custForm.setValue({ 'customerName': '', 'curDate': new Date() });
        this.gross_amt = {
            discount: 0,
            roundoff_sym: '',
            roundoff_val: 0,
            total: 0
        };
        // this.custForm = new FormGroup({
        //   'customerName': new FormControl('',[Validators.required,objValidator('customerName')]),
        //   'curDate': new FormControl(new Date(),Validators.required)
        // });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("productName"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], SalesComponent.prototype, "prodField", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("quantity"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], SalesComponent.prototype, "quanField", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])("customerName"),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])
    ], SalesComponent.prototype, "custField", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])('typehead', { read: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatAutocompleteTrigger"] }),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatAutocompleteTrigger"])
    ], SalesComponent.prototype, "autoTrigger", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["HostListener"])('window:keydown', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], SalesComponent.prototype, "handleKeyboardEvent", null);
    SalesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sales',
            template: __webpack_require__(/*! ./sales.component.html */ "./src/app/layout/transactions/sales/sales.component.html"),
            styles: [__webpack_require__(/*! ./sales.component.scss */ "./src/app/layout/transactions/sales/sales.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["Router"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["ActivatedRoute"],
            src_app_services_printer_service__WEBPACK_IMPORTED_MODULE_8__["PrinterService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["DatePipe"]])
    ], SalesComponent);
    return SalesComponent;
}());



/***/ })

}]);
//# sourceMappingURL=default~reports-reports-module~transactions-transactions-module.js.map