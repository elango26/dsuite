(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["orders-orders-module"],{

/***/ "./src/app/layout/orders/deliveries/cons-view/cons-view.component.html":
/*!*****************************************************************************!*\
  !*** ./src/app/layout/orders/deliveries/cons-view/cons-view.component.html ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <div mat-dialog-title>\n  <h1>Consolidate View</h1>  \n  <h4>Route:</h4>\n  <h4>Date:</h4>\n</div> -->\n<h1 mat-dialog-title>Consolidate View  <span>Route: {{form_value.route}} | Date: {{form_value.date | date:'fullDate'}}</span></h1>\n<mat-form-field>\n  <mat-label>Filter</mat-label>\n  <input matInput tabindex=\"-1\" (keyup)=\"applyFilter($event)\" placeholder=\"Ex. Milk, SM\">\n</mat-form-field>\n\n<div class=\"\" mat-dialog-content>\n  <table mat-table [dataSource]=\"dataSource\" matSort>\n\n    <!-- ID Column -->\n    <ng-container matColumnDef=\"sno\">\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Sno </th>\n      <td mat-cell *matCellDef=\"let row;let i=index\"> {{i+1}} </td>\n    </ng-container>\n\n    <!-- Progress Column -->\n    <ng-container matColumnDef=\"category\">\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Category </th>\n      <td mat-cell *matCellDef=\"let row\"> {{row.products.category}} </td>\n    </ng-container>\n\n    <!-- Name Column -->\n    <ng-container matColumnDef=\"product\">\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Product Name </th>\n      <td mat-cell *matCellDef=\"let row\"> {{row.products.prod_name}} </td>\n    </ng-container>\n\n    <!-- Color Column -->\n    <ng-container matColumnDef=\"grade\">\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Grade </th>\n      <td mat-cell *matCellDef=\"let row\" [style.color]=\"row.color\"> {{row.count/row.products.quan_per_grade|round}} </td>\n    </ng-container>\n\n    <ng-container matColumnDef=\"piece\">\n      <th mat-header-cell *matHeaderCellDef mat-sort-header> Pieces </th>\n      <td mat-cell *matCellDef=\"let row\" [style.color]=\"row.color\"> {{row.count%row.products.quan_per_grade}} </td>\n    </ng-container>\n\n    <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n    <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\">\n    </tr>\n  </table>\n\n  <mat-paginator [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\n</div>\n<div mat-dialog-actions>\n  <button mat-raised-button (click)=\"onNoClick()\">Cancel</button>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/orders/deliveries/cons-view/cons-view.component.scss":
/*!*****************************************************************************!*\
  !*** ./src/app/layout/orders/deliveries/cons-view/cons-view.component.scss ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\ntd, th {\n  width: auto; }\n\nspan {\n  font-size: small;\n  font: menu; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L29yZGVycy9kZWxpdmVyaWVzL2NvbnMtdmlldy9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXG9yZGVyc1xcZGVsaXZlcmllc1xcY29ucy12aWV3XFxjb25zLXZpZXcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFXLEVBQ1o7O0FBRUQ7RUFDRSxnQkFBZTtFQUNmLFlBQVcsRUFDWjs7QUFFRDtFQUNFLFlBQVcsRUFDWjs7QUFFRDtFQUNFLGlCQUFnQjtFQUNoQixXQUFVLEVBQ1giLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvb3JkZXJzL2RlbGl2ZXJpZXMvY29ucy12aWV3L2NvbnMtdmlldy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gIH1cclxuICBcclxuICAubWF0LWZvcm0tZmllbGQge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgfVxyXG4gIFxyXG4gIHRkLCB0aCB7XHJcbiAgICB3aWR0aDogYXV0bztcclxuICB9XHJcblxyXG4gIHNwYW4ge1xyXG4gICAgZm9udC1zaXplOiBzbWFsbDtcclxuICAgIGZvbnQ6IG1lbnU7XHJcbiAgfSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/orders/deliveries/cons-view/cons-view.component.ts":
/*!***************************************************************************!*\
  !*** ./src/app/layout/orders/deliveries/cons-view/cons-view.component.ts ***!
  \***************************************************************************/
/*! exports provided: RoundPipe, ConsViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoundPipe", function() { return RoundPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsViewComponent", function() { return ConsViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/paginator */ "./node_modules/@angular/material/esm5/paginator.es5.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm5/sort.es5.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/esm5/table.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var RoundPipe = /** @class */ (function () {
    function RoundPipe() {
    }
    RoundPipe.prototype.transform = function (input) {
        return Math.floor(input);
    };
    RoundPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({ name: 'round' })
    ], RoundPipe);
    return RoundPipe;
}());

var ConsViewComponent = /** @class */ (function () {
    function ConsViewComponent(commonService, dialogRef, form_value) {
        this.commonService = commonService;
        this.dialogRef = dialogRef;
        this.form_value = form_value;
        this.displayedColumns = ['sno', 'category', 'product', 'grade', 'piece'];
        if (form_value.cons_data)
            this.consolidatedData = form_value.cons_data;
        //console.log(this.consolidatedData);
        this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](this.consolidatedData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = function (data, filter) {
            var accumulator = function (currentTerm, key) {
                return key === 'products' ? currentTerm + data[key].prod_name : currentTerm + data[key];
            };
            var dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
            // Transform the filter by converting it to lowercase and removing whitespace.
            var transformedFilter = filter.trim().toLowerCase();
            return dataStr.indexOf(transformedFilter) !== -1;
        };
    }
    ConsViewComponent.prototype.ngOnInit = function () {
    };
    ConsViewComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ConsViewComponent.prototype.applyFilter = function (event) {
        var filterValue = event.target.value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material_paginator__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], ConsViewComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material_sort__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        __metadata("design:type", _angular_material_sort__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], ConsViewComponent.prototype, "sort", void 0);
    ConsViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-cons-view',
            template: __webpack_require__(/*! ./cons-view.component.html */ "./src/app/layout/orders/deliveries/cons-view/cons-view.component.html"),
            styles: [__webpack_require__(/*! ./cons-view.component.scss */ "./src/app/layout/orders/deliveries/cons-view/cons-view.component.scss")]
        }),
        __param(2, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_5__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogRef"], Object])
    ], ConsViewComponent);
    return ConsViewComponent;
}());



/***/ }),

/***/ "./src/app/layout/orders/deliveries/deliveries.component.html":
/*!********************************************************************!*\
  !*** ./src/app/layout/orders/deliveries/deliveries.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form >\r\n<!-- <mat-card>\r\n    <mat-card-content>\r\n        <mat-chip-list aria-label=\"Orders\">         \r\n          <mat-chip color=\"accent\" *ngFor=\"let list of consolidatedList\">{{list.alias}}:{{list.count}}</mat-chip>\r\n        </mat-chip-list>\r\n    </mat-card-content>\r\n</mat-card> -->\r\n<mat-card>\r\n  <mat-card-title>\r\n    Deliveries\r\n    <mat-icon title=\"Print\" (click)=\"callPrintModal()\" class=\"print-right\">print</mat-icon>\r\n    <mat-icon title=\"Consolidated view\" (click)=\"showConsolidated()\" class=\"print-right\">assessment</mat-icon>\r\n  </mat-card-title>\r\n  <mat-card-content>\r\n    <!-- <button type=\"button\" mat-icon-button class=\"visible-md\" (click)=\"enableSearch=!enableSearch\">\r\n      <mat-icon aria-label=\"Side nav toggle icon\">search</mat-icon>\r\n    </button>-->\r\n    <section class=\"example-section\" [ngClass]=\"{'toggle':enableSearch}\" fxLayout=\"row\" fxLayout.lt-md=\"column\" fxFlex fxLayoutGap=\"20px\">\r\n        <span class=\"no-margin\"><mat-icon (click)=\"enableSearch = !enableSearch\">search</mat-icon></span>\r\n        <mat-form-field fxFlex class=\"\">\r\n            <input matInput name=\"searKey\" [(ngModel)]=\"searKey\" (keyup)=\"applyFilter()\" placeholder=\"Filter\">\r\n            <button mat-icon-button matSuffix (click)=\"clear()\">\r\n              <mat-icon>{{searKey?'clear':''}}</mat-icon>\r\n              </button>\r\n        </mat-form-field>\r\n        <mat-form-field fxFlex class=\"\">\r\n            <mat-select name=\"selRoute\" [(ngModel)]=\"selRoute\" (selectionChange)=\"addEvent()\" placeholder=\"Route\" >\r\n                <mat-option *ngFor=\"let r of routes\" [value]=\"r.key\">{{r.value}}</mat-option>\r\n            </mat-select>\r\n        </mat-form-field>\r\n        <mat-form-field fxFlex class=\"\">\r\n          <input matInput disabled [max]=\"maxToDate\" [matDatepicker]=\"picker\" placeholder=\"Choose a date\" name=\"delDate\" (dateInput)=\"addEvent()\" [(ngModel)]=\"delDate\">\r\n          <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n          <mat-datepicker disabled=\"false\" #picker></mat-datepicker>\r\n        </mat-form-field>\r\n    </section> \r\n    <!-- <mat-accordion class=\"example-headers-align\" fxLayout=\"column\">\r\n      <mat-expansion-panel class=\"search-panel\" hideToggle>\r\n        <mat-expansion-panel-header>\r\n          <mat-panel-title>\r\n            Search\r\n          </mat-panel-title>\r\n          <mat-panel-description>\r\n            <span>&nbsp;</span>\r\n            <mat-icon>find_in_page</mat-icon>\r\n          </mat-panel-description>\r\n        </mat-expansion-panel-header>\r\n          <mat-form-field fxFlex class=\"\">\r\n              <input matInput name=\"searKey\" [(ngModel)]=\"searKey\" (keyup)=\"addEvent()\" placeholder=\"Filter\">\r\n              <button mat-icon-button matSuffix (click)=\"clear()\">\r\n                <mat-icon>{{searKey?'clear':''}}</mat-icon>\r\n              </button>\r\n          </mat-form-field>\r\n          <mat-form-field fxFlex class=\"\">\r\n              <mat-select name=\"selRoute\" [(ngModel)]=\"selRoute\" (selectionChange)=\"addEvent()\" placeholder=\"Route\" >\r\n                  <mat-option *ngFor=\"let r of routes\" [value]=\"r.key\">{{r.value}}</mat-option>\r\n              </mat-select>\r\n          </mat-form-field>\r\n          <mat-form-field fxFlex class=\"\">\r\n            <input matInput disabled [max]=\"maxToDate\" [matDatepicker]=\"picker\" placeholder=\"Choose a date\" name=\"delDate\" (dateInput)=\"addEvent()\" [(ngModel)]=\"delDate\">\r\n            <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n            <mat-datepicker disabled=\"false\" #picker></mat-datepicker>\r\n          </mat-form-field>\r\n      </mat-expansion-panel>\r\n    </mat-accordion> -->\r\n    <mat-accordion class=\"example-headers-align\" fxLayout=\"column\">\r\n      <ng-container *ngFor=\"let row of (deliveryList|async);let i = index\">\r\n        <mat-expansion-panel [expanded]=\"step === i\" (opened)=\"setStep(i)\" >            \r\n          <mat-expansion-panel-header>\r\n            <mat-panel-title >\r\n              {{row._id.customer.customerName}}\r\n              <span class=\"cus-title\">-{{row._id.customer.routes[0].areaName}}</span>\r\n            </mat-panel-title>\r\n            <mat-panel-description>\r\n              <span>&nbsp;</span>\r\n              <span *ngIf=\"row._id.orders\">Order Received</span>\r\n              <mat-icon>account_circle</mat-icon>\r\n            </mat-panel-description>\r\n          </mat-expansion-panel-header>\r\n          <mat-chip-list *ngIf=\"row._id.orders\">\r\n              <mat-chip *ngFor=\"let order of row.details\">{{order.products.prod_name}}: <span class=\"highlight-text\">{{order.prod_quan}}</span> </mat-chip>                                           \r\n          </mat-chip-list>   \r\n          <div class=\"example-button-row\">        \r\n            <button mat-stroked-button color=\"warn\" (click)=\"editOrder(i,row)\">Edit</button>      \r\n          </div> \r\n          <mat-action-row>\r\n            <button mat-button color=\"warn\" *ngIf=\"i!=0\" (click)=\"prevStep()\">Previous</button>\r\n            <button mat-button color=\"primary\" *ngIf=\"i != deliveryList.length - 1\" (click)=\"nextStep()\">Next</button>\r\n          </mat-action-row> \r\n        </mat-expansion-panel>\r\n      </ng-container>\r\n    </mat-accordion>\r\n    <br>\r\n    <button mat-raised-button color=\"primary\" [disabled]=\"!enablePlaceOrder()\" (click)=\"placeOrder()\">Place Order</button>\r\n  </mat-card-content>\r\n</mat-card>\r\n</form>"

/***/ }),

/***/ "./src/app/layout/orders/deliveries/deliveries.component.scss":
/*!********************************************************************!*\
  !*** ./src/app/layout/orders/deliveries/deliveries.component.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\n.example-section {\n  align-content: center;\n  align-items: center;\n  background-color: #E8F1FF;\n  padding: 10px 15px;\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  margin-bottom: 8px; }\n\n.example-margin {\n  margin: 10px; }\n\n.example-button-row {\n  margin-top: 0.4em; }\n\n.example-headers-align .mat-expansion-panel-header-title,\n.example-headers-align .mat-expansion-panel-header-description {\n  flex-basis: 0; }\n\n.example-headers-align .mat-expansion-panel-header-description {\n  justify-content: space-between;\n  align-items: center; }\n\n.print-right {\n  float: right;\n  cursor: pointer; }\n\n.highlight-text {\n  padding-left: 4px;\n  color: #3f51b5;\n  font-size: medium;\n  text-shadow: 1px 1px #fff;\n  font-weight: bold; }\n\n.cus-title {\n  font-size: 0.6em;\n  color: grey; }\n\n.cus-title ::before {\n    content: \"\\a\";\n    white-space: pre; }\n\n.visible-md {\n  display: none; }\n\n.no-margin {\n  margin-bottom: 0 !important; }\n\n@media screen and (max-width: 992px) {\n  .visible-md {\n    display: block; }\n  .toggle .mat-form-field {\n    display: none; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L29yZGVycy9kZWxpdmVyaWVzL0M6XFxsb2NhbGRpc2tcXG15d29ya1xcZHN1aXRlXFxjbGllbnQvc3JjXFxhcHBcXGxheW91dFxcb3JkZXJzXFxkZWxpdmVyaWVzXFxkZWxpdmVyaWVzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0ksZ0JBQWU7RUFDZixZQUFXLEVBQ2Q7O0FBR0Q7RUFFSSxzQkFBcUI7RUFDckIsb0JBQW1CO0VBRW5CLDBCQUF5QjtFQUN6QixtQkFBa0I7RUFDbEIsZ0hBQW1HO0VBQ25HLG1CQUFrQixFQUNyQjs7QUFFRDtFQUNJLGFBQVksRUFDZjs7QUFFRDtFQUNJLGtCQUFpQixFQUNwQjs7QUFFRDs7RUFFRSxjQUFhLEVBQ2Q7O0FBRUQ7RUFDRSwrQkFBOEI7RUFDOUIsb0JBQW1CLEVBQ3BCOztBQUVEO0VBQ0UsYUFBYTtFQUNiLGdCQUFnQixFQUNqQjs7QUFFRDtFQUNFLGtCQUFpQjtFQUNqQixlQUFjO0VBQ2Qsa0JBQWlCO0VBQ2pCLDBCQUF5QjtFQUN6QixrQkFBaUIsRUFDbEI7O0FBRUQ7RUFDRSxpQkFBZ0I7RUFDaEIsWUFBVyxFQUtaOztBQVBEO0lBSUUsY0FBYTtJQUNiLGlCQUFnQixFQUNmOztBQUdIO0VBQ0UsY0FBYSxFQUNkOztBQUVEO0VBQ0UsNEJBQTRCLEVBQzdCOztBQUVEO0VBQ0U7SUFDSSxlQUFjLEVBQ2pCO0VBRUQ7SUFFSSxjQUFZLEVBQ2IsRUFBQSIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9vcmRlcnMvZGVsaXZlcmllcy9kZWxpdmVyaWVzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbi5tYXQtZm9ybS1maWVsZCB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuXHJcbi5leGFtcGxlLXNlY3Rpb24ge1xyXG4gICAgLy9kaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIC8vIGhlaWdodDogNjBweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNFOEYxRkY7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XHJcbiAgICBib3gtc2hhZG93OiAwIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKSwgMCAycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLCAwIDFweCA1cHggMCByZ2JhKDAsMCwwLC4xMik7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbn1cclxuXHJcbi5leGFtcGxlLW1hcmdpbiB7XHJcbiAgICBtYXJnaW46IDEwcHg7XHJcbn1cclxuXHJcbi5leGFtcGxlLWJ1dHRvbi1yb3cge1xyXG4gICAgbWFyZ2luLXRvcDogMC40ZW07XHJcbn1cclxuXHJcbi5leGFtcGxlLWhlYWRlcnMtYWxpZ24gLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyLXRpdGxlLFxyXG4uZXhhbXBsZS1oZWFkZXJzLWFsaWduIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlci1kZXNjcmlwdGlvbiB7XHJcbiAgZmxleC1iYXNpczogMDtcclxufVxyXG5cclxuLmV4YW1wbGUtaGVhZGVycy1hbGlnbiAubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXItZGVzY3JpcHRpb24ge1xyXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG59XHJcblxyXG4ucHJpbnQtcmlnaHR7XHJcbiAgZmxvYXQgOiByaWdodDtcclxuICBjdXJzb3IgOiBwb2ludGVyO1xyXG59XHJcblxyXG4uaGlnaGxpZ2h0LXRleHQge1xyXG4gIHBhZGRpbmctbGVmdDogNHB4O1xyXG4gIGNvbG9yOiAjM2Y1MWI1O1xyXG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xyXG4gIHRleHQtc2hhZG93OiAxcHggMXB4ICNmZmY7XHJcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbn1cclxuXHJcbi5jdXMtdGl0bGV7XHJcbiAgZm9udC1zaXplOiAwLjZlbTtcclxuICBjb2xvcjogZ3JleTtcclxuICA6OmJlZm9yZXtcclxuICBjb250ZW50OiBcIlxcYVwiO1xyXG4gIHdoaXRlLXNwYWNlOiBwcmU7ICBcclxuICB9XHJcbn1cclxuXHJcbi52aXNpYmxlLW1kIHtcclxuICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4ubm8tbWFyZ2lue1xyXG4gIG1hcmdpbi1ib3R0b20gOiAwICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MnB4KSB7XHJcbiAgLnZpc2libGUtbWQge1xyXG4gICAgICBkaXNwbGF5OiBibG9jaztcclxuICB9XHJcblxyXG4gIC50b2dnbGUge1xyXG4gICAgLm1hdC1mb3JtLWZpZWxkIHtcclxuICAgICAgZGlzcGxheTpub25lO1xyXG4gICAgfVxyXG4gIH1cclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/orders/deliveries/deliveries.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/layout/orders/deliveries/deliveries.component.ts ***!
  \******************************************************************/
/*! exports provided: DeliveriesComponent, DeliveriesPrintComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveriesComponent", function() { return DeliveriesComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DeliveriesPrintComponent", function() { return DeliveriesPrintComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _common_prodtable_prodtable_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/prodtable/prodtable.component */ "./src/app/layout/common/prodtable/prodtable.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_services_bootstrap_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/bootstrap.service */ "./src/app/services/bootstrap.service.ts");
/* harmony import */ var src_app_services_printer_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/printer.service */ "./src/app/services/printer.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _cons_view_cons_view_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cons-view/cons-view.component */ "./src/app/layout/orders/deliveries/cons-view/cons-view.component.ts");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! src/app/services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







//import { RouteObj } from 'src/app/interfaces/route';





//import { ConfirmPopComponent } from 'src/app/app-material/confirm-pop/confirm-pop.component';
var DeliveriesComponent = /** @class */ (function () {
    //confirmBox: string = "YES";
    function DeliveriesComponent(datePipe, commonService, dialog, bootstrap, printerService, router, userservice, snackBar) {
        this.datePipe = datePipe;
        this.commonService = commonService;
        this.dialog = dialog;
        this.bootstrap = bootstrap;
        this.printerService = printerService;
        this.router = router;
        this.userservice = userservice;
        this.snackBar = snackBar;
        this.selRoute = "all";
        this.searKey = "";
        this.step = 0;
        this.deliveryList = new rxjs__WEBPACK_IMPORTED_MODULE_11__["BehaviorSubject"](null);
        this.enableSearch = false;
        this.router.events.subscribe(function (val) {
            if (val instanceof _angular_router__WEBPACK_IMPORTED_MODULE_8__["NavigationEnd"] && window.innerWidth <= 992) {
                //this.enableSearch = false;
            }
        });
        this.delDate = new Date();
    }
    DeliveriesComponent.prototype.setStep = function (index) {
        //console.log(index);
        this.step = index;
    };
    DeliveriesComponent.prototype.nextStep = function () {
        this.step++;
    };
    DeliveriesComponent.prototype.prevStep = function () {
        this.step--;
    };
    DeliveriesComponent.prototype.ngOnInit = function () {
        this.routes = this.bootstrap.routes.map(function (val) {
            return {
                key: val._id,
                value: val.areaName
            };
        });
        this.routes.push({ key: 'all', value: 'All' });
        this.addEvent();
        var tdy = new Date();
        tdy.setDate(tdy.getDate() + 1);
        this.maxToDate = tdy;
    };
    DeliveriesComponent.prototype.addEvent = function () {
        var q = '?order_date=' + this.datePipe.transform(this.delDate, "yyyy-MM-dd") + "&route=" + this.selRoute;
        //let q = '?order_date='+this.datePipe.transform(this.delDate,"yyyy-MM-dd")+"&route="+this.selRoute+"&search_key="+this.searKey;
        this.loadDelivers(q);
        //this.loadConsolidatedOrders(q);
    };
    DeliveriesComponent.prototype.loadDelivers = function (query) {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].urls.getDeliveries + query).subscribe(function (data) {
            _this.searDeliveryList = data;
            _this.applyFilter();
            //this.deliveryList.next(this.tempDeliveryList);
        });
    };
    // private loadConsolidatedOrders(query:string){
    //   this.commonService.getMethod(environment.urls.getConsolidatedOrderList+query).subscribe((data:any[])=>{  
    //     this.consolidatedList = data;    
    //     //this.generateCosolidatedList(data);
    //   });
    // }
    // private generateCosolidatedList(consList:any[]){
    //   //console.log("Product list");
    //   let list = this.commonService.getProductList();
    //   for(let key in list){
    //     let count = consList.find(cons => cons._id == list[key]._id);
    //     if(count){
    //       list[key]['count'] = count.count;
    //     }else{
    //       list[key]['count'] = 0;
    //     }
    //   }
    //   //console.log(list);
    //   this.consolidatedList = list;
    // }  
    DeliveriesComponent.prototype.showConsolidated = function () {
        var _this = this;
        var q = '?order_date=' + this.datePipe.transform(this.delDate, "yyyy-MM-dd") + "&route=" + this.selRoute + "&search_key=" + this.searKey;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].urls.getConsolidatedOrderList + q).subscribe(function (data) {
            _this.consolidatedList = data;
            var route = _this.routes.filter(function (r) { return r.key == _this.selRoute; })[0].value;
            var dialogRef = _this.dialog.open(_cons_view_cons_view_component__WEBPACK_IMPORTED_MODULE_9__["ConsViewComponent"], {
                width: '90%',
                // height:'100%',
                data: { cons_data: _this.consolidatedList, route: route, date: _this.delDate },
            });
            dialogRef.afterClosed().subscribe(function (result) {
                //reload
                //this.addEvent();
            });
        });
    };
    DeliveriesComponent.prototype.clear = function () {
        this.searKey = '';
        //this.addEvent();
        this.applyFilter();
    };
    DeliveriesComponent.prototype.applyFilter = function () {
        var _this = this;
        this.tempDeliveryList = this.searDeliveryList;
        if (this.searKey != '') {
            this.tempDeliveryList = this.searDeliveryList.filter(function (val) { return val._id.customer.customerName.toLowerCase().indexOf(_this.searKey.toLowerCase()) > -1; });
        }
        this.deliveryList.next(this.tempDeliveryList);
        //let dataList = this.tempDeliveryList;
        //this.deliveryList = dataList.filter((list:any)=>{
        //this.deliveryList = new BehaviorSubject(dataList.filter(list => list._id.customer.customerName.toLowerCase().indexOf(filterValue.toLowerCase()) > -1));
    };
    DeliveriesComponent.prototype.enablePlaceOrder = function () {
        if (this.userservice.user && this.userservice.user.role == "ADMIN") {
            return true;
        }
        else {
            return this.datePipe.transform(this.delDate, "yyyy-MM-dd") == this.datePipe.transform(new Date(), "yyyy-MM-dd");
        }
    };
    DeliveriesComponent.prototype.editOrder = function (index, o) {
        var _this = this;
        // console.log(this.tempDeliveryList[index]);
        // this.tempDeliveryList[index].details[0].prod_quan = 10;
        // this.deliveryList.next(this.tempDeliveryList);
        var isEdit = false;
        if (o._id.orders) {
            isEdit = true;
        }
        var dialogRef = this.dialog.open(_common_prodtable_prodtable_component__WEBPACK_IMPORTED_MODULE_3__["ProdtableComponent"], {
            //width: '90%',
            //height:'80%',
            data: { order_date: this.delDate, order_details: o._id.orders, customer: o._id.customer, edit_details: o.details, url: src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].urls.postOrder, isEdit: isEdit, source: 'delivery' },
            panelClass: 'custom-modalbox'
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //reload
            //console.log(result);
            if (result) {
                //console.log('yes');
                if (result.details) { // assign values if details avail
                    _this.tempDeliveryList[index].details = result.details;
                    _this.tempDeliveryList[index]._id.orders = result.orders;
                }
                else { // if empty assign with empty default values
                    delete _this.tempDeliveryList[index]._id.orders;
                    _this.tempDeliveryList[index].details[0] = {};
                }
                //console.log(this.tempDeliveryList);
                _this.deliveryList.next(_this.tempDeliveryList);
            }
            //this.addEvent();
        });
    };
    DeliveriesComponent.prototype.placeOrder = function () {
        var _this = this;
        if (confirm('Make sure all the orders are delivered correctly, if yes click ok')) {
            var data = {
                "orderdate": this.datePipe.transform(this.delDate, "yyyy-MM-dd"),
                "customerid": "all"
            };
            //environment.urls.postOrderSales
            this.commonService.postMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].urls.postOrderSales, data).subscribe(function (data) {
                if (data.code == 200) {
                    _this.snackBar.open(data.message, "Success", {
                        duration: 1000,
                    });
                    //redirect to dashboard
                    _this.router.navigate(['/layout/dashboard'], { skipLocationChange: true });
                    //this.addEvent(); // commentted due to unwanted load time in deliveries page
                }
                else {
                    _this.snackBar.open(data.message, "Error", {
                        duration: 1000,
                    });
                }
            });
        }
    };
    DeliveriesComponent.prototype.callPrintModal = function () {
        var _this = this;
        console.log('printer called');
        var dialogRef = this.dialog.open(DeliveriesPrintComponent, {
            width: '400px',
        });
        dialogRef.afterClosed().subscribe(function (result) {
            var q = result.data.map(function (obj) {
                return obj.key;
            }).join(",");
            var route_name = result.data.map(function (obj) {
                return obj.value;
            }).join(",");
            var query = '?order_date=' + _this.datePipe.transform(_this.delDate, "yyyy-MM-dd") + "&route=" + q;
            _this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].urls.getDeliveries + query).subscribe(function (data) {
                data['route'] = route_name;
                _this.printerService.printData = {
                    redirectUrl: '/orders',
                    format: 'report',
                    data: data,
                    type: 'SALES',
                    date: _this.delDate
                };
                _this.router.navigate(['/layout', { outlets: { printpage: 'printview' } }], { skipLocationChange: true });
            });
        });
    };
    DeliveriesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-deliveries',
            template: __webpack_require__(/*! ./deliveries.component.html */ "./src/app/layout/orders/deliveries/deliveries.component.html"),
            styles: [__webpack_require__(/*! ./deliveries.component.scss */ "./src/app/layout/orders/deliveries/deliveries.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"], src_app_services_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialog"], src_app_services_bootstrap_service__WEBPACK_IMPORTED_MODULE_6__["BootstrapService"],
            src_app_services_printer_service__WEBPACK_IMPORTED_MODULE_7__["PrinterService"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["Router"], src_app_services_user_service__WEBPACK_IMPORTED_MODULE_10__["UserService"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"]])
    ], DeliveriesComponent);
    return DeliveriesComponent;
}());

var DeliveriesPrintComponent = /** @class */ (function () {
    function DeliveriesPrintComponent(bootstrap, snackBar, dialogRef) {
        this.bootstrap = bootstrap;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
        this.masterCheck = false;
    }
    DeliveriesPrintComponent.prototype.ngOnInit = function () {
        this.routes = this.bootstrap.routes.map(function (val) {
            return {
                checked: false,
                key: val._id,
                value: val.areaName
            };
        });
    };
    DeliveriesPrintComponent.prototype.isAllSelected = function () {
        this.masterCheck = this.routes.every(function (item) {
            return item.checked == true;
        });
    };
    DeliveriesPrintComponent.prototype.checkUncheckAll = function () {
        var _this = this;
        this.routes.forEach(function (obj) {
            obj.checked = _this.masterCheck;
        });
    };
    DeliveriesPrintComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    DeliveriesPrintComponent.prototype.print = function () {
        var selectedList = this.routes.filter(function (obj) {
            return obj.checked == true;
        });
        this.dialogRef.close({ data: selectedList });
    };
    DeliveriesPrintComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'print-deliveries',
            template: __webpack_require__(/*! ./print-deliveries.component.html */ "./src/app/layout/orders/deliveries/print-deliveries.component.html"),
            styles: [__webpack_require__(/*! ./deliveries.component.scss */ "./src/app/layout/orders/deliveries/deliveries.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_bootstrap_service__WEBPACK_IMPORTED_MODULE_6__["BootstrapService"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSnackBar"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDialogRef"]])
    ], DeliveriesPrintComponent);
    return DeliveriesPrintComponent;
}());



/***/ }),

/***/ "./src/app/layout/orders/deliveries/print-deliveries.component.html":
/*!**************************************************************************!*\
  !*** ./src/app/layout/orders/deliveries/print-deliveries.component.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n    <mat-card-content>\r\n      <h2 class=\"example-h2\">Please select the route</h2>\r\n    \r\n      <section class=\"\">\r\n        <mat-checkbox class=\"example-margin\" value=\"all\" (change)=\"checkUncheckAll()\" [(ngModel)]=\"masterCheck\">All</mat-checkbox>\r\n      </section>\r\n      <section class=\"\" *ngFor=\"let route of routes\">\r\n        <mat-checkbox class=\"example-margin\" [value]=\"route.key\" (change)=\"isAllSelected()\" [(ngModel)]=\"route.checked\">{{route.value}}</mat-checkbox>\r\n      </section>\r\n    </mat-card-content>\r\n    <mat-card-actions>\r\n        <button mat-button (click)=\"print()\">PRINT</button>\r\n        <button mat-button (click)=\"onNoClick()\">CANCEL</button>\r\n      </mat-card-actions>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/layout/orders/orders-routing.module.ts":
/*!********************************************************!*\
  !*** ./src/app/layout/orders/orders-routing.module.ts ***!
  \********************************************************/
/*! exports provided: OrdersRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersRoutingModule", function() { return OrdersRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _deliveries_deliveries_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deliveries/deliveries.component */ "./src/app/layout/orders/deliveries/deliveries.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'deliveries'
    },
    {
        path: 'deliveries',
        component: _deliveries_deliveries_component__WEBPACK_IMPORTED_MODULE_2__["DeliveriesComponent"]
    }
];
var OrdersRoutingModule = /** @class */ (function () {
    function OrdersRoutingModule() {
    }
    OrdersRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], OrdersRoutingModule);
    return OrdersRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/orders/orders.module.ts":
/*!************************************************!*\
  !*** ./src/app/layout/orders/orders.module.ts ***!
  \************************************************/
/*! exports provided: OrdersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrdersModule", function() { return OrdersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _orders_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./orders-routing.module */ "./src/app/layout/orders/orders-routing.module.ts");
/* harmony import */ var _deliveries_deliveries_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deliveries/deliveries.component */ "./src/app/layout/orders/deliveries/deliveries.component.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/sort */ "./node_modules/@angular/material/esm5/sort.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _angular_material_expansion__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/expansion */ "./node_modules/@angular/material/esm5/expansion.es5.js");
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/chips */ "./node_modules/@angular/material/esm5/chips.es5.js");
/* harmony import */ var _common_dsuite_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../common/dsuite.module */ "./src/app/layout/common/dsuite.module.ts");
/* harmony import */ var _deliveries_cons_view_cons_view_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./deliveries/cons-view/cons-view.component */ "./src/app/layout/orders/deliveries/cons-view/cons-view.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var OrdersModule = /** @class */ (function () {
    function OrdersModule() {
    }
    OrdersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_deliveries_deliveries_component__WEBPACK_IMPORTED_MODULE_3__["DeliveriesComponent"], _deliveries_deliveries_component__WEBPACK_IMPORTED_MODULE_3__["DeliveriesPrintComponent"], _deliveries_cons_view_cons_view_component__WEBPACK_IMPORTED_MODULE_13__["ConsViewComponent"], _deliveries_cons_view_cons_view_component__WEBPACK_IMPORTED_MODULE_13__["RoundPipe"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _orders_routing_module__WEBPACK_IMPORTED_MODULE_2__["OrdersRoutingModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatAutocompleteModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSlideToggleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCheckboxModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatNativeDateModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSelectModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatSliderModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTableModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButtonModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_8__["MatSnackBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatPaginatorModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"].withConfig({ addFlexToParent: false }),
                _angular_material_expansion__WEBPACK_IMPORTED_MODULE_10__["MatExpansionModule"],
                _angular_material_chips__WEBPACK_IMPORTED_MODULE_11__["MatChipsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTooltipModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                _angular_material_sort__WEBPACK_IMPORTED_MODULE_7__["MatSortModule"],
                _common_dsuite_module__WEBPACK_IMPORTED_MODULE_12__["DsuiteModule"]
            ],
            providers: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DatePipe"]],
            entryComponents: [_deliveries_deliveries_component__WEBPACK_IMPORTED_MODULE_3__["DeliveriesPrintComponent"], _deliveries_cons_view_cons_view_component__WEBPACK_IMPORTED_MODULE_13__["ConsViewComponent"]]
        })
    ], OrdersModule);
    return OrdersModule;
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



/***/ })

}]);
//# sourceMappingURL=orders-orders-module.js.map