import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { DeliveriesComponent, DeliveriesPrintComponent } from './deliveries/deliveries.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatTableModule, MatDialogModule, MatPaginatorModule, MatTooltipModule, MatIconModule
} from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips';
import { DsuiteModule } from '../common/dsuite.module';
import { ConsViewComponent, RoundPipe } from './deliveries/cons-view/cons-view.component';

@NgModule({
  declarations: [DeliveriesComponent,DeliveriesPrintComponent, ConsViewComponent, RoundPipe],
  imports: [
    CommonModule,
    OrdersRoutingModule,
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
    FlexLayoutModule.withConfig({addFlexToParent: false}),
    MatExpansionModule,
    MatChipsModule,
    MatTooltipModule,
    MatIconModule,
    MatSortModule,
    DsuiteModule
  ],
  providers: [DatePipe],
  entryComponents: [DeliveriesPrintComponent,ConsViewComponent]
})
export class OrdersModule { }
