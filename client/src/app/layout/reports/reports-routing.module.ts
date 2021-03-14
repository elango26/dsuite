import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentsalesComponent } from './recentsales/recentsales.component';
import { RecentPurchaseComponent } from './recent-purchase/recent-purchase.component';
import { RecentdamagesComponent } from './recentdamages/recentdamages.component';
import { SalesViewComponent } from './sales-view/sales-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'sales'
  },
  {
    path: 'sales',
    component: SalesViewComponent
  },
  {
    path: 'recentsales',
    component: RecentsalesComponent
  },
  {
    path: 'recentpurchase',
    component: RecentPurchaseComponent
  },
  {
    path: 'recentdamages',
    component: RecentdamagesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
