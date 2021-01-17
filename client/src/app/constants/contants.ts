export const CATEGORY = ['Milk','Curd','Paneer','BM','Dairy','Drinks','Icecream'];
export const SUBCATEGORY = ['SM','FCM','TM','Cup','Pouch','Others','COW'];
export const BRANDS = ['AROKYA','HATSUN'];
export const MEASURE_UNIT = [{'key':'KG','value':'KILOGRAM'},{'key':'ML','value':'MILLILITRE'}];
export const EXPENSE_TYPE = ['Fuel','Snacks','Stationery','Automobile','EB','Compensation','Others'];
export const PAYMENT_TYPE = ['CASH','WALLET','CREDIT'];
export const DEFAULT_RATE_TYPE = 'Retail';
export const DEFAULT_PAYMENT_TYPE = 'CASH';
export class RATE_TYPE { 
    public static get rate_type():any[]{
        return ['Retail','Purchase','Wholesale','Silver','Gold','Diamond']
    }
};

export class DISCOUNT_TYPE { 
    public static get discount_type():any[]{
        return ['Price','Percentage','P2P'];
        //P2P : Product to product
    }
};