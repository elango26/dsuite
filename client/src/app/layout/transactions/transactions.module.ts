import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatTableModule, MatDialogModule, MatPaginatorModule, MatIconModule
} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { SalesComponent } from './sales/sales.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { DamagesComponent } from './damages/damages.component';
import { DsuiteModule } from '../common/dsuite.module';
import { OpeningbalanceComponent } from './openingbalance/openingbalance.component';
import { MastersModule } from '../masters/masters.module';

@NgModule({
  declarations: [SalesComponent, PurchaseComponent, ExpensesComponent, DamagesComponent, OpeningbalanceComponent],
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
    MatDialogModule,
    MatPaginatorModule,
    MatGridListModule,
    MatIconModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}) ,
    DsuiteModule,
    MastersModule
  ],
  //entryComponents: [CommonModalComponent]
})
export class TransactionsModule { }
