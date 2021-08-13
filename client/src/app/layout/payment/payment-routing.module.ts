import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { PaymentsComponent } from './payments/payments.component';
import { ViewPaymentComponent } from './view-payment/view-payment.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'payments'
  },
  {
    path: 'payments',
    component: PaymentsComponent
  },
  {
    path: 'view',
    component: ViewPaymentComponent
  },
  {
    path: 'detail-view',
    component: DetailViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
