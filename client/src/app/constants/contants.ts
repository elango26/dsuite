export const CATEGORY = ['MINERALS'];
export const SUBCATEGORY = ['BT'];
export const BRANDS = ['GANGAR'];
export const MEASURE_UNIT = [{'key':'ML','value':'MILLILITRE'}];
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