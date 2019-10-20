import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {
  MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatTableModule, MatDialogModule, MatPaginatorModule, MatTooltipModule, MatIconModule
} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';

import { PersonalizeRoutingModule } from './personalize-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CustomersComponent, ProductsComponent],
  imports: [
    CommonModule,
    PersonalizeRoutingModule,
    DragDropModule, 
    MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
    MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
    MatSliderModule, MatSlideToggleModule, MatTableModule, MatDialogModule, MatPaginatorModule, MatTooltipModule, MatIconModule,
    MatSnackBarModule, MatButtonModule, MatExpansionModule, MatChipsModule,
    FormsModule     
  ]
})
export class PersonalizeModule { }
