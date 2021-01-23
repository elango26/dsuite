import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentRoutingModule } from './payment-routing.module';
import { PaymentsComponent } from './payments/payments.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA, MatDialogRef
} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { AppMaterialModule } from '../../app-material/app-material.module';

@NgModule({
  declarations: [PaymentsComponent],
  imports: [
    CommonModule,
    AppMaterialModule,
    PaymentRoutingModule,
    FormModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}) 
  ],
  entryComponents: [PaymentsComponent],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    // ...
  ]
})
export class PaymentModule { }
