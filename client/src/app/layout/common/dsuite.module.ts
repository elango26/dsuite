import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ProdtableComponent } from './prodtable/prodtable.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule, MatButtonModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatIconModule
} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { SalesReportPopComponent } from './sales-report-pop/sales-report-pop.component';
//import { EditTemplateComponent } from './edit-template/edit-template.component';

@NgModule({
  declarations: [ProdtableComponent, SalesReportPopComponent],
  imports: [
    CommonModule,
    MatAutocompleteModule,
    FormModule,
    MatDialogModule,
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
    MatIconModule,
    FlexLayoutModule.withConfig({addFlexToParent: false}) 
  ],
  exports: [ProdtableComponent],
  entryComponents: [ProdtableComponent,SalesReportPopComponent],
  providers: [DatePipe]
})
export class DsuiteModule { }
