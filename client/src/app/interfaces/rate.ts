import { Product } from "./product";

export interface priceObj {
    id:string;
    price:number;
    tax:number;
}

export interface Rate {
    product:Product;
    purchase:priceObj;
    retail:priceObj;
    wholesale1:priceObj;
    wholesale2:priceObj;
}
