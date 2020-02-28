import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { RecentsalesComponent } from './recentsales/recentsales.component';

import { MatTableModule } from '@angular/material';
import {
  MatPaginatorModule, MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatIconModule, MatButtonModule
} from '@angular/material';
import { RecentPurchaseComponent } from './recent-purchase/recent-purchase.component';
import { RecentdamagesComponent } from './recentdamages/recentdamages.component';
import { EditTemplateComponent } from '../common/edit-template/edit-template.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [RecentsalesComponent, RecentPurchaseComponent, RecentdamagesComponent, EditTemplateComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
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
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatButtonModule
  ]
})
export class ReportsModule { }
