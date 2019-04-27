import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatTableModule
} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { SalesComponent } from './sales/sales.component';

@NgModule({
  declarations: [SalesComponent],
  imports: [
    CommonModule,
    TransactionsRoutingModule,
    MatAutocompleteModule,
    FormModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSliderModule,
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}) 
  ]
})
export class TransactionsModule { }
