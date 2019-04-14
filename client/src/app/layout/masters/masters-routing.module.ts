import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { RoutesComponent } from './routes/routes.component';
import { ProductsComponent } from './products/products.component';
import { VendorComponent } from './vendor/vendor.component';
import { UserComponent } from './user/user.component';
import { RateComponent } from './rate/rate.component';
import { CustomerMappingComponent } from './customer-mapping/customer-mapping.component';

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
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'vendors',
    component: VendorComponent
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'rates',
    component: RateComponent
  },
  {
    path: 'mapping',
    component: CustomerMappingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MastersRoutingModule { }
