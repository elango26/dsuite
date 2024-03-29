import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
console.log("leads loaded");
const routes: Routes = [
  {
    path: '',
    redirectTo: 'customers'
  },
  {
      path: 'customers',
      component: CustomersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeadsRoutingModule { }
