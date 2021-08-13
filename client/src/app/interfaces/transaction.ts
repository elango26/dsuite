export interface TransactionDesc {
    rate_type:string;
    prod_id:string;
    product_id:string;
    prod_quan:number;
    prod_tax:number;
    tax:number;
    prod_rate_per_unit:number;
    sub_amount:number;
    prod_name:string;
    discount_id?:string;
    is_delivered?:boolean;
    is_delete?:string;
    is_active?:string;
    _id?:string;
}

export interface Sales {
    customer_id:string;
    sale_date:Date;
    total_amount:number;
    payment_type:string;
    details: ProdDescription[];
    discounts?: DiscountTransaction[];
    roundOff:any;
}

export interface Purchase {
    vendor_id:string,
    purchase_date:Date,
    total_amount:number,
    details: ProdDescription[]
}

export interface Damage {
    customer_id:string,
    damage_date:Date,
    total_amount:number,
    details: ProdDescription[]
}

export interface ProdDescription {
    prod_id:string;
    product_id:string;
    prod_rate_per_unit:number;
    prod_quan:number;
    prod_tax:number;
    sub_amount:number;
    is_delivered?:boolean;
}

export interface DiscountTransaction {
    //trans_id:string;
    //sale_id:string;
    discount_id:string;
    prod_id:string;
    prod_count:number;
    total_amount:number;
    is_delete?:string;
    _id?:string;
}
