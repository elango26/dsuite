(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["discounts-discounts-module"],{

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

/***/ "./src/app/layout/discounts/category/category.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/layout/discounts/category/category.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card *ngIf=\"!editView\">\n  <mat-card-header>\n      <mat-card-title>Discounts List</mat-card-title>\n  </mat-card-header>\n  <mat-card-content>\n      <section class=\"example-section\">\n          <mat-form-field class=\"example-margin\">\n              <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\n          </mat-form-field>\n          <mat-form-field class=\"example-margin\">\n              <mat-select placeholder=\"Route\" >\n                  <mat-option value=\"1\">Option 1</mat-option>\n                  <mat-option value=\"2\">Option 2</mat-option>\n                  <mat-option value=\"3\">Option 3</mat-option>\n              </mat-select>\n          </mat-form-field>\n      </section>\n  </mat-card-content>\n\n  <div class=\"mat-elevation-z8\">\n  <table mat-table [dataSource]=\"dataSource\" matSort>\n      <ng-container matColumnDef=\"sno\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Sno </th>\n        <td mat-cell *matCellDef=\"let row;let i = index\" > {{i + 1}} </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"discount_name\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Name & Type </th>\n        <td mat-cell *matCellDef=\"let row\"> {{row.discount_name +'-'+row.discount_type}} </td>\n      </ng-container>\n\n      <!-- Color Column -->\n      <ng-container matColumnDef=\"buy_product\">\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Buy Product </th>\n              <td mat-cell *matCellDef=\"let row\"> {{row.buy_product[0].prod_name +'-'+row.buy_count}} <i>unit</i> </td>\n          </ng-container>\n\n      <!-- Name Column -->\n      <ng-container matColumnDef=\"free_product\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Free Product </th>\n          <td mat-cell *matCellDef=\"let row\"> {{row.free_product[0].prod_name +'-'+row.free_count}} <i>unit</i> </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"period\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Period </th>\n          <td mat-cell *matCellDef=\"let row\" > {{row.from_date | date:'mediumDate'}} - {{row.to_date | date:'mediumDate'}}</td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"actions\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Actions </th>\n        <td mat-cell *matCellDef=\"let row\" > <p class=\"display-inline\">\n          <mat-icon class=\"print\" (click)=\"editDiscount(row)\">edit</mat-icon>\n          <!-- <mat-icon class=\"print\" (click)=\"print(row.sale_id)\">list</mat-icon> -->\n          </p>\n        </td>\n      </ng-container>\n      \n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n  </table>\n\n  <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\n  </div>\n\n  <div class=\"clearpix\"> \n    <button mat-raised-button color =\"primary\" (click)=\"openDialog()\">Add New</button>\n  </div>\n</mat-card>\n<!-- Edit view -->\n<!-- <app-edit-template *ngIf=\"editView\" (closeEditPage)=\"backToReport($event)\" [data]=\"editData\"></app-edit-template> -->\n"

/***/ }),

/***/ "./src/app/layout/discounts/category/category.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/layout/discounts/category/category.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\ntd,\nth {\n  width: auto; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n.print {\n  cursor: pointer; }\n\n.display-inline {\n  display: inline-flex; }\n\n.clearpix {\n  margin-top: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2Rpc2NvdW50cy9jYXRlZ29yeS9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXGRpc2NvdW50c1xcY2F0ZWdvcnlcXGNhdGVnb3J5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBVyxFQUNkOztBQUVEO0VBQ0ksZ0JBQWU7RUFDZixZQUFXLEVBQ2Q7O0FBRUQ7O0VBRUksWUFBVyxFQUNkOztBQUVEO0VBQ0ksY0FBYTtFQUNiLHNCQUFxQjtFQUNyQixvQkFBbUI7RUFDbkIsYUFBWSxFQUNmOztBQUVEO0VBQ0ksYUFBWSxFQUNmOztBQUVEO0VBQ0ksZ0JBQWUsRUFDbEI7O0FBRUQ7RUFDSSxxQkFBb0IsRUFDdkI7O0FBRUQ7RUFDSSxpQkFBZ0IsRUFDbkIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvZGlzY291bnRzL2NhdGVnb3J5L2NhdGVnb3J5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5tYXQtZm9ybS1maWVsZCB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxudGQsXHJcbnRoIHtcclxuICAgIHdpZHRoOiBhdXRvO1xyXG59XHJcblxyXG4uZXhhbXBsZS1zZWN0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiA2MHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1tYXJnaW4ge1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG59XHJcblxyXG4ucHJpbnR7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbi5kaXNwbGF5LWlubGluZXtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG59XHJcblxyXG4uY2xlYXJwaXgge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/layout/discounts/category/category.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/layout/discounts/category/category.component.ts ***!
  \*****************************************************************/
/*! exports provided: CategoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryComponent", function() { return CategoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_services_printer_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/printer.service */ "./src/app/services/printer.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_material_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../app-material/common-modal/common-modal.component */ "./src/app/app-material/common-modal/common-modal.component.ts");
/* harmony import */ var src_app_constants_contants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/constants/contants */ "./src/app/constants/contants.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(commonService, dialog, printerService, router) {
        this.commonService = commonService;
        this.dialog = dialog;
        this.printerService = printerService;
        this.router = router;
        this.displayedColumns = ['sno', 'discount_name', 'buy_product', 'free_product', 'period', 'actions'];
        this.editView = false;
    }
    CategoryComponent.prototype.ngOnInit = function () {
        this.loadDiscounts();
    };
    CategoryComponent.prototype.loadDiscounts = function () {
        var _this = this;
        //discountList
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.discountList).subscribe(function (data) {
            _this.salesList = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.salesList);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    CategoryComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    CategoryComponent.prototype.editSales = function (row) {
        this.editView = true;
        this.editData = row;
    };
    CategoryComponent.prototype.backToReport = function (e) {
        this.editView = false;
        this.loadDiscounts();
    };
    CategoryComponent.prototype.prepareJson = function () {
        this.products = this.commonService.getProductList();
        this.customers = this.commonService.getCustomerList();
        var custom_arr = this.customers.map(function (obj) { return { key: obj.customer_id, value: obj.customerName + '-' + obj.routes.areaName }; });
        custom_arr.unshift({ key: 'all', value: 'All' });
        var form_details = [{
                "order": 1,
                "type": "select",
                "inputType": "dropdown",
                "name": "buy_prod_id",
                "value": "",
                "placeholder": "Product to Buy",
                "validation": {
                    "required": true
                },
                "options": this.products.map(function (obj) { return { key: obj._id, value: obj.prod_name }; })
            }, {
                "order": 2,
                "type": "input",
                "inputType": "number",
                "name": "buy_count",
                "value": "",
                "placeholder": "Buy Count",
                "validation": {
                    "required": true
                }
            }, {
                "order": 3,
                "type": "select",
                "inputType": "dropdown",
                "name": "free_prod_id",
                "value": "",
                "placeholder": "Product to Offer",
                "validation": {
                    "required": true
                },
                "options": this.products.map(function (obj) { return { key: obj._id, value: obj.prod_name }; })
            }, {
                "order": 4,
                "type": "input",
                "inputType": "number",
                "name": "free_count",
                "value": "",
                "placeholder": "Units to offer",
                "validation": {
                    "required": true
                }
            }, {
                "order": 5,
                "type": "select",
                "inputType": "dropdown",
                "name": "discount_type",
                "value": "",
                "placeholder": "Discount Type",
                "validation": {
                    "required": true
                },
                "options": src_app_constants_contants__WEBPACK_IMPORTED_MODULE_7__["DISCOUNT_TYPE"].discount_type.map(function (val) { return { key: val, value: val }; })
            }, {
                "order": 6,
                "type": "input",
                "inputType": "text",
                "name": "discount_name",
                "value": "",
                "placeholder": "Discount Name",
                "validation": {
                    "required": true
                }
            }, {
                "order": 7,
                "type": "multiple",
                "inputType": "dropdown",
                "name": "applicable_type",
                "value": "",
                "placeholder": "Applicable Rate Type",
                "validation": {
                    "required": true
                },
                "options": src_app_constants_contants__WEBPACK_IMPORTED_MODULE_7__["RATE_TYPE"].rate_type.map(function (val) { return { key: val, value: val }; })
            }, {
                "order": 8,
                "type": "multiple",
                "inputType": "dropdown",
                "name": "applicable_customer",
                "value": "",
                "placeholder": "Applicable Customers",
                "validation": {
                    "required": true
                },
                "options": custom_arr
            }, {
                "order": 9,
                "type": "date",
                "inputType": "date",
                "name": "from_date",
                "value": "",
                "placeholder": "From Date",
                "min_date": new Date(),
                "validation": {
                    "required": true
                }
            }, {
                "order": 10,
                "type": "date",
                "inputType": "date",
                "name": "to_date",
                "value": "",
                "placeholder": "To Date",
                "min_date": new Date(),
                "validation": {
                    "required": true
                }
            }];
        return form_details;
    };
    CategoryComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(_app_material_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_6__["CommonModalComponent"], {
            width: '600px',
            data: { formData: this.prepareJson().sort(function (a, b) { return a.order - b.order; }), formTitle: "Discount Creation", url: src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.discountCreate, method: 'POST' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //reload
            _this.loadDiscounts();
        });
    };
    CategoryComponent.prototype.editDiscount = function (row) {
        var _this = this;
        //console.log(row);
        var form_detail = this.prepareJson();
        form_detail.map(function (inp) {
            if (inp.name == 'from_date') {
                inp.min_date = row[inp.name];
                inp.validation.required = false;
            }
            inp.value = row[inp.name];
        });
        form_detail.push({
            "order": 11,
            "type": "select",
            "inputType": "dropdown",
            "name": "is_active",
            "value": row['is_active'],
            "placeholder": "Is Active",
            "validation": {
                "required": true
            },
            "options": [{ key: 'YES', value: 'YES' }, { key: 'NO', value: 'NO' }]
        });
        form_detail.push({
            "order": 0,
            "type": "input",
            "inputType": "hidden",
            "name": "_id",
            "value": row._id,
            "placeholder": "_ID",
            "validation": {
                "required": true
            }
        });
        var dialogRef = this.dialog.open(_app_material_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_6__["CommonModalComponent"], {
            width: '600px',
            data: { formData: form_detail.sort(function (a, b) { return a.order - b.order; }), formTitle: "Discount Edit", url: src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.discountUpdate, method: 'PUT' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //reload
            _this.loadDiscounts();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], CategoryComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], CategoryComponent.prototype, "sort", void 0);
    CategoryComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-category',
            template: __webpack_require__(/*! ./category.component.html */ "./src/app/layout/discounts/category/category.component.html"),
            styles: [__webpack_require__(/*! ./category.component.scss */ "./src/app/layout/discounts/category/category.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], src_app_services_printer_service__WEBPACK_IMPORTED_MODULE_4__["PrinterService"], _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], CategoryComponent);
    return CategoryComponent;
}());



/***/ }),

/***/ "./src/app/layout/discounts/discounts-routing.module.ts":
/*!**************************************************************!*\
  !*** ./src/app/layout/discounts/discounts-routing.module.ts ***!
  \**************************************************************/
/*! exports provided: DiscountsRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscountsRoutingModule", function() { return DiscountsRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _category_category_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./category/category.component */ "./src/app/layout/discounts/category/category.component.ts");
/* harmony import */ var _transactions_transactions_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transactions/transactions.component */ "./src/app/layout/discounts/transactions/transactions.component.ts");
/* harmony import */ var _mapping_mapping_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mapping/mapping.component */ "./src/app/layout/discounts/mapping/mapping.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: '',
        redirectTo: 'category'
    },
    {
        path: 'category',
        component: _category_category_component__WEBPACK_IMPORTED_MODULE_2__["CategoryComponent"]
    },
    {
        path: 'mapping',
        component: _mapping_mapping_component__WEBPACK_IMPORTED_MODULE_4__["MappingComponent"]
    },
    {
        path: 'transactions',
        component: _transactions_transactions_component__WEBPACK_IMPORTED_MODULE_3__["TransactionsComponent"]
    }
];
var DiscountsRoutingModule = /** @class */ (function () {
    function DiscountsRoutingModule() {
    }
    DiscountsRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], DiscountsRoutingModule);
    return DiscountsRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/discounts/discounts.module.ts":
/*!******************************************************!*\
  !*** ./src/app/layout/discounts/discounts.module.ts ***!
  \******************************************************/
/*! exports provided: DiscountsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscountsModule", function() { return DiscountsModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _discounts_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./discounts-routing.module */ "./src/app/layout/discounts/discounts-routing.module.ts");
/* harmony import */ var _category_category_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category/category.component */ "./src/app/layout/discounts/category/category.component.ts");
/* harmony import */ var _mapping_mapping_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mapping/mapping.component */ "./src/app/layout/discounts/mapping/mapping.component.ts");
/* harmony import */ var _transactions_transactions_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./transactions/transactions.component */ "./src/app/layout/discounts/transactions/transactions.component.ts");
/* harmony import */ var _app_material_app_material_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../app-material/app-material.module */ "./src/app/app-material/app-material.module.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var DiscountsModule = /** @class */ (function () {
    function DiscountsModule() {
    }
    DiscountsModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_category_category_component__WEBPACK_IMPORTED_MODULE_3__["CategoryComponent"], _mapping_mapping_component__WEBPACK_IMPORTED_MODULE_4__["MappingComponent"], _transactions_transactions_component__WEBPACK_IMPORTED_MODULE_5__["TransactionsComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _discounts_routing_module__WEBPACK_IMPORTED_MODULE_2__["DiscountsRoutingModule"],
                _app_material_app_material_module__WEBPACK_IMPORTED_MODULE_6__["AppMaterialModule"]
            ]
        })
    ], DiscountsModule);
    return DiscountsModule;
}());



/***/ }),

/***/ "./src/app/layout/discounts/mapping/mapping.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/layout/discounts/mapping/mapping.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  mapping works!\n</p>\n"

/***/ }),

/***/ "./src/app/layout/discounts/mapping/mapping.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/layout/discounts/mapping/mapping.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9kaXNjb3VudHMvbWFwcGluZy9tYXBwaW5nLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/discounts/mapping/mapping.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/layout/discounts/mapping/mapping.component.ts ***!
  \***************************************************************/
/*! exports provided: MappingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MappingComponent", function() { return MappingComponent; });
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

var MappingComponent = /** @class */ (function () {
    function MappingComponent() {
    }
    MappingComponent.prototype.ngOnInit = function () {
    };
    MappingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-mapping',
            template: __webpack_require__(/*! ./mapping.component.html */ "./src/app/layout/discounts/mapping/mapping.component.html"),
            styles: [__webpack_require__(/*! ./mapping.component.scss */ "./src/app/layout/discounts/mapping/mapping.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], MappingComponent);
    return MappingComponent;
}());



/***/ }),

/***/ "./src/app/layout/discounts/transactions/transactions.component.html":
/*!***************************************************************************!*\
  !*** ./src/app/layout/discounts/transactions/transactions.component.html ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div >\n  <mat-card >\n    <mat-card-header>\n        <mat-card-title>Discount Transactions</mat-card-title>\n    </mat-card-header>\n    <mat-card-content>\n      <section class=\"example-section\" fxLayout=\"row\" fxLayout.lt-md=\"column\" fxFlex fxLayoutGap=\"20px\">\n        <!-- <span class=\"no-margin\"><mat-icon (click)=\"enableSearch = !enableSearch\">search</mat-icon></span> -->\n        <mat-form-field fxFlex class=\"\">\n            <input matInput name=\"searKey\" [(ngModel)]=\"searKey\" (keyup)=\"filterOpts()\" placeholder=\"Filter\">\n            <button mat-icon-button matSuffix (click)=\"clear()\">\n              <mat-icon>{{searKey?'clear':''}}</mat-icon>\n              </button>\n        </mat-form-field>\n        <!-- <mat-form-field fxFlex class=\"\">\n            <mat-select name=\"selRoute\" [(ngModel)]=\"selRoute\" (selectionChange)=\"filterOpts()\" placeholder=\"Route\" >\n                <mat-option *ngFor=\"let r of routes\" [value]=\"r.key\">{{r.value}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field fxFlex class=\"\">\n          <mat-select name=\"selRoute\" [(ngModel)]=\"selUser\" (selectionChange)=\"filterOpts()\" placeholder=\"User\" >\n              <mat-option *ngFor=\"let r of usersList\" [value]=\"r.key\">{{r.value}}</mat-option>\n          </mat-select>\n        </mat-form-field> -->\n        <mat-form-field fxFlex class=\"\">\n          <input matInput disabled [max]=\"maxToDate\" [matDatepicker]=\"picker\" placeholder=\"Choose a date\" name=\"saleDate\" (dateInput)=\"loadDiscTrans()\" [(ngModel)]=\"saleDate\">\n          <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n          <mat-datepicker disabled=\"false\" #picker></mat-datepicker>\n        </mat-form-field>\n      </section> \n      <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n        <ng-container matColumnDef=\"sno\">\n          <th mat-header-cell *matHeaderCellDef> Sno </th>\n          <td mat-cell *matCellDef=\"let element; let i=index\"> {{i+1}} </td>\n          <td mat-footer-cell *matFooterCellDef> </td>\n        </ng-container>\n        <!-- <ng-container matColumnDef=\"customer\">\n          <th mat-header-cell *matHeaderCellDef> Customer </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.route}} </td>\n        </ng-container> -->\n        <ng-container matColumnDef=\"saleId\">\n          <th mat-header-cell *matHeaderCellDef> Sale Id </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.sale_id}} </td>\n          <td mat-footer-cell *matFooterCellDef> </td>\n        </ng-container>\n        <ng-container matColumnDef=\"discountname\">\n          <th mat-header-cell *matHeaderCellDef> Discount Name </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.discounts.discount_name}}</td>\n          <td mat-footer-cell *matFooterCellDef> </td>\n        </ng-container>\n        <ng-container matColumnDef=\"prodName\">\n          <th mat-header-cell *matHeaderCellDef> Product </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.products?element.products.prod_name:''}} </td>\n          <td mat-footer-cell *matFooterCellDef> </td>\n        </ng-container>\n        <ng-container matColumnDef=\"count\">\n          <th mat-header-cell *matHeaderCellDef> Count </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.prod_count}} </td>\n          <td mat-footer-cell *matFooterCellDef> Total </td>\n        </ng-container>\n        <ng-container matColumnDef=\"totalAmount\">\n          <th mat-header-cell *matHeaderCellDef> Amount </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.total_amount}}</td>\n          <td mat-footer-cell *matFooterCellDef > {{totalAmount|currency:'INR'}} </td>\n        </ng-container>\n      \n        <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n        <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\n      </table>\n    </mat-card-content>\n  </mat-card>\n</div>"

/***/ }),

/***/ "./src/app/layout/discounts/transactions/transactions.component.scss":
/*!***************************************************************************!*\
  !*** ./src/app/layout/discounts/transactions/transactions.component.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\ntd,\nth {\n  width: auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2Rpc2NvdW50cy90cmFuc2FjdGlvbnMvQzpcXGxvY2FsZGlza1xcbXl3b3JrXFxkc3VpdGVcXGNsaWVudC9zcmNcXGFwcFxcbGF5b3V0XFxkaXNjb3VudHNcXHRyYW5zYWN0aW9uc1xcdHJhbnNhY3Rpb25zLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBVyxFQUNkOztBQUVEOztFQUVJLFlBQVcsRUFDZCIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9kaXNjb3VudHMvdHJhbnNhY3Rpb25zL3RyYW5zYWN0aW9ucy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG50ZCxcclxudGgge1xyXG4gICAgd2lkdGg6IGF1dG87XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/discounts/transactions/transactions.component.ts":
/*!*************************************************************************!*\
  !*** ./src/app/layout/discounts/transactions/transactions.component.ts ***!
  \*************************************************************************/
/*! exports provided: TransactionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionsComponent", function() { return TransactionsComponent; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TransactionsComponent = /** @class */ (function () {
    function TransactionsComponent(commonService, datePipe) {
        this.commonService = commonService;
        this.datePipe = datePipe;
        this.displayedColumns = ['sno', 'saleId', 'discountname', 'prodName', 'count', 'totalAmount'];
        this.searKey = "";
        this.maxToDate = new Date();
        this.saleDate = new Date();
        this.totalAmount = 0;
    }
    TransactionsComponent.prototype.ngOnInit = function () {
        this.loadDiscTrans();
    };
    TransactionsComponent.prototype.filterOpts = function () {
    };
    TransactionsComponent.prototype.loadDiscTrans = function () {
        var _this = this;
        console.log(this.saleDate);
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.discountTrans + '?pdate=' + this.datePipe.transform(this.saleDate, "yyyy-MM-dd");
        this.commonService.getMethod(url).subscribe(function (data) {
            if (data.code == 200)
                _this.transactionList = data.data;
            _this.transactionList = _this.transactionList.filter(function (t) { return t.sale_id != '' && t.discounts; });
            _this.totalAmount = _this.transactionList.reduce(function (acc, value) { return acc + value.total_amount; }, 0);
            //console.log(amt);
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.transactionList);
        });
    };
    TransactionsComponent.prototype.clear = function () {
        this.searKey = "";
        //this.dataSource.filter = this.searKey;
        this.filterOpts();
    };
    TransactionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-transactions',
            template: __webpack_require__(/*! ./transactions.component.html */ "./src/app/layout/discounts/transactions/transactions.component.html"),
            styles: [__webpack_require__(/*! ./transactions.component.scss */ "./src/app/layout/discounts/transactions/transactions.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_common__WEBPACK_IMPORTED_MODULE_0__["DatePipe"]])
    ], TransactionsComponent);
    return TransactionsComponent;
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
//# sourceMappingURL=discounts-discounts-module.js.map