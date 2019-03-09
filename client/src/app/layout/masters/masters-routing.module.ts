import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { RoutesComponent } from './routes/routes.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'customers',
    pathMatch: 'full'
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'routes',
    component: RoutesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
