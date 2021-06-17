import { User } from "./user";
import { RouteObj } from "./route";

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
    routes: RouteObj;
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
