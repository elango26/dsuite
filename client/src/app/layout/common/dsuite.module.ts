import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ProdtableComponent } from './prodtable/prodtable.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatButtonModule,
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
    MatTabsModule,
    MatButtonModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}) 
  ],
  exports: [ProdtableComponent],
  entryComponents: [ProdtableComponent],
  providers: [DatePipe]
})
export class DsuiteModule { }
