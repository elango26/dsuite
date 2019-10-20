export interface Expense {
    _id:string;
    expense_id:string;
    type:string;
    description:string;
    amount:number;
    is_active:string;
    is_delete:string;
    createdBy:string;
    updateBy:string;
}
