(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layout-layout-module"],{

/***/ "./src/app/layout/components/sidebar/sidebar.component.html":
/*!******************************************************************!*\
  !*** ./src/app/layout/components/sidebar/sidebar.component.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div id=\"sidebar\">\r\n    <mat-nav-list>\r\n        <a mat-list-item [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/dashboard']\">\r\n            <mat-icon class=\"sidenav-icon\">dashboard</mat-icon> {{ 'Dashboard' | translate }}\r\n        </a>\r\n        <!-- <a mat-list-item [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/payment/payments']\">\r\n            <mat-icon class=\"sidenav-icon\">euro_symbol</mat-icon> {{ 'Payments' | translate }}\r\n        </a>  -->\r\n        <div class=\"nested-menu\">\r\n            <a mat-list-item (click)=\"addExpandClass('payments')\" >\r\n                <mat-icon class=\"sidenav-icon\">input</mat-icon> {{ 'Payments' | translate }}\r\n            </a>\r\n            <ul class=\"nested submenu\" [class.expand]=\"showMenu === 'payments'\">\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/payment/payments']\"><span>{{ 'Add' | translate }}</span></a>\r\n                </li>\r\n                <li *ngIf=\"userDetail.role=='ADMIN'\">\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/payment/view']\"><span>{{ 'View' | translate }}</span></a>\r\n                </li>\r\n                <li *ngIf=\"userDetail.role=='ADMIN'\">\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/payment/detail-view']\"><span>{{ 'Detailed View' | translate }}</span></a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <a mat-list-item [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/orders/deliveries']\">\r\n            <mat-icon class=\"sidenav-icon\">local_shipping</mat-icon> {{ 'Deliveries' | translate }}\r\n        </a> \r\n        <div class=\"nested-menu\">\r\n            <a mat-list-item (click)=\"addExpandClass('reports')\" >\r\n                <mat-icon class=\"sidenav-icon\">bar_chart</mat-icon> {{ 'Reports' | translate }}\r\n            </a>\r\n            <ul class=\"nested submenu\" [class.expand]=\"showMenu === 'reports'\">\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/reports/sales']\"><span>{{ 'Sales' | translate }}</span></a>\r\n                </li>\r\n                <li>\r\n                    <a *ngIf=\"userDetail.role=='ADMIN'\" href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/reports/recentsales']\"><span>{{ 'Recent Sales' | translate }}</span></a>\r\n                </li>\r\n                <li>\r\n                    <a *ngIf=\"userDetail.role=='ADMIN'\"href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/reports/recentpurchase']\"><span>{{ 'Recent Purchase' | translate }}</span></a>\r\n                </li> \r\n                <li>\r\n                    <a *ngIf=\"userDetail.role=='ADMIN'\" href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/reports/recentdamages']\"><span>{{ 'Recent Damages' | translate }}</span></a>\r\n                </li>                \r\n            </ul>\r\n        </div>        \r\n        <div class=\"nested-menu\">\r\n            <a mat-list-item (click)=\"addExpandClass('leads')\" >\r\n                <mat-icon class=\"sidenav-icon\">input</mat-icon> {{ 'Leads' | translate }}\r\n            </a>\r\n            <ul class=\"nested submenu\" [class.expand]=\"showMenu === 'leads'\">\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/leads/customers']\"><span>{{ 'Leads' | translate }}</span></a>\r\n                </li>\r\n                <li *ngIf=\"userDetail.role=='ADMIN'\">\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/leads/vendors']\"><span>{{ 'Vendors' | translate }}</span></a>\r\n                </li>                \r\n            </ul>\r\n        </div>\r\n        <div class=\"nested-menu\" *ngIf=\"userDetail.role=='ADMIN'\">\r\n            <a mat-list-item (click)=\"addExpandClass('masters')\" >\r\n                <mat-icon class=\"sidenav-icon\">add</mat-icon> {{ 'Masters' | translate }}\r\n            </a>\r\n            <ul class=\"nested submenu\" [class.expand]=\"showMenu === 'masters'\">\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/masters/customers']\"><span>{{ 'Customers' | translate }}</span></a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/masters/vendors']\"><span>{{ 'Vendors' | translate }}</span></a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/masters/users']\"><span>{{ 'Users' | translate }}</span></a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/masters/routes']\"><span>{{ 'Routes' | translate }}</span></a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/masters/rates']\"><span>{{ 'Rates' | translate }}</span></a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/masters/products']\"><span>{{ 'Products' | translate }}</span></a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/masters/mapping']\"><span>{{ 'Customer Mapping' | translate }}</span></a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"nested-menu\">\r\n            <a mat-list-item (click)=\"addExpandClass('transactions')\">\r\n                <mat-icon class=\"sidenav-icon\">add_shopping_cart</mat-icon> {{ 'Transactions' | translate }}\r\n            </a>\r\n            <ul class=\"nested submenu\" [class.expand]=\"showMenu === 'transactions'\">\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/transactions/sales']\"><span>{{ 'Sales' | translate }}</span></a>\r\n                </li>\r\n                <li *ngIf=\"userDetail.role=='ADMIN' || userDetail.role=='SUPERADMIN'\">\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/transactions/purchase']\"><span>{{ 'Purchase' | translate }}</span></a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/transactions/expenses']\"><span>{{ 'Expenses' | translate }}</span></a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/transactions/damages']\"><span>{{ 'Return / Spoil' | translate }}</span></a>\r\n                </li>\r\n                <li *ngIf=\"userDetail.role=='ADMIN' || userDetail.role=='SUPERADMIN'\">\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/transactions/openingbalance']\"><span>{{ 'Opening Balance' | translate }}</span></a>\r\n                </li>\r\n            </ul>\r\n        </div>\r\n        <div class=\"nested-menu\" *ngIf=\"userDetail.role=='ADMIN' || userDetail.role=='SUPERADMIN'\">\r\n            <a mat-list-item (click)=\"addExpandClass('personalize')\">\r\n                <mat-icon class=\"sidenav-icon\">build</mat-icon> {{ 'Personalize' | translate }}\r\n            </a>\r\n            <ul class=\"nested submenu\" [class.expand]=\"showMenu === 'personalize'\">\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/personalize/customers']\"><span>{{ 'Customer' | translate }}</span></a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/personalize/products']\"><span>{{ 'Products' | translate }}</span></a>\r\n                </li>                \r\n            </ul>\r\n        </div>\r\n        <div class=\"nested-menu\" >\r\n            <a mat-list-item (click)=\"addExpandClass('grade')\">\r\n                <mat-icon class=\"sidenav-icon\">moped</mat-icon> {{ 'Grade Management' | translate }}\r\n            </a>\r\n            <ul class=\"nested submenu\" [class.expand]=\"showMenu === 'grade'\">\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/grade/management']\"><span>{{ 'Management' | translate }}</span></a>\r\n                </li>\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/grade/transaction']\"><span>{{ 'Transactions' | translate }}</span></a>\r\n                </li>                \r\n            </ul>\r\n        </div>\r\n        <div class=\"nested-menu\" *ngIf=\"userDetail.role=='ADMIN'\">\r\n            <a mat-list-item (click)=\"addExpandClass('discounts')\">\r\n                <mat-icon class=\"sidenav-icon\">local_offer</mat-icon> {{ 'Discounts' | translate }}\r\n            </a>\r\n            <ul class=\"nested submenu\" [class.expand]=\"showMenu === 'discounts'\">\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/discounts/category']\"><span>{{ 'Category' | translate }}</span></a>\r\n                </li>\r\n                <!-- <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/discounts/mapping']\"><span>{{ 'Mapping' | translate }}</span></a>\r\n                </li>      -->\r\n                <li>\r\n                    <a href=\"javascript:void(0)\" [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/discounts/transactions']\"><span>{{ 'Transactions' | translate }}</span></a>\r\n                </li>                \r\n            </ul>\r\n        </div>\r\n        <a *ngIf=\"userDetail.role=='ADMIN'\" mat-list-item [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/charts']\">\r\n            <mat-icon class=\"sidenav-icon\">today</mat-icon> {{ 'Remainders' | translate }}\r\n        </a>   \r\n        <a *ngIf=\"userDetail.role=='ADMIN'\" mat-list-item [routerLinkActive]=\"'active'\" [routerLink]=\"['/layout/charts']\">\r\n            <mat-icon class=\"sidenav-icon\">message</mat-icon> {{ 'SMS Alert' | translate }}\r\n        </a>   \r\n    </mat-nav-list>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/layout/components/sidebar/sidebar.component.scss":
/*!******************************************************************!*\
  !*** ./src/app/layout/components/sidebar/sidebar.component.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#sidebar {\n  width: 250px;\n  position: fixed;\n  top: 56px;\n  bottom: 0;\n  background: #fff;\n  box-shadow: 3px 0 6px rgba(0, 0, 0, 0.24);\n  z-index: 999;\n  -ms-overflow-y: auto;\n  overflow-y: auto; }\n  #sidebar .mat-nav-list {\n    width: 100%; }\n  #sidebar .mat-nav-list a {\n      display: block; }\n  #sidebar .mat-nav-list a .mat-icon {\n        margin-right: 15px; }\n  .nested-menu .nested {\n  list-style-type: none; }\n  .nested-menu .submenu {\n  display: none;\n  height: 0; }\n  .nested-menu .expand.submenu {\n  background: aliceblue;\n  font-weight: lighter;\n  font-variant: petite-caps;\n  display: block;\n  list-style-type: none;\n  height: auto;\n  margin: 0; }\n  .nested-menu .expand.submenu li a {\n    padding: 10px;\n    display: block; }\n  .nested-menu .expand.submenu li span::before {\n    content: \"- \"; }\n  mat-nav-list a:active {\n  background-color: #7dece7 !important; }\n  mat-nav-list .mat-list-item.active {\n  background-color: lightseagreen;\n  color: #fff;\n  border-radius: 3px;\n  margin: 1px; }\n  mat-nav-list .nested-menu ul li a.active {\n  background-color: lightseagreen;\n  color: #fff;\n  border-radius: 3px;\n  margin: 1px; }\n  @media screen and (max-width: 992px) {\n  #sidebar {\n    left: -250px; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NvbXBvbmVudHMvc2lkZWJhci9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXGNvbXBvbmVudHNcXHNpZGViYXJcXHNpZGViYXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxhQUFZO0VBQ1osZ0JBQWU7RUFDZixVQUFTO0VBQ1QsVUFBUztFQUNULGlCQUFnQjtFQUNoQiwwQ0FBeUM7RUFDekMsYUFBWTtFQUNaLHFCQUFvQjtFQUNwQixpQkFBZ0IsRUFVbkI7RUFuQkQ7SUFXUSxZQUFXLEVBT2Q7RUFsQkw7TUFnQlksZUFBYyxFQUNqQjtFQWpCVDtRQWNnQixtQkFBa0IsRUFDckI7RUFLYjtFQUVRLHNCQUFxQixFQUN4QjtFQUhMO0VBS1EsY0FBYTtFQUNiLFVBQVMsRUFDWjtFQVBMO0VBVVksc0JBQXFCO0VBQ3JCLHFCQUFvQjtFQUNwQiwwQkFBeUI7RUFFekIsZUFBYztFQUNkLHNCQUFxQjtFQUNyQixhQUFZO0VBQ1osVUFBUyxFQVVaO0VBM0JUO0lBb0JvQixjQUFhO0lBQ2IsZUFBYyxFQUNqQjtFQXRCakI7SUF3Qm9CLGNBQWEsRUFDaEI7RUFLakI7RUFDSSxxQ0FBOEMsRUFDakQ7RUFDRDtFQUVRLGdDQUErQjtFQUMvQixZQUFVO0VBQ1YsbUJBQWtCO0VBQ2xCLFlBQVcsRUFDZDtFQU5MO0VBUVEsZ0NBQStCO0VBQy9CLFlBQVU7RUFDVixtQkFBa0I7RUFDbEIsWUFBVyxFQUNkO0VBRUw7RUFDSTtJQUNJLGFBQVksRUFDZixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbGF5b3V0L2NvbXBvbmVudHMvc2lkZWJhci9zaWRlYmFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI3NpZGViYXIge1xyXG4gICAgd2lkdGg6IDI1MHB4O1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiA1NnB4O1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcclxuICAgIGJveC1zaGFkb3c6IDNweCAwIDZweCByZ2JhKDAsIDAsIDAsIDAuMjQpO1xyXG4gICAgei1pbmRleDogOTk5O1xyXG4gICAgLW1zLW92ZXJmbG93LXk6IGF1dG87XHJcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gICAgLm1hdC1uYXYtbGlzdCB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICAgICAgYSB7XHJcbiAgICAgICAgICAgIC5tYXQtaWNvbiB7XHJcbiAgICAgICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDE1cHg7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi5uZXN0ZWQtbWVudSB7XHJcbiAgICAubmVzdGVkIHtcclxuICAgICAgICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XHJcbiAgICB9XHJcbiAgICAuc3VibWVudSB7XHJcbiAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgICAgICBoZWlnaHQ6IDA7XHJcbiAgICB9XHJcbiAgICAmIC5leHBhbmQge1xyXG4gICAgICAgICYuc3VibWVudSB7XHJcbiAgICAgICAgICAgIGJhY2tncm91bmQ6IGFsaWNlYmx1ZTtcclxuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XHJcbiAgICAgICAgICAgIGZvbnQtdmFyaWFudDogcGV0aXRlLWNhcHM7XHJcblxyXG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgICAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xyXG4gICAgICAgICAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICAgICAgICAgIG1hcmdpbjogMDtcclxuICAgICAgICAgICAgbGkge1xyXG4gICAgICAgICAgICAgICAgYSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogMTBweDtcclxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHNwYW46OmJlZm9yZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogXCItIFwiO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbm1hdC1uYXYtbGlzdCBhOmFjdGl2ZSB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOnJnYigxMjUsIDIzNiwgMjMxKSAhaW1wb3J0YW50O1xyXG59XHJcbm1hdC1uYXYtbGlzdCB7XHJcbiAgICAubWF0LWxpc3QtaXRlbS5hY3RpdmUge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0c2VhZ3JlZW47XHJcbiAgICAgICAgY29sb3I6I2ZmZjtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICAgICAgbWFyZ2luOiAxcHg7XHJcbiAgICB9XHJcbiAgICAubmVzdGVkLW1lbnUgdWwgbGkgYS5hY3RpdmUge1xyXG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0c2VhZ3JlZW47XHJcbiAgICAgICAgY29sb3I6I2ZmZjtcclxuICAgICAgICBib3JkZXItcmFkaXVzOiAzcHg7XHJcbiAgICAgICAgbWFyZ2luOiAxcHg7XHJcbiAgICB9XHJcbn1cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTkycHgpIHtcclxuICAgICNzaWRlYmFyIHtcclxuICAgICAgICBsZWZ0OiAtMjUwcHg7XHJcbiAgICB9XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/layout/components/sidebar/sidebar.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/layout/components/sidebar/sidebar.component.ts ***!
  \****************************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(userService) {
        this.userService = userService;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        this.userDetail = this.userService.user;
        //console.log(this.userDetail);
        this.showMenu = '';
    };
    SidebarComponent.prototype.addExpandClass = function (element) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        }
        else {
            this.showMenu = element;
        }
    };
    SidebarComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-sidebar',
            template: __webpack_require__(/*! ./sidebar.component.html */ "./src/app/layout/components/sidebar/sidebar.component.html"),
            styles: [__webpack_require__(/*! ./sidebar.component.scss */ "./src/app/layout/components/sidebar/sidebar.component.scss")]
        }),
        __metadata("design:paramtypes", [src_app_services_user_service__WEBPACK_IMPORTED_MODULE_1__["UserService"]])
    ], SidebarComponent);
    return SidebarComponent;
}());



/***/ }),

/***/ "./src/app/layout/components/topnav/topnav.component.html":
/*!****************************************************************!*\
  !*** ./src/app/layout/components/topnav/topnav.component.html ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar color=\"primary\" class=\"fix-nav\">\r\n    <button type=\"button\" mat-icon-button class=\"visible-md\" (click)=\"toggleSidebar()\">\r\n        <mat-icon aria-label=\"Side nav toggle icon\">menu</mat-icon>\r\n    </button>\r\n    <div class=\"nav-brand\">\r\n        M K DEEPAN MILK CENTER \r\n    </div>\r\n    <!-- <form class=\"hidden-sm\" style=\"margin-left: 20px; margin-top: 5px\">\r\n        <mat-form-field>\r\n            <input matInput [placeholder]=\"'Search' | translate\">\r\n        </mat-form-field>\r\n    </form> -->\r\n    <span class=\"nav-spacer\"></span>\r\n    <!-- <a href=\"https://github.com/mkdeepan/archive/master.zip\" class=\"hidden-sm\" mat-raised-button style=\"margin-right: 10px\">\r\n        <mat-icon>cloud_download</mat-icon> {{ 'Download Now' | translate }}\r\n    </a> -->\r\n    <!-- <button class=\"hidden-sm\" mat-icon-button [matMenuTriggerFor]=\"language\">\r\n        <mat-icon>language</mat-icon>\r\n    </button>\r\n    <mat-menu #language=\"matMenu\">\r\n        <button mat-menu-item (click)=\"changeLang('en')\">\r\n            <span>{{ 'English' | translate }}</span>\r\n        </button>\r\n        <button mat-menu-item (click)=\"changeLang('fr')\">\r\n            <span>{{ 'French' | translate }}</span>\r\n        </button>\r\n        <button mat-menu-item (click)=\"changeLang('ur')\">\r\n            <span>{{ 'Urdu' | translate }}s</span>\r\n        </button>\r\n    </mat-menu> -->\r\n    <button class=\"\" mat-icon-button [matMenuTriggerFor]=\"profile\">\r\n        <mat-icon>account_circle</mat-icon>\r\n    </button>\r\n    <mat-menu #profile=\"matMenu\">\r\n        <button mat-menu-item>\r\n            <mat-icon>person</mat-icon>\r\n            <span>{{ session.username | translate }}</span>\r\n        </button>\r\n        <!-- <button mat-menu-item>\r\n            <mat-icon>inbox</mat-icon>\r\n            <span>{{ 'Inbox' | translate }}</span>\r\n        </button>\r\n        <button mat-menu-item>\r\n            <mat-icon>settings</mat-icon>\r\n            <span>{{ 'Settings' | translate }}</span>\r\n        </button> -->\r\n    </mat-menu>\r\n    <button mat-icon-button (click)=\"onLoggedout()\">\r\n        <mat-icon>exit_to_app</mat-icon>\r\n    </button>\r\n</mat-toolbar>\r\n"

/***/ }),

/***/ "./src/app/layout/components/topnav/topnav.component.scss":
/*!****************************************************************!*\
  !*** ./src/app/layout/components/topnav/topnav.component.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: block;\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  z-index: 1000; }\n\n.nav-brand {\n  width: 215px;\n  text-align: center; }\n\n.topnav-icon {\n  text-decoration: none;\n  display: flex;\n  color: #fff; }\n\n.fix-nav {\n  height: 3em; }\n\n.nav-spacer {\n  flex: 1 1 auto; }\n\n.visible-md {\n  display: none; }\n\n.visible-sm {\n  display: none; }\n\n@media screen and (max-width: 992px) {\n  .visible-md {\n    display: block; } }\n\n@media screen and (max-width: 768px) {\n  .visible-sm {\n    display: block; }\n  .nav-brand {\n    width: 100%; } }\n\n@media screen and (max-width: 768px) {\n  .hidden-sm {\n    display: none; } }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L2NvbXBvbmVudHMvdG9wbmF2L0M6XFxsb2NhbGRpc2tcXG15d29ya1xcZHN1aXRlXFxjbGllbnQvc3JjXFxhcHBcXGxheW91dFxcY29tcG9uZW50c1xcdG9wbmF2XFx0b3BuYXYuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxlQUFjO0VBQ2QsZ0JBQWU7RUFDZixRQUFPO0VBQ1AsU0FBUTtFQUNSLE9BQU07RUFDTixjQUFhLEVBQ2hCOztBQUNEO0VBQ0ksYUFBWTtFQUNaLG1CQUFrQixFQUNyQjs7QUFDRDtFQUNJLHNCQUFxQjtFQUNyQixjQUFhO0VBQ2IsWUFBVyxFQUNkOztBQUVEO0VBQ0ksWUFBVyxFQUNkOztBQUVEO0VBQ0ksZUFBYyxFQUNqQjs7QUFFRDtFQUNJLGNBQWEsRUFDaEI7O0FBQ0Q7RUFDSSxjQUFhLEVBQ2hCOztBQUNEO0VBQ0k7SUFDSSxlQUFjLEVBQ2pCLEVBQUE7O0FBRUw7RUFDSTtJQUNJLGVBQWMsRUFDakI7RUFDRDtJQUNJLFlBQVcsRUFDZCxFQUFBOztBQUVMO0VBQ0k7SUFDSSxjQUFhLEVBQ2hCLEVBQUEiLCJmaWxlIjoic3JjL2FwcC9sYXlvdXQvY29tcG9uZW50cy90b3BuYXYvdG9wbmF2LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbiAgICBsZWZ0OiAwO1xyXG4gICAgcmlnaHQ6IDA7XHJcbiAgICB0b3A6IDA7XHJcbiAgICB6LWluZGV4OiAxMDAwO1xyXG59XHJcbi5uYXYtYnJhbmQge1xyXG4gICAgd2lkdGg6IDIxNXB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcbi50b3BuYXYtaWNvbiB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbn1cclxuXHJcbi5maXgtbmF2IHtcclxuICAgIGhlaWdodDogM2VtO1xyXG59XHJcblxyXG4ubmF2LXNwYWNlciB7XHJcbiAgICBmbGV4OiAxIDEgYXV0bztcclxufVxyXG5cclxuLnZpc2libGUtbWQge1xyXG4gICAgZGlzcGxheTogbm9uZTtcclxufVxyXG4udmlzaWJsZS1zbSB7XHJcbiAgICBkaXNwbGF5OiBub25lO1xyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDk5MnB4KSB7XHJcbiAgICAudmlzaWJsZS1tZCB7XHJcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICB9XHJcbn1cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAgIC52aXNpYmxlLXNtIHtcclxuICAgICAgICBkaXNwbGF5OiBibG9jaztcclxuICAgIH1cclxuICAgIC5uYXYtYnJhbmQge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG59XHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICAuaGlkZGVuLXNtIHtcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/layout/components/topnav/topnav.component.ts":
/*!**************************************************************!*\
  !*** ./src/app/layout/components/topnav/topnav.component.ts ***!
  \**************************************************************/
/*! exports provided: TopnavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopnavComponent", function() { return TopnavComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/services/user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TopnavComponent = /** @class */ (function () {
    function TopnavComponent(router, translate, userService) {
        var _this = this;
        this.router = router;
        this.translate = translate;
        this.userService = userService;
        this.router.events.subscribe(function (val) {
            if (val instanceof _angular_router__WEBPACK_IMPORTED_MODULE_1__["NavigationEnd"] && window.innerWidth <= 992 && _this.isToggled()) {
                _this.toggleSidebar();
            }
        });
    }
    TopnavComponent.prototype.ngOnInit = function () {
        this.session = this.userService.user;
        this.pushRightClass = 'push-right';
    };
    TopnavComponent.prototype.isToggled = function () {
        var dom = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    };
    TopnavComponent.prototype.toggleSidebar = function () {
        var dom = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    };
    TopnavComponent.prototype.onLoggedout = function () {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('userdetails');
        this.router.navigate(['/login']);
    };
    TopnavComponent.prototype.changeLang = function (language) {
        this.translate.use(language);
    };
    TopnavComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-topnav',
            template: __webpack_require__(/*! ./topnav.component.html */ "./src/app/layout/components/topnav/topnav.component.html"),
            styles: [__webpack_require__(/*! ./topnav.component.scss */ "./src/app/layout/components/topnav/topnav.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"], _ngx_translate_core__WEBPACK_IMPORTED_MODULE_2__["TranslateService"], src_app_services_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], TopnavComponent);
    return TopnavComponent;
}());



/***/ }),

/***/ "./src/app/layout/layout-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/layout/layout-routing.module.ts ***!
  \*************************************************/
/*! exports provided: LayoutRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutRoutingModule", function() { return LayoutRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _layout_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./layout.component */ "./src/app/layout/layout.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', redirectTo: 'layout' },
    {
        path: 'layout',
        component: _layout_component__WEBPACK_IMPORTED_MODULE_2__["LayoutComponent"],
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'leads',
                loadChildren: './leads/leads.module#LeadsModule'
            },
            {
                path: 'transactions',
                loadChildren: './transactions/transactions.module#TransactionsModule'
            },
            {
                path: 'masters',
                loadChildren: './masters/masters.module#MastersModule'
            },
            {
                path: 'reports',
                loadChildren: './reports/reports.module#ReportsModule'
            },
            {
                path: 'payment',
                loadChildren: './payment/payment.module#PaymentModule'
            },
            {
                path: 'orders',
                loadChildren: './orders/orders.module#OrdersModule'
            },
            {
                path: 'personalize',
                loadChildren: './personalize/personalize.module#PersonalizeModule'
            },
            {
                path: 'discounts',
                loadChildren: './discounts/discounts.module#DiscountsModule'
            },
            {
                path: 'grade',
                loadChildren: './grade-mgmt/grade-mgmt.module#GradeMgmtModule'
            },
            {
                path: 'printview',
                outlet: 'printpage',
                loadChildren: './print-layout/print-layout.module#PrintLayoutModule'
            }
        ]
    },
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/layout.component.html":
/*!**********************************************!*\
  !*** ./src/app/layout/layout.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!-- <app-nav></app-nav> -->\r\n<app-topnav></app-topnav>\r\n<app-sidebar></app-sidebar>\r\n<div class=\"main-container\">\r\n    <router-outlet></router-outlet>\r\n</div>\r\n<div class=\"printable-container\">\r\n    <router-outlet name=\"printpage\"></router-outlet>\r\n</div>"

/***/ }),

/***/ "./src/app/layout/layout.component.scss":
/*!**********************************************!*\
  !*** ./src/app/layout/layout.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9sYXlvdXQuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/layout/layout.component.ts":
/*!********************************************!*\
  !*** ./src/app/layout/layout.component.ts ***!
  \********************************************/
/*! exports provided: LayoutComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutComponent", function() { return LayoutComponent; });
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

var LayoutComponent = /** @class */ (function () {
    function LayoutComponent() {
    }
    LayoutComponent.prototype.ngOnInit = function () { };
    LayoutComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-layout',
            template: __webpack_require__(/*! ./layout.component.html */ "./src/app/layout/layout.component.html"),
            styles: [__webpack_require__(/*! ./layout.component.scss */ "./src/app/layout/layout.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LayoutComponent);
    return LayoutComponent;
}());



/***/ }),

/***/ "./src/app/layout/layout.module.ts":
/*!*****************************************!*\
  !*** ./src/app/layout/layout.module.ts ***!
  \*****************************************/
/*! exports provided: LayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModule", function() { return LayoutModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/sidebar/sidebar.component */ "./src/app/layout/components/sidebar/sidebar.component.ts");
/* harmony import */ var _components_topnav_topnav_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/topnav/topnav.component */ "./src/app/layout/components/topnav/topnav.component.ts");
/* harmony import */ var _layout_routing_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./layout-routing.module */ "./src/app/layout/layout-routing.module.ts");
/* harmony import */ var _layout_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./layout.component */ "./src/app/layout/layout.component.ts");
/* harmony import */ var _nav_nav_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./nav/nav.component */ "./src/app/layout/nav/nav.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
                _layout_routing_module__WEBPACK_IMPORTED_MODULE_6__["LayoutRoutingModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatSidenavModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatMenuModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatListModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_3__["TranslateModule"]
            ],
            declarations: [_layout_component__WEBPACK_IMPORTED_MODULE_7__["LayoutComponent"], _nav_nav_component__WEBPACK_IMPORTED_MODULE_8__["NavComponent"], _components_topnav_topnav_component__WEBPACK_IMPORTED_MODULE_5__["TopnavComponent"], _components_sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_4__["SidebarComponent"]]
        })
    ], LayoutModule);
    return LayoutModule;
}());



/***/ }),

/***/ "./src/app/layout/nav/nav.component.html":
/*!***********************************************!*\
  !*** ./src/app/layout/nav/nav.component.html ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-sidenav-container class=\"sidenav-container\">\r\n    <mat-sidenav #drawer class=\"sidenav\" fixedInViewport=\"true\" [attr.role]=\"isHandset ? 'dialog' : 'navigation'\" [mode]=\"(isHandset | async)!.matches ? 'over' : 'side'\"\r\n        [opened]=\"!(isHandset | async)!.matches\">\r\n        <mat-toolbar color=\"primary\">SB Admin Marerial</mat-toolbar>\r\n        <mat-nav-list>\r\n            <a mat-list-item [routerLinkActive]=\"'active'\" [routerLink]=\"['/dashboard']\">\r\n                <mat-icon class=\"sidenav-icon\">dashboard</mat-icon> Dashbard\r\n            </a>\r\n            <a mat-list-item [routerLinkActive]=\"'active'\" [routerLink]=\"['/charts']\">\r\n                <mat-icon class=\"sidenav-icon\">bar_chart</mat-icon> Charts\r\n            </a>\r\n            <a mat-list-item [routerLinkActive]=\"'active'\" [routerLink]=\"['/tables']\">\r\n                <mat-icon class=\"sidenav-icon\">table_chart</mat-icon> Tables\r\n            </a>\r\n            <a mat-list-item [routerLinkActive]=\"'active'\" [routerLink]=\"['/forms']\">\r\n                <mat-icon class=\"sidenav-icon\">input</mat-icon> Forms\r\n            </a>\r\n            <a mat-list-item [routerLinkActive]=\"'active'\" [routerLink]=\"['/grid']\">\r\n                <mat-icon class=\"sidenav-icon\">grid_on</mat-icon> Grid\r\n            </a>\r\n            <a mat-list-item [routerLinkActive]=\"'active'\" [routerLink]=\"['/components']\">\r\n                <mat-icon class=\"sidenav-icon\">code</mat-icon> Components\r\n            </a>\r\n            <a mat-list-item [routerLinkActive]=\"'active'\" [routerLink]=\"['/blank-page']\">\r\n                <mat-icon class=\"sidenav-icon\">insert_drive_file</mat-icon> Black Page\r\n            </a>\r\n            <a mat-list-item>\r\n                <mat-icon class=\"sidenav-icon\">add</mat-icon> Menu\r\n            </a>\r\n        </mat-nav-list>\r\n    </mat-sidenav>\r\n    <mat-sidenav-content>\r\n        <mat-toolbar color=\"primary\" class=\"fix-nav\">\r\n            <button type=\"button\" aria-label=\"Toggle sidenav\" mat-icon-button (click)=\"drawer.toggle()\" *ngIf=\"(isHandset | async)!.matches\">\r\n                <mat-icon aria-label=\"Side nav toggle icon\">menu</mat-icon>\r\n            </button>\r\n            <mat-icon class=\"nav-icon\">menu</mat-icon>\r\n            <span class=\"nav-spacer\"></span>\r\n            <!--\r\n            <mat-icon class=\"nav-icon\">person</mat-icon>\r\n            <span class=\"nav-spacer\"></span>\r\n            <mat-icon class=\"nav-icon\">notifications</mat-icon>\r\n            <mat-icon class=\"nav-icon\">apps</mat-icon>\r\n            <mat-icon class=\"nav-icon\">fullscreen</mat-icon>\r\n            <mat-icon class=\"nav-icon\">flag</mat-icon>\r\n            <mat-icon class=\"nav-icon\">search</mat-icon>\r\n            <mat-icon class=\"nav-icon\">account_circle</mat-icon> -->\r\n            <a class=\"topnav-icon\" [routerLink]=\"['/login']\">\r\n                <mat-icon>exit_to_app</mat-icon>\r\n            </a>\r\n\r\n        </mat-toolbar>\r\n    </mat-sidenav-content>\r\n</mat-sidenav-container>"

/***/ }),

/***/ "./src/app/layout/nav/nav.component.scss":
/*!***********************************************!*\
  !*** ./src/app/layout/nav/nav.component.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".sidenav-container {\n  height: 100%; }\n\n.sidenav {\n  width: 250px;\n  box-shadow: 3px 0 6px rgba(0, 0, 0, 0.24); }\n\n.topnav-icon {\n  text-decoration: none;\n  display: flex;\n  color: #fff; }\n\n.sidenav-icon {\n  text-decoration: none;\n  padding: 0 10px; }\n\n.nav-spacer {\n  flex: 1 1 auto; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbGF5b3V0L25hdi9DOlxcbG9jYWxkaXNrXFxteXdvcmtcXGRzdWl0ZVxcY2xpZW50L3NyY1xcYXBwXFxsYXlvdXRcXG5hdlxcbmF2LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksYUFBWSxFQUNmOztBQUVEO0VBQ0ksYUFBWTtFQUNaLDBDQUF5QyxFQUM1Qzs7QUFDRDtFQUNJLHNCQUFxQjtFQUNyQixjQUFhO0VBQ2IsWUFBVyxFQUNkOztBQUVEO0VBQ0ksc0JBQXFCO0VBQ3JCLGdCQUFlLEVBQ2xCOztBQUVEO0VBQ0ksZUFBYyxFQUNqQiIsImZpbGUiOiJzcmMvYXBwL2xheW91dC9uYXYvbmF2LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnNpZGVuYXYtY29udGFpbmVyIHtcclxuICAgIGhlaWdodDogMTAwJTtcclxufVxyXG5cclxuLnNpZGVuYXYge1xyXG4gICAgd2lkdGg6IDI1MHB4O1xyXG4gICAgYm94LXNoYWRvdzogM3B4IDAgNnB4IHJnYmEoMCwgMCwgMCwgMC4yNCk7XHJcbn1cclxuLnRvcG5hdi1pY29uIHtcclxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBjb2xvcjogI2ZmZjtcclxufVxyXG5cclxuLnNpZGVuYXYtaWNvbiB7XHJcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XHJcbiAgICBwYWRkaW5nOiAwIDEwcHg7XHJcbn1cclxuXHJcbi5uYXYtc3BhY2VyIHtcclxuICAgIGZsZXg6IDEgMSBhdXRvO1xyXG59XHJcblxyXG4vLyAuZml4LW5hdiB7XHJcbi8vICAgICBwb3NpdGlvbjogZml4ZWQ7XHJcbi8vICAgICB0b3A6IDA7XHJcbi8vICAgICBsZWZ0OiAyNTBweDtcclxuLy8gICAgIHJpZ2h0OiAwO1xyXG4vLyB9XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/layout/nav/nav.component.ts":
/*!*********************************************!*\
  !*** ./src/app/layout/nav/nav.component.ts ***!
  \*********************************************/
/*! exports provided: NavComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavComponent", function() { return NavComponent; });
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/esm5/layout.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var NavComponent = /** @class */ (function () {
    function NavComponent(breakpointObserver) {
        this.breakpointObserver = breakpointObserver;
        this.isHandset = this.breakpointObserver.observe(_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["Breakpoints"].Handset);
    }
    NavComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-nav',
            template: __webpack_require__(/*! ./nav.component.html */ "./src/app/layout/nav/nav.component.html"),
            styles: [__webpack_require__(/*! ./nav.component.scss */ "./src/app/layout/nav/nav.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_0__["BreakpointObserver"]])
    ], NavComponent);
    return NavComponent;
}());



/***/ })

}]);
//# sourceMappingURL=layout-layout-module.js.map