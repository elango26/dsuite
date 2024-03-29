import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintLayoutRoutingModule } from './print-layout-routing.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { ReportComponent, RoundPipe } from './report/report.component';
import { PrintLayoutComponent } from './print-layout.component';

@NgModule({
  declarations: [InvoiceComponent, ReportComponent, PrintLayoutComponent, RoundPipe],
  imports: [
    CommonModule,
    PrintLayoutRoutingModule
  ]
})
export class PrintLayoutModule { }
