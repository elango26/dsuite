import { Customer } from "./customer";
export interface Payment {
    payment_id:string;
    payment_type: string;
    amount: number;
    customer: Customer[];
    createdAt?: string;
    createdBy?: string;   
    updatedAt?: string;
    updatedBy?: string;
}