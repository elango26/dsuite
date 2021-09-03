(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./dashboard/dashboard.module": [
		"./src/app/layout/dashboard/dashboard.module.ts",
		"default~dashboard-dashboard-module~discounts-discounts-module~grade-mgmt-grade-mgmt-module~leads-lea~8ade9213",
		"default~dashboard-dashboard-module~grade-mgmt-grade-mgmt-module~leads-leads-module~login-login-modul~350d2737",
		"dashboard-dashboard-module"
	],
	"./discounts/discounts.module": [
		"./src/app/layout/discounts/discounts.module.ts",
		"default~dashboard-dashboard-module~discounts-discounts-module~grade-mgmt-grade-mgmt-module~leads-lea~8ade9213",
		"discounts-discounts-module"
	],
	"./grade-mgmt/grade-mgmt.module": [
		"./src/app/layout/grade-mgmt/grade-mgmt.module.ts",
		"default~dashboard-dashboard-module~discounts-discounts-module~grade-mgmt-grade-mgmt-module~leads-lea~8ade9213",
		"default~dashboard-dashboard-module~grade-mgmt-grade-mgmt-module~leads-leads-module~login-login-modul~350d2737",
		"grade-mgmt-grade-mgmt-module"
	],
	"./layout/layout.module": [
		"./src/app/layout/layout.module.ts",
		"layout-layout-module"
	],
	"./leads/leads.module": [
		"./src/app/layout/leads/leads.module.ts",
		"default~dashboard-dashboard-module~discounts-discounts-module~grade-mgmt-grade-mgmt-module~leads-lea~8ade9213",
		"default~dashboard-dashboard-module~grade-mgmt-grade-mgmt-module~leads-leads-module~login-login-modul~350d2737",
		"default~leads-leads-module~orders-orders-module~transactions-transactions-module",
		"default~leads-leads-module~payment-payment-module",
		"leads-leads-module"
	],
	"./login/login.module": [
		"./src/app/login/login.module.ts",
		"default~dashboard-dashboard-module~grade-mgmt-grade-mgmt-module~leads-leads-module~login-login-modul~350d2737",
		"login-login-module"
	],
	"./masters/masters.module": [
		"./src/app/layout/masters/masters.module.ts",
		"default~dashboard-dashboard-module~discounts-discounts-module~grade-mgmt-grade-mgmt-module~leads-lea~8ade9213",
		"default~masters-masters-module~transactions-transactions-module",
		"masters-masters-module"
	],
	"./orders/orders.module": [
		"./src/app/layout/orders/orders.module.ts",
		"default~dashboard-dashboard-module~grade-mgmt-grade-mgmt-module~leads-leads-module~login-login-modul~350d2737",
		"default~leads-leads-module~orders-orders-module~transactions-transactions-module",
		"orders-orders-module"
	],
	"./payment/payment.module": [
		"./src/app/layout/payment/payment.module.ts",
		"default~dashboard-dashboard-module~discounts-discounts-module~grade-mgmt-grade-mgmt-module~leads-lea~8ade9213",
		"default~dashboard-dashboard-module~grade-mgmt-grade-mgmt-module~leads-leads-module~login-login-modul~350d2737",
		"default~leads-leads-module~payment-payment-module",
		"payment-payment-module"
	],
	"./personalize/personalize.module": [
		"./src/app/layout/personalize/personalize.module.ts",
		"personalize-personalize-module"
	],
	"./print-layout/print-layout.module": [
		"./src/app/layout/print-layout/print-layout.module.ts",
		"print-layout-print-layout-module"
	],
	"./reports/reports.module": [
		"./src/app/layout/reports/reports.module.ts",
		"default~dashboard-dashboard-module~discounts-discounts-module~grade-mgmt-grade-mgmt-module~leads-lea~8ade9213",
		"default~reports-reports-module~transactions-transactions-module",
		"reports-reports-module"
	],
	"./transactions/transactions.module": [
		"./src/app/layout/transactions/transactions.module.ts",
		"default~dashboard-dashboard-module~discounts-discounts-module~grade-mgmt-grade-mgmt-module~leads-lea~8ade9213",
		"default~dashboard-dashboard-module~grade-mgmt-grade-mgmt-module~leads-leads-module~login-login-modul~350d2737",
		"default~leads-leads-module~orders-orders-module~transactions-transactions-module",
		"default~masters-masters-module~transactions-transactions-module",
		"default~reports-reports-module~transactions-transactions-module",
		"transactions-transactions-module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids) {
		return Promise.resolve().then(function() {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		var id = ids[0];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";
module.exports = webpackAsyncContext;

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _shared_guard_auth_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shared/guard/auth.guard */ "./src/app/shared/guard/auth.guard.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [_shared_guard_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
    },
    {
        path: 'login',
        loadChildren: './login/login.module#LoginModule'
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
            providers: [_shared_guard_auth_guard__WEBPACK_IMPORTED_MODULE_2__["AuthGuard"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<router-outlet></router-outlet>\r\n<app-loader></app-loader>\r\n<!-- <app-loading></app-loading> -->\r\n<!-- <mat-progress-spinner [mode]=\"'indeterminate'\">\r\n</mat-progress-spinner> -->"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(translate) {
        this.translate = translate;
        translate.setDefaultLang('en');
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [_ngx_translate_core__WEBPACK_IMPORTED_MODULE_1__["TranslateService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: configServiceFactory, createTranslateLoader, AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configServiceFactory", function() { return configServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTranslateLoader", function() { return createTranslateLoader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/cdk/overlay */ "./node_modules/@angular/cdk/esm5/overlay.es5.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ngx-translate/http-loader */ "./node_modules/@ngx-translate/http-loader/fesm5/ngx-translate-http-loader.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _services_bootstrap_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./services/bootstrap.service */ "./src/app/services/bootstrap.service.ts");
/* harmony import */ var _loader_loader_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./loader/loader.component */ "./src/app/loader/loader.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _loader_loader_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./loader/loader.service */ "./src/app/loader/loader.service.ts");
/* harmony import */ var _services_http_interceptor_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./services/http-interceptor.service */ "./src/app/services/http-interceptor.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















function configServiceFactory(config) {
    return function () { return config.load(); };
}
// AoT requires an exported function for factories
var createTranslateLoader = function (http) {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
    return new _ngx_translate_http_loader__WEBPACK_IMPORTED_MODULE_6__["TranslateHttpLoader"](http, './assets/i18n/', '.json');
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"], _loader_loader_component__WEBPACK_IMPORTED_MODULE_10__["LoaderComponent"]],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_7__["AppRoutingModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_3__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatProgressSpinnerModule"],
                _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_0__["OverlayModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClientModule"],
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateModule"].forRoot({
                    loader: {
                        provide: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_5__["TranslateLoader"],
                        useFactory: createTranslateLoader,
                        deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]]
                    }
                }),
            ],
            providers: [
                _angular_common__WEBPACK_IMPORTED_MODULE_12__["DatePipe"],
                _services_bootstrap_service__WEBPACK_IMPORTED_MODULE_9__["BootstrapService"],
                {
                    provide: _angular_core__WEBPACK_IMPORTED_MODULE_1__["APP_INITIALIZER"],
                    useFactory: configServiceFactory,
                    deps: [_services_bootstrap_service__WEBPACK_IMPORTED_MODULE_9__["BootstrapService"]],
                    multi: true
                },
                { provide: _angular_common__WEBPACK_IMPORTED_MODULE_12__["LocationStrategy"], useClass: _angular_common__WEBPACK_IMPORTED_MODULE_12__["HashLocationStrategy"] },
                _loader_loader_service__WEBPACK_IMPORTED_MODULE_13__["LoaderService"],
                { provide: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HTTP_INTERCEPTORS"], useClass: _services_http_interceptor_service__WEBPACK_IMPORTED_MODULE_14__["JwtHttpInterceptor"], multi: true }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_8__["AppComponent"]],
            schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["CUSTOM_ELEMENTS_SCHEMA"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/loader/loader.component.html":
/*!**********************************************!*\
  !*** ./src/app/loader/loader.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"loader-wrapper\" *ngIf=\"loaderEnabled\">\n  \n  <div class=\"backdrop\"></div>\n  \n  <div class=\"spinner\"></div>\n\n</div>"

/***/ }),

/***/ "./src/app/loader/loader.component.scss":
/*!**********************************************!*\
  !*** ./src/app/loader/loader.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".backdrop {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  background-color: rgba(0, 0, 0, 0.568); }\n\n.loader-wrapper {\n  position: fixed;\n  top: calc(50% - 24px);\n  left: calc(50% - 24px); }\n\n@-webkit-keyframes rotating {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes rotating {\n  100% {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n.spinner {\n  border-radius: 50%;\n  width: 30px;\n  height: 30px;\n  border: 4px solid rgba(243, 243, 243, 0.1);\n  border-top: 4px solid #fff;\n  -webkit-animation: rotating 1.2s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86);\n          animation: rotating 1.2s infinite cubic-bezier(0.785, 0.135, 0.15, 0.86); }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9hZGVyL0M6XFxsb2NhbGRpc2tcXG15d29ya1xcZHN1aXRlXFxjbGllbnQvc3JjXFxhcHBcXGxvYWRlclxcbG9hZGVyLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksZ0JBQWU7RUFDZixPQUFNO0VBQ04sVUFBUztFQUNULFFBQU87RUFDUCxTQUFRO0VBQ1IsdUNBQXNDLEVBQ3ZDOztBQUNEO0VBQ0UsZ0JBQWU7RUFDZixzQkFBcUI7RUFDckIsdUJBQXFCLEVBQ3RCOztBQUlEO0VBQ0k7SUFDSSxrQ0FBeUI7WUFBekIsMEJBQXlCLEVBQUEsRUFBQTs7QUFGakM7RUFDSTtJQUNJLGtDQUF5QjtZQUF6QiwwQkFBeUIsRUFBQSxFQUFBOztBQUlqQztFQUNJLG1CQUFrQjtFQUNsQixZQUFXO0VBQ1gsYUFBWTtFQUNaLDJDQUEwQztFQUMxQywyQkFBMEI7RUFDMUIsaUZBQXdFO1VBQXhFLHlFQUF3RSxFQUMzRSIsImZpbGUiOiJzcmMvYXBwL2xvYWRlci9sb2FkZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYmFja2Ryb3Age1xyXG4gICAgcG9zaXRpb246IGZpeGVkO1xyXG4gICAgdG9wOiAwO1xyXG4gICAgYm90dG9tOiAwO1xyXG4gICAgbGVmdDogMDtcclxuICAgIHJpZ2h0OiAwO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjU2OCk7XHJcbiAgfVxyXG4gIC5sb2FkZXItd3JhcHBlcntcclxuICAgIHBvc2l0aW9uOiBmaXhlZDtcclxuICAgIHRvcDogY2FsYyg1MCUgLSAyNHB4KTtcclxuICAgIGxlZnQ6Y2FsYyg1MCUgLSAyNHB4KTtcclxuICB9XHJcbiAgXHJcbiAgXHJcbiAgXHJcbiAgQGtleWZyYW1lcyByb3RhdGluZyB7XHJcbiAgICAgIDEwMCUge1xyXG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcclxuICAgICAgfVxyXG4gIH1cclxuICBcclxuICAuc3Bpbm5lciB7XHJcbiAgICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcclxuICAgICAgd2lkdGg6IDMwcHg7XHJcbiAgICAgIGhlaWdodDogMzBweDtcclxuICAgICAgYm9yZGVyOiA0cHggc29saWQgcmdiYSgyNDMsIDI0MywgMjQzLCAwLjEpO1xyXG4gICAgICBib3JkZXItdG9wOiA0cHggc29saWQgI2ZmZjtcclxuICAgICAgYW5pbWF0aW9uOiByb3RhdGluZyAxLjJzIGluZmluaXRlIGN1YmljLWJlemllcigwLjc4NSwgMC4xMzUsIDAuMTUsIDAuODYpO1xyXG4gIH0iXX0= */"

/***/ }),

/***/ "./src/app/loader/loader.component.ts":
/*!********************************************!*\
  !*** ./src/app/loader/loader.component.ts ***!
  \********************************************/
/*! exports provided: LoaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderComponent", function() { return LoaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _loader_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loader.service */ "./src/app/loader/loader.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoaderComponent = /** @class */ (function () {
    function LoaderComponent(loaderService) {
        this.loaderService = loaderService;
    }
    LoaderComponent.prototype.ngOnInit = function () {
    };
    Object.defineProperty(LoaderComponent.prototype, "loaderEnabled", {
        get: function () {
            return this.loaderService.loaderEnabled;
        },
        enumerable: true,
        configurable: true
    });
    LoaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-loader',
            template: __webpack_require__(/*! ./loader.component.html */ "./src/app/loader/loader.component.html"),
            styles: [__webpack_require__(/*! ./loader.component.scss */ "./src/app/loader/loader.component.scss")]
        }),
        __metadata("design:paramtypes", [_loader_service__WEBPACK_IMPORTED_MODULE_1__["LoaderService"]])
    ], LoaderComponent);
    return LoaderComponent;
}());



/***/ }),

/***/ "./src/app/loader/loader.service.ts":
/*!******************************************!*\
  !*** ./src/app/loader/loader.service.ts ***!
  \******************************************/
/*! exports provided: LoaderService, LoaderEnabled */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderService", function() { return LoaderService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoaderEnabled", function() { return LoaderEnabled; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LoaderService = /** @class */ (function () {
    function LoaderService() {
    }
    LoaderService_1 = LoaderService;
    Object.defineProperty(LoaderService.prototype, "loaderEnabled", {
        get: function () {
            return LoaderService_1.loaderEnabled;
        },
        enumerable: true,
        configurable: true
    });
    LoaderService.showLoader = function () {
        LoaderService_1.loaderEnabled = true;
    };
    LoaderService.hideLoader = function () {
        LoaderService_1.loaderEnabled = false;
    };
    var LoaderService_1;
    LoaderService = LoaderService_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], LoaderService);
    return LoaderService;
}());

/*  --Decorator LoaderEnabled--
Use @LoaderEnabled() above any method that returns an observable.
This would inject few lines to show the loader before actually invoking
the caller function and also adds a map and catch section to hide the
loader once the subscription is complete.
*/
function LoaderEnabled() {
    return function (target, propertyKey, descriptor) {
        var original = descriptor.value;
        descriptor.value = function () {
            LoaderService.showLoader();
            //console.log('**InjectedCode-begin--LOADERON', propertyKey);
            return original.apply(this, arguments)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(function (res) {
                //console.log('**InjectedCode-map--LOADEROFF', propertyKey);
                LoaderService.hideLoader();
                return res;
            }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["catchError"])(function (err) {
                //console.log('**InjectedCode-err--LOADEROFF', propertyKey);
                LoaderService.hideLoader();
                throw err;
            }));
        };
        return descriptor;
    };
}
/*
export function LoaderEnabled(): MethodDecorator {

  return function ( target: any, propertyKey: string, descriptor: PropertyDescriptor ) {
    const original = descriptor.value;
    descriptor.value = function () {
    if (this.timer) {
        clearTimeout(this.timer);
      }
       this.timer = setTimeout(() => {
         LoaderService.showLoader();
       }, 200);
      return original.apply(this, arguments)
        .pipe(
          map((res) => {
            clearTimeout(this.timer);
            console.log('**InjectedCode-map--LOADEROFF', propertyKey);
            LoaderService.hideLoader();
            return res;
          }),
          catchError((err) => {
            clearTimeout(this.timer);
            console.log('**InjectedCode-err--LOADEROFF', propertyKey);
            LoaderService.hideLoader();
            throw err;
          })
        );
  };
  return descriptor;
};

} */ 


/***/ }),

/***/ "./src/app/services/bootstrap.service.ts":
/*!***********************************************!*\
  !*** ./src/app/services/bootstrap.service.ts ***!
  \***********************************************/
/*! exports provided: BootstrapService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BootstrapService", function() { return BootstrapService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BootstrapService = /** @class */ (function () {
    function BootstrapService(http) {
        this.http = http;
    }
    BootstrapService.prototype.load = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(src_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].urls.getRoute).subscribe(function (data) {
                _this.routes = data;
                resolve(true);
            });
        });
    };
    BootstrapService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], BootstrapService);
    return BootstrapService;
}());



/***/ }),

/***/ "./src/app/services/http-interceptor.service.ts":
/*!******************************************************!*\
  !*** ./src/app/services/http-interceptor.service.ts ***!
  \******************************************************/
/*! exports provided: JwtHttpInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "JwtHttpInterceptor", function() { return JwtHttpInterceptor; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./user.service */ "./src/app/services/user.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var JwtHttpInterceptor = /** @class */ (function () {
    function JwtHttpInterceptor(userservice) {
        this.userservice = userservice;
    }
    JwtHttpInterceptor.prototype.logout = function () {
        localStorage.removeItem('isLoggedin');
        localStorage.removeItem('userdetails');
        this.userservice.user = {};
        location.reload(true);
    };
    JwtHttpInterceptor.prototype.intercept = function (req, next) {
        //console.log('--LoaderHttpInterceptor')
        //LoaderService.showLoader();
        var _this = this;
        if (this.userservice.user && this.userservice.user.token != '') {
            req = req.clone({
                setHeaders: {
                    Authorization: "Bearer " + this.userservice.user.token
                }
            });
        }
        return next.handle(req).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (res) {
            return res;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["catchError"])(function (error) {
            if (error.status == 400 && error.error.message == "Invalid token") {
                _this.logout();
            }
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(error);
        }));
    };
    JwtHttpInterceptor = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_user_service__WEBPACK_IMPORTED_MODULE_3__["UserService"]])
    ], JwtHttpInterceptor);
    return JwtHttpInterceptor;
}());



/***/ }),

/***/ "./src/app/services/user.service.ts":
/*!******************************************!*\
  !*** ./src/app/services/user.service.ts ***!
  \******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../environments/environment */ "./src/environments/environment.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.url = _environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].urls.getUser;
        console.log('user called');
        var session_user = localStorage.getItem('userdetails');
        this.user = JSON.parse(session_user);
    }
    UserService.prototype.getMethod = function () {
        return this.http.get(this.url);
    };
    UserService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./src/app/shared/guard/auth.guard.ts":
/*!********************************************!*\
  !*** ./src/app/shared/guard/auth.guard.ts ***!
  \********************************************/
/*! exports provided: AuthGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthGuard", function() { return AuthGuard; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = /** @class */ (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (localStorage.getItem('isLoggedin')) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_1__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var wind = window.location;
var apiUrl = wind.protocol + '//' + wind.hostname + ':3000/api';
//let apiUrl = 'http://'+wind.hostname+':3000/api';
var environment = {
    production: false,
    urls: {
        //auth
        authenticate: apiUrl + '/auth/authenticate',
        captchaValidation: apiUrl + '/auth/token_validate',
        //dashboard
        getDashboardGrids: apiUrl + '/dashboard/grids',
        getCreditList: apiUrl + '/dashboard/totalCredits',
        //payments
        getPayment: apiUrl + '/payment/list',
        postPayment: apiUrl + '/payment/create',
        getOutstanding: apiUrl + '/payment/getOutstanding',
        deletePayment: apiUrl + '/payment/delete',
        updatePayment: apiUrl + '/payment/update',
        getDetailPayment: apiUrl + '/payment/detailed-payment',
        //deliveries
        getDeliveries: apiUrl + '/deliveries/list',
        getConsolidatedOrderList: apiUrl + '/deliveries/consolidatelist',
        //reports
        getRecentSales: apiUrl + '/reports/sales',
        getRecentPurchase: apiUrl + '/reports/purchase',
        getReportProductList: apiUrl + '/reports/reportProductList',
        getConsolidatedSaleList: apiUrl + '/sales/consolidatelist',
        //Leads
        getLeads: apiUrl + '/leads/list',
        postOrder: apiUrl + '/order/create',
        searchOrder: apiUrl + '/order/searchOrders',
        postOrderSales: apiUrl + '/order/placeOrders',
        loadTransactions: apiUrl + '/leads/getTransactions',
        //print sheet module
        leadReport: apiUrl + '/leads/lead_report',
        salesReport: apiUrl + '/leads/sales_report',
        //masters
        getRoute: apiUrl + '/route/list',
        postRoute: apiUrl + '/route/create',
        deleteRoute: apiUrl + '/route/delete/',
        getCustomer: apiUrl + '/customer/list',
        postCustomer: apiUrl + '/customer/create',
        deleteCustomer: apiUrl + '/customer/delete',
        getVendor: apiUrl + '/vendor/list',
        postVendor: apiUrl + '/vendor/create',
        deleteVendor: apiUrl + '/vendor/delete',
        getProduct: apiUrl + '/product/list',
        postProduct: apiUrl + '/product/create',
        updateProduct: apiUrl + '/product/update',
        deleteProduct: apiUrl + '/product/delete',
        getUser: apiUrl + '/user/list',
        postUser: apiUrl + '/user/create',
        deleteUser: apiUrl + '/user/delete',
        getRateList: apiUrl + '/rate/rate_list',
        getRate: apiUrl + '/rate/list',
        postRate: apiUrl + '/rate/create',
        deleteRate: apiUrl + '/rate/delete',
        updateBulkRate: apiUrl + '/rate/bulk_update',
        getRateProducts: apiUrl + '/rate/products',
        getRateMapping: apiUrl + '/ratemapping/list',
        postRateMapping: apiUrl + '/ratemapping/create',
        deleteRateMapping: apiUrl + '/ratemapping/delete',
        getSingleRate: apiUrl + '/ratemapping/rate',
        getMappingCustomers: apiUrl + '/ratemapping/customers',
        getRateByCustomer: apiUrl + '/ratemapping/getRateByCustomer',
        getRateTypeByCustomer: apiUrl + '/ratemapping/getRateTypeByCustomer',
        updateCustomer: apiUrl + '/customer/update',
        //transactions
        getSales: apiUrl + '/sales/list',
        postSales: apiUrl + '/sales/create',
        updateSales: apiUrl + '/sales/update',
        deleteSales: apiUrl + '/sales/delete',
        getPurchase: apiUrl + '/purchase/list',
        postPurchase: apiUrl + '/purchase/create',
        getExpense: apiUrl + '/expense/list',
        postExpense: apiUrl + '/expense/create',
        getDamage: apiUrl + '/damage/list',
        postDamage: apiUrl + '/damage/create',
        postOb: apiUrl + '/ob/create',
        getOb: apiUrl + '/ob/list',
        //personalize
        customerSort: apiUrl + '/personalize/customer',
        productSort: apiUrl + '/personalize/product',
        modifyIndex: apiUrl + '/personalize/modifyIndex',
        //remainders
        //alerts
        //discounts
        discountList: apiUrl + '/discount/list',
        discountCreate: apiUrl + '/discount/create',
        discountUpdate: apiUrl + '/discount/update',
        discountTrans: apiUrl + '/discount/getDiscountTrans',
        //printer
        printInvoices: apiUrl + '/printer/invoices',
        //grade mngmt
        getGradeMngtList: apiUrl + '/grade/mngmtList',
        saveGradeMngt: apiUrl + '/grade/mngmtCreate',
        gradeUpdate: apiUrl + '/grade/update',
        getGradeTransList: apiUrl + '/grade/transList',
        saveGradeTrans: apiUrl + '/grade/transSave',
    }
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! C:\localdisk\mywork\dsuite\client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map