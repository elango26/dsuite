import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { RecentsalesComponent } from './recentsales/recentsales.component';

import { MatTableModule } from '@angular/material';
import {
  MatPaginatorModule, MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule
} from '@angular/material';
import { RecentPurchaseComponent } from './recent-purchase/recent-purchase.component';

@NgModule({
  declarations: [RecentsalesComponent, RecentPurchaseComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatSlideToggleModule
  ]
})
export class ReportsModule { }
