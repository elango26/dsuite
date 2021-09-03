(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["default~masters-masters-module~transactions-transactions-module"],{

/***/ "./src/app/layout/masters/common-modal/common-modal.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/layout/masters/common-modal/common-modal.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"form\" (ngSubmit)=\"onSubmit()\">\r\n<h1 mat-dialog-title>{{title}}</h1>\r\n<div mat-dialog-content>\r\n<mat-card>\r\n  <!-- <mat-card-header>\r\n      <mat-card-title>{{title}}</mat-card-title>\r\n  </mat-card-header> -->\r\n  <mat-card-content class=\"common-modal\">          \r\n    <mat-form-field *ngFor=\"let form of form_value.formData\" [ngSwitch]=\"form.type\">\r\n        <input *ngSwitchCase=\"'input'\" matInput [attr.type]=\"form.inputType\" [formControlName] = \"form.name\" [placeholder]=\"form.placeholder\">            \r\n        <textarea *ngSwitchCase=\"'textarea'\" matInput [formControlName] = \"form.name\" [placeholder]=\"form.placeholder\"></textarea>            \r\n        <mat-select *ngSwitchCase=\"'select'\" matInput [formControlName] = \"form.name\" [placeholder]=\"form.placeholder\">\r\n            <mat-option *ngFor=\"let opt of form.options\" [value]=\"opt.key\">{{opt.value}}</mat-option>\r\n        </mat-select>\r\n    </mat-form-field>            \r\n  </mat-card-content>\r\n</mat-card>\r\n</div>\r\n<div mat-dialog-actions>\r\n  <button mat-button type=\"button\" (click)=\"onNoClick()\">Cancel</button>\r\n  <button mat-raised-button color=\"primary\" cdkFocusInitial type=\"submit\">Submit</button>\r\n</div>\r\n</form>"

/***/ }),

/***/ "./src/app/layout/masters/common-modal/common-modal.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/layout/masters/common-modal/common-modal.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".common-modal mat-form-field {\n  margin: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L21hc3RlcnMvY29tbW9uLW1vZGFsL0M6XFxsb2NhbGRpc2tcXG15d29ya1xcZHN1aXRlXFxjbGllbnQvc3JjXFxhcHBcXGxheW91dFxcbWFzdGVyc1xcY29tbW9uLW1vZGFsXFxjb21tb24tbW9kYWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFUSxhQUFZLEVBQ2YiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvbWFzdGVycy9jb21tb24tbW9kYWwvY29tbW9uLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbW1vbi1tb2RhbCB7XHJcbiAgICBtYXQtZm9ybS1maWVsZCB7XHJcbiAgICAgICAgbWFyZ2luOiAxMHB4O1xyXG4gICAgfVxyXG59Il19 */"

/***/ }),

/***/ "./src/app/layout/masters/common-modal/common-modal.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/layout/masters/common-modal/common-modal.component.ts ***!
  \***********************************************************************/
/*! exports provided: CommonModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommonModalComponent", function() { return CommonModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
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




var CommonModalComponent = /** @class */ (function () {
    function CommonModalComponent(commonService, snackBar, dialogRef, form_value) {
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
        this.form_value = form_value;
        this.title = "";
        this.httpMethod = "POST";
        this.title = form_value.formTitle;
        this.url = form_value.url;
        if (form_value.method)
            this.httpMethod = form_value.method;
        var fieldsCtrls = {};
        for (var _i = 0, _a = form_value.formData; _i < _a.length; _i++) {
            var f = _a[_i];
            var validation = [];
            if (f.validation.required)
                validation.push(_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required);
            //if (f.inputType != 'dropdown') {
            fieldsCtrls[f.name] = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](f.value || '', validation);
            // } else {
            //   let opts = {};
            //   for (let opt of f.options) {
            //     opts[opt.key] = new FormControl(opt.value);
            //   }
            //   fieldsCtrls[f.name] = new FormGroup(opts)
            // }
        }
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"](fieldsCtrls);
    }
    CommonModalComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    CommonModalComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.form.status == "VALID") {
            switch (this.httpMethod) {
                case 'POST':
                    this.commonService.postMethod(this.url, this.form.value).subscribe(function (data) {
                        _this.onNoClick();
                        _this.snackBar.open("Saved successfully!!", "Success", {
                            duration: 500,
                        });
                    }, function (error) {
                        _this.snackBar.open(error, "Error", {
                            duration: 500,
                        });
                    });
                    break;
                case 'PUT':
                    console.log(this.form.value); //return false;
                    this.commonService.putMethod(this.url + '/' + this.form.value._id, this.form.value).subscribe(function (data) {
                        _this.onNoClick();
                        _this.snackBar.open("Updated successfully!!", "Success", {
                            duration: 500,
                        });
                    }, function (error) {
                        _this.snackBar.open(error, "Error", {
                            duration: 500,
                        });
                    });
                    break;
                default:
                    this.snackBar.open("No Method defined", "Error", {
                        duration: 500,
                    });
                    break;
            }
        }
    };
    CommonModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-common-modal',
            template: __webpack_require__(/*! ./common-modal.component.html */ "./src/app/layout/masters/common-modal/common-modal.component.html"),
            styles: [__webpack_require__(/*! ./common-modal.component.scss */ "./src/app/layout/masters/common-modal/common-modal.component.scss")]
        }),
        __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], CommonModalComponent);
    return CommonModalComponent;
}());



/***/ }),

/***/ "./src/app/layout/masters/custom-modal/custom-modal.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/layout/masters/custom-modal/custom-modal.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"onSubmit()\">\r\n  <h1 mat-dialog-title><span *ngIf=\"isEdit\">{{edit_form.product.brand_name}}: {{edit_form.product.prod_name}}</span><span *ngIf=\"!isEdit\">{{title}}</span></h1>\r\n  <div mat-dialog-content>\r\n  <mat-card>\r\n    <!-- <mat-card-header>\r\n        <mat-card-title>{{title}}</mat-card-title>\r\n    </mat-card-header> -->\r\n    <mat-card-content class=\"common-modal\">       \r\n       <div class=\"rate-form-select\" *ngIf=\"!isEdit\">\r\n          <div *ngFor=\"let form of form_value.formData\" >\r\n              <select class=\"cs-select-box\" (change)=\"onDropDownSelect(form_value.source,form.options,$event.target.value)\" placeholder=\"form.placeholder\">\r\n                <option class=\"hide\" value=\"\" disabled selected>{{form.placeholder}}</option>\r\n                <option *ngFor=\"let opt of form.options; let idx = index\" [value]=\"idx\">{{opt.value}}</option>\r\n              </select>\r\n          </div>   \r\n       </div>\r\n       \r\n      <ng-container>\r\n        <mat-card class=\"mat-accord\" *ngIf=\"isEdit\">\r\n          <mat-accordion>\r\n          <ng-container *ngFor=\"let rates_avail of edit_form.product.rate_avail| keyvalue;let i = index\">\r\n          <mat-expansion-panel >            \r\n            <mat-expansion-panel-header>\r\n              <mat-panel-title>\r\n                {{rates_avail.key}}\r\n              </mat-panel-title>\r\n              <mat-panel-description>\r\n                <span>Count: {{rates_avail.value.length}}</span>\r\n              </mat-panel-description>\r\n            </mat-expansion-panel-header>\r\n            <mat-chip-list *ngFor=\"let price_list of rates_avail.value;let j=index\">\r\n                <mat-chip>Price: {{price_list.price}}</mat-chip>                \r\n                <mat-chip color=\"primary\" selected>Tax: {{price_list.tax}}%</mat-chip>\r\n                <mat-chip >Effective date: {{price_list.effective_date|date:'short'}}</mat-chip> \r\n                <mat-chip>\r\n                  <mat-form-field>\r\n                    <mat-select matInput name=\"is_active{{i}}{{j}}\" [(ngModel)]=\"price_list.is_active\" placeholder=\"Status\">\r\n                        <mat-option value=\"YES\">Active</mat-option>\r\n                        <mat-option value=\"NO\">In-Active</mat-option>\r\n                    </mat-select>\r\n                </mat-form-field>\r\n                </mat-chip>               \r\n            </mat-chip-list>            \r\n            \r\n          </mat-expansion-panel>\r\n        </ng-container>\r\n          </mat-accordion>\r\n        </mat-card>\r\n      </ng-container>\r\n      <ng-container *ngIf=\"fieldList.rates.length\">\r\n        <div *ngFor=\"let data of fieldList.rates; let j = index\" class=\"inline-flex\">\r\n          <mat-card class=\"mat-card\" *ngFor=\"let cRate of data.rate;let i = index\">\r\n              <mat-card-header>\r\n                  <mat-card-title>{{cRate.title}}</mat-card-title>\r\n              </mat-card-header>\r\n              <mat-card-content>\r\n                <section class=\"example-section\">\r\n                    <mat-form-field class=\"example-width\">\r\n                        <input matInput [(ngModel)]=\"cRate.price\" name=\"{{cRate.title+'price'+i+j}}\" type=\"'text'\"  placeholder=\"Price\">\r\n                    </mat-form-field>\r\n                    <br>\r\n                    <mat-form-field class=\"example-width\">\r\n                        <input matInput [(ngModel)]=\"cRate.tax\" name=\"{{cRate.title+'tax'+i+j}}\" type=\"'text'\" placeholder=\"Tax\">  \r\n                    </mat-form-field>           \r\n                </section>\r\n              </mat-card-content>\r\n            </mat-card>\r\n          <div>\r\n            <mat-card class=\"mat-card-invert\">\r\n              <mat-card-header>\r\n                  <mat-card-title>Action</mat-card-title>\r\n              </mat-card-header>\r\n              <mat-card-content>\r\n                <mat-form-field class=\"example-width\">\r\n                  <input matInput disabled [matDatepicker]=\"picker\" [(ngModel)]=\"data.effective_date\" name=\"effective_date\" placeholder=\"Effective date\">\r\n                  <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\r\n                  <mat-datepicker disabled=\"false\" #picker></mat-datepicker>\r\n                </mat-form-field>\r\n                <br>\r\n                <mat-form-field class=\"example-width\">                \r\n                  <mat-select matInput [(ngModel)]=\"data.is_active\" name=\"is_active\" placeholder=\"Status\">\r\n                      <mat-option value=\"YES\">Active</mat-option>\r\n                      <mat-option value=\"NO\">In-Active</mat-option>\r\n                  </mat-select>\r\n                </mat-form-field>\r\n              </mat-card-content>\r\n            </mat-card>\r\n          </div>\r\n        </div>\r\n      </ng-container>  \r\n    </mat-card-content>\r\n  </mat-card>\r\n  </div>\r\n  <div mat-dialog-actions>\r\n    <button mat-button type=\"button\" (click)=\"onNoClick()\">Cancel</button>\r\n    <button mat-raised-button color=\"primary\" cdkFocusInitial type=\"submit\">Submit</button>\r\n  </div>\r\n  </form>"

/***/ }),

/***/ "./src/app/layout/masters/custom-modal/custom-modal.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/layout/masters/custom-modal/custom-modal.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".rate-form-list .lable-name, .rate-form-list .input-fields {\n  display: inline-block; }\n\n.rate-form-list .lable-name {\n  width: 100px;\n  padding: 10px; }\n\n.rate-form-list .single-row {\n  padding: 10px 0;\n  display: inline-flex; }\n\n.rate-form-list .single-row-nw {\n  padding: 10px 0;\n  display: inline-block; }\n\n.rate-form-list .action-box {\n  border-top: 1px solid #ccc;\n  padding: 10px 0px 10px 10px; }\n\n.rate-form-list .input-fields {\n  display: inline-flex; }\n\n.rate-form-list .rate-btn.save-btn {\n  background-color: #3f51b5;\n  color: #fff; }\n\n.rate-form-list .rate-btn {\n  margin-right: 8px;\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  cursor: pointer;\n  border: none;\n  text-align: center;\n  line-height: 36px;\n  padding: 10px 16px;\n  border-radius: 4px;\n  background-color: #fff; }\n\n.rate-form-list .cus-rate-box {\n  border: 1px solid #cccc;\n  margin: 10px 0; }\n\n.rate-form-list .single-rate {\n  display: inline-block; }\n\n.rate-form-list .single-rate input {\n    margin-bottom: 5px;\n    padding: 2px; }\n\n.rate-form-list .single-rate .rate-btn.selected {\n    background-color: #449d44;\n    color: #fff; }\n\n.rate-form-list mat-form-field {\n  width: 100px; }\n\n.rate-form-select {\n  margin-bottom: 25px; }\n\n.cs-select-box {\n  width: 30%;\n  padding: 10px; }\n\n.cs-select-box .hide {\n    display: none; }\n\n.inline-flex {\n  display: inline-flex; }\n\n.example-width {\n  width: 6em; }\n\n.mat-card {\n  margin-right: 0.2em; }\n\n.mat-card-invert {\n  background-color: #FFCCCC; }\n\n.mat-card-header .mat-card-title {\n  font-size: 16px; }\n\n.mat-card-content {\n  font-size: 16px; }\n\n.mat-card-header .mat-card-title {\n  margin-bottom: 4px; }\n\n.mat-accord {\n  margin-bottom: 1em; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L21hc3RlcnMvY3VzdG9tLW1vZGFsL0M6XFxsb2NhbGRpc2tcXG15d29ya1xcZHN1aXRlXFxjbGllbnQvc3JjXFxhcHBcXGxheW91dFxcbWFzdGVyc1xcY3VzdG9tLW1vZGFsXFxjdXN0b20tbW9kYWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFUSxzQkFDSixFQUFDOztBQUhMO0VBS1EsYUFBWTtFQUNaLGNBQWEsRUFDaEI7O0FBUEw7RUFTUSxnQkFBZTtFQUNmLHFCQUNKLEVBQUM7O0FBWEw7RUFhUSxnQkFBZTtFQUNmLHNCQUFxQixFQUN4Qjs7QUFmTDtFQWlCUSwyQkFBMEI7RUFDMUIsNEJBQTJCLEVBQzlCOztBQW5CTDtFQXFCUSxxQkFDSixFQUFDOztBQXRCTDtFQXdCUSwwQkFBeUI7RUFDekIsWUFBVyxFQUNkOztBQTFCTDtFQTRCUSxrQkFBaUI7RUFDakIsZ0hBQW1HO0VBQ25HLGdCQUFlO0VBQ2YsYUFBWTtFQUNaLG1CQUFrQjtFQUNsQixrQkFBaUI7RUFDakIsbUJBQWtCO0VBQ2xCLG1CQUFrQjtFQUNsQix1QkFBc0IsRUFDekI7O0FBckNMO0VBdUNRLHdCQUF1QjtFQUN2QixlQUFjLEVBQ2pCOztBQXpDTDtFQTJDUSxzQkFBcUIsRUFVeEI7O0FBckRMO0lBNkNZLG1CQUFrQjtJQUNsQixhQUFZLEVBQ2Y7O0FBL0NUO0lBa0RZLDBCQUF5QjtJQUN6QixZQUFXLEVBQ2Q7O0FBcERUO0VBdURRLGFBQVksRUFDZjs7QUFFTDtFQUNJLG9CQUFtQixFQUN0Qjs7QUFDRDtFQUNJLFdBQVU7RUFDVixjQUFhLEVBSWhCOztBQU5EO0lBSVEsY0FBYSxFQUNoQjs7QUFHTDtFQUNJLHFCQUFvQixFQUN2Qjs7QUFFRDtFQUNJLFdBQVUsRUFDYjs7QUFDRDtFQUNJLG9CQUFtQixFQUN0Qjs7QUFDRDtFQUNJLDBCQUF5QixFQUM1Qjs7QUFDRDtFQUNJLGdCQUFlLEVBQ2xCOztBQUNEO0VBQ0ksZ0JBQWUsRUFDbEI7O0FBQ0Q7RUFDSSxtQkFBa0IsRUFDckI7O0FBQ0Q7RUFDSSxtQkFBaUIsRUFDcEIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvbWFzdGVycy9jdXN0b20tbW9kYWwvY3VzdG9tLW1vZGFsLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnJhdGUtZm9ybS1saXN0e1xyXG4gICAgLmxhYmxlLW5hbWUsLmlucHV0LWZpZWxkc3tcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2tcclxuICAgIH1cclxuICAgIC5sYWJsZS1uYW1le1xyXG4gICAgICAgIHdpZHRoOiAxMDBweDtcclxuICAgICAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgfVxyXG4gICAgLnNpbmdsZS1yb3d7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAwO1xyXG4gICAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4XHJcbiAgICB9XHJcbiAgICAuc2luZ2xlLXJvdy1ud3tcclxuICAgICAgICBwYWRkaW5nOiAxMHB4IDA7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgfVxyXG4gICAgLmFjdGlvbi1ib3h7XHJcbiAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNjY2M7XHJcbiAgICAgICAgcGFkZGluZzogMTBweCAwcHggMTBweCAxMHB4O1xyXG4gICAgfVxyXG4gICAgLmlucHV0LWZpZWxkc3tcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZmxleFxyXG4gICAgfVxyXG4gICAgLnJhdGUtYnRuLnNhdmUtYnRue1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICMzZjUxYjU7XHJcbiAgICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICB9XHJcbiAgICAucmF0ZS1idG57XHJcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XHJcbiAgICAgICAgYm94LXNoYWRvdzogMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksIDAgMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSwgMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpO1xyXG4gICAgICAgIGN1cnNvcjogcG9pbnRlcjtcclxuICAgICAgICBib3JkZXI6IG5vbmU7XHJcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgICAgIGxpbmUtaGVpZ2h0OiAzNnB4O1xyXG4gICAgICAgIHBhZGRpbmc6IDEwcHggMTZweDtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcclxuICAgIH1cclxuICAgIC5jdXMtcmF0ZS1ib3h7XHJcbiAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2NjY2M7XHJcbiAgICAgICAgbWFyZ2luOiAxMHB4IDA7XHJcbiAgICB9XHJcbiAgICAuc2luZ2xlLXJhdGV7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICAgIGlucHV0e1xyXG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiA1cHg7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDJweDtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgLnJhdGUtYnRuLnNlbGVjdGVke1xyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNDQ5ZDQ0O1xyXG4gICAgICAgICAgICBjb2xvcjogI2ZmZjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBtYXQtZm9ybS1maWVsZHtcclxuICAgICAgICB3aWR0aDogMTAwcHg7XHJcbiAgICB9XHJcbn1cclxuLnJhdGUtZm9ybS1zZWxlY3R7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyNXB4O1xyXG59XHJcbi5jcy1zZWxlY3QtYm94IHtcclxuICAgIHdpZHRoOiAzMCU7XHJcbiAgICBwYWRkaW5nOiAxMHB4O1xyXG4gICAgLmhpZGV7XHJcbiAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxufVxyXG5cclxuLmlubGluZS1mbGV4IHtcclxuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xyXG59XHJcblxyXG4uZXhhbXBsZS13aWR0aHtcclxuICAgIHdpZHRoOiA2ZW07XHJcbn1cclxuLm1hdC1jYXJkIHtcclxuICAgIG1hcmdpbi1yaWdodDogMC4yZW07XHJcbn1cclxuLm1hdC1jYXJkLWludmVydHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNGRkNDQ0M7XHJcbn1cclxuLm1hdC1jYXJkLWhlYWRlciAubWF0LWNhcmQtdGl0bGUge1xyXG4gICAgZm9udC1zaXplOiAxNnB4O1xyXG59XHJcbi5tYXQtY2FyZC1jb250ZW50IHtcclxuICAgIGZvbnQtc2l6ZTogMTZweDtcclxufVxyXG4ubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZSB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA0cHg7XHJcbn1cclxuLm1hdC1hY2NvcmQge1xyXG4gICAgbWFyZ2luLWJvdHRvbToxZW07XHJcbn0iXX0= */"

/***/ }),

/***/ "./src/app/layout/masters/custom-modal/custom-modal.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/layout/masters/custom-modal/custom-modal.component.ts ***!
  \***********************************************************************/
/*! exports provided: CustomModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomModalComponent", function() { return CustomModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var src_app_constants_contants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/constants/contants */ "./src/app/constants/contants.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
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






var CustomModalComponent = /** @class */ (function () {
    function CustomModalComponent(commonService, snackBar, dialogRef, form_value) {
        var _this = this;
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
        this.form_value = form_value;
        this.title = "";
        this.isEdit = false;
        this.productList = [];
        this.title = form_value.formTitle;
        this.url = form_value.url;
        var fieldsCtrls = {};
        this.fieldList = {
            rates: [],
            mapping: []
        };
        this.form = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"](fieldsCtrls);
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].urls.getProduct).subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var val = data_1[_i];
                var keyarr = { key: val._id, value: val.prod_name };
                _this.productList.push(keyarr);
            }
            if (form_value.editRate) {
                console.log(form_value.editRate);
                _this.edit_form = form_value.editRate;
                _this.isEdit = true;
                var cur_prod = {
                    key: form_value.editRate.product._id,
                    value: form_value.editRate.product.prod_name
                };
                _this.fieldList.rates = _this.requestFormat(cur_prod);
            }
        });
    }
    CustomModalComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    CustomModalComponent.prototype.onDropDownSelect = function (action, options, index) {
        if (action == 'rate') {
            this.rateMapping(options, index);
        }
        else {
            //this.customerMapping(options,index);
        }
    };
    // assignCustomArray(type,indx){
    //   if((type == 'custom' && !this.fieldList.mapping[indx].custom) || 
    //   (type == 'custom' && this.fieldList.mapping[indx].custom && this.fieldList.mapping[indx].custom.length == 0)){
    //     this.fieldList.mapping[indx].custom = this.requestFormat({key:'all'});
    //   }
    // }
    // customerMapping(options,index){
    //   this.fieldList.mapping = [];
    //   let value = options[index];
    //   let rateType = [
    //                   { type:'retail',display:"Retail"},
    //                   { type:'wholesale1',display:"Wholesale 1"},
    //                   { type:'wholesale2',display:"Wholesale 2"},
    //                   { type:'purchase',display:"Purchase"},
    //                   { type:'custom',display:"Custom"}
    //                 ];
    //   if(value.key == 'all'){
    //     for (let single of options) {
    //         if(single.key != 'all'){
    //         let row = {
    //           customer_id : single.key,
    //           customer_name : single.value,
    //           type: '',
    //           rateType : rateType
    //         }
    //         this.fieldList.mapping.push(row);
    //         }
    //     }
    //   }else{
    //     let row = {
    //       customer_id : value.key,
    //       customer_name : value.value,
    //       type: '',
    //       rateType : rateType
    //     }
    //     this.fieldList.mapping.push(row);
    //   }
    // }
    CustomModalComponent.prototype.requestFormat = function (value) {
        var result = [];
        var rateType = src_app_constants_contants__WEBPACK_IMPORTED_MODULE_3__["RATE_TYPE"].rate_type.map(function (val) { return { key: val, value: val }; });
        var rate = [];
        for (var _i = 0, rateType_1 = rateType; _i < rateType_1.length; _i++) {
            var type = rateType_1[_i];
            rate.push({
                type: type.key,
                price: '',
                tax: '',
                title: type.value
            });
        }
        var row = {
            prod_id: value.key,
            prod_name: value.value,
            is_active: "YES",
            effective_date: new Date(),
            rate: rate
        };
        result.push(row);
        return result;
    };
    CustomModalComponent.prototype.rateMapping = function (options, index) {
        this.fieldList.rates = [];
        var value = options[index];
        this.fieldList.rates = this.requestFormat(value);
    };
    CustomModalComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.isEdit) {
            var data = {
                edit_form: this.edit_form.product.rate_avail
            };
            console.log(data);
            this.commonService.postMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].urls.updateBulkRate, data).subscribe(function (data) {
                _this.onNoClick();
                _this.snackBar.open("Updated successfully!!", "Success", {
                    duration: 500,
                });
            }, function (error) {
                _this.snackBar.open(error, "Error", {
                    duration: 500,
                });
            });
        }
        this.commonService.postMethod(this.url, this.fieldList).subscribe(function (data) {
            _this.onNoClick();
            _this.snackBar.open("Saved successfully!!", "Success", {
                duration: 500,
            });
        }, function (error) {
            _this.snackBar.open(error, "Error", {
                duration: 500,
            });
        });
    };
    CustomModalComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-custom-modal',
            template: __webpack_require__(/*! ./custom-modal.component.html */ "./src/app/layout/masters/custom-modal/custom-modal.component.html"),
            styles: [__webpack_require__(/*! ./custom-modal.component.scss */ "./src/app/layout/masters/custom-modal/custom-modal.component.scss")]
        }),
        __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_4__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"],
            _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialogRef"], Object])
    ], CustomModalComponent);
    return CustomModalComponent;
}());



/***/ }),

/***/ "./src/app/layout/masters/customer-mapping/customer-mapping.component.html":
/*!*********************************************************************************!*\
  !*** ./src/app/layout/masters/customer-mapping/customer-mapping.component.html ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n    <mat-card-header>\r\n        <mat-card-title>Customer Mapping</mat-card-title>\r\n    </mat-card-header>\r\n    <mat-card-content>\r\n        <section class=\"example-section\">\r\n            <mat-form-field class=\"example-margin\">\r\n                <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n            </mat-form-field>\r\n            <mat-form-field class=\"example-margin\">\r\n                <mat-select placeholder=\"Route\" [(ngModel)]=\"selRoute\" (selectionChange)=\"load()\">\r\n                    <mat-option value=\"all\">All</mat-option>\r\n                    <mat-option *ngFor=\"let route of routes\" [value]=\"route.key\">{{route.value}}</mat-option>\r\n                </mat-select>\r\n            </mat-form-field>\r\n        </section>\r\n    </mat-card-content>\r\n  \r\n    <div class=\"mat-elevation-z8\">\r\n    <table mat-table [dataSource]=\"dataSource\" matSort>\r\n  \r\n        <!-- Color Column -->\r\n          <ng-container matColumnDef=\"customer_name\">\r\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> Customer Name </th>\r\n                <td mat-cell *matCellDef=\"let row\" [style.color]=\"row.customerName\"> {{row.customerName}} </td>\r\n          </ng-container>\r\n  \r\n        <ng-container matColumnDef=\"view\">\r\n                <th mat-header-cell *matHeaderCellDef mat-sort-header> View </th>\r\n                <td mat-cell *matCellDef=\"let row\"> \r\n                    <span class=\"view-btn\" (click)=\"openDialog(row._id)\"> View </span>\r\n                </td>\r\n            </ng-container>\r\n\r\n        <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n        <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n    </table>\r\n  \r\n    <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\r\n    </div>\r\n  </mat-card>"

/***/ }),

/***/ "./src/app/layout/masters/customer-mapping/customer-mapping.component.scss":
/*!*********************************************************************************!*\
  !*** ./src/app/layout/masters/customer-mapping/customer-mapping.component.scss ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\ntd,\nth {\n  width: 25%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n.view-btn {\n  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  cursor: pointer;\n  border: none;\n  text-align: center;\n  line-height: 36px;\n  padding: 8px 14px;\n  border-radius: 4px;\n  background-color: #449d44;\n  color: #fff; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L21hc3RlcnMvY3VzdG9tZXItbWFwcGluZy9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXG1hc3RlcnNcXGN1c3RvbWVyLW1hcHBpbmdcXGN1c3RvbWVyLW1hcHBpbmcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFXLEVBQ2Q7O0FBRUQ7RUFDSSxnQkFBZTtFQUNmLFlBQVcsRUFDZDs7QUFFRDs7RUFFSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxjQUFhO0VBQ2Isc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxpQkFBZ0IsRUFDbkI7O0FBQ0Q7RUFDSSxnSEFBbUc7RUFDbkcsZ0JBQWU7RUFDZixhQUFZO0VBQ1osbUJBQWtCO0VBQ2xCLGtCQUFpQjtFQUNqQixrQkFBaUI7RUFDakIsbUJBQWtCO0VBQ2xCLDBCQUF5QjtFQUN6QixZQUFXLEVBQ2QiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvbWFzdGVycy9jdXN0b21lci1tYXBwaW5nL2N1c3RvbWVyLW1hcHBpbmcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLm1hdC1mb3JtLWZpZWxkIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG50ZCxcclxudGgge1xyXG4gICAgd2lkdGg6IDI1JTtcclxufVxyXG5cclxuLmV4YW1wbGUtc2VjdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGhlaWdodDogNjBweDtcclxufVxyXG5cclxuLmV4YW1wbGUtbWFyZ2luIHtcclxuICAgIG1hcmdpbjogMTBweDtcclxufVxyXG5cclxuLmNsZWFycGl4IHtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuLnZpZXctYnRue1xyXG4gICAgYm94LXNoYWRvdzogMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwuMiksIDAgMnB4IDJweCAwIHJnYmEoMCwwLDAsLjE0KSwgMCAxcHggNXB4IDAgcmdiYSgwLDAsMCwuMTIpO1xyXG4gICAgY3Vyc29yOiBwb2ludGVyO1xyXG4gICAgYm9yZGVyOiBub25lO1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgbGluZS1oZWlnaHQ6IDM2cHg7XHJcbiAgICBwYWRkaW5nOiA4cHggMTRweDtcclxuICAgIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICM0NDlkNDQ7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/layout/masters/customer-mapping/customer-mapping.component.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/layout/masters/customer-mapping/customer-mapping.component.ts ***!
  \*******************************************************************************/
/*! exports provided: CustomerMappingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerMappingComponent", function() { return CustomerMappingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _rate_mapping_rate_mapping_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../rate-mapping/rate-mapping.component */ "./src/app/layout/masters/rate-mapping/rate-mapping.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CustomerMappingComponent = /** @class */ (function () {
    function CustomerMappingComponent(commonService, dialog) {
        this.commonService = commonService;
        this.dialog = dialog;
        this.displayedColumns = ['customer_name', 'view'];
        this.rateTranslate = { 'retail': 'Retail', 'wholesale1': 'Wholesale 1', 'wholesale2': "Wholesale 2", 'purchase': 'Purchase', 'custom': 'Custom' };
        this.selRoute = "all";
        this.routes = [];
    }
    CustomerMappingComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.load();
        this.form_details = [];
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.getRoute).subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var val = data_1[_i];
                var keyarr = { key: val._id, value: val.areaName };
                _this.routes.push(keyarr);
            }
            //this.routes.push({key:'all',value:'All'});
        });
    };
    CustomerMappingComponent.prototype.load = function () {
        // this.commonService.getMethod(environment.urls.getRateMapping).subscribe((data:CustomerMapping[]) => {
        // });
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.getCustomer + "?route=" + this.selRoute).subscribe(function (data) {
            _this.customerList = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.customerList);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    CustomerMappingComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    CustomerMappingComponent.prototype.openDialog = function (id) {
        var _this = this;
        var dialogRef = this.dialog.open(_rate_mapping_rate_mapping_component__WEBPACK_IMPORTED_MODULE_4__["RateMappingComponent"], {
            width: '1300px',
            data: { customer_id: id, formTitle: "Rate Mapping", url: src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.postRateMapping }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //reload
            _this.load();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], CustomerMappingComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], CustomerMappingComponent.prototype, "sort", void 0);
    CustomerMappingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customer-mapping',
            template: __webpack_require__(/*! ./customer-mapping.component.html */ "./src/app/layout/masters/customer-mapping/customer-mapping.component.html"),
            styles: [__webpack_require__(/*! ./customer-mapping.component.scss */ "./src/app/layout/masters/customer-mapping/customer-mapping.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], CustomerMappingComponent);
    return CustomerMappingComponent;
}());



/***/ }),

/***/ "./src/app/layout/masters/customers/customers.component.html":
/*!*******************************************************************!*\
  !*** ./src/app/layout/masters/customers/customers.component.html ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-header>\r\n      <mat-card-title>Customers</mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n      <section class=\"example-section\">\r\n          <mat-form-field class=\"example-margin\">\r\n              <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n          </mat-form-field>\r\n          <mat-form-field class=\"example-margin\">\r\n              <mat-select placeholder=\"Route\" [(ngModel)]=\"selRoute\" (selectionChange)=\"loadCustomer()\">\r\n                  <mat-option value=\"all\">All</mat-option>\r\n                  <mat-option *ngFor=\"let route of routes\" [value]=\"route.key\">{{route.value}}</mat-option>\r\n              </mat-select>\r\n          </mat-form-field>\r\n      </section>\r\n  </mat-card-content>\r\n\r\n  <div class=\"mat-elevation-z8\">\r\n  <table mat-table [dataSource]=\"dataSource\" matSort>\r\n\r\n      <!-- Color Column -->\r\n      <ng-container matColumnDef=\"customerName\">\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Customer Name </th>\r\n              <td mat-cell *matCellDef=\"let row\" [style.color]=\"row.customerName\"> {{row.customerName}} </td>\r\n          </ng-container>\r\n\r\n      <!-- Progress Column -->\r\n      <ng-container matColumnDef=\"alias\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Alias </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.alias}} </td>\r\n      </ng-container>\r\n\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"route\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Route </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.routes.areaName}} </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"actions\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Actions </th>\r\n        <td mat-cell *matCellDef=\"let row\" > <p class=\"display-inline\">\r\n          <mat-icon class=\"print\" (click)=\"editCustomer(row)\">edit</mat-icon>\r\n          <mat-icon class=\"print\" (click)=\"deleteEntry(row)\">delete</mat-icon>\r\n          </p> </td>\r\n        <td mat-footer-cell *matFooterCellDef>  </td>\r\n      </ng-container>\r\n      \r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n  </table>\r\n\r\n  <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\r\n  </div>\r\n  <div class=\"clearpix\"> \r\n    <button mat-raised-button color =\"primary\" (click)=\"openDialog()\">Add New</button>\r\n    <!-- <ol>\r\n        <li>\r\n          <mat-form-field>\r\n            <input matInput [(ngModel)]=\"name\" placeholder=\"What's your name?\">\r\n          </mat-form-field>\r\n        </li>\r\n        <li>\r\n          <button mat-raised-button (click)=\"openDialog()\">Pick one</button>\r\n        </li>\r\n        <li *ngIf=\"animal\">\r\n          You chose: <i>{{animal}}</i>\r\n        </li>\r\n      </ol> -->\r\n  </div>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/layout/masters/customers/customers.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/layout/masters/customers/customers.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\ntd,\nth {\n  width: 25%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L21hc3RlcnMvY3VzdG9tZXJzL0M6XFxsb2NhbGRpc2tcXG15d29ya1xcZHN1aXRlXFxjbGllbnQvc3JjXFxhcHBcXGxheW91dFxcbWFzdGVyc1xcY3VzdG9tZXJzXFxjdXN0b21lcnMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFXLEVBQ2Q7O0FBRUQ7RUFDSSxnQkFBZTtFQUNmLFlBQVcsRUFDZDs7QUFFRDs7RUFFSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxjQUFhO0VBQ2Isc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxpQkFBZ0IsRUFDbkIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvbWFzdGVycy9jdXN0b21lcnMvY3VzdG9tZXJzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5tYXQtZm9ybS1maWVsZCB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxudGQsXHJcbnRoIHtcclxuICAgIHdpZHRoOiAyNSU7XHJcbn1cclxuXHJcbi5leGFtcGxlLXNlY3Rpb24ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBoZWlnaHQ6IDYwcHg7XHJcbn1cclxuXHJcbi5leGFtcGxlLW1hcmdpbiB7XHJcbiAgICBtYXJnaW46IDEwcHg7XHJcbn1cclxuXHJcbi5jbGVhcnBpeCB7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/layout/masters/customers/customers.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/layout/masters/customers/customers.component.ts ***!
  \*****************************************************************/
/*! exports provided: CustomersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomersComponent", function() { return CustomersComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../common-modal/common-modal.component */ "./src/app/layout/masters/common-modal/common-modal.component.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_app_material_confirm_pop_confirm_pop_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/app-material/confirm-pop/confirm-pop.component */ "./src/app/app-material/confirm-pop/confirm-pop.component.ts");
/* harmony import */ var src_app_constants_contants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/constants/contants */ "./src/app/constants/contants.ts");
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
    function CustomersComponent(commonService, dialog, snackBar) {
        this.commonService = commonService;
        this.dialog = dialog;
        this.snackBar = snackBar;
        this.displayedColumns = ['customerName', 'alias', 'route', 'actions'];
        this.routes = [];
        this.confirmBox = "YES";
        this.selRoute = "all";
        this.available_ratetype = [];
    }
    CustomersComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadCustomer();
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getRoute).subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var val = data_1[_i];
                var keyarr = { key: val._id, value: val.areaName };
                _this.routes.push(keyarr);
            }
            //this.routes.push({key:'all',value:'All'});
        });
        this.available_ratetype = src_app_constants_contants__WEBPACK_IMPORTED_MODULE_6__["RATE_TYPE"].rate_type.map(function (arr) { return { 'key': arr, 'value': arr }; });
        //console.log(this.available_ratetype);
    };
    CustomersComponent.prototype.loadCustomer = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getCustomer + "?route=" + this.selRoute).subscribe(function (data) {
            _this.customerList = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.customerList);
            _this.dataSource.paginator = _this.paginator;
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
    CustomersComponent.prototype.openDialog = function () {
        var _this = this;
        this.loadVariables();
        var dialogRef = this.dialog.open(_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_3__["CommonModalComponent"], {
            width: '600px',
            data: { formData: this.customer_form_details.sort(function (a, b) { return a.order - b.order; }), formTitle: "Customers", url: src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.postCustomer }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //reload
            _this.loadCustomer();
        });
    };
    CustomersComponent.prototype.deleteEntry = function (row) {
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
                row.is_active = 'NO';
                _this.commonService.putMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.updateCustomer + '/' + row._id, row).subscribe(function (data) {
                    if (data.code == 200) {
                        _this.snackBar.open(data.message, "Success", {
                            duration: 500,
                        });
                        _this.loadCustomer();
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
    CustomersComponent.prototype.editCustomer = function (row) {
        var _this = this;
        this.loadVariables();
        this.customer_form_details.map(function (inp) {
            inp.value = row[inp.name];
        });
        this.customer_form_details.push({
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
        this.customer_form_details.push({
            "order": 10,
            "type": "select",
            "inputType": "dropdown",
            "name": "is_active",
            "value": row.is_active,
            "placeholder": "Is Active",
            "validation": {
                "required": true
            },
            "options": [{ key: 'YES', value: 'YES' }, { key: 'NO', value: 'NO' }]
        });
        var dialogRef = this.dialog.open(_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_3__["CommonModalComponent"], {
            //width: '300px',
            data: { formData: this.customer_form_details.sort(function (a, b) { return a.order - b.order; }), formTitle: "Edit", url: src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.updateCustomer, method: 'PUT' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.loadCustomer();
            _this.loadVariables(); // refreh the variables
        });
    };
    CustomersComponent.prototype.loadVariables = function () {
        this.customer_form_details = [{
                "order": 1,
                "type": "input",
                "inputType": "text",
                "name": "customerName",
                "value": "",
                "placeholder": "Customer Name",
                "validation": {
                    "required": true
                }
            }, {
                "order": 2,
                "type": "input",
                "inputType": "text",
                "name": "alias",
                "value": "",
                "placeholder": "Alias",
                "validation": {
                    "required": true
                }
            }, {
                "order": 3,
                "type": "input",
                "inputType": "text",
                "name": "firstName",
                "value": "",
                "placeholder": "First Name",
                "validation": {
                    "required": true
                }
            }, {
                "order": 4,
                "type": "input",
                "inputType": "text",
                "name": "lastName",
                "value": "",
                "placeholder": "Last Name",
                "validation": {
                    "required": true
                }
            }, {
                "order": 5,
                "type": "input",
                "inputType": "number",
                "name": "contactNo",
                "value": "",
                "placeholder": "Contact #1",
                "validation": {
                    "required": true
                }
            }, {
                "order": 6,
                "type": "input",
                "inputType": "number",
                "name": "contactNo1",
                "value": "",
                "placeholder": "Contact #2",
                "validation": {
                    "required": false
                }
            }, {
                "order": 7,
                "type": "textarea",
                "inputType": "textarea",
                "name": "address",
                "value": "",
                "placeholder": "Address",
                "validation": {
                    "required": true
                }
            }, {
                "order": 8,
                "type": "input",
                "inputType": "text",
                "name": "city",
                "value": "",
                "placeholder": "City",
                "validation": {
                    "required": true
                }
            }, {
                "order": 10,
                "type": "input",
                "inputType": "number",
                "name": "pincode",
                "value": "",
                "placeholder": "Pincode",
                "validation": {
                    "required": true
                }
            }, {
                "order": 9,
                "type": "select",
                "inputType": "dropdown",
                "name": "route",
                "value": "",
                "placeholder": "Route",
                "validation": {
                    "required": true
                },
                "options": this.routes
            }, {
                "order": 11,
                "type": "select",
                "inputType": "dropdown",
                "name": "common_ratetype",
                "value": "",
                "placeholder": "Rate Type",
                "validation": {
                    "required": true
                },
                "options": this.available_ratetype
            }];
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], CustomersComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], CustomersComponent.prototype, "sort", void 0);
    CustomersComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-customers',
            template: __webpack_require__(/*! ./customers.component.html */ "./src/app/layout/masters/customers/customers.component.html"),
            styles: [__webpack_require__(/*! ./customers.component.scss */ "./src/app/layout/masters/customers/customers.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSnackBar"]])
    ], CustomersComponent);
    return CustomersComponent;
}());



/***/ }),

/***/ "./src/app/layout/masters/masters-routing.module.ts":
/*!**********************************************************!*\
  !*** ./src/app/layout/masters/masters-routing.module.ts ***!
  \**********************************************************/
/*! exports provided: MastersRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MastersRoutingModule", function() { return MastersRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _customers_customers_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customers/customers.component */ "./src/app/layout/masters/customers/customers.component.ts");
/* harmony import */ var _routes_routes_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./routes/routes.component */ "./src/app/layout/masters/routes/routes.component.ts");
/* harmony import */ var _products_products_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./products/products.component */ "./src/app/layout/masters/products/products.component.ts");
/* harmony import */ var _vendor_vendor_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./vendor/vendor.component */ "./src/app/layout/masters/vendor/vendor.component.ts");
/* harmony import */ var _user_user_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./user/user.component */ "./src/app/layout/masters/user/user.component.ts");
/* harmony import */ var _rate_rate_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rate/rate.component */ "./src/app/layout/masters/rate/rate.component.ts");
/* harmony import */ var _customer_mapping_customer_mapping_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./customer-mapping/customer-mapping.component */ "./src/app/layout/masters/customer-mapping/customer-mapping.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var routes = [
    {
        path: '',
        redirectTo: 'customers',
        pathMatch: 'full'
    },
    {
        path: 'customers',
        component: _customers_customers_component__WEBPACK_IMPORTED_MODULE_2__["CustomersComponent"]
    },
    {
        path: 'routes',
        component: _routes_routes_component__WEBPACK_IMPORTED_MODULE_3__["RoutesComponent"]
    },
    {
        path: 'products',
        component: _products_products_component__WEBPACK_IMPORTED_MODULE_4__["ProductsComponent"]
    },
    {
        path: 'vendors',
        component: _vendor_vendor_component__WEBPACK_IMPORTED_MODULE_5__["VendorComponent"]
    },
    {
        path: 'users',
        component: _user_user_component__WEBPACK_IMPORTED_MODULE_6__["UserComponent"]
    },
    {
        path: 'rates',
        component: _rate_rate_component__WEBPACK_IMPORTED_MODULE_7__["RateComponent"]
    },
    {
        path: 'mapping',
        component: _customer_mapping_customer_mapping_component__WEBPACK_IMPORTED_MODULE_8__["CustomerMappingComponent"]
    }
];
var MastersRoutingModule = /** @class */ (function () {
    function MastersRoutingModule() {
    }
    MastersRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], MastersRoutingModule);
    return MastersRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/masters/masters.module.ts":
/*!**************************************************!*\
  !*** ./src/app/layout/masters/masters.module.ts ***!
  \**************************************************/
/*! exports provided: MastersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MastersModule", function() { return MastersModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _masters_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./masters-routing.module */ "./src/app/layout/masters/masters-routing.module.ts");
/* harmony import */ var _customers_customers_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customers/customers.component */ "./src/app/layout/masters/customers/customers.component.ts");
/* harmony import */ var _app_material_app_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../app-material/app-material.module */ "./src/app/app-material/app-material.module.ts");
/* harmony import */ var _common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./common-modal/common-modal.component */ "./src/app/layout/masters/common-modal/common-modal.component.ts");
/* harmony import */ var _routes_routes_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./routes/routes.component */ "./src/app/layout/masters/routes/routes.component.ts");
/* harmony import */ var _vendor_vendor_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./vendor/vendor.component */ "./src/app/layout/masters/vendor/vendor.component.ts");
/* harmony import */ var _user_user_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user/user.component */ "./src/app/layout/masters/user/user.component.ts");
/* harmony import */ var _rate_rate_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rate/rate.component */ "./src/app/layout/masters/rate/rate.component.ts");
/* harmony import */ var _products_products_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./products/products.component */ "./src/app/layout/masters/products/products.component.ts");
/* harmony import */ var _custom_modal_custom_modal_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./custom-modal/custom-modal.component */ "./src/app/layout/masters/custom-modal/custom-modal.component.ts");
/* harmony import */ var _customer_mapping_customer_mapping_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./customer-mapping/customer-mapping.component */ "./src/app/layout/masters/customer-mapping/customer-mapping.component.ts");
/* harmony import */ var _rate_mapping_rate_mapping_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./rate-mapping/rate-mapping.component */ "./src/app/layout/masters/rate-mapping/rate-mapping.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

//import { CommonModule } from '@angular/common';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// import {
//   MatPaginatorModule, MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
//   MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
//   MatSliderModule, MatSlideToggleModule, MatTableModule, MatDialogModule, MatTooltipModule, MatIconModule,
// } from '@angular/material';

// import {MatExpansionModule} from '@angular/material/expansion';
// import {MatChipsModule} from '@angular/material/chips';
// import {MatSnackBarModule} from '@angular/material/snack-bar';









var MastersModule = /** @class */ (function () {
    function MastersModule() {
    }
    MastersModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            declarations: [_customers_customers_component__WEBPACK_IMPORTED_MODULE_2__["CustomersComponent"], _common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_4__["CommonModalComponent"], _routes_routes_component__WEBPACK_IMPORTED_MODULE_5__["RoutesComponent"], _vendor_vendor_component__WEBPACK_IMPORTED_MODULE_6__["VendorComponent"], _user_user_component__WEBPACK_IMPORTED_MODULE_7__["UserComponent"], _rate_rate_component__WEBPACK_IMPORTED_MODULE_8__["RateComponent"], _products_products_component__WEBPACK_IMPORTED_MODULE_9__["ProductsComponent"], _custom_modal_custom_modal_component__WEBPACK_IMPORTED_MODULE_10__["CustomModalComponent"], _customer_mapping_customer_mapping_component__WEBPACK_IMPORTED_MODULE_11__["CustomerMappingComponent"], _rate_mapping_rate_mapping_component__WEBPACK_IMPORTED_MODULE_12__["RateMappingComponent"]],
            imports: [
                // CommonModule,
                // FormsModule,
                // ReactiveFormsModule,
                _masters_routing_module__WEBPACK_IMPORTED_MODULE_1__["MastersRoutingModule"],
                // MatTableModule,
                // MatFormFieldModule,
                // MatPaginatorModule,
                // MatInputModule,
                // MatCardModule,
                // MatCheckboxModule,
                // MatRadioModule,
                // MatDatepickerModule,
                // MatNativeDateModule,
                // MatSelectModule,
                // MatSliderModule,
                // MatAutocompleteModule,
                // MatSlideToggleModule,
                // MatButtonModule,
                // MatDialogModule,
                // MatTooltipModule,
                // MatSnackBarModule,
                // MatExpansionModule,
                // MatChipsModule,
                // MatIconModule
                _app_material_app_material_module__WEBPACK_IMPORTED_MODULE_3__["AppMaterialModule"]
            ],
            entryComponents: [_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_4__["CommonModalComponent"], _custom_modal_custom_modal_component__WEBPACK_IMPORTED_MODULE_10__["CustomModalComponent"], _rate_mapping_rate_mapping_component__WEBPACK_IMPORTED_MODULE_12__["RateMappingComponent"]]
        })
    ], MastersModule);
    return MastersModule;
}());



/***/ }),

/***/ "./src/app/layout/masters/products/products.component.html":
/*!*****************************************************************!*\
  !*** ./src/app/layout/masters/products/products.component.html ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-header>\r\n      <mat-card-title>Products</mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n      <section class=\"example-section\">\r\n          <mat-form-field class=\"example-margin\">\r\n              <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n          </mat-form-field>\r\n          <mat-form-field class=\"example-margin\">\r\n              <mat-select placeholder=\"Route\" >\r\n                  <mat-option value=\"1\">Option 1</mat-option>\r\n                  <mat-option value=\"2\">Option 2</mat-option>\r\n                  <mat-option value=\"3\">Option 3</mat-option>\r\n              </mat-select>\r\n          </mat-form-field>\r\n      </section>\r\n  </mat-card-content>\r\n\r\n  <div class=\"mat-elevation-z8\">\r\n  <table mat-table [dataSource]=\"dataSource\" matSort>\r\n\r\n      <!-- Color Column -->\r\n      <ng-container matColumnDef=\"prod_name\">\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Product Name </th>\r\n              <td mat-cell *matCellDef=\"let row\" [style.color]=\"row.prod_name\"> {{row.prod_name}} </td>\r\n          </ng-container>\r\n\r\n      <!-- Progress Column -->\r\n      <ng-container matColumnDef=\"alias\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Alias </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.alias}} </td>\r\n      </ng-container>\r\n\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"category\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Category </th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.category}} </td>\r\n        </ng-container>\r\n\r\n        <!-- Name Column -->\r\n      <ng-container matColumnDef=\"sub_category\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Sub Category </th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.sub_category}} </td>\r\n        </ng-container>\r\n\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"brand_name\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Brand Name </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.brand_name}} </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"action\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Action </th>\r\n            <td mat-cell *matCellDef=\"let row\">\r\n                <mat-icon (click)=\"editProduct(row)\">edit</mat-icon>\r\n            </td>\r\n        </ng-container>\r\n      \r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n  </table>\r\n\r\n  <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\r\n  </div>\r\n  <div class=\"clearpix\"> \r\n    <button mat-raised-button color =\"primary\" (click)=\"openDialog()\">Add New</button>\r\n  </div>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/layout/masters/products/products.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/layout/masters/products/products.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\ntd,\nth {\n  width: auto; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L21hc3RlcnMvcHJvZHVjdHMvQzpcXGxvY2FsZGlza1xcbXl3b3JrXFxkc3VpdGVcXGNsaWVudC9zcmNcXGFwcFxcbGF5b3V0XFxtYXN0ZXJzXFxwcm9kdWN0c1xccHJvZHVjdHMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFXLEVBQ2Q7O0FBRUQ7RUFDSSxnQkFBZTtFQUNmLFlBQVcsRUFDZDs7QUFFRDs7RUFFSSxZQUFXLEVBQ2Q7O0FBRUQ7RUFDSSxjQUFhO0VBQ2Isc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxpQkFBZ0IsRUFDbkIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvbWFzdGVycy9wcm9kdWN0cy9wcm9kdWN0cy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ubWF0LWZvcm0tZmllbGQge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRkLFxyXG50aCB7XHJcbiAgICB3aWR0aDogYXV0bztcclxufVxyXG5cclxuLmV4YW1wbGUtc2VjdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGhlaWdodDogNjBweDtcclxufVxyXG5cclxuLmV4YW1wbGUtbWFyZ2luIHtcclxuICAgIG1hcmdpbjogMTBweDtcclxufVxyXG5cclxuLmNsZWFycGl4IHtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/layout/masters/products/products.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/layout/masters/products/products.component.ts ***!
  \***************************************************************/
/*! exports provided: ProductsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductsComponent", function() { return ProductsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_constants_contants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/constants/contants */ "./src/app/constants/contants.ts");
/* harmony import */ var _common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../common-modal/common-modal.component */ "./src/app/layout/masters/common-modal/common-modal.component.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ProductsComponent = /** @class */ (function () {
    function ProductsComponent(commonService, dialog) {
        this.commonService = commonService;
        this.dialog = dialog;
        this.displayedColumns = ['prod_name', 'alias', 'brand_name', 'category', 'sub_category', 'action'];
        this.routes = [];
        this.vendors = [];
    }
    ProductsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initialize();
        this.loadProduct();
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].urls.getVendor).subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var val = data_1[_i];
                var keyarr = { key: val._id, value: val.vendorName };
                _this.vendors.push(keyarr);
            }
        });
    };
    ProductsComponent.prototype.initialize = function () {
        this.product_form_details = [{
                "order": 1,
                "type": "input",
                "inputType": "text",
                "name": "prod_name",
                "value": "",
                "placeholder": "Product Name",
                "validation": {
                    "required": true
                }
            }, {
                "order": 2,
                "type": "input",
                "inputType": "text",
                "name": "alias",
                "value": "",
                "placeholder": "Alias",
                "validation": {
                    "required": true
                }
            }, {
                "order": 6,
                "type": "select",
                "inputType": "dropdown",
                "name": "brand_name",
                "value": "",
                "placeholder": "Brand Name",
                "validation": {
                    "required": true
                },
                "options": src_app_constants_contants__WEBPACK_IMPORTED_MODULE_3__["BRANDS"].map(function (val) {
                    return {
                        key: val,
                        value: val
                    };
                })
            }, {
                "order": 9,
                "type": "select",
                "inputType": "dropdown",
                "name": "vendor_id",
                "value": "",
                "placeholder": "Vendor",
                "validation": {
                    "required": true
                },
                "options": this.vendors
            }, {
                "order": 7,
                "type": "select",
                "inputType": "dropdown",
                "name": "category",
                "value": "",
                "placeholder": "Category",
                "validation": {
                    "required": true
                },
                "options": src_app_constants_contants__WEBPACK_IMPORTED_MODULE_3__["CATEGORY"].map(function (val) {
                    return {
                        key: val,
                        value: val
                    };
                })
            }, {
                "order": 8,
                "type": "select",
                "inputType": "dropdown",
                "name": "sub_category",
                "value": "",
                "placeholder": "Sub Category",
                "validation": {
                    "required": true
                },
                "options": src_app_constants_contants__WEBPACK_IMPORTED_MODULE_3__["SUBCATEGORY"].map(function (val) {
                    return {
                        key: val,
                        value: val
                    };
                })
            },
            {
                "order": 3,
                "type": "select",
                "inputType": "dropdown",
                "name": "measure_unit",
                "value": "",
                "placeholder": "Measurement",
                "validation": {
                    "required": true
                },
                "options": src_app_constants_contants__WEBPACK_IMPORTED_MODULE_3__["MEASURE_UNIT"]
            },
            {
                "order": 4,
                "type": "input",
                "inputType": "number",
                "name": "volume_per_unit",
                "value": "",
                "placeholder": "Volume/Unit",
                "validation": {
                    "required": true
                }
            },
            {
                "order": 5,
                "type": "input",
                "inputType": "number",
                "name": "quan_per_grade",
                "value": "",
                "placeholder": "Quantity/Grade",
                "validation": {
                    "required": true
                }
            }, {
                "order": 10,
                "type": "select",
                "inputType": "dropdown",
                "name": "leads_view",
                "value": "",
                "placeholder": "Leads view",
                "validation": {
                    "required": true
                },
                "options": [{ key: 'YES', value: 'YES' }, { key: 'NO', value: 'NO' }]
            },
            {
                "order": 11,
                "type": "input",
                "inputType": "number",
                "name": "barcode",
                "value": "",
                "placeholder": "Bar Code",
                "validation": {
                    "required": false
                }
            }
        ];
    };
    ProductsComponent.prototype.loadProduct = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].urls.getProduct).subscribe(function (data) {
            _this.productList = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.productList);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    ProductsComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    ProductsComponent.prototype.editProduct = function (row) {
        var _this = this;
        this.initialize();
        this.product_form_details.map(function (inp) {
            inp.value = row[inp.name];
        });
        this.product_form_details.push({
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
        var dialogRef = this.dialog.open(_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_4__["CommonModalComponent"], {
            width: '600px',
            data: { formData: this.product_form_details.sort(function (a, b) { return a.order - b.order; }), formTitle: "Products", url: src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].urls.updateProduct, method: 'PUT' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //reload
            _this.loadProduct();
        });
    };
    ProductsComponent.prototype.openDialog = function () {
        var _this = this;
        this.initialize();
        var dialogRef = this.dialog.open(_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_4__["CommonModalComponent"], {
            width: '600px',
            data: { formData: this.product_form_details.sort(function (a, b) { return a.order - b.order; }), formTitle: "Products", url: src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].urls.postProduct }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //reload
            _this.loadProduct();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], ProductsComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], ProductsComponent.prototype, "sort", void 0);
    ProductsComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-products',
            template: __webpack_require__(/*! ./products.component.html */ "./src/app/layout/masters/products/products.component.html"),
            styles: [__webpack_require__(/*! ./products.component.scss */ "./src/app/layout/masters/products/products.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], ProductsComponent);
    return ProductsComponent;
}());



/***/ }),

/***/ "./src/app/layout/masters/rate-mapping/rate-mapping.component.html":
/*!*************************************************************************!*\
  !*** ./src/app/layout/masters/rate-mapping/rate-mapping.component.html ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form (ngSubmit)=\"onSubmit()\">\n  <h1 mat-dialog-title>Rate Mapping</h1>\n  <div mat-dialog-content>\n<mat-card>\n  <mat-card-content>\n      <section class=\"example-section\">\n          <mat-form-field class=\"example-margin\">\n              <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\n          </mat-form-field>\n          <!-- <mat-form-field class=\"example-margin\">\n              <mat-select placeholder=\"Route\" >\n                  <mat-option value=\"1\">Option 1</mat-option>\n                  <mat-option value=\"2\">Option 2</mat-option>\n                  <mat-option value=\"3\">Option 3</mat-option>\n              </mat-select>\n          </mat-form-field> -->\n      </section>\n  </mat-card-content>\n\n  <div class=\"mat-elevation-z8\">\n  <table mat-table [dataSource]=\"dataSource\" matSort>\n\n      <!-- Color Column -->\n        <ng-container matColumnDef=\"product_name\">\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Product Name </th>\n              <td mat-cell *matCellDef=\"let row\" [style.color]=\"row.prod_name\"> {{row.prod_name}} </td>\n        </ng-container>\n\n      <ng-container matColumnDef=\"rate_type\">\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Rate Type </th>\n          <td mat-cell *matCellDef=\"let row; let i = index\"> \n            <mat-select name=\"rate_type{{i}}\" matInput [ngModel]=\"row.rates && row.rates[0]?.type\"\n            (ngModelChange)=\"assignValues(row,$event)\">\n              <mat-option *ngFor=\"let opt of rateType\" [value]=\"opt.key\">{{opt.value}}</mat-option>\n            </mat-select>\n          </td>\n      </ng-container>\n      <ng-container matColumnDef=\"action\">\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Action </th>\n            <td mat-cell *matCellDef=\"let row; let i = index\"> <span *ngIf=\"(row.rates && row.rates[0]?.type)\" (click)=\"applyAll(row)\" class=\"apply_text\">Apply this to all?</span> </td>\n      </ng-container>\n      \n\n          <!-- Item Description Column -->\n      <!-- <ng-container matColumnDef=\"product_name-description\">\n        <th mat-header-cell *matHeaderCellDef> Name of the item purchased </th>\n      </ng-container>-->\n\n      <!-- Cost Description Column -->\n      <!-- <ng-container matColumnDef=\"rate_type-description\">\n        <th mat-header-cell *matHeaderCellDef> Cost of the item in USD </th>\n      </ng-container> -->\n\n      \n      \n\n      <!-- <ng-container matColumnDef=\"rate_type\">\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> View </th>\n        <td mat-cell *matCellDef=\"let row\"> \n            <span class=\"view-btn\" (click)=\"openDialog(row._id)\"> View </span>\n        </td>\n      </ng-container> -->\n\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\n      <!-- <tr mat-header-row *matHeaderRowDef=\"['product_name-description', 'rate_type-description']\" class=\"example-second-header-row\"></tr> -->\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\n  </table>\n\n  <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\n  </div>  \n</mat-card>\n</div>\n<mat-dialog-actions>\n  <button mat-raised-button color =\"primary\" type=\"submit\">Update</button>\n  <button mat-raised-button type=\"button\" (click)=\"onNoClick()\">Cancel</button>\n</mat-dialog-actions>\n</form>"

/***/ }),

/***/ "./src/app/layout/masters/rate-mapping/rate-mapping.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/layout/masters/rate-mapping/rate-mapping.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".common-modal mat-form-field {\n  margin: 10px; }\n\ntable {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\ntd,\nth {\n  width: 25%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n.apply_text {\n  font-size: 0.6em;\n  text-decoration: underline;\n  color: teal;\n  cursor: pointer; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L21hc3RlcnMvcmF0ZS1tYXBwaW5nL0M6XFxsb2NhbGRpc2tcXG15d29ya1xcZHN1aXRlXFxjbGllbnQvc3JjXFxhcHBcXGxheW91dFxcbWFzdGVyc1xccmF0ZS1tYXBwaW5nXFxyYXRlLW1hcHBpbmcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFFUSxhQUFZLEVBQ2Y7O0FBR0w7RUFDSSxZQUFXLEVBQ2Q7O0FBRUQ7RUFDSSxnQkFBZTtFQUNmLFlBQVcsRUFDZDs7QUFFRDs7RUFFSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxjQUFhO0VBQ2Isc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxpQkFBZ0IsRUFDbkI7O0FBRUQ7RUFDSSxpQkFBZ0I7RUFDaEIsMkJBQTBCO0VBQzFCLFlBQVc7RUFDWCxnQkFBZSxFQUNsQiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9tYXN0ZXJzL3JhdGUtbWFwcGluZy9yYXRlLW1hcHBpbmcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY29tbW9uLW1vZGFsIHtcclxuICAgIG1hdC1mb3JtLWZpZWxkIHtcclxuICAgICAgICBtYXJnaW46IDEwcHg7XHJcbiAgICB9XHJcbn1cclxuXHJcbnRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4ubWF0LWZvcm0tZmllbGQge1xyXG4gICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRkLFxyXG50aCB7XHJcbiAgICB3aWR0aDogMjUlO1xyXG59XHJcblxyXG4uZXhhbXBsZS1zZWN0aW9uIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiA2MHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1tYXJnaW4ge1xyXG4gICAgbWFyZ2luOiAxMHB4O1xyXG59XHJcblxyXG4uY2xlYXJwaXgge1xyXG4gICAgbWFyZ2luLXRvcDogMTBweDtcclxufVxyXG5cclxuLmFwcGx5X3RleHQge1xyXG4gICAgZm9udC1zaXplOiAwLjZlbTtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO1xyXG4gICAgY29sb3I6IHRlYWw7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/layout/masters/rate-mapping/rate-mapping.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/layout/masters/rate-mapping/rate-mapping.component.ts ***!
  \***********************************************************************/
/*! exports provided: RateMappingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RateMappingComponent", function() { return RateMappingComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var src_app_constants_contants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/constants/contants */ "./src/app/constants/contants.ts");
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





var RateMappingComponent = /** @class */ (function () {
    function RateMappingComponent(commonService, snackBar, dialogRef, form_value) {
        this.commonService = commonService;
        this.snackBar = snackBar;
        this.dialogRef = dialogRef;
        this.form_value = form_value;
        this.displayedColumns = ['product_name', 'rate_type', 'action'];
        this.edit_value = form_value;
        this.loadMappings(form_value.customer_id);
    }
    RateMappingComponent.prototype.ngOnInit = function () {
        this.rateType = src_app_constants_contants__WEBPACK_IMPORTED_MODULE_4__["RATE_TYPE"].rate_type.map(function (val) {
            return {
                key: val,
                value: val
            };
        });
    };
    RateMappingComponent.prototype.loadMappings = function (id) {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].urls.getRateByCustomer + '/' + id).subscribe(function (data) {
            _this.productList = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatTableDataSource"](_this.productList);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
        // this.commonService.getMethod(environment.urls.getProduct).subscribe((data:Product[])=>{
        //   this.productList = data;
        //   this.dataSource = new MatTableDataSource(this.productList);
        //   this.dataSource.paginator = this.paginator;
        //   this.dataSource.sort = this.sort;
        // });
    };
    RateMappingComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    RateMappingComponent.prototype.assignValues = function (row, e) {
        if (row.rates.length > 0) {
            row.rates[0].type = e;
        }
        else {
            var rate = {
                customer_id: this.edit_value.customer_id,
                prod_id: row._id,
                type: e
            };
            row.rates[0] = rate;
        }
    };
    RateMappingComponent.prototype.applyAll = function (row) {
        var selectedType = row.rates[0].type;
        for (var i = 0; i < this.productList.length; i++) {
            if (this.productList[i].rates.length > 0) {
                this.productList[i].rates[0].type = selectedType;
            }
            else {
                var rate = {
                    customer_id: this.edit_value.customer_id,
                    prod_id: this.productList[i]._id,
                    type: selectedType
                };
                this.productList[i].rates[0] = rate;
            }
        }
    };
    RateMappingComponent.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    RateMappingComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.productList);
        this.commonService.postMethod(this.edit_value.url, this.productList).subscribe(function (data) {
            _this.onNoClick();
            _this.snackBar.open("Updated successfully!!", "Success", {
                duration: 500,
            });
        }, function (error) {
            _this.snackBar.open(error, "Error", {
                duration: 500,
            });
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatPaginator"])
    ], RateMappingComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSort"])
    ], RateMappingComponent.prototype, "sort", void 0);
    RateMappingComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-rate-mapping',
            template: __webpack_require__(/*! ./rate-mapping.component.html */ "./src/app/layout/masters/rate-mapping/rate-mapping.component.html"),
            styles: [__webpack_require__(/*! ./rate-mapping.component.scss */ "./src/app/layout/masters/rate-mapping/rate-mapping.component.scss")]
        }),
        __param(3, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_1__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSnackBar"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], RateMappingComponent);
    return RateMappingComponent;
}());



/***/ }),

/***/ "./src/app/layout/masters/rate/rate.component.html":
/*!*********************************************************!*\
  !*** ./src/app/layout/masters/rate/rate.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-header>\r\n      <mat-card-title>Rates</mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n      <section class=\"example-section\">\r\n          <mat-form-field class=\"example-margin\">\r\n              <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n          </mat-form-field>\r\n          <mat-form-field class=\"example-margin\">\r\n              <mat-select placeholder=\"Route\" >\r\n                  <mat-option value=\"1\">Option 1</mat-option>\r\n                  <mat-option value=\"2\">Option 2</mat-option>\r\n                  <mat-option value=\"3\">Option 3</mat-option>\r\n              </mat-select>\r\n          </mat-form-field>\r\n      </section>\r\n  </mat-card-content>\r\n\r\n  <div class=\"mat-elevation-z8\">\r\n  <table mat-table [dataSource]=\"dataSource\" matSort>\r\n\r\n      <!-- Color Column -->\r\n    <ng-container matColumnDef=\"prod_name\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header class=\"prod\"> Product Name </th>\r\n            <td mat-cell *matCellDef=\"let row\" [style.color]=\"row.product.prod_name\"> {{row.product.prod_name}} </td>\r\n    </ng-container>\r\n\r\n      <!-- Progress Column -->\r\n      <ng-container matColumnDef=\"Retail\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Retail </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.product.rate_active[\"Retail\"]?row.product.rate_active[\"Retail\"].price +\" - \"+ row.product.rate_active[\"Retail\"].tax:\"-\"}} </td>\r\n      </ng-container>\r\n\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"Purchase\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Purchase </th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.product.rate_active[\"Purchase\"]?row.product.rate_active[\"Purchase\"].price+\" - \"+row.product.rate_active[\"Purchase\"].tax:\"-\"}}</td>\r\n        </ng-container>\r\n\r\n        <!-- Name Column -->\r\n      <ng-container matColumnDef=\"Wholesale\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Wholesale </th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.product.rate_active[\"Wholesale\"]?row.product.rate_active[\"Wholesale\"].price+\" - \"+row.product.rate_active[\"Wholesale\"].tax:\"-\"}}</td>\r\n        </ng-container>\r\n\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"Silver\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Silver </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.product.rate_active[\"Silver\"]?row.product.rate_active[\"Silver\"].price+\" - \"+row.product.rate_active[\"Silver\"].tax:\"-\"}}</td>\r\n      </ng-container>\r\n\r\n       <!-- Name Column -->\r\n        <ng-container matColumnDef=\"Gold\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Gold </th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.product.rate_active[\"Gold\"]?row.product.rate_active[\"Gold\"].price+\" - \"+row.product.rate_active[\"Gold\"].tax:\"-\"}}</td>\r\n        </ng-container>\r\n\r\n        <!-- Name Column -->\r\n        <ng-container matColumnDef=\"Diamond\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Diamond </th>\r\n            <td mat-cell *matCellDef=\"let row\"> {{row.product.rate_active[\"Diamond\"]?row.product.rate_active[\"Diamond\"].price+\" - \"+row.product.rate_active[\"Diamond\"].tax:\"-\"}}</td>\r\n        </ng-container>\r\n\r\n        <ng-container matColumnDef=\"action\">\r\n            <th mat-header-cell *matHeaderCellDef mat-sort-header> Action </th>\r\n            <td mat-cell *matCellDef=\"let row\">\r\n                    <span (click)=\"_editRate(row)\"><i class=\"material-icons\">\r\n                    edit\r\n                    </i></span>\r\n            </td>\r\n        </ng-container>\r\n      \r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n  </table>\r\n\r\n  <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\r\n  </div>\r\n  <div class=\"clearpix\"> \r\n    <button mat-raised-button color =\"primary\" (click)=\"openDialog()\">Add New</button>\r\n  </div>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/layout/masters/rate/rate.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/layout/masters/rate/rate.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\ntd,\nth {\n  width: 10%; }\n\n.mat-column-prod_name {\n  width: 40%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L21hc3RlcnMvcmF0ZS9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXG1hc3RlcnNcXHJhdGVcXHJhdGUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFXLEVBQ2Q7O0FBRUQ7RUFDSSxnQkFBZTtFQUNmLFlBQVcsRUFDZDs7QUFFRDs7RUFFSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxXQUFTLEVBQ1o7O0FBRUQ7RUFDSSxjQUFhO0VBQ2Isc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxpQkFBZ0IsRUFDbkIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvbWFzdGVycy9yYXRlL3JhdGUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLm1hdC1mb3JtLWZpZWxkIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG50ZCxcclxudGgge1xyXG4gICAgd2lkdGg6IDEwJTsgICAgXHJcbn1cclxuXHJcbi5tYXQtY29sdW1uLXByb2RfbmFtZXtcclxuICAgIHdpZHRoOjQwJTtcclxufVxyXG5cclxuLmV4YW1wbGUtc2VjdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGhlaWdodDogNjBweDtcclxufVxyXG5cclxuLmV4YW1wbGUtbWFyZ2luIHtcclxuICAgIG1hcmdpbjogMTBweDtcclxufVxyXG5cclxuLmNsZWFycGl4IHtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/layout/masters/rate/rate.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/layout/masters/rate/rate.component.ts ***!
  \*******************************************************/
/*! exports provided: RateComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RateComponent", function() { return RateComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var src_app_constants_contants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/constants/contants */ "./src/app/constants/contants.ts");
/* harmony import */ var _custom_modal_custom_modal_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../custom-modal/custom-modal.component */ "./src/app/layout/masters/custom-modal/custom-modal.component.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var RateComponent = /** @class */ (function () {
    function RateComponent(commonService, dialog) {
        this.commonService = commonService;
        this.dialog = dialog;
        this.rateList = [];
        this.products = [];
        this.displayedColumns = src_app_constants_contants__WEBPACK_IMPORTED_MODULE_3__["RATE_TYPE"].rate_type;
        this.displayedColumns.unshift("prod_name");
        this.displayedColumns.push("action");
    }
    RateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.load();
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].urls.getRateProducts).subscribe(function (data) {
            for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                var val = data_1[_i];
                var keyarr = { key: val._id, value: val.prod_name };
                _this.products.push(keyarr);
            }
        });
        this.form_details = [];
    };
    RateComponent.prototype.load = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].urls.getRateList).subscribe(function (data) {
            _this.rateList = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.rateList);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
            _this.dataSource.filterPredicate = function (data, filter) {
                var accumulator = function (currentTerm, key) {
                    return key === 'product' ? currentTerm + data.product.prod_name : currentTerm + data[key];
                };
                var dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
                // Transform the filter by converting it to lowercase and removing whitespace.
                var transformedFilter = filter.trim().toLowerCase();
                return dataStr.indexOf(transformedFilter) !== -1;
            };
        });
    };
    RateComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    RateComponent.prototype._editRate = function (row) {
        var _this = this;
        this.form_details = [
            {
                "order": 1,
                "type": "select",
                "inputType": "dropdown",
                "name": "prod_name",
                "value": "",
                "placeholder": "Select Product",
                "validation": {
                    "required": true
                },
                "options": this.products
            }
        ];
        var dialogRef = this.dialog.open(_custom_modal_custom_modal_component__WEBPACK_IMPORTED_MODULE_4__["CustomModalComponent"], {
            width: '1300px',
            data: { source: "rate", formData: this.form_details.sort(function (a, b) { return a.order - b.order; }), formTitle: "Rate", url: src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].urls.postRate, editRate: row }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //reload
            _this.load();
        });
    };
    RateComponent.prototype.openDialog = function () {
        var _this = this;
        this.form_details = [
            {
                "order": 1,
                "type": "select",
                "inputType": "dropdown",
                "name": "prod_name",
                "value": "",
                "placeholder": "Select Product",
                "validation": {
                    "required": true
                },
                "options": this.products
            }
        ];
        var dialogRef = this.dialog.open(_custom_modal_custom_modal_component__WEBPACK_IMPORTED_MODULE_4__["CustomModalComponent"], {
            width: '1300px',
            data: { source: "rate", formData: this.form_details.sort(function (a, b) { return a.order - b.order; }), formTitle: "Rate", url: src_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].urls.postRate }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //reload
            _this.load();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], RateComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], RateComponent.prototype, "sort", void 0);
    RateComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-rate',
            template: __webpack_require__(/*! ./rate.component.html */ "./src/app/layout/masters/rate/rate.component.html"),
            styles: [__webpack_require__(/*! ./rate.component.scss */ "./src/app/layout/masters/rate/rate.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], RateComponent);
    return RateComponent;
}());



/***/ }),

/***/ "./src/app/layout/masters/routes/routes.component.html":
/*!*************************************************************!*\
  !*** ./src/app/layout/masters/routes/routes.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-header>\r\n      <mat-card-title>Routes</mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n      <section class=\"example-section\">\r\n          <mat-form-field class=\"example-margin\">\r\n              <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n          </mat-form-field>\r\n      </section>\r\n  </mat-card-content>\r\n\r\n  <div class=\"mat-elevation-z8\">\r\n  <table mat-table [dataSource]=\"dataSource\" matSort>\r\n\r\n      <!-- Color Column -->\r\n      <ng-container matColumnDef=\"areaName\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Area Name </th>\r\n          <td mat-cell *matCellDef=\"let row\" [style.color]=\"row.areaName\"> {{row.areaName}} </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n  </table>\r\n\r\n  <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\r\n  </div>\r\n  <div class=\"clearpix\"> \r\n    <button mat-raised-button color =\"primary\" (click)=\"openDialog()\">Add New</button>\r\n  </div>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/layout/masters/routes/routes.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/layout/masters/routes/routes.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\ntd,\nth {\n  width: 25%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L21hc3RlcnMvcm91dGVzL0M6XFxsb2NhbGRpc2tcXG15d29ya1xcZHN1aXRlXFxjbGllbnQvc3JjXFxhcHBcXGxheW91dFxcbWFzdGVyc1xccm91dGVzXFxyb3V0ZXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFXLEVBQ2Q7O0FBRUQ7RUFDSSxnQkFBZTtFQUNmLFlBQVcsRUFDZDs7QUFFRDs7RUFFSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxjQUFhO0VBQ2Isc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxpQkFBZ0IsRUFDbkIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvbWFzdGVycy9yb3V0ZXMvcm91dGVzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5tYXQtZm9ybS1maWVsZCB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxudGQsXHJcbnRoIHtcclxuICAgIHdpZHRoOiAyNSU7XHJcbn1cclxuXHJcbi5leGFtcGxlLXNlY3Rpb24ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBoZWlnaHQ6IDYwcHg7XHJcbn1cclxuXHJcbi5leGFtcGxlLW1hcmdpbiB7XHJcbiAgICBtYXJnaW46IDEwcHg7XHJcbn1cclxuXHJcbi5jbGVhcnBpeCB7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/layout/masters/routes/routes.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/layout/masters/routes/routes.component.ts ***!
  \***********************************************************/
/*! exports provided: RoutesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoutesComponent", function() { return RoutesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../common-modal/common-modal.component */ "./src/app/layout/masters/common-modal/common-modal.component.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RoutesComponent = /** @class */ (function () {
    function RoutesComponent(commonService, dialog) {
        this.commonService = commonService;
        this.dialog = dialog;
        this.displayedColumns = ['areaName'];
    }
    RoutesComponent.prototype.ngOnInit = function () {
        this.loadRoute();
    };
    RoutesComponent.prototype.loadRoute = function () {
        var _this = this;
        this.commonService.getMethod(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getRoute).subscribe(function (data) {
            _this.routes = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.routes);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    RoutesComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    RoutesComponent.prototype.openDialog = function () {
        var _this = this;
        this.route_form_details = [{
                "order": 1,
                "type": "input",
                "inputType": "text",
                "name": "areaName",
                "value": "",
                "placeholder": "Area Name",
                "validation": {
                    "required": true
                }
            }];
        var dialogRef = this.dialog.open(_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_2__["CommonModalComponent"], {
            width: '300px',
            data: { formData: this.route_form_details.sort(function (a, b) { return a.order - b.order; }), formTitle: "Routes", url: _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.postRoute }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.loadRoute();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], RoutesComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], RoutesComponent.prototype, "sort", void 0);
    RoutesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-routes',
            template: __webpack_require__(/*! ./routes.component.html */ "./src/app/layout/masters/routes/routes.component.html"),
            styles: [__webpack_require__(/*! ./routes.component.scss */ "./src/app/layout/masters/routes/routes.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], RoutesComponent);
    return RoutesComponent;
}());



/***/ }),

/***/ "./src/app/layout/masters/user/user.component.html":
/*!*********************************************************!*\
  !*** ./src/app/layout/masters/user/user.component.html ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-header>\r\n      <mat-card-title>Users</mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n      <section class=\"example-section\">\r\n          <mat-form-field class=\"example-margin\">\r\n              <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n          </mat-form-field>\r\n      </section>\r\n  </mat-card-content>\r\n\r\n  <div class=\"mat-elevation-z8\">\r\n  <table mat-table [dataSource]=\"dataSource\" matSort>\r\n\r\n      <ng-container matColumnDef=\"username\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Username </th>\r\n          <td mat-cell *matCellDef=\"let row\" > {{row.username}} </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"firstName\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> First Name </th>\r\n          <td mat-cell *matCellDef=\"let row\" > {{row.firstName}} </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"lastName\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Last Name </th>\r\n          <td mat-cell *matCellDef=\"let row\" > {{row.lastName}} </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"email\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Email </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.email}} </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"contactNo\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Contact # </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.contactNo}} </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"role\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Role </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.role}} </td>\r\n      </ng-container>\r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n  </table>\r\n\r\n  <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\r\n  </div>\r\n  <div class=\"clearpix\"> \r\n    <button mat-raised-button color =\"primary\" (click)=\"openDialog()\">Add New</button>\r\n  </div>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/layout/masters/user/user.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/layout/masters/user/user.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\ntd,\nth {\n  width: 25%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L21hc3RlcnMvdXNlci9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXG1hc3RlcnNcXHVzZXJcXHVzZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFXLEVBQ2Q7O0FBRUQ7RUFDSSxnQkFBZTtFQUNmLFlBQVcsRUFDZDs7QUFFRDs7RUFFSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxjQUFhO0VBQ2Isc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxpQkFBZ0IsRUFDbkIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvbWFzdGVycy91c2VyL3VzZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJ0YWJsZSB7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLm1hdC1mb3JtLWZpZWxkIHtcclxuICAgIGZvbnQtc2l6ZTogMTRweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG50ZCxcclxudGgge1xyXG4gICAgd2lkdGg6IDI1JTtcclxufVxyXG5cclxuLmV4YW1wbGUtc2VjdGlvbiB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24tY29udGVudDogY2VudGVyO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGhlaWdodDogNjBweDtcclxufVxyXG5cclxuLmV4YW1wbGUtbWFyZ2luIHtcclxuICAgIG1hcmdpbjogMTBweDtcclxufVxyXG5cclxuLmNsZWFycGl4IHtcclxuICAgIG1hcmdpbi10b3A6IDEwcHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/layout/masters/user/user.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/layout/masters/user/user.component.ts ***!
  \*******************************************************/
/*! exports provided: UserComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserComponent", function() { return UserComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../common-modal/common-modal.component */ "./src/app/layout/masters/common-modal/common-modal.component.ts");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserComponent = /** @class */ (function () {
    function UserComponent(commonService, dialog) {
        this.commonService = commonService;
        this.dialog = dialog;
        this.displayedColumns = ['username', 'firstName', 'lastName', 'email', 'contactNo', 'role'];
    }
    UserComponent.prototype.ngOnInit = function () {
        this.loadUsers();
    };
    UserComponent.prototype.loadUsers = function () {
        var _this = this;
        this.commonService.getMethod(_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getUser).subscribe(function (data) {
            _this.users = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.users);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    UserComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    UserComponent.prototype.openDialog = function () {
        var _this = this;
        this.user_form_details = [{
                "order": 1,
                "type": "input",
                "inputType": "text",
                "name": "username",
                "value": "",
                "placeholder": "User Name",
                "validation": {
                    "required": true
                }
            }, {
                "order": 2,
                "type": "input",
                "inputType": "password",
                "name": "password",
                "value": "",
                "placeholder": "Password",
                "validation": {
                    "required": true
                }
            }, {
                "order": 3,
                "type": "input",
                "inputType": "text",
                "name": "firstName",
                "value": "",
                "placeholder": "First Name",
                "validation": {
                    "required": true
                }
            }, {
                "order": 4,
                "type": "input",
                "inputType": "text",
                "name": "lastName",
                "value": "",
                "placeholder": "Last Name",
                "validation": {
                    "required": false
                }
            }, {
                "order": 5,
                "type": "input",
                "inputType": "number",
                "name": "contactNo",
                "value": "",
                "placeholder": "Contact #1",
                "validation": {
                    "required": true
                }
            }, {
                "order": 6,
                "type": "input",
                "inputType": "number",
                "name": "contactNo1",
                "value": "",
                "placeholder": "Contact #2",
                "validation": {
                    "required": false
                }
            }, {
                "order": 7,
                "type": "input",
                "inputType": "email",
                "name": "email",
                "value": "",
                "placeholder": "Email",
                "validation": {
                    "required": true
                }
            }, {
                "order": 8,
                "type": "select",
                "inputType": "dropdown",
                "name": "role",
                "value": "",
                "placeholder": "Role",
                "validation": {
                    "required": true
                },
                "options": [{ key: "ADMIN", value: "ADMIN" }, { key: "USER", value: "USER" }, { key: "SUPERADMIN", value: "SUPERADMIN" }]
            }];
        var dialogRef = this.dialog.open(_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_2__["CommonModalComponent"], {
            width: '600px',
            data: { formData: this.user_form_details.sort(function (a, b) { return a.order - b.order; }), formTitle: "Users", url: _environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.postUser }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.loadUsers();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], UserComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], UserComponent.prototype, "sort", void 0);
    UserComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-user',
            template: __webpack_require__(/*! ./user.component.html */ "./src/app/layout/masters/user/user.component.html"),
            styles: [__webpack_require__(/*! ./user.component.scss */ "./src/app/layout/masters/user/user.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_3__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], UserComponent);
    return UserComponent;
}());



/***/ }),

/***/ "./src/app/layout/masters/vendor/vendor.component.html":
/*!*************************************************************!*\
  !*** ./src/app/layout/masters/vendor/vendor.component.html ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card>\r\n  <mat-card-header>\r\n      <mat-card-title>Vendors</mat-card-title>\r\n  </mat-card-header>\r\n  <mat-card-content>\r\n      <section class=\"example-section\">\r\n          <mat-form-field class=\"example-margin\">\r\n              <input matInput (keyup)=\"applyFilter($event.target.value)\" placeholder=\"Filter\">\r\n          </mat-form-field>\r\n          <mat-form-field class=\"example-margin\">\r\n              <mat-select placeholder=\"Route\" >\r\n                  <mat-option value=\"1\">Option 1</mat-option>\r\n                  <mat-option value=\"2\">Option 2</mat-option>\r\n                  <mat-option value=\"3\">Option 3</mat-option>\r\n              </mat-select>\r\n          </mat-form-field>\r\n      </section>\r\n  </mat-card-content>\r\n\r\n  <div class=\"mat-elevation-z8\">\r\n  <table mat-table [dataSource]=\"dataSource\" matSort>\r\n\r\n      <!-- Color Column -->\r\n      <ng-container matColumnDef=\"vendorName\">\r\n              <th mat-header-cell *matHeaderCellDef mat-sort-header> Vendor Name </th>\r\n              <td mat-cell *matCellDef=\"let row\"> {{row.vendorName}} </td>\r\n          </ng-container>\r\n\r\n      <!-- Progress Column -->\r\n      <ng-container matColumnDef=\"firstName\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Properietor </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.firstName}}  </td>\r\n      </ng-container>\r\n\r\n      <!-- Name Column -->\r\n      <ng-container matColumnDef=\"contactNo\">\r\n          <th mat-header-cell *matHeaderCellDef mat-sort-header> Contact # </th>\r\n          <td mat-cell *matCellDef=\"let row\"> {{row.contactNo}}  </td>\r\n      </ng-container>\r\n\r\n      <ng-container matColumnDef=\"contactPerson\">\r\n        <th mat-header-cell *matHeaderCellDef mat-sort-header> Contact Person </th>\r\n        <td mat-cell *matCellDef=\"let row\"> {{row.contactPerson}} </td>\r\n    </ng-container>\r\n      \r\n\r\n      <tr mat-header-row *matHeaderRowDef=\"displayedColumns\"></tr>\r\n      <tr mat-row *matRowDef=\"let row; columns: displayedColumns;\"></tr>\r\n  </table>\r\n\r\n  <mat-paginator [pageSize]=\"10\" [pageSizeOptions]=\"[5, 10, 25, 100]\"></mat-paginator>\r\n  </div>\r\n  <div class=\"clearpix\"> \r\n    <button mat-raised-button color =\"primary\" (click)=\"openDialog()\">Add New</button>\r\n    <!-- <ol>\r\n        <li>\r\n          <mat-form-field>\r\n            <input matInput [(ngModel)]=\"name\" placeholder=\"What's your name?\">\r\n          </mat-form-field>\r\n        </li>\r\n        <li>\r\n          <button mat-raised-button (click)=\"openDialog()\">Pick one</button>\r\n        </li>\r\n        <li *ngIf=\"animal\">\r\n          You chose: <i>{{animal}}</i>\r\n        </li>\r\n      </ol> -->\r\n  </div>\r\n</mat-card>"

/***/ }),

/***/ "./src/app/layout/masters/vendor/vendor.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/layout/masters/vendor/vendor.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "table {\n  width: 100%; }\n\n.mat-form-field {\n  font-size: 14px;\n  width: 100%; }\n\ntd,\nth {\n  width: 25%; }\n\n.example-section {\n  display: flex;\n  align-content: center;\n  align-items: center;\n  height: 60px; }\n\n.example-margin {\n  margin: 10px; }\n\n.clearpix {\n  margin-top: 10px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L21hc3RlcnMvdmVuZG9yL0M6XFxsb2NhbGRpc2tcXG15d29ya1xcZHN1aXRlXFxjbGllbnQvc3JjXFxhcHBcXGxheW91dFxcbWFzdGVyc1xcdmVuZG9yXFx2ZW5kb3IuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxZQUFXLEVBQ2Q7O0FBRUQ7RUFDSSxnQkFBZTtFQUNmLFlBQVcsRUFDZDs7QUFFRDs7RUFFSSxXQUFVLEVBQ2I7O0FBRUQ7RUFDSSxjQUFhO0VBQ2Isc0JBQXFCO0VBQ3JCLG9CQUFtQjtFQUNuQixhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxhQUFZLEVBQ2Y7O0FBRUQ7RUFDSSxpQkFBZ0IsRUFDbkIiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvbWFzdGVycy92ZW5kb3IvdmVuZG9yLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5tYXQtZm9ybS1maWVsZCB7XHJcbiAgICBmb250LXNpemU6IDE0cHg7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxudGQsXHJcbnRoIHtcclxuICAgIHdpZHRoOiAyNSU7XHJcbn1cclxuXHJcbi5leGFtcGxlLXNlY3Rpb24ge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBoZWlnaHQ6IDYwcHg7XHJcbn1cclxuXHJcbi5leGFtcGxlLW1hcmdpbiB7XHJcbiAgICBtYXJnaW46IDEwcHg7XHJcbn1cclxuXHJcbi5jbGVhcnBpeCB7XHJcbiAgICBtYXJnaW4tdG9wOiAxMHB4O1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/layout/masters/vendor/vendor.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/layout/masters/vendor/vendor.component.ts ***!
  \***********************************************************/
/*! exports provided: VendorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VendorComponent", function() { return VendorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/services/common.service */ "./src/app/services/common.service.ts");
/* harmony import */ var _common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../common-modal/common-modal.component */ "./src/app/layout/masters/common-modal/common-modal.component.ts");
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






var VendorComponent = /** @class */ (function () {
    function VendorComponent(commonService, dialog) {
        this.commonService = commonService;
        this.dialog = dialog;
        this.displayedColumns = ['vendorName', 'firstName', 'contactPerson', 'contactNo'];
        this.routes = [];
        //this.customerList = [];
    }
    VendorComponent.prototype.ngOnInit = function () {
        this.loadVendor();
    };
    VendorComponent.prototype.loadVendor = function () {
        var _this = this;
        this.commonService.getMethod(src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.getVendor).subscribe(function (data) {
            _this.vendorList = data;
            _this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"](_this.vendorList);
            _this.dataSource.paginator = _this.paginator;
            _this.dataSource.sort = _this.sort;
        });
    };
    VendorComponent.prototype.applyFilter = function (filterValue) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    };
    VendorComponent.prototype.openDialog = function () {
        var _this = this;
        this.vendor_form_details = [{
                "order": 1,
                "type": "input",
                "inputType": "text",
                "name": "vendorName",
                "value": "",
                "placeholder": "Vendor Name",
                "validation": {
                    "required": true
                }
            }, {
                "order": 6,
                "type": "input",
                "inputType": "text",
                "name": "contactPerson",
                "value": "",
                "placeholder": "Contact Person",
                "validation": {
                    "required": true
                }
            }, {
                "order": 2,
                "type": "input",
                "inputType": "text",
                "name": "firstName",
                "value": "",
                "placeholder": "Proprietor First Name",
                "validation": {
                    "required": true
                }
            }, {
                "order": 3,
                "type": "input",
                "inputType": "text",
                "name": "lastName",
                "value": "",
                "placeholder": "Proprietor  Last Name",
                "validation": {
                    "required": true
                }
            }, {
                "order": 4,
                "type": "input",
                "inputType": "number",
                "name": "contactNo",
                "value": "",
                "placeholder": "Contact #1",
                "validation": {
                    "required": true
                }
            }, {
                "order": 5,
                "type": "input",
                "inputType": "number",
                "name": "contactNo1",
                "value": "",
                "placeholder": "Contact #2",
                "validation": {
                    "required": false
                }
            }, {
                "order": 7,
                "type": "textarea",
                "inputType": "textarea",
                "name": "address",
                "value": "",
                "placeholder": "Address",
                "validation": {
                    "required": true
                }
            }, {
                "order": 8,
                "type": "input",
                "inputType": "text",
                "name": "city",
                "value": "",
                "placeholder": "City",
                "validation": {
                    "required": true
                }
            }, {
                "order": 9,
                "type": "input",
                "inputType": "number",
                "name": "pincode",
                "value": "",
                "placeholder": "Pincode",
                "validation": {
                    "required": true
                }
            }];
        var dialogRef = this.dialog.open(_common_modal_common_modal_component__WEBPACK_IMPORTED_MODULE_3__["CommonModalComponent"], {
            width: '600px',
            data: { formData: this.vendor_form_details.sort(function (a, b) { return a.order - b.order; }), formTitle: "Vendors", url: src_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].urls.postVendor }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            //reload
            _this.loadVendor();
        });
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatPaginator"])
    ], VendorComponent.prototype, "paginator", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"])(_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"]),
        __metadata("design:type", _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSort"])
    ], VendorComponent.prototype, "sort", void 0);
    VendorComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-vendor',
            template: __webpack_require__(/*! ./vendor.component.html */ "./src/app/layout/masters/vendor/vendor.component.html"),
            styles: [__webpack_require__(/*! ./vendor.component.scss */ "./src/app/layout/masters/vendor/vendor.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_common_service__WEBPACK_IMPORTED_MODULE_2__["CommonService"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"]])
    ], VendorComponent);
    return VendorComponent;
}());



/***/ })

}]);
//# sourceMappingURL=default~masters-masters-module~transactions-transactions-module.js.map