import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { MappingComponent } from './mapping/mapping.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'category'
  },
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'mapping',
    component: MappingComponent
  },
  {
    path: 'transactions',
    component: TransactionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DiscountsRoutingModule { }
