export const CATEGORY = ['Milk','Curd','Paneer','Icecream','Dairy','Drinks','BM'];
export const SUBCATEGORY = ['SM','FCM','TM','Cup','Pouch','Others','COW'];
export const BRANDS = ['AROKYA','HATSUN'];
export const EXPENSE_TYPE = ['Fuel','Snacks','Stationery','Automobile','EB','Compensation','Others'];
export const PAYMENT_TYPE = ['CASH','WALLET'];
export const DEFAULT_RATE_TYPE = 'Retail';
export class RATE_TYPE { 
    public static get rate_type():any[]{
        return ['Retail','Purchase','Wholesale','Silver','Gold','Diamond']
    }
};

export class DISCOUNT_TYPE { 
    public static get discount_type():any[]{
        return ['Price','Percentage','Units']
    }
};