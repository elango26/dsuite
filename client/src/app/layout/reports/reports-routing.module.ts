import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecentsalesComponent } from './recentsales/recentsales.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recentsales'
  },
  {
      path: 'recentsales',
      component: RecentsalesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
