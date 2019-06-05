// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
let apiUrl = 'http://localhost:3000/api';
export const environment = {
  production: false,
  urls:{
    //dashboard
    //payments
    //reports
    getRecentSales:apiUrl+'/reports/sales',
    getRecentPurchase:apiUrl+'/reports/purchase',

    //Leads
    getLeads:apiUrl+'/leads/list',

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
    deleteProduct:apiUrl+'/product/delete',
    getUser:apiUrl+'/user/list',
    postUser:apiUrl+'/user/create',
    deleteUser:apiUrl+'/user/delete',
    getRate:apiUrl+'/rate/list',
    postRate:apiUrl+'/rate/create',
    deleteRate:apiUrl+'/rate/delete',
    getRateProducts:apiUrl+'/rate/products', 
    getRateMapping:apiUrl+'/ratemapping/list', 
    postRateMapping:apiUrl+'/ratemapping/create', 
    deleteRateMapping:apiUrl+'/ratemapping/delete',
    getSingleRate:apiUrl+'/ratemapping/rate',
    getMappingCustomers:apiUrl+'/ratemapping/customers',
    
    //transactions
    getSales:apiUrl+'/sales/list',
    postSales:apiUrl+'/sales/create',
    getPurchase:apiUrl+'/purchase/list',
    postPurchase:apiUrl+'/purchase/create',
    getExpense:apiUrl+'/expense/list',
    postExpense:apiUrl+'/expense/create',
    getDamage:apiUrl+'/damage/list',
    postDamage:apiUrl+'/damage/create',
    //remainders
    //alerts
    
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
