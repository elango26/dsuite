import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DsuiteModule } from '../common/dsuite.module';
import { PaymentModule } from '../payment/payment.module';

import { LeadsRoutingModule } from './leads-routing.module';
import { CustomersComponent, SheetPrintComponent } from './customers/customers.component';
import { CustomersViewComponent } from './customers/customers-view.component';


import { MatTableModule, MatButtonModule } from '@angular/material';
import {
  MatPaginatorModule, MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatIconModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomersComponent, CustomersViewComponent, SheetPrintComponent],
  imports: [
    CommonModule,
    FormsModule,
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
    PaymentModule,
    MatButtonModule
  ],
  entryComponents: [SheetPrintComponent]
})
export class LeadsModule { }
