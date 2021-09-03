(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["leads-leads-module"],{

/***/ "./src/app/layout/leads/customers/customers-view.component.html":
/*!**********************************************************************!*\
  !*** ./src/app/layout/leads/customers/customers-view.component.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card *ngIf=\"!invoiceView\">\r\n  <mat-card-title>{{leadName}}</mat-card-title>\r\n  <mat-card-content>\r\n    <table mat-table [dataSource]=\"transactions\" class=\"mat-elevation-z8\">\r\n\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"date\">\r\n        <th mat-header-cell *matHeaderCellDef> Date </th>\r\n        <td mat-cell *matCellDef=\"let element\"> {{element._id.date}} </td>\r\n      </ng-container>\r\n    \r\n      <!-- Weight Column -->\r\n      <ng-container matColumnDef=\"amount\">\r\n        <th mat-header-cell *matHeaderCellDef> Amount </th>\r\n        <td mat-cell *matCellDef=\"let element\"> <span (click)=\"loadInvoice(element)\" [ngClass]=\"{'anchor-tag':element.debit}\">{{element.debit ? (element.debit | currency:'INR') : (element.credit | currency:'INR')}} <span [ngClass]=\"{'credit':element.credit,'debit':element.debit}\">{{element.debit?' dr':' cr'}}</span></span></td>\r\n      </ng-container>\r\n    \r\n      <!-- Symbol Column -->\r\n      <!-- <ng-container matColumnDef=\"credit\">\r\n        <th mat-header-cell *matHeaderCellDef> Credit </th>\r\n        <td mat-cell *matCellDef=\"let element\"> {{element.credit?element.credit:'-'}} </td>\r\n      </ng-container> -->\r\n    \r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n    </table>\r\n  </mat-card-content>\r\n  <mat-card-actions>\r\n    <!-- <p><a class=\"anchor-tag\" (click)=\"backToLeadPage()\">Back to Lead Page</a></p> -->\r\n    <button type=\"button\" mat-raised-button color=\"primary\" (click)=\"backToLeadPage()\">Back to Lead Page</button>\r\n  </mat-card-actions>\r\n</mat-card>\r\n<mat-card *ngIf=\"invoiceView\">\r\n  <div class=\"invoice\" *ngFor=\"let inv of invoiceData\">\r\n    <table>\r\n        <tr>\r\n            <td><b>Bill No:</b> {{inv.sales.sale_id}}</td>\r\n            <td><b>Date:</b> {{inv.sales.sale_date | date:'medium':'IST'}}</td>\r\n        </tr>\r\n        <tr>\r\n            <td><b>To:</b> {{inv.sales.customer.customerName}}</td>\r\n        </tr>\r\n        <tr>\r\n            <td><b>Payment Type:</b> CASH</td>\r\n        </tr>\r\n    </table>\r\n    <table>\r\n        <thead>\r\n            <tr>\r\n                <th>Sno</th>\r\n          <th>Description</th>\r\n          <th>Quantity</th>\r\n          <th>Rate</th>\r\n          <th>Tax</th>\r\n          <th scope=\"col\">Amount</th>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr *ngFor=\"let desc of inv.details; let i = index\" class=\"center-align\">\r\n          <td>{{i+1}}</td>\r\n          <td>{{desc.product.prod_name}}</td>\r\n          <td>{{desc.prod_quan | number : '1.2-2'}}</td>\r\n          <td>{{desc.prod_rate_per_unit|currency:'INR'}}</td>\r\n          <td>{{desc.prod_tax|currency:'INR'}}</td>\r\n          <td class=\"right-align\">{{desc.sub_amount|currency:'INR'}}</td>\r\n            </tr>\r\n          <tr>\r\n              <td colspan=\"5\" align=\"center\"><span class=\"span-text\">Discounts</span></td>\r\n              <td class=\"right-align\"><span class=\"span-text\">-{{getDiscountAmt(inv.sales.discount)|currency:'INR'}}</span></td>\r\n          </tr>\r\n          <tr *ngIf=\"inv.sales.roundOff\">\r\n            <td colspan=\"5\" align=\"center\"><span class=\"span-text\">Round Off</span></td>\r\n            <td class=\"right-align\"><span class=\"span-text\">{{inv.sales.roundOff.sym}}{{inv.sales.roundOff.val|currency:'INR'}}</span></td>\r\n          </tr>\r\n        </tbody>\r\n        <tfoot>\r\n            <tr>\r\n                <th colspan=\"5\">Totals</th>\r\n                <td class='right-align'>{{inv.sales.total_amount|currency:'INR'}}</td>\r\n            </tr>\r\n        </tfoot>\r\n    </table>\r\n    </div>\r\n    <mat-card-actions>\r\n      <!-- <p></p><a class=\"anchor-tag\" (click)=\"backToTransaction()\">Back to Transaction</a></p> -->\r\n      <button type=\"button\" mat-raised-button color=\"primary\" (click)=\"backToTransaction()\">Back to Transaction</button>\r\n    </mat-card-actions>\r\n</mat-card>\r\n"

/***/ }),

/***/ "./src/app/layout/leads/customers/customers-view.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/layout/leads/customers/customers-view.component.ts ***!
  \********************************************************************/
/*! exports provided: CustomersViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersViewComponent", function() { return CustomersViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CustomersViewComponent = /** @class */ (function () {
    function CustomersViewComponent(commonService) {
        this.commonService = commonService;
        this.backToLead = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.displayedColumns = ['date', 'amount'];
        this.invoiceView = false;
    }
    CustomersViewComponent.prototype.ngOnInit = function () {
        console.log(this.data);
        this.leadName = this.data.customerName;
        this.loadTransactions(this.data);
    };
    CustomersViewComponent.prototype.loadTransactions = function (row) {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.loadTransactions + '?customer_id=' + row._id).subscribe(function (data) {
            // var temp = [];
            // for (let row of data.data) {
            //     if(!temp['customer'])
            //         temp['customer'] = {};
            //     if(!temp['customer'][row._id.date])
            //         temp['customer'][row._id.date] = {};                
            //     if(!temp['customer'][row._id.date]['credit'])
            //         temp['customer'][row._id.date]['credit'] = 0;
            //     if(!temp['customer'][row._id.date]['debit'])
            //         temp['customer'][row._id.date]['debit'] = 0;
            //     if(row.credit){
            //         temp['customer'][row._id.date]['credit'] += row.credit;
            //     }else if(row.debit){
            //         temp['customer'][row._id.date]['debit'] += row.debit;
            //     }
            // }
            // console.log(temp);
            _this.transactions = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](data.data);
        });
    };
    CustomersViewComponent.prototype.getDiscountAmt = function (row) {
        return row.reduce(function (acc, r) {
            return acc + r.total_amount;
        }, 0);
    };
    CustomersViewComponent.prototype.backToLeadPage = function () {
        this.backToLead.emit(this.pageIndex);
    };
    CustomersViewComponent.prototype.backToTransaction = function () {
        this.invoiceView = false;
    };
    CustomersViewComponent.prototype.loadInvoice = function (row) {
        var _this = this;
        if (row.debit) {
            this.invoiceView = true;
            console.log(row);
            var data = {
                invoices: row.sale_ids,
                type: 'SALES'
            };
            this.commonService.postMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.printInvoices, data).subscribe(function (data) {
                console.log(data);
                if (data.code == 200)
                    _this.invoiceData = data.data;
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], CustomersViewComponent.prototype, "backToLead", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CustomersViewComponent.prototype, "data", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], CustomersViewComponent.prototype, "pageIndex", void 0);
    CustomersViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customers-view',
            template: __webpack_require__(/*! ./customers-view.component.html */ "./src/app/layout/leads/customers/customers-view.component.html"),
            styles: [__webpack_require__(/*! ./customers.component.scss */ "./src/app/layout/leads/customers/customers.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"]])
    ], CustomersViewComponent);
    return CustomersViewComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/customers/customers.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/layout/leads/customers/customers.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card *ngIf=\"showLeadsPage\">\r\n    <!-- <mat-card-header> -->\r\n        <mat-card-title>Leads <mat-icon (click)=\"callPrintModal()\" class=\"print-right\">print</mat-icon></mat-card-title>\r\n    <!-- </mat-card-header> -->\r\n    <mat-card-content>\r\n        <section class=\"example-section\" >\r\n            <mat-form-field class=\"example-margin\">\r\n                <input matInput name=\"searKey\" [(ngModel)]=\"searKey\" (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n                <button mat-icon-button matSuffix (click)=\"clear()\">\r\n                    <mat-icon>{{searKey?'clear':''}}</mat-icon>\r\n                </button>\r\n            </mat-form-field>\r\n            <mat-form-field class=\"example-margin\">\r\n                <mat-select name=\"selRoute\" [(ngModel)]=\"selRoute\" (selectionChange)=\"loadLeads()\" placeholder=\"Route\" >\r\n                    <mat-option *ngFor=\"let r of routes\" [value]=\"r.key\">{{r.value}}</mat-option>\r\n                </mat-select>\r\n                <!-- <mat-select placeholder=\"Route\" >\r\n                    <mat-option value=\"1\">Option 1</mat-option>\r\n                    <mat-option value=\"2\">Option 2</mat-option>\r\n                    <mat-option value=\"3\">Option 3</mat-option>\r\n                </mat-select> -->\r\n            </mat-form-field>\r\n        </section>\r\n    </mat-card-content>\r\n\r\n    <div class=\"mat-elevation-z8\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort>\r\n\r\n        <!-- Color Column -->\r\n        <ng-container matColumnDef=\"customerName\">\r\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Customer Name </th>\r\n                <td mat-cell *matCellDef=\"let row\" [style.color]=\"row.customerName\"> <a class=\"anchor-tag\" (click)=\"viewCustomerPage(row)\">{{row.customerName}}</a> </td>\r\n            </ng-container>\r\n\r\n        <!-- Progress Column -->\r\n        <ng-container matColumnDef=\"customer_id\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Alias </th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.customer_id}} </td>\r\n        </ng-container>\r\n\r\n        <!-- Name Column -->\r\n        <ng-container matColumnDef=\"route\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Route </th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.routes[0].areaName}} </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"totalAmount\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Amount </th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{(row.debit + row.openingbalance) - row.credit | currency:'INR'}} </td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"actions\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Actions </th>\r\n            <td mat-cell *matCellDef=\"let row\"> \r\n                <div class=\"icon-div\">\r\n                    <a (click)=\"openOrderModal(row)\"><mat-icon class=\"sidenav-icon\">add_shopping_cart</mat-icon></a>\r\n                    <a (click)=\"openPaymentModal(row)\"><mat-icon class=\"sidenav-icon\">attach_money</mat-icon></a>                \r\n                </div>\r\n            </td>\r\n        </ng-container>\r\n        \r\n\r\n        <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n    </table>\r\n\r\n    <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\r\n    </div>\r\n</mat-card>\r\n<app-customers-view *ngIf=\"!showLeadsPage\" [pageIndex]=\"pageIndex\" [data]=\"rowData\" (backToLead)=\"resetLeadsPage($event)\"></app-customers-view>"

/***/ }),

/***/ "./src/app/layout/leads/customers/customers.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/layout/leads/customers/customers.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n.icon-div {\n  display: flex; }\n\n.icon-div a {\n    padding-right: 0.5em;\n    cursor: pointer; }\n\n.debit {\n  color: red; }\n\n.credit {\n  color: limegreen; }\n\n.anchor-tag {\n  cursor: pointer; }\n\n.print-right {\n  float: right;\n  cursor: pointer; }\n\ntable tr.center-align {\n  text-align: center; }\n\ntable td.right-align {\n  text-align: right; }\n\n.span-text {\n  font-style: italic;\n  color: grey;\n  font-size: smaller; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2xlYWRzL2N1c3RvbWVycy9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXGxlYWRzXFxjdXN0b21lcnNcXGN1c3RvbWVycy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQVcsRUFDZDs7QUFFRDtFQUNJLGdCQUFlO0VBQ2YsWUFBVyxFQUNkOztBQUVEO0VBQ0ksY0FBYTtFQUNiLHNCQUFxQjtFQUNyQixvQkFBbUI7RUFDbkIsYUFBWSxFQUNmOztBQUVEO0VBQ0ksYUFBWSxFQUNmOztBQUVEO0VBQ0ksY0FBYSxFQUtoQjs7QUFORDtJQUdRLHFCQUFvQjtJQUNwQixnQkFBZSxFQUNsQjs7QUFHTDtFQUNJLFdBQVUsRUFDYjs7QUFFRDtFQUNJLGlCQUFnQixFQUNuQjs7QUFFRDtFQUNJLGdCQUFlLEVBQ2xCOztBQUVEO0VBQ0ksYUFBYTtFQUNiLGdCQUFnQixFQUNuQjs7QUFFRDtFQUVRLG1CQUFrQixFQUNyQjs7QUFITDtFQUtRLGtCQUFpQixFQUNwQjs7QUFFTDtFQUNJLG1CQUFrQjtFQUNsQixZQUFXO0VBQ1gsbUJBQWtCLEVBQ3JCIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2xlYWRzL2N1c3RvbWVycy9jdXN0b21lcnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLm1hdC1mb3JtLWZpZWxkIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uZXhhbXBsZS1zZWN0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiA2MHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1tYXJnaW4ge1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG59XHJcblxyXG4uaWNvbi1kaXYge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGEge1xyXG4gICAgICAgIHBhZGRpbmctcmlnaHQ6IDAuNWVtO1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgIH1cclxufVxyXG5cclxuLmRlYml0IHtcclxuICAgIGNvbG9yOiByZWQ7XHJcbn1cclxuXHJcbi5jcmVkaXQge1xyXG4gICAgY29sb3I6IGxpbWVncmVlbjtcclxufVxyXG5cclxuLmFuY2hvci10YWd7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5wcmludC1yaWdodHtcclxuICAgIGZsb2F0IDogcmlnaHQ7XHJcbiAgICBjdXJzb3IgOiBwb2ludGVyO1xyXG59XHJcblxyXG50YWJsZSB7XHJcbiAgICB0ci5jZW50ZXItYWxpZ24ge1xyXG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIH1cclxuICAgIHRkLnJpZ2h0LWFsaWduIHtcclxuICAgICAgICB0ZXh0LWFsaWduOiByaWdodDtcclxuICAgIH1cclxufVxyXG4uc3Bhbi10ZXh0IHtcclxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcclxuICAgIGNvbG9yOiBncmV5O1xyXG4gICAgZm9udC1zaXplOiBzbWFsbGVyO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/layout/leads/customers/customers.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/layout/leads/customers/customers.component.ts ***!
  \***************************************************************/
/*! exports provided: CustomersComponent, SheetPrintComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersComponent", function() { return CustomersComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SheetPrintComponent", function() { return SheetPrintComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _common_prodtable_prodtable_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../common/prodtable/prodtable.component */ "./src/app/layout/common/prodtable/prodtable.component.ts");
/* harmony import */ var _payment_payments_payments_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../payment/payments/payments.component */ "./src/app/layout/payment/payments/payments.component.ts");
/* harmony import */ var src_app_services_bootstrap_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/bootstrap.service */ "./src/app/services/bootstrap.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var src_app_services_printer_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/services/printer.service */ "./src/app/services/printer.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var CustomersComponent = /** @class */ (function () {
    function CustomersComponent(commonService, dialog, printerService, datePipe, router, bootstrap) {
        this.commonService = commonService;
        this.dialog = dialog;
        this.printerService = printerService;
        this.datePipe = datePipe;
        this.router = router;
        this.bootstrap = bootstrap;
        this.displayedColumns = ['customerName', 'customer_id', 'route', 'totalAmount', 'actions'];
        this.showLeadsPage = true;
        this.selRoute = "all";
        this.searKey = "";
        this.pageIndex = 0;
        //this.customerList = [];
    }
    Object.defineProperty(CustomersComponent.prototype, "matPaginator", {
        // tempIndex:any = 0;
        set: function (paginator) {
            // console.log('paginator called');
            if (paginator) {
                if (this.pageIndex != 0) {
                    paginator.pageIndex = this.pageIndex;
                    this.pageIndex = 0;
                }
                this.dataSource.paginator = paginator;
            }
        },
        enumerable: true,
        configurable: true
    });
    // ngAfterViewInit() {
    //   console.log('after all');
    // }
    CustomersComponent.prototype.ngOnInit = function () {
        this.loadLeads();
        //this.paginator.pageIndex = 1;
        // this.commonService.getMethod('http://localhost:3000/api/test/productList').subscribe((data:any)=>{
        //   console.log(data);
        // });
        this.routes = this.bootstrap.routes.map(function (val) {
            return {
                key: val._id,
                value: val.areaName
            };
        });
        this.routes.push({ key: 'all', value: 'All' });
    };
    CustomersComponent.prototype.loadLeads = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.getLeads + "?route=" + this.selRoute).subscribe(function (data) {
            _this.customerList = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.customerList);
            //this.dataSource.paginator = this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    CustomersComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    CustomersComponent.prototype.openOrderModal = function (customer) {
        console.log(customer);
        var dialogRef = this.dialog.open(_common_prodtable_prodtable_component__WEBPACK_IMPORTED_MODULE_4__["ProdtableComponent"], {
            width: '90%',
            height: '80%',
            data: { customer: customer, url: src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.postOrder, source: 'leads' },
            panelClass: 'custom-modalbox'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //reload
        });
    };
    CustomersComponent.prototype.openPaymentModal = function (customer) {
        var _this = this;
        //console.log(customer);
        var dialogRef = this.dialog.open(_payment_payments_payments_component__WEBPACK_IMPORTED_MODULE_5__["PaymentsComponent"], {
            width: 'auto',
            height: 'auto',
            data: { customer: customer, source: 'leads' },
            panelClass: 'custom-modalbox'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.loadLeads();
        });
    };
    CustomersComponent.prototype.viewCustomerPage = function (row) {
        //console.log(this.dataSource.paginator);
        this.showLeadsPage = false;
        this.pageIndex = this.dataSource.paginator.pageIndex;
        this.rowData = row;
    };
    CustomersComponent.prototype.resetLeadsPage = function (e) {
        //console.log('reset called'+e);
        //this.paginator.pageIndex = e;
        this.pageIndex = e;
        this.showLeadsPage = true;
        //console.log(this.paginatorR);
        //this.dataSource.paginator = this.paginator;
    };
    CustomersComponent.prototype.callPrintModal = function () {
        var _this = this;
        console.log('printer called');
        var dialogRef = this.dialog.open(SheetPrintComponent, {
            width: '400px',
        });
        dialogRef.afterClosed().subscribe(function (result) {
            var data = {};
            var q = result.data.map(function (obj) {
                return obj.key;
            }).join(",");
            var route_name = result.data.map(function (obj) {
                return obj.value;
            }).join(",");
            var cur_date = new Date();
            var query = '?sale_date=' + _this.datePipe.transform(cur_date, "yyyy-MM-dd") + "&route=" + q;
            var sales_report = _this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.salesReport + query); //order details
            var lead_report = _this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.leadReport); //account details with tdy,week,old
            Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["forkJoin"])([sales_report, lead_report]).subscribe(function (results) {
                data = {
                    'route': route_name,
                    'sales': results[0],
                    'account': results[1]
                };
                _this.printerService.printData = {
                    redirectUrl: '/leads',
                    format: 'report',
                    data: data,
                    type: 'LEADS',
                    date: cur_date
                };
                _this.router.navigate(['/layout', { outlets: { printpage: 'printview' } }], { skipLocationChange: true });
            });
        });
    };
    CustomersComponent.prototype.clear = function () {
        this.searKey = '';
        this.applyFilter('');
        //this.addEvent();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]])
    ], CustomersComponent.prototype, "matPaginator", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], CustomersComponent.prototype, "sort", void 0);
    CustomersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customers',
            template: __webpack_require__(/*! ./customers.component.html */ "./src/app/layout/leads/customers/customers.component.html"),
            styles: [__webpack_require__(/*! ./customers.component.scss */ "./src/app/layout/leads/customers/customers.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], src_app_services_printer_service__WEBPACK_IMPORTED_MODULE_8__["PrinterService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_9__["DatePipe"], _angular_router__WEBPACK_IMPORTED_MODULE_10__["Router"], src_app_services_bootstrap_service__WEBPACK_IMPORTED_MODULE_6__["BootstrapService"]])
    ], CustomersComponent);
    return CustomersComponent;
}());

var SheetPrintComponent = /** @class */ (function () {
    function SheetPrintComponent(bootstrap, snackBar, dialogRef) {
        this.bootstrap = bootstrap;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
        this.masterCheck = false;
    }
    SheetPrintComponent.prototype.ngOnInit = function () {
        this.routes = this.bootstrap.routes.map(function (val) {
            return {
                checked: false,
                key: val._id,
                value: val.areaName
            };
        });
    };
    SheetPrintComponent.prototype.isAllSelected = function () {
        this.masterCheck = this.routes.every(function (item) {
            return item.checked == true;
        });
    };
    SheetPrintComponent.prototype.checkUncheckAll = function () {
        var _this = this;
        this.routes.forEach(function (obj) {
            obj.checked = _this.masterCheck;
        });
    };
    SheetPrintComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    SheetPrintComponent.prototype.print = function () {
        var selectedList = this.routes.filter(function (obj) {
            return obj.checked == true;
        });
        this.dialogRef.close({ data: selectedList });
    };
    SheetPrintComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'print-sheet',
            template: __webpack_require__(/*! ./print-sheet.component.html */ "./src/app/layout/leads/customers/print-sheet.component.html"),
            styles: [__webpack_require__(/*! ./customers.component.scss */ "./src/app/layout/leads/customers/customers.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_bootstrap_service__WEBPACK_IMPORTED_MODULE_6__["BootstrapService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"]])
    ], SheetPrintComponent);
    return SheetPrintComponent;
}());



/***/ }),

/***/ "./src/app/layout/leads/customers/print-sheet.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/layout/leads/customers/print-sheet.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n    <mat-card-content>\r\n      <h2 class=\"example-h2\">Please select the route</h2>\r\n    \r\n      <section class=\"\">\r\n        <mat-checkbox class=\"example-margin\" value=\"all\" (change)=\"checkUncheckAll()\" [(ngModel)]=\"masterCheck\">All</mat-checkbox>\r\n      </section>\r\n      <section class=\"\" *ngFor=\"let route of routes\">\r\n        <mat-checkbox class=\"example-margin\" [value]=\"route.key\" (change)=\"isAllSelected()\" [(ngModel)]=\"route.checked\">{{route.value}}</mat-checkbox>\r\n      </section>\r\n    </mat-card-content>\r\n    <mat-card-actions>\r\n        <button mat-button (click)=\"print()\">PRINT</button>\r\n        <button mat-button (click)=\"onNoClick()\">CANCEL</button>\r\n      </mat-card-actions>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/layout/leads/leads-routing.module.ts":
/*!******************************************************!*\
  !*** ./src/app/layout/leads/leads-routing.module.ts ***!
  \******************************************************/
/*! exports provided: LeadsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeadsRoutingModule", function() { return LeadsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _customers_customers_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customers/customers.component */ "./src/app/layout/leads/customers/customers.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        redirectTo: 'customers'
    },
    {
        path: 'customers',
        component: _customers_customers_component__WEBPACK_IMPORTED_MODULE_2__["CustomersComponent"]
    }
];
var LeadsRoutingModule = /** @class */ (function () {
    function LeadsRoutingModule() {
    }
    LeadsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LeadsRoutingModule);
    return LeadsRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/leads/leads.module.ts":
/*!**********************************************!*\
  !*** ./src/app/layout/leads/leads.module.ts ***!
  \**********************************************/
/*! exports provided: LeadsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LeadsModule", function() { return LeadsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _common_dsuite_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/dsuite.module */ "./src/app/layout/common/dsuite.module.ts");
/* harmony import */ var _payment_payment_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../payment/payment.module */ "./src/app/layout/payment/payment.module.ts");
/* harmony import */ var _leads_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./leads-routing.module */ "./src/app/layout/leads/leads-routing.module.ts");
/* harmony import */ var _customers_customers_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./customers/customers.component */ "./src/app/layout/leads/customers/customers.component.ts");
/* harmony import */ var _customers_customers_view_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./customers/customers-view.component */ "./src/app/layout/leads/customers/customers-view.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var LeadsModule = /** @class */ (function () {
    function LeadsModule() {
    }
    LeadsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_customers_customers_component__WEBPACK_IMPORTED_MODULE_5__["CustomersComponent"], _customers_customers_view_component__WEBPACK_IMPORTED_MODULE_6__["CustomersViewComponent"], _customers_customers_component__WEBPACK_IMPORTED_MODULE_5__["SheetPrintComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_8__["FormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTableModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatPaginatorModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatInputModule"],
                _leads_routing_module__WEBPACK_IMPORTED_MODULE_4__["LeadsRoutingModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatAutocompleteModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
                _common_dsuite_module__WEBPACK_IMPORTED_MODULE_2__["DsuiteModule"],
                _payment_payment_module__WEBPACK_IMPORTED_MODULE_3__["PaymentModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"]
            ],
            entryComponents: [_customers_customers_component__WEBPACK_IMPORTED_MODULE_5__["SheetPrintComponent"]]
        })
    ], LeadsModule);
    return LeadsModule;
}());



/***/ })

}]);
//# sourceMappingURL=leads-leads-module.js.map