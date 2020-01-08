import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsuiteModule } from '../common/dsuite.module';
import { PaymentModule } from '../payment/payment.module';

import { LeadsRoutingModule } from './leads-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { CustomersViewComponent } from './customers/customers-view.component';


import { MatTableModule } from '@angular/material';
import {
  MatPaginatorModule, MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatIconModule
} from '@angular/material';

@NgModule({
  declarations: [CustomersComponent, CustomersViewComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    LeadsRoutingModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSliderModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatIconModule,
    DsuiteModule,
    PaymentModule
  ]
})
export class LeadsModule { }
