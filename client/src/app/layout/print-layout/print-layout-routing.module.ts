import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { PrintLayoutComponent } from './print-layout.component';

const routes: Routes = [
  //{path:'',redirectTo:'printer'},
  {
    path: '',
    component: PrintLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintLayoutRoutingModule { }
