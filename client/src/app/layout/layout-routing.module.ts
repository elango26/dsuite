import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'leads',
                loadChildren: './leads/leads.module#LeadsModule'
            },
            {
                path: 'transactions',
                loadChildren: './transactions/transactions.module#TransactionsModule'
            },
            {
                path: 'masters',
                loadChildren: './masters/masters.module#MastersModule'
            },
            {
                path: 'reports',
                loadChildren: './reports/reports.module#ReportsModule'
            },
            {
                path: 'payment',
                loadChildren: './payment/payment.module#PaymentModule'
            },
            {
                path: 'orders',
                loadChildren: './orders/orders.module#OrdersModule'
            },
            {
                path: 'personalize',
                loadChildren: './personalize/personalize.module#PersonalizeModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
