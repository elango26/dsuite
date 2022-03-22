import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule, MatIconModule, MatTableModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppMaterialModule } from '../../app-material/app-material.module';

import { StatModule } from '../../shared/modules/stat/stat.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MatGridListModule,
        StatModule,
        MatCardModule,
        MatCardModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        FormModule,
        ReactiveFormsModule,
        AppMaterialModule,
        FlexLayoutModule.withConfig({addFlexToParent: false})
    ],
    providers: [DatePipe],
    declarations: [DashboardComponent]
})
export class DashboardModule {}
