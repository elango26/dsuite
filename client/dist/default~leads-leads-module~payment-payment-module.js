(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~leads-leads-module~payment-payment-module"],{

/***/ "./node_modules/ngx-take-until-destroy/fesm5/ngx-take-until-destroy.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/ngx-take-until-destroy/fesm5/ngx-take-until-destroy.js ***!
  \*****************************************************************************/
/*! exports provided: untilDestroyed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "untilDestroyed", function() { return untilDestroyed; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
function isFunction(value) {
    return typeof value === 'function';
}
/** @type {?} */
var untilDestroyed = function (componentInstance, destroyMethodName) {
    if (destroyMethodName === void 0) { destroyMethodName = 'ngOnDestroy'; }
    return function (source) {
        /** @type {?} */
        var originalDestroy = componentInstance[destroyMethodName];
        if (isFunction(originalDestroy) === false) {
            throw new Error(componentInstance.constructor.name + " is using untilDestroyed but doesn't implement " + destroyMethodName);
        }
        if (!componentInstance['__takeUntilDestroy']) {
            componentInstance['__takeUntilDestroy'] = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
            componentInstance[destroyMethodName] = function () {
                isFunction(originalDestroy) && originalDestroy.apply(this, arguments);
                componentInstance['__takeUntilDestroy'].next(true);
                componentInstance['__takeUntilDestroy'].complete();
            };
        }
        return source.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["takeUntil"])(componentInstance['__takeUntilDestroy']));
    };
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRha2UtdW50aWwtZGVzdHJveS5qcy5tYXAiLCJzb3VyY2VzIjpbIm5nOi8vbmd4LXRha2UtdW50aWwtZGVzdHJveS9zcmMvdGFrZS11bnRpbC1kZXN0cm95LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufVxuXG5leHBvcnQgY29uc3QgdW50aWxEZXN0cm95ZWQgPSAoXG4gIGNvbXBvbmVudEluc3RhbmNlLFxuICBkZXN0cm95TWV0aG9kTmFtZSA9ICduZ09uRGVzdHJveSdcbikgPT4gPFQ+KHNvdXJjZTogT2JzZXJ2YWJsZTxUPikgPT4ge1xuICBjb25zdCBvcmlnaW5hbERlc3Ryb3kgPSBjb21wb25lbnRJbnN0YW5jZVtkZXN0cm95TWV0aG9kTmFtZV07XG4gIGlmIChpc0Z1bmN0aW9uKG9yaWdpbmFsRGVzdHJveSkgPT09IGZhbHNlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYCR7XG4gICAgICAgIGNvbXBvbmVudEluc3RhbmNlLmNvbnN0cnVjdG9yLm5hbWVcbiAgICAgIH0gaXMgdXNpbmcgdW50aWxEZXN0cm95ZWQgYnV0IGRvZXNuJ3QgaW1wbGVtZW50ICR7ZGVzdHJveU1ldGhvZE5hbWV9YFxuICAgICk7XG4gIH1cbiAgaWYgKCFjb21wb25lbnRJbnN0YW5jZVsnX190YWtlVW50aWxEZXN0cm95J10pIHtcbiAgICBjb21wb25lbnRJbnN0YW5jZVsnX190YWtlVW50aWxEZXN0cm95J10gPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgY29tcG9uZW50SW5zdGFuY2VbZGVzdHJveU1ldGhvZE5hbWVdID0gZnVuY3Rpb24oKSB7XG4gICAgICBpc0Z1bmN0aW9uKG9yaWdpbmFsRGVzdHJveSkgJiYgb3JpZ2luYWxEZXN0cm95LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICBjb21wb25lbnRJbnN0YW5jZVsnX190YWtlVW50aWxEZXN0cm95J10ubmV4dCh0cnVlKTtcbiAgICAgIGNvbXBvbmVudEluc3RhbmNlWydfX3Rha2VVbnRpbERlc3Ryb3knXS5jb21wbGV0ZSgpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIHNvdXJjZS5waXBlKHRha2VVbnRpbDxUPihjb21wb25lbnRJbnN0YW5jZVsnX190YWtlVW50aWxEZXN0cm95J10pKTtcbn07XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOzs7O0FBR0Esb0JBQW9CLEtBQUs7SUFDdkIsT0FBTyxPQUFPLEtBQUssS0FBSyxVQUFVLENBQUM7Q0FDcEM7O0FBRUQsSUFBYSxjQUFjLEdBQUcsVUFDNUIsaUJBQWlCLEVBQ2pCLGlCQUFpQztJQUFqQyxrQ0FBQSxFQUFBLGlDQUFpQztJQUM5QixPQUFBLFVBQUksTUFBcUI7O1FBQzVCLElBQU0sZUFBZSxHQUFHLGlCQUFpQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDN0QsSUFBSSxVQUFVLENBQUMsZUFBZSxDQUFDLEtBQUssS0FBSyxFQUFFO1lBQ3pDLE1BQU0sSUFBSSxLQUFLLENBRVgsaUJBQWlCLENBQUMsV0FBVyxDQUFDLElBQUksdURBQ2MsaUJBQW1CLENBQ3RFLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO1lBQzVDLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUV4RCxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHO2dCQUNyQyxVQUFVLENBQUMsZUFBZSxDQUFDLElBQUksZUFBZSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7Z0JBQ3RFLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuRCxpQkFBaUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ3BELENBQUM7U0FDSDtRQUNELE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUksaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDM0U7Q0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==

/***/ }),

/***/ "./src/app/layout/payment/detail-view/detail-view.component.html":
/*!***********************************************************************!*\
  !*** ./src/app/layout/payment/detail-view/detail-view.component.html ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div >\n  <mat-card >\n    <mat-card-header>\n        <mat-card-title>Detailed View</mat-card-title>\n    </mat-card-header>\n    <mat-card-content>\n      <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\n        <section class=\"example-section\" fxLayout=\"row\" fxLayout.lt-md=\"column\" fxFlex fxLayoutGap=\"20px\">\n          <!-- <span class=\"no-margin\"><mat-icon >search</mat-icon></span> -->\n          <mat-form-field fxFlex class=\"\">\n            <input matInput disabled [max]=\"maxToDate\" [matDatepicker]=\"pickerFrom\" placeholder=\"Choose a from date\" formControlName=\"fromDate\">\n            <mat-datepicker-toggle matSuffix [for]=\"pickerFrom\"></mat-datepicker-toggle>\n            <mat-datepicker disabled=\"false\" #pickerFrom></mat-datepicker>\n          </mat-form-field>\n          <mat-form-field fxFlex class=\"\">\n            <input matInput disabled [max]=\"maxToDate\" [matDatepicker]=\"pickerTo\" placeholder=\"Choose a to date\" formControlName=\"toDate\">\n            <mat-datepicker-toggle matSuffix [for]=\"pickerTo\"></mat-datepicker-toggle>\n            <mat-datepicker disabled=\"false\" #pickerTo></mat-datepicker>\n          </mat-form-field>  \n          <div>\n            <button type=\"submit\" mat-raised-button color=\"primary\" >Search</button>      \n          </div>\n        </section> \n      </form>\n\n      <table mat-table [dataSource]=\"dataSource\" class=\"mat-elevation-z8\">\n        <!-- <tr *ngFor=\"let row of paymentList\">\n          <td >{{row.pdate}}</td>\n          <td >{{row.route}}</td>\n          <td >{{row.amount}}</td>\n          <td ><tr *ngFor=\"let v of row.users\">\n            <td>{{v.uname}}</td>\n            <td>{{v.amount}}</td>\n          </tr></td>\n        </tr> -->\n        <ng-container matColumnDef=\"date\">\n          <th mat-header-cell *matHeaderCellDef> Date </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.pdate}} </td>\n        </ng-container>\n        <ng-container matColumnDef=\"route\">\n          <th mat-header-cell *matHeaderCellDef> Route </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.route}} </td>\n        </ng-container>\n        <ng-container matColumnDef=\"amount\">\n          <th mat-header-cell *matHeaderCellDef> Amount </th>\n          <td mat-cell *matCellDef=\"let element\"> {{element.amount}} </td>\n        </ng-container>\n        <ng-container matColumnDef=\"users\">\n          <th mat-header-cell *matHeaderCellDef> Users </th>\n          <td mat-cell *matCellDef=\"let element\"> <span class=\"block\" *ngFor=\"let v of element.users\">{{v.uname}}: {{v.amount}}</span> </td>\n        </ng-container>\n      \n        <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n      </table>\n    </mat-card-content>\n  </mat-card>\n</div>"

/***/ }),

/***/ "./src/app/layout/payment/detail-view/detail-view.component.scss":
/*!***********************************************************************!*\
  !*** ./src/app/layout/payment/detail-view/detail-view.component.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\ntd,\nth {\n  width: 25%; }\n\ntd > span {\n  display: block; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3BheW1lbnQvZGV0YWlsLXZpZXcvQzpcXGxvY2FsZGlza1xcbXl3b3JrXFxkc3VpdGVcXGNsaWVudC9zcmNcXGFwcFxcbGF5b3V0XFxwYXltZW50XFxkZXRhaWwtdmlld1xcZGV0YWlsLXZpZXcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFXLEVBQ2Q7O0FBRUQ7O0VBRUksV0FBVSxFQUNiOztBQUVEO0VBQ0ksZUFBYyxFQUNqQiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9wYXltZW50L2RldGFpbC12aWV3L2RldGFpbC12aWV3LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRkLFxyXG50aCB7XHJcbiAgICB3aWR0aDogMjUlO1xyXG59XHJcblxyXG50ZCA+IHNwYW4ge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/payment/detail-view/detail-view.component.ts":
/*!*********************************************************************!*\
  !*** ./src/app/layout/payment/detail-view/detail-view.component.ts ***!
  \*********************************************************************/
/*! exports provided: DetailViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailViewComponent", function() { return DetailViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DetailViewComponent = /** @class */ (function () {
    function DetailViewComponent(commonService, datePipe) {
        this.commonService = commonService;
        this.datePipe = datePipe;
        this.enableSearch = false;
        this.searKey = "";
        this.maxToDate = new Date();
        this.displayedColumns = ['date', 'route', 'amount', 'users'];
    }
    DetailViewComponent.prototype.ngOnInit = function () {
        this.initialize();
        this.loadPayments();
    };
    DetailViewComponent.prototype.initialize = function () {
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroup"]({
            'fromDate': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](new Date(), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
            'toDate': new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](new Date(), _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required)
        });
    };
    DetailViewComponent.prototype.loadPayments = function () {
        var _this = this;
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.getDetailPayment + '?fdate=' + this.datePipe.transform(this.form.value.fromDate, "yyyy-MM-dd") + '&tdate=' + this.datePipe.transform(this.form.value.toDate, "yyyy-MM-dd");
        this.commonService.getMethod(url).subscribe(function (data) {
            //console.log(data); 
            var consolidated = data.data.map(function (d) { return ({ pdate: d._id.pdate, route: d.routename[0], amount: d.amount, users: _this.groupBy(d.paymentss) }); });
            _this.paymentList = consolidated.sort(function (a, b) { return new Date(b.pdate).getTime() - new Date(a.pdate).getTime(); });
            console.log(_this.paymentList);
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"](_this.paymentList);
        });
    };
    DetailViewComponent.prototype.groupBy = function (pays) {
        var result = [];
        pays.reduce(function (res, value) {
            if (!res[value.createdBy]) {
                res[value.createdBy] = { Id: value.createdBy, amount: 0, uname: value.users ? value.users.username : '' };
                result.push(res[value.createdBy]);
            }
            res[value.createdBy].amount += value.amount;
            return res;
        }, {});
        return result;
    };
    DetailViewComponent.prototype.onSubmit = function () {
        //console.log(this.form);
        if (this.form.status == "VALID") {
            this.loadPayments();
        }
    };
    DetailViewComponent.prototype.filterOpts = function () {
    };
    DetailViewComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-detail-view',
            template: __webpack_require__(/*! ./detail-view.component.html */ "./src/app/layout/payment/detail-view/detail-view.component.html"),
            styles: [__webpack_require__(/*! ./detail-view.component.scss */ "./src/app/layout/payment/detail-view/detail-view.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["DatePipe"]])
    ], DetailViewComponent);
    return DetailViewComponent;
}());



/***/ }),

/***/ "./src/app/layout/payment/editable/editable.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/layout/payment/editable/editable.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9wYXltZW50L2VkaXRhYmxlL2VkaXRhYmxlLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/layout/payment/editable/editable.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/layout/payment/editable/editable.component.ts ***!
  \***************************************************************/
/*! exports provided: EditModeDirective, ViewModeDirective, EditableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditModeDirective", function() { return EditModeDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewModeDirective", function() { return ViewModeDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditableComponent", function() { return EditableComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var ngx_take_until_destroy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-take-until-destroy */ "./node_modules/ngx-take-until-destroy/fesm5/ngx-take-until-destroy.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditModeDirective = /** @class */ (function () {
    function EditModeDirective(tpl) {
        this.tpl = tpl;
    }
    EditModeDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[editMode]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]])
    ], EditModeDirective);
    return EditModeDirective;
}());

var ViewModeDirective = /** @class */ (function () {
    function ViewModeDirective(tpl) {
        this.tpl = tpl;
    }
    ViewModeDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[viewMode]'
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]])
    ], ViewModeDirective);
    return ViewModeDirective;
}());

var EditableComponent = /** @class */ (function () {
    function EditableComponent(host) {
        this.host = host;
        this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.editMode = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.editMode$ = this.editMode.asObservable();
        this.mode = 'view';
    }
    EditableComponent.prototype.ngOnInit = function () {
        this.viewModeHandler();
        this.editModeHandler();
    };
    EditableComponent.prototype.toViewMode = function () {
        this.update.next();
        this.mode = 'view';
    };
    Object.defineProperty(EditableComponent.prototype, "element", {
        get: function () {
            return this.host.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    EditableComponent.prototype.viewModeHandler = function () {
        var _this = this;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(this.element, 'dblclick').pipe(Object(ngx_take_until_destroy__WEBPACK_IMPORTED_MODULE_3__["untilDestroyed"])(this)).subscribe(function () {
            _this.mode = 'edit';
            _this.editMode.next(true);
        });
    };
    EditableComponent.prototype.editModeHandler = function () {
        var _this = this;
        var clickOutside$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["fromEvent"])(document, 'click').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (_a) {
            var target = _a.target;
            return _this.element.contains(target) === false;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1));
        this.editMode$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMapTo"])(clickOutside$), Object(ngx_take_until_destroy__WEBPACK_IMPORTED_MODULE_3__["untilDestroyed"])(this)).subscribe(function (event) { return _this.toViewMode(); });
    };
    Object.defineProperty(EditableComponent.prototype, "currentView", {
        get: function () {
            return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
        },
        enumerable: true,
        configurable: true
    });
    EditableComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"])(ViewModeDirective),
        __metadata("design:type", ViewModeDirective)
    ], EditableComponent.prototype, "viewModeTpl", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChild"])(EditModeDirective),
        __metadata("design:type", EditModeDirective)
    ], EditableComponent.prototype, "editModeTpl", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])(),
        __metadata("design:type", Object)
    ], EditableComponent.prototype, "update", void 0);
    EditableComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'editable',
            template: "\n    <ng-container *ngTemplateOutlet=\"currentView\"></ng-container>\n  ",
            styles: [__webpack_require__(/*! ./editable.component.scss */ "./src/app/layout/payment/editable/editable.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]])
    ], EditableComponent);
    return EditableComponent;
}());



/***/ }),

/***/ "./src/app/layout/payment/payment-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/layout/payment/payment-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: PaymentRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentRoutingModule", function() { return PaymentRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _detail_view_detail_view_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detail-view/detail-view.component */ "./src/app/layout/payment/detail-view/detail-view.component.ts");
/* harmony import */ var _payments_payments_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payments/payments.component */ "./src/app/layout/payment/payments/payments.component.ts");
/* harmony import */ var _view_payment_view_payment_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view-payment/view-payment.component */ "./src/app/layout/payment/view-payment/view-payment.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var routes = [
    {
        path: '',
        redirectTo: 'payments'
    },
    {
        path: 'payments',
        component: _payments_payments_component__WEBPACK_IMPORTED_MODULE_3__["PaymentsComponent"]
    },
    {
        path: 'view',
        component: _view_payment_view_payment_component__WEBPACK_IMPORTED_MODULE_4__["ViewPaymentComponent"]
    },
    {
        path: 'detail-view',
        component: _detail_view_detail_view_component__WEBPACK_IMPORTED_MODULE_2__["DetailViewComponent"]
    }
];
var PaymentRoutingModule = /** @class */ (function () {
    function PaymentRoutingModule() {
    }
    PaymentRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], PaymentRoutingModule);
    return PaymentRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/payment/payment.module.ts":
/*!**************************************************!*\
  !*** ./src/app/layout/payment/payment.module.ts ***!
  \**************************************************/
/*! exports provided: PaymentModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentModule", function() { return PaymentModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _payment_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./payment-routing.module */ "./src/app/layout/payment/payment-routing.module.ts");
/* harmony import */ var _payments_payments_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./payments/payments.component */ "./src/app/layout/payment/payments/payments.component.ts");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/snack-bar */ "./node_modules/@angular/material/esm5/snack-bar.es5.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/esm5/button.es5.js");
/* harmony import */ var _app_material_app_material_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../app-material/app-material.module */ "./src/app/app-material/app-material.module.ts");
/* harmony import */ var _view_payment_view_payment_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./view-payment/view-payment.component */ "./src/app/layout/payment/view-payment/view-payment.component.ts");
/* harmony import */ var _editable_editable_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./editable/editable.component */ "./src/app/layout/payment/editable/editable.component.ts");
/* harmony import */ var _detail_view_detail_view_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./detail-view/detail-view.component */ "./src/app/layout/payment/detail-view/detail-view.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var PaymentModule = /** @class */ (function () {
    function PaymentModule() {
    }
    PaymentModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_payments_payments_component__WEBPACK_IMPORTED_MODULE_3__["PaymentsComponent"], _view_payment_view_payment_component__WEBPACK_IMPORTED_MODULE_10__["ViewPaymentComponent"], _editable_editable_component__WEBPACK_IMPORTED_MODULE_11__["EditableComponent"], _editable_editable_component__WEBPACK_IMPORTED_MODULE_11__["ViewModeDirective"], _editable_editable_component__WEBPACK_IMPORTED_MODULE_11__["EditModeDirective"], _detail_view_detail_view_component__WEBPACK_IMPORTED_MODULE_12__["DetailViewComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"],
                _app_material_app_material_module__WEBPACK_IMPORTED_MODULE_9__["AppMaterialModule"],
                _payment_routing_module__WEBPACK_IMPORTED_MODULE_2__["PaymentRoutingModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["ReactiveFormsModule"],
                _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
                _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_7__["MatSnackBarModule"],
                _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"].withConfig({ addFlexToParent: false })
            ],
            entryComponents: [_payments_payments_component__WEBPACK_IMPORTED_MODULE_3__["PaymentsComponent"]],
            providers: [
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MAT_DIALOG_DATA"], useValue: {} },
                { provide: _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialogRef"], useValue: {} },
            ]
        })
    ], PaymentModule);
    return PaymentModule;
}());



/***/ }),

/***/ "./src/app/layout/payment/payments/payments.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/layout/payment/payments/payments.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div fxLayout=\"row\" fxLayout.xs=\"column\" fxLayoutWrap fxLayoutGap=\"0.5%\" fxLayoutAlign=\"center\">\n  <mat-card>\n      <form [formGroup]=\"form\" (ngSubmit)=\"submit_form()\">\n      <mat-card-header>\n          <mat-card-title>Add Payment</mat-card-title>\n      </mat-card-header>\n      <mat-card-content flex=\"50\">\n          <section class=\"example-section\">\n            <mat-form-field class=\"example-margin customer-col\">\n                <span matSuffix [className]=\"outstandingDet.classname\">&nbsp; <i>{{outstandingDet.amount | currency:'INR'}}</i></span>\n                <input type=\"text\" autofocus placeholder=\"Customer Name\" aria-label=\"Number\" matInput formControlName=\"customerName\" [matAutocomplete]=\"customer\" [readonly]=\"dedicatedCustomer\">\n                <!-- <button mat-icon-button matSuffix (click)=\"clear()\">\n                    <mat-icon>clear</mat-icon>\n                    </button> -->\n                <mat-autocomplete autoActiveFirstOption #customer=\"matAutocomplete\" [displayWith]=\"displayCustomerFn\">\n                  <mat-option *ngFor=\"let customer of customerFilteredOptions | async\"  [value]=\"customer\">\n                    {{customer.customerName}}\n                  </mat-option>\n                </mat-autocomplete>\n            </mat-form-field>\n          </section>\n          <section class=\"example-section\">\n                <mat-form-field class=\"example-margin\">\n                    <mat-select matInput placeholder=\"Type\" formControlName=\"payment_type\">\n                        <mat-option *ngFor=\"let opt of payment_type\" [value]=\"opt.key\">{{opt.value}}</mat-option>\n                    </mat-select>\n                </mat-form-field>\n          </section>\n          <section class=\"example-section\">\n              <mat-form-field class=\"example-margin\">\n                  <input matInput type=\"number\" formControlName=\"amount\" placeholder=\"Amount\">\n              </mat-form-field>\n          </section>\n          <section class=\"example-section\">\n              <button type=\"submit\" mat-raised-button color=\"primary\" class=\"margin-left\">Submit</button>\n              <button type=\"button\" mat-raised-button color=\"default\" class=\"margin-left\" (click)=\"closeModal()\">{{dedicatedCustomer?'Cancel':'Reset'}}</button>\n          </section>\n      </mat-card-content>\n      </form>\n  </mat-card>\n  <mat-card >\n      <mat-card-header>\n          <mat-card-title>Payments</mat-card-title>\n      </mat-card-header>\n      <mat-card-content flex=\"50\">\n          <section class=\"example-section\">\n              <mat-form-field class=\"example-margin\">\n                  <input matInput name=\"searKey\" [(ngModel)]=\"searKey\" (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\n                  <button mat-icon-button matSuffix (click)=\"clear()\">\n                    <mat-icon>{{searKey?'clear':''}}</mat-icon>\n                  </button>\n              </mat-form-field>\n              <mat-form-field fxFlex class=\"\">\n                <input matInput disabled [max]=\"maxToDate\" [matDatepicker]=\"picker\" placeholder=\"Choose a date\" name=\"pDate\" (dateInput)=\"loadPayments()\" [(ngModel)]=\"pDate\">\n                <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n                <mat-datepicker disabled=\"false\" #picker></mat-datepicker>\n              </mat-form-field>\n          </section>\n      </mat-card-content>\n      \n      <div class=\"mat-elevation-z8\" flex=\"50\">\n          <table mat-table [dataSource]=\"dataSource\" matSort>\n      \n              <!-- <ng-container matColumnDef=\"sno\">\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Area Name </th>\n                  <td mat-cell *matCellDef=\"let row\" [style.color]=\"row.areaName\"> {{row.areaName}} </td>\n              </ng-container> -->\n\n              <ng-container matColumnDef=\"type\">\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Type </th>\n                  <td mat-cell *matCellDef=\"let row\"> {{row.payment_type}} </td>\n              </ng-container>\n              <ng-container matColumnDef=\"date\" *ngIf=\"dedicatedCustomer\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>\n                <td mat-cell *matCellDef=\"let row\"> {{row.localdate}} </td>\n              </ng-container>\n              <ng-container matColumnDef=\"customer\" *ngIf=\"!dedicatedCustomer\">\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Customer </th>\n                  <td mat-cell *matCellDef=\"let row\"> {{row.customer[0].customerName}} </td>\n              </ng-container>\n              <ng-container matColumnDef=\"amount\">\n                  <th mat-header-cell *matHeaderCellDef mat-sort-header> Amount </th>\n                  <td mat-cell *matCellDef=\"let row\" > {{row.amount | currency:'INR'}} </td>\n              </ng-container>\n              <ng-container matColumnDef=\"actions\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Actions </th>\n                <td mat-cell *matCellDef=\"let row\" > <p class=\"display-inline\">\n                  <mat-icon class=\"print\" (click)=\"editPayment(row)\">delete_forever</mat-icon>\n                  <!-- <mat-icon class=\"print\" (click)=\"deleteEntry(row)\">delete</mat-icon> -->\n                  </p> </td>\n                <td mat-footer-cell *matFooterCellDef>  </td>\n              </ng-container>\n              <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n              <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n          </table>\n      \n          <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\n      </div>\n  </mat-card>\n</div>\n"

/***/ }),

/***/ "./src/app/layout/payment/payments/payments.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/layout/payment/payments/payments.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\ntd,\nth {\n  width: 25%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 80px; }\n\n.example-margin {\n  margin: 15px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n.mat-card {\n  width: 90%; }\n\n.mat-cell {\n  text-align: left; }\n\n.negative-amt {\n  color: red; }\n\n.positive-amt {\n  color: limegreen; }\n\n.margin-left {\n  margin-left: 0.23em; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3BheW1lbnQvcGF5bWVudHMvQzpcXGxvY2FsZGlza1xcbXl3b3JrXFxkc3VpdGVcXGNsaWVudC9zcmNcXGFwcFxcbGF5b3V0XFxwYXltZW50XFxwYXltZW50c1xccGF5bWVudHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFXLEVBQ2Q7O0FBRUQ7RUFDSSxnQkFBZTtFQUNmLFlBQVcsRUFDZDs7QUFFRDs7RUFFSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxjQUFhO0VBQ2Isc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxpQkFBZ0IsRUFDbkI7O0FBRUQ7RUFDSSxXQUFTLEVBQ1o7O0FBRUQ7RUFDSSxpQkFBZ0IsRUFDbkI7O0FBRUQ7RUFDSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxpQkFBZ0IsRUFDbkI7O0FBRUQ7RUFDSSxvQkFBbUIsRUFDdEIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvcGF5bWVudC9wYXltZW50cy9wYXltZW50cy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ubWF0LWZvcm0tZmllbGQge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRkLFxyXG50aCB7XHJcbiAgICB3aWR0aDogMjUlO1xyXG59XHJcblxyXG4uZXhhbXBsZS1zZWN0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiA4MHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1tYXJnaW4ge1xyXG4gICAgbWFyZ2luOiAxNXB4O1xyXG59XHJcblxyXG4uY2xlYXJwaXgge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxufVxyXG5cclxuLm1hdC1jYXJke1xyXG4gICAgd2lkdGg6OTAlO1xyXG59XHJcblxyXG4ubWF0LWNlbGx7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcblxyXG4ubmVnYXRpdmUtYW10IHtcclxuICAgIGNvbG9yOiByZWQ7XHJcbn1cclxuXHJcbi5wb3NpdGl2ZS1hbXQge1xyXG4gICAgY29sb3I6IGxpbWVncmVlbjtcclxufVxyXG5cclxuLm1hcmdpbi1sZWZ0IHtcclxuICAgIG1hcmdpbi1sZWZ0OiAwLjIzZW07XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/payment/payments/payments.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/layout/payment/payments/payments.component.ts ***!
  \***************************************************************/
/*! exports provided: ValidateUrl, PaymentsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidateUrl", function() { return ValidateUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PaymentsComponent", function() { return PaymentsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _constants_contants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../constants/contants */ "./src/app/constants/contants.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_app_app_material_confirm_pop_confirm_pop_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/app-material/confirm-pop/confirm-pop.component */ "./src/app/app-material/confirm-pop/confirm-pop.component.ts");
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



//import {MatGridListModule} from '@angular/material/grid-list';







function ValidateUrl(control) {
    if (control.value && !control.value.customerName) {
        return { validUrl: true };
    }
    return null;
}
var PaymentsComponent = /** @class */ (function () {
    function PaymentsComponent(dialog, commonService, snackBar, dialogRef, datePipe, form_value) {
        this.dialog = dialog;
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
        this.datePipe = datePipe;
        this.form_value = form_value;
        this.displayedColumns = ['type', 'amount', 'actions'];
        this.outstandingDet = {
            amount: 0,
            classname: 'negative-amt'
        };
        this.dedicatedCustomer = false;
        this.maxToDate = new Date();
        this.pDate = new Date();
        this.searKey = "";
        this.confirmBox = "YES";
        if (form_value.customer) {
            this.currentCustomer = form_value.customer;
            this.dedicatedCustomer = true;
        }
    }
    PaymentsComponent.prototype.ngOnInit = function () {
        //    this.dataSource.filterPredicate = (data, filter: string) => data.customer[0].customerName.toLowerCase().includes(filter) || data.payment_type.toString() === filter;
        this.payment_type = _constants_contants__WEBPACK_IMPORTED_MODULE_4__["PAYMENT_TYPE"].map(function (val) {
            return {
                key: val,
                value: val
            };
        });
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormGroup"]({
            'payment_type': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required),
            'customerName': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', [_angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required, ValidateUrl]),
            'amount': new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('', _angular_forms__WEBPACK_IMPORTED_MODULE_5__["Validators"].required)
        });
        this.loadPayments();
        if (this.dedicatedCustomer) {
            this.displayedColumns.unshift('date');
            this.form.controls['customerName'].setValue(this.currentCustomer);
            this.outstandingApi(this.currentCustomer._id);
        }
        else {
            this.displayedColumns.unshift('customer');
            this.loadCustomers();
            this.loadOutstandingAmount();
        }
    };
    PaymentsComponent.prototype.editPayment = function (p) {
        var _this = this;
        var dialogRef = this.dialog.open(src_app_app_material_confirm_pop_confirm_pop_component__WEBPACK_IMPORTED_MODULE_8__["ConfirmPopComponent"], {
            width: '250px',
            data: { confirm: this.confirmBox }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result && result == 'YES') {
                var data = {};
                _this.commonService.putMethod(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.deletePayment + '/' + p._id, data).subscribe(function (data) {
                    if (data.code == 200) {
                        _this.snackBar.open("Deleted successfully!!", "Success", {
                            duration: 1000,
                        });
                    }
                    _this.loadPayments();
                });
            }
        });
        //this.form.controls['customerName'].setValue(this.currentCustomer);
    };
    PaymentsComponent.prototype.loadCustomers = function () {
        var _this = this;
        this.commonService.getMethod(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.getCustomer).subscribe(function (data) {
            _this.customerList = data;
            _this._callCustomerFilter();
        });
    };
    PaymentsComponent.prototype._callCustomerFilter = function () {
        var _this = this;
        this.customerFilteredOptions = this.form.get("customerName").valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["startWith"])(''), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_6__["map"])(function (value) { return (value && value.length >= 1) ? _this._custFilter(value) : []; }));
    };
    PaymentsComponent.prototype._custFilter = function (value) {
        var filterValue = (typeof value == 'string') ? value.toLowerCase() : "";
        return this.customerList.filter(function (customer) { return customer.customerName.toLowerCase().includes(filterValue); });
    };
    PaymentsComponent.prototype.displayCustomerFn = function (cust) {
        return cust ? cust.customerName : undefined;
    };
    PaymentsComponent.prototype.loadOutstandingAmount = function () {
        var _this = this;
        this.form.get('customerName').valueChanges.subscribe(function (val) {
            if (val && val._id) {
                _this.outstandingApi(val._id);
            }
        });
    };
    PaymentsComponent.prototype.outstandingApi = function (cust_id) {
        var _this = this;
        this.commonService.getMethod(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.getOutstanding + '?cust_id=' + cust_id).subscribe(function (data) {
            if (data.code == 200) {
                var outstanding = data.data.total_sales - data.data.total_payment;
                _this.outstandingDet = {
                    amount: outstanding,
                    classname: (outstanding <= 0) ? 'negative-amt' : 'positive-amt'
                };
            }
        });
    };
    PaymentsComponent.prototype.loadPayments = function () {
        var _this = this;
        var url = _environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.getPayment + '?pdate=' + this.datePipe.transform(this.pDate, "dd-MM-yyyy");
        if (this.dedicatedCustomer) {
            url += "&cust_id=" + this.currentCustomer._id;
        }
        this.commonService.getMethod(url).subscribe(function (data) {
            _this.payments = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.payments);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
            // this.dataSource.filterPredicate = (data, filter: string) => {
            //   return data.payment_type == filter;
            // };
            _this.dataSource.filterPredicate = function (data, filter) {
                var accumulator = function (currentTerm, key) {
                    return key === 'customer' ? currentTerm + data.customer[0].customerName : currentTerm + data[key];
                };
                var dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
                // Transform the filter by converting it to lowercase and removing whitespace.
                var transformedFilter = filter.trim().toLowerCase();
                return dataStr.indexOf(transformedFilter) !== -1;
            };
        });
    };
    PaymentsComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    PaymentsComponent.prototype.clear = function () {
        this.searKey = "";
        this.dataSource.filter = this.searKey;
    };
    PaymentsComponent.prototype.closeModal = function () {
        if (!this.dedicatedCustomer) {
            this.outstandingDet = {
                amount: 0,
                classname: 'negative-amt'
            };
            this.form.reset();
        }
        else {
            this.dialogRef.close();
        }
    };
    PaymentsComponent.prototype.submit_form = function () {
        var _this = this;
        console.log(this.form);
        if (this.form.status && this.form.status == "VALID") {
            var data = {
                customer_id: this.form.value.customerName._id,
                amount: this.form.value.amount,
                payment_type: this.form.value.payment_type
            };
            this.commonService.postMethod(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.postPayment, data).subscribe(function (data) {
                _this.snackBar.open("Saved successfully!!", "Success", {
                    duration: 500,
                });
                if (_this.dedicatedCustomer) {
                    _this.closeModal();
                }
                else {
                    _this.loadPayments();
                    _this.outstandingDet = {
                        amount: 0,
                        classname: 'negative-amt'
                    };
                    _this.form.reset();
                }
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
    ], PaymentsComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], PaymentsComponent.prototype, "sort", void 0);
    PaymentsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-payments',
            template: __webpack_require__(/*! ./payments.component.html */ "./src/app/layout/payment/payments/payments.component.html"),
            styles: [__webpack_require__(/*! ./payments.component.scss */ "./src/app/layout/payment/payments/payments.component.scss")]
        }),
        __param(5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"], Object])
    ], PaymentsComponent);
    return PaymentsComponent;
}());



/***/ }),

/***/ "./src/app/layout/payment/view-payment/view-payment.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/layout/payment/view-payment/view-payment.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div >\n  <mat-card >\n    <mat-card-header>\n        <mat-card-title>Payments</mat-card-title>\n    </mat-card-header>\n    <mat-card-content>\n      <section class=\"example-section\" [ngClass]=\"{'toggle':enableSearch}\" fxLayout=\"row\" fxLayout.lt-md=\"column\" fxFlex fxLayoutGap=\"20px\">\n        <span class=\"no-margin\"><mat-icon (click)=\"enableSearch = !enableSearch\">search</mat-icon></span>\n        <mat-form-field fxFlex class=\"\">\n            <input matInput name=\"searKey\" [(ngModel)]=\"searKey\" (keyup)=\"filterOpts()\" placeholder=\"Filter\">\n            <button mat-icon-button matSuffix (click)=\"clear()\">\n              <mat-icon>{{searKey?'clear':''}}</mat-icon>\n              </button>\n        </mat-form-field>\n        <mat-form-field fxFlex class=\"\">\n            <mat-select name=\"selRoute\" [(ngModel)]=\"selRoute\" (selectionChange)=\"filterOpts()\" placeholder=\"Route\" >\n                <mat-option *ngFor=\"let r of routes\" [value]=\"r.key\">{{r.value}}</mat-option>\n            </mat-select>\n        </mat-form-field>\n        <mat-form-field fxFlex class=\"\">\n          <mat-select name=\"selRoute\" [(ngModel)]=\"selUser\" (selectionChange)=\"filterOpts()\" placeholder=\"User\" >\n              <mat-option *ngFor=\"let r of usersList\" [value]=\"r.key\">{{r.value}}</mat-option>\n          </mat-select>\n      </mat-form-field>\n        <mat-form-field fxFlex class=\"\">\n          <input matInput disabled [max]=\"maxToDate\" [matDatepicker]=\"picker\" placeholder=\"Choose a date\" name=\"delDate\" (dateInput)=\"loadPayments()\" [(ngModel)]=\"delDate\">\n          <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n          <mat-datepicker disabled=\"false\" #picker></mat-datepicker>\n        </mat-form-field>\n      </section> \n        <!-- <section class=\"example-section\">\n            <mat-form-field class=\"example-margin\">\n                <input matInput name=\"searKey\" [(ngModel)]=\"searKey\" (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\n                <button mat-icon-button matSuffix (click)=\"clear()\">\n                  <mat-icon>{{searKey?'clear':''}}</mat-icon>\n                </button>\n            </mat-form-field>\n            <mat-form-field fxFlex class=\"\">\n              <input matInput disabled [max]=\"maxToDate\" [matDatepicker]=\"picker\" placeholder=\"Choose a date\" name=\"pDate\" (dateInput)=\"loadPayments()\" [(ngModel)]=\"pDate\">\n              <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n              <mat-datepicker disabled=\"false\" #picker></mat-datepicker>\n            </mat-form-field>\n        </section> -->\n    </mat-card-content>\n    \n    <div class=\"mat-elevation-z8\" flex=\"50\">\n        <table mat-table [dataSource]=\"dataSource\" matSort>\n    \n            <!-- <ng-container matColumnDef=\"sno\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Area Name </th>\n                <td mat-cell *matCellDef=\"let row\" [style.color]=\"row.areaName\"> {{row.areaName}} </td>\n            </ng-container> -->\n            <ng-container matColumnDef=\"customer\">\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Customer </th>\n              <td mat-cell *matCellDef=\"let row\"> {{row.customer[0].customerName}} </td>\n              <td mat-footer-cell *matFooterCellDef>  </td>\n            </ng-container>\n            <ng-container matColumnDef=\"type\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Type </th>\n                <td mat-cell *matCellDef=\"let row\"> {{row.payment_type}} </td>\n                <td mat-footer-cell *matFooterCellDef> Total </td>\n            </ng-container>\n            <!-- <ng-container matColumnDef=\"date\" *ngIf=\"dedicatedCustomer\">\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Date </th>\n              <td mat-cell *matCellDef=\"let row\"> {{row.localdate}} </td>\n            </ng-container> -->            \n            <ng-container matColumnDef=\"amount\">\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Amount </th>\n                <td mat-cell *matCellDef=\"let row; let i = index\" > \n                  <!-- <span *ngIf=\"!row.isEdit\" >{{row.amount | currency:'INR'}}</span>\n                  <input *ngIf=\"row.isEdit\" matInput size=\"10\" class=\"ip-size\" type=\"number\"/>  -->\n                  <editable (update)=\"updateField(i,'amount')\">\n                    <ng-template viewMode>\n                      {{row.amount | currency:'INR'}}\n                    </ng-template>\n                    <ng-template editMode>\n                      <mat-form-field class=\"example-full-width\">\n                        <input matInput type=\"number\" [formControl]=\"getControl(i, 'amount')\" />\n                        <!-- <mat-error *ngIf=\"getControl(row, 'amount').hasError('required')\">\n                          Field is <strong>required</strong>\n                        </mat-error> -->\n                      </mat-form-field>\n                      <p>{{row.amount}}</p>\n                      <!-- <input [formControl]=\"getControl(i, 'amount')\" /> -->\n                    </ng-template>\n                  </editable>\n                </td>\n                <td mat-footer-cell *matFooterCellDef> {{getTotalCost()|currency:'INR'}} </td>\n            </ng-container>\n            <ng-container matColumnDef=\"createdBy\">\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Created By </th>\n              <td mat-cell *matCellDef=\"let row\"> {{row.createdUser[0].username}} </td>\n              <td mat-footer-cell *matFooterCellDef>  </td>\n            </ng-container>\n            <ng-container matColumnDef=\"actions\">\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Actions </th>\n              <td mat-cell *matCellDef=\"let row\" > <p class=\"display-inline\">\n                <!-- <mat-icon class=\"print\" (click)=\"editEntry(row)\">edit</mat-icon> -->\n                <mat-icon class=\"print\" (click)=\"editPayment(row)\">delete_forever</mat-icon>                \n                </p> </td>\n              <td mat-footer-cell *matFooterCellDef>  </td>\n            </ng-container>\n            <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n            <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n            <tr mat-footer-row *matFooterRowDef=\"displayedColumns\"></tr>\n        </table>\n    \n        <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\n    </div>\n</mat-card>\n</div>"

/***/ }),

/***/ "./src/app/layout/payment/view-payment/view-payment.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/layout/payment/view-payment/view-payment.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\ntd,\nth {\n  width: 25%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\n.example-full-width {\n  width: 3.5em; }\n\n.example-section {\n  align-content: center;\n  align-items: center;\n  background-color: #E8F1FF;\n  padding: 10px 15px;\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  margin-bottom: 8px; }\n\n.example-margin {\n  margin: 15px; }\n\n.visible-md {\n  display: none; }\n\n.no-margin {\n  margin-bottom: 0 !important; }\n\n.ip-size {\n  width: 5em; }\n\n@media screen and (max-width: 992px) {\n  .visible-md {\n    display: block; }\n  .toggle .mat-form-field {\n    display: none; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L3BheW1lbnQvdmlldy1wYXltZW50L0M6XFxsb2NhbGRpc2tcXG15d29ya1xcZHN1aXRlXFxjbGllbnQvc3JjXFxhcHBcXGxheW91dFxccGF5bWVudFxcdmlldy1wYXltZW50XFx2aWV3LXBheW1lbnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFXLEVBQ2Q7O0FBRUQ7O0VBRUksV0FBVSxFQUNiOztBQUVEO0VBQ0ksZ0JBQWU7RUFDZixZQUFXLEVBQ2Q7O0FBRUQ7RUFDSSxhQUFZLEVBQ2Y7O0FBRUQ7RUFFSSxzQkFBcUI7RUFDckIsb0JBQW1CO0VBRW5CLDBCQUF5QjtFQUN6QixtQkFBa0I7RUFDbEIsZ0hBQW1HO0VBQ25HLG1CQUFrQixFQUNyQjs7QUFPRDtFQUNJLGFBQVksRUFDZjs7QUFDRDtFQUNJLGNBQWEsRUFDaEI7O0FBRUQ7RUFDSSw0QkFBNEIsRUFDL0I7O0FBRUQ7RUFDSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDQTtJQUNJLGVBQWMsRUFDakI7RUFFRDtJQUVJLGNBQVksRUFDWCxFQUFBIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L3BheW1lbnQvdmlldy1wYXltZW50L3ZpZXctcGF5bWVudC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG50ZCxcclxudGgge1xyXG4gICAgd2lkdGg6IDI1JTtcclxufVxyXG5cclxuLm1hdC1mb3JtLWZpZWxkIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uZXhhbXBsZS1mdWxsLXdpZHRoe1xyXG4gICAgd2lkdGg6IDMuNWVtO1xyXG59XHJcblxyXG4uZXhhbXBsZS1zZWN0aW9uIHtcclxuICAgIC8vZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAvLyBoZWlnaHQ6IDYwcHg7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRThGMUZGO1xyXG4gICAgcGFkZGluZzogMTBweCAxNXB4O1xyXG4gICAgYm94LXNoYWRvdzogMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksIDAgMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSwgMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG59XHJcbi8vIC5leGFtcGxlLXNlY3Rpb24ge1xyXG4vLyAgICAgZGlzcGxheTogZmxleDtcclxuLy8gICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuLy8gICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbi8vICAgICBoZWlnaHQ6IDgwcHg7XHJcbi8vIH1cclxuLmV4YW1wbGUtbWFyZ2luIHtcclxuICAgIG1hcmdpbjogMTVweDtcclxufVxyXG4udmlzaWJsZS1tZCB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG59XHJcblxyXG4ubm8tbWFyZ2lue1xyXG4gICAgbWFyZ2luLWJvdHRvbSA6IDAgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmlwLXNpemUge1xyXG4gICAgd2lkdGg6IDVlbTtcclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTkycHgpIHtcclxuLnZpc2libGUtbWQge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbn1cclxuXHJcbi50b2dnbGUge1xyXG4gICAgLm1hdC1mb3JtLWZpZWxkIHtcclxuICAgIGRpc3BsYXk6bm9uZTtcclxuICAgIH1cclxufVxyXG59Il19 */"

/***/ }),

/***/ "./src/app/layout/payment/view-payment/view-payment.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/layout/payment/view-payment/view-payment.component.ts ***!
  \***********************************************************************/
/*! exports provided: ViewPaymentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewPaymentComponent", function() { return ViewPaymentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_services_bootstrap_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/services/bootstrap.service */ "./src/app/services/bootstrap.service.ts");
/* harmony import */ var src_app_app_material_confirm_pop_confirm_pop_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/app-material/confirm-pop/confirm-pop.component */ "./src/app/app-material/confirm-pop/confirm-pop.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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









var ViewPaymentComponent = /** @class */ (function () {
    function ViewPaymentComponent(dialog, bootstrap, commonService, snackBar, datePipe, form_value) {
        this.dialog = dialog;
        this.bootstrap = bootstrap;
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.datePipe = datePipe;
        this.form_value = form_value;
        this.enableSearch = false;
        this.displayedColumns = ['customer', 'type', 'amount', 'createdBy', 'actions'];
        this.dedicatedCustomer = false;
        this.maxToDate = new Date();
        this.pDate = new Date();
        this.searKey = "";
        this.confirmBox = "YES";
        this.delDate = new Date();
        this.selRoute = "all";
        this.selUser = "all";
    }
    ViewPaymentComponent.prototype.ngOnInit = function () {
        this.loadMasters();
        this.loadPayments();
    };
    ViewPaymentComponent.prototype.loadMasters = function () {
        var _this = this;
        this.routes = this.bootstrap.routes.map(function (val) {
            return {
                key: val._id,
                value: val.areaName
            };
        });
        this.routes.push({ key: 'all', value: 'All' });
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getUser).subscribe(function (data) {
            _this.usersList = data.map(function (val) {
                return {
                    key: val._id,
                    value: val.username
                };
            });
            _this.usersList.push({ key: 'all', value: 'All' });
        });
    };
    ViewPaymentComponent.prototype.addEvent = function () {
        console.log('test');
    };
    ViewPaymentComponent.prototype.getTotalCost = function () {
        if (this.tempPayment && this.tempPayment.length > 0)
            return (this.tempPayment.map(function (t) { return t.amount; }).reduce(function (acc, value) { return acc + value; }, 0));
        return 0;
    };
    ViewPaymentComponent.prototype.filterOpts = function () {
        var _this = this;
        this.tempPayment = this.payments.map(function (obj) { return (__assign({}, obj, { isEdit: false })); });
        if (this.selUser != 'all') {
            this.tempPayment = this.tempPayment.filter(function (val) { return val.createdBy == _this.selUser; });
        }
        if (this.selRoute != 'all') {
            this.tempPayment = this.tempPayment.filter(function (val) { return val.customer[0].route == _this.selRoute; });
        }
        if (this.searKey != '') {
            this.tempPayment = this.tempPayment.filter(function (pay) {
                return pay.customer[0].customerName.toLowerCase().indexOf(_this.searKey.toLowerCase()) > -1;
            });
        }
        this.loadTable(this.tempPayment);
    };
    ViewPaymentComponent.prototype.loadPayments = function () {
        var _this = this;
        var url = src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getPayment + '?pdate=' + this.datePipe.transform(this.delDate, "dd-MM-yyyy");
        if (this.dedicatedCustomer) {
            //url+="&cust_id="+this.currentCustomer._id;
        }
        this.commonService.getMethod(url).subscribe(function (data) {
            _this.payments = data;
            _this.filterOpts();
        });
    };
    ViewPaymentComponent.prototype.loadTable = function (payments) {
        var toGrp = payments.map(function (row) {
            return new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormGroup"]({
                _id: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](row._id, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required),
                amount: new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormControl"](row.amount, _angular_forms__WEBPACK_IMPORTED_MODULE_7__["Validators"].required)
            }, { updateOn: "blur" });
        });
        this.controls = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormArray"](toGrp);
        this.list$ = new rxjs__WEBPACK_IMPORTED_MODULE_8__["BehaviorSubject"](payments);
        //this.dataSource = new MatTableDataSource(payments);
        //this.dataSource.data = payments;
        this.dataSource = this.list$;
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;      
        // this.dataSource.filterPredicate = (data, filter: string) => {
        //   return data.payment_type == filter;
        // };
        // this.dataSource.filterPredicate = (data, filter: string)  => {
        //   const accumulator = (currentTerm, key) => {
        //     return key === 'customer' ? currentTerm + data.customer[0].customerName : currentTerm + data[key];
        //   };
        //   const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        //   // Transform the filter by converting it to lowercase and removing whitespace.
        //   const transformedFilter = filter.trim().toLowerCase();
        //   return dataStr.indexOf(transformedFilter) !== -1;
        // };
    };
    ViewPaymentComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ViewPaymentComponent.prototype.clear = function () {
        this.searKey = "";
        //this.dataSource.filter = this.searKey;
        this.filterOpts();
    };
    ViewPaymentComponent.prototype.editPayment = function (p) {
        var _this = this;
        var dialogRef = this.dialog.open(src_app_app_material_confirm_pop_confirm_pop_component__WEBPACK_IMPORTED_MODULE_6__["ConfirmPopComponent"], {
            width: '250px',
            data: { confirm: this.confirmBox }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result && result == 'YES') {
                var data = {};
                _this.commonService.putMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.deletePayment + '/' + p._id, data).subscribe(function (data) {
                    if (data.code == 200) {
                        _this.snackBar.open("Deleted successfully!!", "Success", {
                            duration: 1000,
                        });
                    }
                    _this.loadPayments();
                });
            }
        });
        //this.form.controls['customerName'].setValue(this.currentCustomer);
    };
    ViewPaymentComponent.prototype.getControl = function (index, fieldName) {
        return this.controls.at(index).get(fieldName);
    };
    ViewPaymentComponent.prototype.updateField = function (index, field) {
        var _this = this;
        var payment_id = this.getControl(index, '_id');
        var new_amount = this.getControl(index, field);
        var old_value = this.tempPayment[index]['amount'];
        //console.log(payment_id.value+'---'+new_amount.value+'--'+old_value);
        if (new_amount.valid && old_value != new_amount.value) {
            //console.log(new_amount.value);
            var dialogRef = this.dialog.open(src_app_app_material_confirm_pop_confirm_pop_component__WEBPACK_IMPORTED_MODULE_6__["ConfirmPopComponent"], {
                width: '250px',
                data: { confirm: this.confirmBox, label: 'Do you want to update the amount?' }
            });
            dialogRef.afterClosed().subscribe(function (result) {
                if (result && result == 'YES') {
                    var data = {
                        'amount': new_amount.value
                    };
                    _this.commonService.putMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.updatePayment + '/' + payment_id.value, data).subscribe(function (data) {
                        //console.log(data);
                        if (data.code == 200) {
                            _this.snackBar.open("Updated successfully!!", "Success", {
                                duration: 1000,
                            });
                            // this.controls.at(index).patchValue({
                            //   'amount': new_amount.value
                            // });
                            //console.log(new_amount.value);
                            _this.tempPayment[index]['amount'] = new_amount.value;
                            //console.log(this.tempPayment);
                            _this.list$.next(_this.tempPayment);
                        }
                    });
                }
            });
        }
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], ViewPaymentComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], ViewPaymentComponent.prototype, "sort", void 0);
    ViewPaymentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-view-payment',
            template: __webpack_require__(/*! ./view-payment.component.html */ "./src/app/layout/payment/view-payment/view-payment.component.html"),
            styles: [__webpack_require__(/*! ./view-payment.component.scss */ "./src/app/layout/payment/view-payment/view-payment.component.scss")]
        }),
        __param(5, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], src_app_services_bootstrap_service__WEBPACK_IMPORTED_MODULE_5__["BootstrapService"], src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"],
            _angular_common__WEBPACK_IMPORTED_MODULE_3__["DatePipe"], Object])
    ], ViewPaymentComponent);
    return ViewPaymentComponent;
}());



/***/ })

}]);
//# sourceMappingURL=default~leads-leads-module~payment-payment-module.js.map