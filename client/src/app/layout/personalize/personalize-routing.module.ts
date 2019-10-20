import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'customers'
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonalizeRoutingModule { }
