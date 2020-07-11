import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscountsRoutingModule } from './discounts-routing.module';
import { CategoryComponent } from './category/category.component';
import { MappingComponent } from './mapping/mapping.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AppMaterialModule } from '../../app-material/app-material.module';

@NgModule({
  declarations: [CategoryComponent, MappingComponent, TransactionsComponent],
  imports: [
    CommonModule,
    DiscountsRoutingModule,
    
    AppMaterialModule
  ]
})
export class DiscountsModule { }
