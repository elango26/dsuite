import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { PrintLayoutComponent } from './print-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PrintLayoutComponent,
    children:[
      {
        path: '',
        redirectTo: 'invoice'
      },
      {
        path: 'invoice',
        component: InvoiceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintLayoutRoutingModule { }
