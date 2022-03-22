import { Product } from "./product";

export interface priceObj {
    id:string;
    price:number;
    tax:number;
}

export interface Rate {
    createdBy: string;
    effective_date: Date;
    is_active: string;
    localdate: string;
    price: number;
    prod_id: string;
    tax: number;
    type: string;
}
