import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeadsRoutingModule } from './leads-routing.module';
import { CustomersComponent } from './customers/customers.component';


import { MatTableModule } from '@angular/material';
import {
  MatPaginatorModule, MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule
} from '@angular/material';

@NgModule({
  declarations: [CustomersComponent],
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
    MatSlideToggleModule
  ]
})
export class LeadsModule { }
