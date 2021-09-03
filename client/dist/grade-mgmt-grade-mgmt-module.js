(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["grade-mgmt-grade-mgmt-module"],{

/***/ "./src/app/layout/grade-mgmt/grade-mgmt-routing.module.ts":
/*!****************************************************************!*\
  !*** ./src/app/layout/grade-mgmt/grade-mgmt-routing.module.ts ***!
  \****************************************************************/
/*! exports provided: GradeMgmtRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GradeMgmtRoutingModule", function() { return GradeMgmtRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _management_management_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./management/management.component */ "./src/app/layout/grade-mgmt/management/management.component.ts");
/* harmony import */ var _transactions_transactions_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transactions/transactions.component */ "./src/app/layout/grade-mgmt/transactions/transactions.component.ts");
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
        path: 'management',
        component: _management_management_component__WEBPACK_IMPORTED_MODULE_2__["ManagementComponent"]
    },
    {
        path: 'transaction',
        component: _transactions_transactions_component__WEBPACK_IMPORTED_MODULE_3__["TransactionsComponent"]
    }
];
var GradeMgmtRoutingModule = /** @class */ (function () {
    function GradeMgmtRoutingModule() {
    }
    GradeMgmtRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], GradeMgmtRoutingModule);
    return GradeMgmtRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/grade-mgmt/grade-mgmt.module.ts":
/*!********************************************************!*\
  !*** ./src/app/layout/grade-mgmt/grade-mgmt.module.ts ***!
  \********************************************************/
/*! exports provided: GradeMgmtModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GradeMgmtModule", function() { return GradeMgmtModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _grade_mgmt_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./grade-mgmt-routing.module */ "./src/app/layout/grade-mgmt/grade-mgmt-routing.module.ts");
/* harmony import */ var _management_management_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./management/management.component */ "./src/app/layout/grade-mgmt/management/management.component.ts");
/* harmony import */ var _transactions_transactions_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./transactions/transactions.component */ "./src/app/layout/grade-mgmt/transactions/transactions.component.ts");
/* harmony import */ var src_app_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app-material/app-material.module */ "./src/app/app-material/app-material.module.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








var GradeMgmtModule = /** @class */ (function () {
    function GradeMgmtModule() {
    }
    GradeMgmtModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_management_management_component__WEBPACK_IMPORTED_MODULE_3__["ManagementComponent"], _transactions_transactions_component__WEBPACK_IMPORTED_MODULE_4__["TransactionsComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _grade_mgmt_routing_module__WEBPACK_IMPORTED_MODULE_2__["GradeMgmtRoutingModule"],
                src_app_app_material_app_material_module__WEBPACK_IMPORTED_MODULE_5__["AppMaterialModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_7__["FlexLayoutModule"].withConfig({ addFlexToParent: false }),
            ]
        })
    ], GradeMgmtModule);
    return GradeMgmtModule;
}());



/***/ }),

/***/ "./src/app/layout/grade-mgmt/management/management.component.html":
/*!************************************************************************!*\
  !*** ./src/app/layout/grade-mgmt/management/management.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\n  <mat-card-header>\n      <mat-card-title>Grade Management</mat-card-title>\n  </mat-card-header>\n  <!-- <mat-card-content>\n      <section class=\"example-section\">\n          <mat-form-field class=\"example-margin\">\n              <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\n          </mat-form-field>\n      </section>\n  </mat-card-content> -->\n\n  <div class=\"mat-elevation-z8\">\n  <table mat-table [dataSource]=\"dataSource\" matSort>\n\n      <!-- Color Column -->\n      <ng-container matColumnDef=\"sno\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Sno </th>\n        <td mat-cell *matCellDef=\"let row; let i=index\" > {{i+1}} </td>\n        <td mat-footer-cell *matFooterCellDef>  </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"emptyName\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Grade Type </th>\n        <td mat-cell *matCellDef=\"let row\" > {{row.emptyName}} </td>\n        <td mat-footer-cell *matFooterCellDef [attr.rowspan]=\"2\"> <strong> GRAND TOTAL</strong> </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"count\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Quantity </th>\n        <td mat-cell *matCellDef=\"let row\" > {{row.count}} </td>\n        <td mat-footer-cell *matFooterCellDef> <strong>{{getTotalQuan()}}</strong> </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"entryType\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Transaction Type </th>\n        <td mat-cell *matCellDef=\"let row\" > {{row.entryType}} </td>\n        <td mat-footer-cell *matFooterCellDef>  </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"createdAt\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>\n        <td mat-cell *matCellDef=\"let row\" > {{row.createdAt | date}} </td>\n        <td mat-footer-cell *matFooterCellDef>  </td>\n      </ng-container>\n\n      <ng-container matColumnDef=\"actions\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Actions </th>\n        <td mat-cell *matCellDef=\"let row\" > <p class=\"display-inline\">\n          <mat-icon class=\"print\" (click)=\"editGrade(row)\">edit</mat-icon>\n          <mat-icon class=\"print\" (click)=\"deleteEntry(row)\">delete</mat-icon>\n          </p> </td>\n        <td mat-footer-cell *matFooterCellDef>  </td>\n      </ng-container>\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n      <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\n  </table>\n\n  <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\n  </div>\n  <div class=\"clearpix\"> \n    <button mat-raised-button color =\"primary\" (click)=\"newEntry()\">Add New</button>\n  </div>\n</mat-card>"

/***/ }),

/***/ "./src/app/layout/grade-mgmt/management/management.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/layout/grade-mgmt/management/management.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n.display-inline {\n  display: inline-flex; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2dyYWRlLW1nbXQvbWFuYWdlbWVudC9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXGdyYWRlLW1nbXRcXG1hbmFnZW1lbnRcXG1hbmFnZW1lbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFXLEVBQ2Q7O0FBRUQ7RUFDSSxnQkFBZTtFQUNmLFlBQVcsRUFDZDs7QUFPRDtFQUNJLGNBQWE7RUFDYixzQkFBcUI7RUFDckIsb0JBQW1CO0VBQ25CLGFBQVksRUFDZjs7QUFFRDtFQUNJLGFBQVksRUFDZjs7QUFFRDtFQUNJLGlCQUFnQixFQUNuQjs7QUFFRDtFQUNJLHFCQUFvQixFQUN2QiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9ncmFkZS1tZ210L21hbmFnZW1lbnQvbWFuYWdlbWVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ubWF0LWZvcm0tZmllbGQge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRkLFxyXG50aCB7XHJcbiAgICAvL3dpZHRoOiAyNSU7XHJcbn1cclxuXHJcbi5leGFtcGxlLXNlY3Rpb24ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBoZWlnaHQ6IDYwcHg7XHJcbn1cclxuXHJcbi5leGFtcGxlLW1hcmdpbiB7XHJcbiAgICBtYXJnaW46IDEwcHg7XHJcbn1cclxuXHJcbi5jbGVhcnBpeCB7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcblxyXG4uZGlzcGxheS1pbmxpbmV7XHJcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcclxufSJdfQ== */"

/***/ }),

/***/ "./src/app/layout/grade-mgmt/management/management.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/layout/grade-mgmt/management/management.component.ts ***!
  \**********************************************************************/
/*! exports provided: ManagementComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ManagementComponent", function() { return ManagementComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_app_material_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/app-material/common-modal/common-modal.component */ "./src/app/app-material/common-modal/common-modal.component.ts");
/* harmony import */ var src_app_app_material_confirm_pop_confirm_pop_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app-material/confirm-pop/confirm-pop.component */ "./src/app/app-material/confirm-pop/confirm-pop.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ManagementComponent = /** @class */ (function () {
    function ManagementComponent(commonService, dialog, snackBar) {
        this.commonService = commonService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.displayedColumns = ['sno', 'emptyName', 'entryType', 'createdAt', 'count', 'actions'];
        this.confirmBox = "YES";
    }
    ManagementComponent.prototype.ngOnInit = function () {
        this.loadGradeList();
        this.loadVariables();
    };
    ManagementComponent.prototype.loadGradeList = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.getGradeMngtList).subscribe(function (data) {
            if (data.code == 200) {
                _this.gradeList = data.data;
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.gradeList);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
            }
        });
    };
    ManagementComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ManagementComponent.prototype.editGrade = function (row) {
        var _this = this;
        this.newGradeEntry.map(function (inp) {
            inp.value = row[inp.name];
        });
        this.newGradeEntry.push({
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
        var dialogRef = this.dialog.open(src_app_app_material_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_4__["CommonModalComponent"], {
            //width: '300px',
            data: { formData: this.newGradeEntry.sort(function (a, b) { return a.order - b.order; }), formTitle: "Edit", url: src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.gradeUpdate, method: 'PUT' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.loadGradeList();
            _this.loadVariables(); // refreh the variables
        });
    };
    ManagementComponent.prototype.newEntry = function () {
        var _this = this;
        var dialogRef = this.dialog.open(src_app_app_material_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_4__["CommonModalComponent"], {
            //width: '300px',
            data: { formData: this.newGradeEntry.sort(function (a, b) { return a.order - b.order; }), formTitle: "Adding Grades", url: src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.saveGradeMngt }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.loadGradeList();
        });
    };
    ManagementComponent.prototype.deleteEntry = function (row) {
        var _this = this;
        console.log(row);
        var dialogRef = this.dialog.open(src_app_app_material_confirm_pop_confirm_pop_component__WEBPACK_IMPORTED_MODULE_5__["ConfirmPopComponent"], {
            width: '250px',
            data: { confirm: this.confirmBox }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            if (result && result == 'YES') {
                row.is_delete = 'YES';
                _this.commonService.putMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.gradeUpdate + '/' + row._id, row).subscribe(function (data) {
                    if (data.code == 200) {
                        _this.snackBar.open(data.message, "Success", {
                            duration: 500,
                        });
                        _this.loadGradeList();
                    }
                    else {
                        _this.snackBar.open(data.message, "Error", {
                            duration: 500,
                        });
                    }
                });
            }
        });
    };
    ManagementComponent.prototype.getTotalQuan = function () {
        return this.gradeList.reduce(function (acc, list) { return (acc + list.count); }, 0);
    };
    ManagementComponent.prototype.loadVariables = function () {
        this.newGradeEntry = [{
                "order": 1,
                "type": "input",
                "inputType": "text",
                "name": "emptyName",
                "value": "",
                "placeholder": "Grade Type Name",
                "validation": {
                    "required": true
                }
            }, {
                "order": 2,
                "type": "input",
                "inputType": "number",
                "name": "count",
                "value": "",
                "placeholder": "Quantity",
                "validation": {
                    "required": true
                }
            }, {
                "order": 3,
                "type": "select",
                "inputType": "dropdown",
                "name": "entryType",
                "value": "",
                "placeholder": "Entry Type",
                "validation": {
                    "required": true
                },
                options: [
                    { "key": "IN",
                        "value": "IN" },
                    { "key": "OUT",
                        "value": "OUT" }
                ]
            }, {
                "order": 4,
                "type": "textarea",
                "inputType": "text",
                "name": "description",
                "value": "",
                "placeholder": "Description",
                "validation": {
                    "required": true
                }
            }, {
                "order": 5,
                "type": "select",
                "inputType": "dropdown",
                "name": "is_active",
                "value": "",
                "placeholder": "Is Active",
                "validation": {
                    "required": true
                },
                options: [
                    { "key": "YES",
                        "value": "YES" },
                    { "key": "NO",
                        "value": "NO" }
                ]
            }];
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], ManagementComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], ManagementComponent.prototype, "sort", void 0);
    ManagementComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-management',
            template: __webpack_require__(/*! ./management.component.html */ "./src/app/layout/grade-mgmt/management/management.component.html"),
            styles: [__webpack_require__(/*! ./management.component.scss */ "./src/app/layout/grade-mgmt/management/management.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], ManagementComponent);
    return ManagementComponent;
}());



/***/ }),

/***/ "./src/app/layout/grade-mgmt/transactions/transactions.component.html":
/*!****************************************************************************!*\
  !*** ./src/app/layout/grade-mgmt/transactions/transactions.component.html ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form>\n  <mat-card>\n    <mat-card-title>\n      Grade Transactions      \n      <mat-icon title=\"Consolidated view\" (click)=\"showConsolidated()\" class=\"print-right\">assessment</mat-icon>\n    </mat-card-title>\n    <mat-card-content>\n      <section class=\"example-section\" [ngClass]=\"{'toggle':enableSearch}\" fxLayout=\"row\" fxLayout.lt-md=\"column\" fxFlex fxLayoutGap=\"20px\">\n        <span class=\"no-margin\"><mat-icon (click)=\"enableSearch = !enableSearch\">search</mat-icon></span>\n        <mat-form-field fxFlex class=\"\">\n            <input matInput name=\"searKey\" [(ngModel)]=\"searKey\" (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\n            <button mat-icon-button matSuffix (click)=\"clear()\">\n              <mat-icon>{{searKey?'clear':''}}</mat-icon>\n              </button>\n        </mat-form-field>\n        <mat-form-field fxFlex class=\"\">\n            <mat-select name=\"selRoute\" [(ngModel)]=\"selRoute\" (selectionChange)=\"addEvent()\" placeholder=\"Route\" >\n                <mat-option *ngFor=\"let r of routes\" [value]=\"r.key\">{{r.value}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field fxFlex class=\"\">\n          <input matInput disabled [max]=\"maxToDate\" [matDatepicker]=\"picker\" placeholder=\"Choose a date\" name=\"delDate\" (dateInput)=\"addEvent()\" [(ngModel)]=\"delDate\">\n          <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n          <mat-datepicker disabled=\"false\" #picker></mat-datepicker>\n        </mat-form-field>\n    </section> \n    \n  <div class=\"mat-elevation-z8\">\n    <table mat-table [dataSource]=\"dataSource\" matSort>\n\n        <!-- Color Column -->\n        <ng-container matColumnDef=\"sno\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Sno </th>\n          <td mat-cell *matCellDef=\"let row; let i=index\" > {{i+1}} </td>\n          <td mat-footer-cell *matFooterCellDef>  </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"customer\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Customer Name </th>\n          <td mat-cell *matCellDef=\"let row\" > {{row.customer[0].customer_id}}-{{row.customer[0].customer_name}} </td>\n          <td mat-footer-cell *matFooterCellDef [attr.rowspan]=\"2\"> <strong> TOTAL</strong> </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"balance\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Balance </th>\n          <td mat-cell *matCellDef=\"let row; let i=index\" >\n            {{row.t_deliver - row.t_receive}}\n            <!-- <mat-form-field class=\"input-number\">\n              <input matInput type=\"number\" name=\"balance{{i}}\" [(ngModel)]=\"row.balance.count\" size=\"10\"/>\n            </mat-form-field> -->\n          </td>\n          <td mat-footer-cell *matFooterCellDef> <strong>{{getTotal('balance')}}</strong> </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"delivered\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Delivered </th>\n          <td mat-cell *matCellDef=\"let row; let i=index\" >\n            <mat-form-field class=\"input-number\">\n              <input matInput type=\"number\" tabindex=\"{{i+1}}\" name=\"deliver{{i}}\" [(ngModel)]=\"row.c_deliver\" size=\"10\" (click)=\"$event.target.select()\"/>\n            </mat-form-field>\n          </td>\n          <td mat-footer-cell *matFooterCellDef> <strong>{{getTotal('deliver')}}</strong> </td>\n        </ng-container>\n\n        <ng-container matColumnDef=\"received\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Received </th>\n          <td mat-cell *matCellDef=\"let row; let i=index\" >\n            <mat-form-field class=\"input-number\">\n              <input matInput type=\"number\" tabindex=\"{{i+1+dataSource.data.length}}\" name=\"receive{{i}}\" [(ngModel)]=\"row.c_receive\" size=\"10\" (click)=\"$event.target.select()\"/>\n            </mat-form-field>\n          </td>\n          <td mat-footer-cell *matFooterCellDef> <strong>{{getTotal('receive')}}</strong> </td>\n        </ng-container>\n\n        <!-- <ng-container matColumnDef=\"actions\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Actions </th>\n          <td mat-cell *matCellDef=\"let row\" > <p class=\"display-inline\">\n            <mat-icon class=\"print\" (click)=\"editGrade(row)\">edit</mat-icon>\n            <mat-icon class=\"print\" (click)=\"deleteEntry(row)\">delete</mat-icon>\n            </p> </td>\n          <td mat-footer-cell *matFooterCellDef>  </td>\n        </ng-container> -->\n\n        <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n        <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\n    </table>\n\n    <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\n    </div>\n    <button mat-raised-button color=\"primary\" (click)=\"onsubmit()\">Submit</button>\n  </mat-card-content>\n</mat-card>\n</form>"

/***/ }),

/***/ "./src/app/layout/grade-mgmt/transactions/transactions.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/layout/grade-mgmt/transactions/transactions.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".print-right {\n  float: right;\n  cursor: pointer; }\n\n.example-section {\n  align-content: center;\n  align-items: center;\n  background-color: #E8F1FF;\n  padding: 10px 15px;\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  margin-bottom: 8px; }\n\n.cus-title {\n  font-size: 0.6em;\n  color: grey; }\n\n.cus-title ::before {\n    content: \"\\a\";\n    white-space: pre; }\n\n.visible-md {\n  display: none; }\n\n.no-margin {\n  margin-bottom: 0 !important; }\n\n@media screen and (max-width: 992px) {\n  .visible-md {\n    display: block; }\n  .toggle .mat-form-field {\n    display: none; } }\n\n.input-number {\n  width: 50px; }\n\ntable {\n  width: 100%; }\n\ntd,\nth {\n  width: 25%; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2dyYWRlLW1nbXQvdHJhbnNhY3Rpb25zL0M6XFxsb2NhbGRpc2tcXG15d29ya1xcZHN1aXRlXFxjbGllbnQvc3JjXFxhcHBcXGxheW91dFxcZ3JhZGUtbWdtdFxcdHJhbnNhY3Rpb25zXFx0cmFuc2FjdGlvbnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxhQUFhO0VBQ2IsZ0JBQWdCLEVBQ2pCOztBQUVEO0VBRUUsc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUVuQiwwQkFBeUI7RUFDekIsbUJBQWtCO0VBQ2xCLGdIQUFtRztFQUNuRyxtQkFBa0IsRUFDbkI7O0FBRUQ7RUFDRSxpQkFBZ0I7RUFDaEIsWUFBVyxFQUtaOztBQVBEO0lBSUUsY0FBYTtJQUNiLGlCQUFnQixFQUNmOztBQUdIO0VBQ0UsY0FBYSxFQUNkOztBQUVEO0VBQ0UsNEJBQTRCLEVBQzdCOztBQUVEO0VBQ0U7SUFDSSxlQUFjLEVBQ2pCO0VBRUQ7SUFFSSxjQUFZLEVBQ2IsRUFBQTs7QUFJTDtFQUNFLFlBQVcsRUFDWjs7QUFJRDtFQUNFLFlBQVcsRUFDWjs7QUFFRDs7RUFFSSxXQUFVLEVBQ2IiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvZ3JhZGUtbWdtdC90cmFuc2FjdGlvbnMvdHJhbnNhY3Rpb25zLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnByaW50LXJpZ2h0e1xyXG4gIGZsb2F0IDogcmlnaHQ7XHJcbiAgY3Vyc29yIDogcG9pbnRlcjtcclxufVxyXG5cclxuLmV4YW1wbGUtc2VjdGlvbiB7XHJcbiAgLy9kaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIC8vIGhlaWdodDogNjBweDtcclxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRThGMUZGO1xyXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcclxuICBib3gtc2hhZG93OiAwIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLC4yKSwgMCAycHggMnB4IDAgcmdiYSgwLDAsMCwuMTQpLCAwIDFweCA1cHggMCByZ2JhKDAsMCwwLC4xMik7XHJcbiAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG59XHJcblxyXG4uY3VzLXRpdGxle1xyXG4gIGZvbnQtc2l6ZTogMC42ZW07XHJcbiAgY29sb3I6IGdyZXk7XHJcbiAgOjpiZWZvcmV7XHJcbiAgY29udGVudDogXCJcXGFcIjtcclxuICB3aGl0ZS1zcGFjZTogcHJlOyAgXHJcbiAgfVxyXG59XHJcblxyXG4udmlzaWJsZS1tZCB7XHJcbiAgZGlzcGxheTogbm9uZTtcclxufVxyXG5cclxuLm5vLW1hcmdpbntcclxuICBtYXJnaW4tYm90dG9tIDogMCAhaW1wb3J0YW50O1xyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkge1xyXG4gIC52aXNpYmxlLW1kIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgfVxyXG5cclxuICAudG9nZ2xlIHtcclxuICAgIC5tYXQtZm9ybS1maWVsZCB7XHJcbiAgICAgIGRpc3BsYXk6bm9uZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5pbnB1dC1udW1iZXIge1xyXG4gIHdpZHRoOiA1MHB4O1xyXG59XHJcblxyXG4vLyB0YWJsZSBjc3NcclxuXHJcbnRhYmxlIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxudGQsXHJcbnRoIHtcclxuICAgIHdpZHRoOiAyNSU7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/grade-mgmt/transactions/transactions.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/layout/grade-mgmt/transactions/transactions.component.ts ***!
  \**************************************************************************/
/*! exports provided: TransactionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionsComponent", function() { return TransactionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var src_app_services_printer_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/printer.service */ "./src/app/services/printer.service.ts");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/services/user.service */ "./src/app/services/user.service.ts");
/* harmony import */ var src_app_services_bootstrap_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/services/bootstrap.service */ "./src/app/services/bootstrap.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_app_material_confirm_pop_confirm_pop_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/app/app-material/confirm-pop/confirm-pop.component */ "./src/app/app-material/confirm-pop/confirm-pop.component.ts");
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
    function TransactionsComponent(datePipe, commonService, dialog, bootstrap, printerService, router, userservice, snackBar) {
        this.datePipe = datePipe;
        this.commonService = commonService;
        this.dialog = dialog;
        this.bootstrap = bootstrap;
        this.printerService = printerService;
        this.router = router;
        this.userservice = userservice;
        this.snackBar = snackBar;
        this.displayedColumns = ['sno', 'customer', 'balance', 'delivered', 'received'];
        this.enableSearch = false;
        this.selRoute = "all";
        this.searKey = "";
        this.confirmBox = "YES";
    }
    TransactionsComponent.prototype.ngOnInit = function () {
        this.delDate = new Date();
        this.routes = this.bootstrap.routes.map(function (val) {
            return {
                key: val._id,
                value: val.areaName
            };
        });
        this.routes.push({ key: 'all', value: 'All' });
        this.addEvent();
        var tdy = new Date();
        //tdy.setDate(tdy.getDate() +1);
        this.maxToDate = tdy;
    };
    TransactionsComponent.prototype.showConsolidated = function () {
        console.log('assessment');
    };
    TransactionsComponent.prototype.addEvent = function () {
        var q = '?q_date=' + this.datePipe.transform(this.delDate, "yyyy-MM-dd") + "&route=" + this.selRoute + "&search_key=" + this.searKey;
        this.loadGradeList(q);
    };
    TransactionsComponent.prototype.loadGradeList = function (query) {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].urls.getGradeTransList + query).subscribe(function (data) {
            if (data.code == 200) {
                if (data.data)
                    _this.customerGradeList = data.data.sort(function (a, b) { return (a.customer[0].index > b.customer[0].index) ? 1 : (a.customer[0].index === b.customer[0].index) ? ((a.size > b.size) ? 1 : -1) : -1; });
                // this.customerGradeList.map(t => {
                //   let temp:GradeTrans = {
                //     customer_id:"",
                //     count:0,
                //     transaction:"",
                //     description:""
                //   }
                //   let temp1:GradeTrans = {
                //     customer_id:"",
                //     count:0,
                //     transaction:"",
                //     description:""
                //   }
                //   if(!t.delivered)
                //     t.delivered = temp;
                //   if(!t.received)
                //     t.received = temp1;
                // });
                //console.log(this.customerGradeList);
                _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatTableDataSource"](_this.customerGradeList);
                _this.dataSource.paginator = _this.paginator;
                _this.dataSource.sort = _this.sort;
                _this.dataSource.filterPredicate = function (data, filter) {
                    var accumulator = function (currentTerm, key) {
                        return key === 'customer' ? currentTerm + data.customer[0].customer_name : currentTerm + data[key];
                    };
                    var dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
                    // Transform the filter by converting it to lowercase and removing whitespace.
                    var transformedFilter = filter.trim().toLowerCase();
                    return dataStr.indexOf(transformedFilter) !== -1;
                };
            }
            else {
                _this.snackBar.open(data.message, "Error", {
                    duration: 500,
                });
            }
        });
    };
    TransactionsComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    TransactionsComponent.prototype.onsubmit = function () {
        var _this = this;
        //console.log(this.customerGradeList);
        //return false;
        var current_date = this.datePipe.transform(this.delDate, "yyyy-MM-dd");
        var live_date = this.datePipe.transform(new Date(), "yyyy-MM-dd");
        if (current_date != live_date) {
            var dialogRef = this.dialog.open(src_app_app_material_confirm_pop_confirm_pop_component__WEBPACK_IMPORTED_MODULE_9__["ConfirmPopComponent"], {
                width: '250px',
                data: { confirm: this.confirmBox, label: 'You are making changes for previous days. Sure want to continue?' }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                console.log('The dialog was closed');
                if (result && result == 'YES') {
                    _this.transApiSubmit();
                }
            });
        }
        else {
            this.transApiSubmit();
        }
    };
    TransactionsComponent.prototype.transApiSubmit = function () {
        var _this = this;
        var temp = [];
        var current_date = this.datePipe.transform(this.delDate, "yyyy-MM-dd");
        this.customerGradeList.forEach(function (list) {
            if (list.c_deliver) {
                var del = {
                    'customer_id': list.customer[0].customer_id,
                    'count': list.c_deliver ? list.c_deliver : 0,
                    'transaction': 'OUT',
                    'description': '',
                    't_date': current_date
                };
                temp.push(del);
                //console.log(t);
            }
            if (list.c_receive) {
                var rec = {
                    'customer_id': list.customer[0].customer_id,
                    'count': list.c_receive ? list.c_receive : 0,
                    'transaction': 'IN',
                    'description': '',
                    't_date': current_date
                };
                temp.push(rec);
                //console.log(t1);
            }
        });
        var data = { 'trans': temp };
        this.commonService.postMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_8__["environment"].urls.saveGradeTrans, data).subscribe(function (data) {
            if (data.code == 200) {
                _this.snackBar.open(data.message, "Success", {
                    duration: 500,
                });
            }
            else {
                _this.snackBar.open(data.message, "Error", {
                    duration: 500,
                });
            }
            //refresh
            _this.addEvent();
        });
    };
    TransactionsComponent.prototype.getTotal = function (inp) {
        //debugger;
        switch (inp) {
            case 'balance':
                if (this.customerGradeList && this.customerGradeList.length > 0) {
                    return this.customerGradeList.reduce(function (acc, list) { return (acc + list.t_deliver); }, 0) - this.customerGradeList.reduce(function (acc, list) { return (acc + list.t_receive); }, 0);
                }
                else {
                    return 0;
                }
                break;
            case 'deliver':
                if (this.customerGradeList && this.customerGradeList.length > 0) {
                    return this.customerGradeList.reduce(function (acc, list) { return (acc + list.c_deliver); }, 0);
                }
                else {
                    return 0;
                }
                break;
            case 'receive':
                if (this.customerGradeList && this.customerGradeList.length > 0) {
                    return this.customerGradeList.reduce(function (acc, list) { return (acc + list.c_receive); }, 0);
                }
                else {
                    return 0;
                }
                break;
        }
    };
    TransactionsComponent.prototype.clear = function () {
        this.searKey = '';
        this.applyFilter('');
        //this.addEvent();
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatPaginator"])
    ], TransactionsComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSort"])
    ], TransactionsComponent.prototype, "sort", void 0);
    TransactionsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-transactions',
            template: __webpack_require__(/*! ./transactions.component.html */ "./src/app/layout/grade-mgmt/transactions/transactions.component.html"),
            styles: [__webpack_require__(/*! ./transactions.component.scss */ "./src/app/layout/grade-mgmt/transactions/transactions.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DatePipe"], src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"], src_app_services_bootstrap_service__WEBPACK_IMPORTED_MODULE_7__["BootstrapService"],
            src_app_services_printer_service__WEBPACK_IMPORTED_MODULE_5__["PrinterService"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], src_app_services_user_service__WEBPACK_IMPORTED_MODULE_6__["UserService"], _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"]])
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
//# sourceMappingURL=grade-mgmt-grade-mgmt-module.js.map