import { User } from "./user";
import { Route } from "@angular/compiler/src/core";

export interface Customer {
    customer_id:string;
    customerName: string;
    alias: string;
    firstName: string;
    lastName: string;
    contactNo: number;
    contactNo1?: number;
    address: string;
    city: string;
    pincode: number;
    route: string;
    routes: Route;
    index: number;
    is_active?: string;
    is_delete?: string;
    createdAt?: string;
    createdBy?: string;   
    updatedAt?: string;
    updatedBy?: string;
    _id?: string;
    __v?: string;
}
