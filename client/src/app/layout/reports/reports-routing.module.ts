import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentsalesComponent } from './recentsales/recentsales.component';
import { RecentPurchaseComponent } from './recent-purchase/recent-purchase.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recentsales'
  },
  {
      path: 'recentsales',
      component: RecentsalesComponent
  },
  {
      path: 'recentpurchase',
      component: RecentPurchaseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
