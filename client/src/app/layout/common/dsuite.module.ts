import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdtableComponent } from './prodtable/prodtable.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule
} from '@angular/material';

@NgModule({
  declarations: [ProdtableComponent],
  imports: [
    CommonModule,
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
    FlexLayoutModule.withConfig({addFlexToParent: false}) 
  ],
  exports: [ProdtableComponent],
  entryComponents: [ProdtableComponent],
})
export class DsuiteModule { }
