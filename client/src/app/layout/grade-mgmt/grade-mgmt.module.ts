import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradeMgmtRoutingModule } from './grade-mgmt-routing.module';
import { ManagementComponent } from './management/management.component';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [ManagementComponent, TransactionsComponent],
  imports: [
    CommonModule,
    GradeMgmtRoutingModule
  ]
})
export class GradeMgmtModule { }
