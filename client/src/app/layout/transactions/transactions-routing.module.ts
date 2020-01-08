import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesComponent } from './sales/sales.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { DamagesComponent } from './damages/damages.component';
import { OpeningbalanceComponent } from './openingbalance/openingbalance.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sales',
    pathMatch: 'full'
  },
  {
    path: 'sales',
    component: SalesComponent
  },
  {
    path: 'purchase',
    component: PurchaseComponent
  },
  {
    path: 'expenses',
    component: ExpensesComponent
  },
  {
    path: 'damages',
    component: DamagesComponent
  },
  {
    path: 'openingbalance',
    component: OpeningbalanceComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionsRoutingModule { }
