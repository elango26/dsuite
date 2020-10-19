// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let wind = window.location;
let apiUrl = wind.protocol+'//'+wind.hostname+':3000/api';
export const environment = {
  production: true,
  urls:{

    //auth
    authenticate:apiUrl+'/auth/authenticate',
    captchaValidation: apiUrl+'/auth/token_validate',
    //dashboard
    getDashboardGrids:apiUrl+'/dashboard/grids',
    getCreditList:apiUrl+'/dashboard/totalCredits',
    //payments
    getPayment:apiUrl+'/payment/list',
    postPayment:apiUrl+'/payment/create',
    getOutstanding:apiUrl+'/payment/getOutstanding', // pass customer id
    //deliveries
    getDeliveries:apiUrl+'/deliveries/list',
    getConsolidatedOrderList:apiUrl+'/deliveries/consolidatelist',    

    //reports
    getRecentSales:apiUrl+'/reports/sales',
    getRecentPurchase:apiUrl+'/reports/purchase',
    getReportProductList:apiUrl+'/reports/reportProductList',

    //Leads
    getLeads:apiUrl+'/leads/list',
    postOrder:apiUrl+'/order/create',
    searchOrder:apiUrl+'/order/searchOrders',
    postOrderSales:apiUrl+'/order/placeOrders',
    loadTransactions:apiUrl+'/leads/getTransactions',
    //print sheet module
    leadReport:apiUrl+'/leads/lead_report',
    salesReport:apiUrl+'/leads/sales_report',

    //masters
    getRoute:apiUrl+'/route/list',
    postRoute:apiUrl+'/route/create',
    deleteRoute:apiUrl+'/route/delete/',
    getCustomer:apiUrl+'/customer/list',
    postCustomer:apiUrl+'/customer/create',
    deleteCustomer:apiUrl+'/customer/delete',
    getVendor:apiUrl+'/vendor/list',
    postVendor:apiUrl+'/vendor/create',
    deleteVendor:apiUrl+'/vendor/delete',
    getProduct:apiUrl+'/product/list',
    postProduct:apiUrl+'/product/create',
    updateProduct:apiUrl+'/product/update',
    deleteProduct:apiUrl+'/product/delete',
    getUser:apiUrl+'/user/list',
    postUser:apiUrl+'/user/create',
    deleteUser:apiUrl+'/user/delete',
    getRateList: apiUrl+'/rate/rate_list',
    getRate:apiUrl+'/rate/list',
    postRate:apiUrl+'/rate/create',
    deleteRate:apiUrl+'/rate/delete',
    updateBulkRate:apiUrl+'/rate/bulk_update',
    getRateProducts:apiUrl+'/rate/products', 
    getRateMapping:apiUrl+'/ratemapping/list', //removed
    postRateMapping:apiUrl+'/ratemapping/create', 
    deleteRateMapping:apiUrl+'/ratemapping/delete',
    getSingleRate:apiUrl+'/ratemapping/rate',
    getMappingCustomers:apiUrl+'/ratemapping/customers', //removed
    getRateByCustomer:apiUrl+'/ratemapping/getRateByCustomer',
    getRateTypeByCustomer:apiUrl+'/ratemapping/getRateTypeByCustomer',
    
    //transactions
    getSales:apiUrl+'/sales/list',
    postSales:apiUrl+'/sales/create',
    updateSales:apiUrl+'/sales/update',
    getPurchase:apiUrl+'/purchase/list',
    postPurchase:apiUrl+'/purchase/create',
    getExpense:apiUrl+'/expense/list',
    postExpense:apiUrl+'/expense/create',
    getDamage:apiUrl+'/damage/list',
    postDamage:apiUrl+'/damage/create',
    postOb:apiUrl+'/ob/create',
    getOb:apiUrl+'/ob/list',

    //personalize
    customerSort:apiUrl+'/personalize/customer',
    productSort:apiUrl+'/personalize/product',
    modifyIndex:apiUrl+'/personalize/modifyIndex',
    //remainders
    //alerts

    //discounts
    discountList:apiUrl+'/discount/list',
    discountCreate:apiUrl+'/discount/create',
    discountUpdate:apiUrl+'/discount/update',


    //printer
    printInvoices:apiUrl+'/printer/invoices',
    
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
