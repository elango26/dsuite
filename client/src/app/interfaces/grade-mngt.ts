import { RouteObj } from "./route";

export interface GradeMngt {
    emptyName:string;
    count:number;
    entryType:string;
    description:string;
    is_active?: string;
    is_delete?: string;
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
}

export interface GradeTrans {
    _id?:string;
    customer_id:string;
    emptyName?:string;
    count:number;
    transaction:string;
    description:string;
    is_active?: string;
    is_delete?: string;
    createdAt?: string;
    createdBy?: string;
    updatedAt?: string;
    updatedBy?: string;
}

export interface CustomerGradeTrans {
    delivered: GradeTrans;
    received: GradeTrans;
    balance: any;
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
