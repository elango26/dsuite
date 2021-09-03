(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["payment-payment-module"],{

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


/***/ })

}]);
//# sourceMappingURL=payment-payment-module.js.map