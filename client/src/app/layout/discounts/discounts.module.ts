import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountsRoutingModule } from './discounts-routing.module';
import { CategoryComponent } from './category/category.component';
import { MappingComponent } from './mapping/mapping.component';
import { TransactionsComponent } from './transactions/transactions.component';

@NgModule({
  declarations: [CategoryComponent, MappingComponent, TransactionsComponent],
  imports: [
    CommonModule,
    DiscountsRoutingModule
  ]
})
export class DiscountsModule { }
