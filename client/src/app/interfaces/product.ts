export interface Product {
    product_id:string;
    prod_name: string,
    alias: string,
    brand_name: string,
    category: string,
    sub_category: string,
    vendor_id: string,
    leads_view:string,
    retail_only:string,
    barcode:string,
    is_active?: string;
    is_delete?: string;
    createdAt?: string;
    createdBy?: string;   
    updatedAt?: string;
    updatedBy?: string;
    index:number;
    _id?: string;
    __v?: string;
}