export interface RateMapping {
    prod_name: string,
    alias: string,
    brand_name: string,
    category: string,
    sub_category: string,
    vendor_id: string,
    is_active?: string;
    is_delete?: string;
    createdAt?: string;
    createdBy?: string;   
    updatedAt?: string;
    updatedBy?: string;
    _id?: string;
    __v?: string;
    rates: Rate[];
}

export interface Rate {
    createdBy?: string;
    customer_id?: string;
    prod_id?: string;
    type?: string;
    _id?: string;
}