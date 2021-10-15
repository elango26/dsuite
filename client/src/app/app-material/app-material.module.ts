import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatPaginatorModule, MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatTableModule, MatDialogModule, MatTooltipModule, MatIconModule,
} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModalComponent } from './common-modal/common-modal.component';
import { ConfirmPopComponent } from './confirm-pop/confirm-pop.component';

@NgModule({
  declarations: [CommonModalComponent, ConfirmPopComponent],
  imports: [
    CommonModule,
    MatPaginatorModule, MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
    MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
    MatSliderModule, MatSlideToggleModule, MatTableModule, MatDialogModule, MatTooltipModule, MatIconModule,
    MatExpansionModule, MatChipsModule, MatSnackBarModule, FormModule, ReactiveFormsModule, MatTabsModule, FlexLayoutModule
  ],
  exports: [
    MatPaginatorModule, MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
    MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
    MatSliderModule, MatSlideToggleModule, MatTableModule, MatDialogModule, MatTooltipModule, MatIconModule,
    MatExpansionModule, MatChipsModule, MatSnackBarModule, FormModule, ReactiveFormsModule, CommonModule, MatTabsModule, FlexLayoutModule
  ],
  entryComponents: [CommonModalComponent, ConfirmPopComponent]
})
export class AppMaterialModule { }
