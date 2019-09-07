import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveriesComponent } from './deliveries/deliveries.component';

const routes: Routes = [
  {
    path: '',
    pathMatch:'prefix',
    redirectTo: 'deliveries'
  },
  {
    path: 'deliveries',
    component: DeliveriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
