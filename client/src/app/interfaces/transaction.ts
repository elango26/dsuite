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
    is_delivered?:boolean;
}

export interface Sales {
    customer_id:string,
    sale_date:Date,
    total_amount:number,
    details: ProdDescription[]
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
