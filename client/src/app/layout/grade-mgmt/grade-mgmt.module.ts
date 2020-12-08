import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradeMgmtRoutingModule } from './grade-mgmt-routing.module';
import { ManagementComponent } from './management/management.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AppMaterialModule } from 'src/app/app-material/app-material.module';
import { FormsModule  } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ManagementComponent, TransactionsComponent],
  imports: [
    CommonModule,
    GradeMgmtRoutingModule,
    AppMaterialModule,
    FormsModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}),
  ]
})
export class GradeMgmtModule { }
