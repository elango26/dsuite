import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MastersRoutingModule } from './masters-routing.module';
import { CustomersComponent } from './customers/customers.component';

import {
  MatPaginatorModule, MatAutocompleteModule, MatButtonModule, MatCardModule, MatCheckboxModule, MatDatepickerModule,
  MatFormFieldModule, MatInputModule, MatNativeDateModule, MatRadioModule, MatSelectModule,
  MatSliderModule, MatSlideToggleModule, MatTableModule, MatDialogModule, MatTooltipModule,
} from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CommonModalComponent } from './common-modal/common-modal.component';
import { RoutesComponent } from './routes/routes.component';
import { VendorComponent } from './vendor/vendor.component';
import { UserComponent } from './user/user.component';
import { RateComponent } from './rate/rate.component';
import { ProductsComponent } from './products/products.component';
import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { CustomerMappingComponent } from './customer-mapping/customer-mapping.component';

@NgModule({
  declarations: [CustomersComponent, CommonModalComponent, RoutesComponent, VendorComponent, UserComponent, RateComponent, ProductsComponent, CustomModalComponent, CustomerMappingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MastersRoutingModule,
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
    MatButtonModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule
  ],
  entryComponents: [CommonModalComponent,CustomModalComponent]
})
export class MastersModule { }
