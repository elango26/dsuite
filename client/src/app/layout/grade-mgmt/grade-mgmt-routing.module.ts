import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagementComponent } from './management/management.component';
import { TransactionsComponent } from './transactions/transactions.component';

const routes: Routes = [
  {
    path: '',
    pathMatch:'prefix',
    redirectTo: 'deliveries'
  },
  {
    path: 'management',
    component: ManagementComponent
  },
  {
    path: 'transaction',
    component: TransactionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeMgmtRoutingModule { }
