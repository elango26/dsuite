import { Product } from "./product";

export interface priceObj {
    id:string;
    price:number;
    tax:number;
}

export interface Rate {
    effective_date: string;
    id: string;
    is_active: string;
    price: number;
    tax: number;
}
