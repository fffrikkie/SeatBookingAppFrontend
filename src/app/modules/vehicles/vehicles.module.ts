import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleRegistrationComponent } from './vehicles-registration/vehicle-registration.component';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { MatTabsModule } from '@angular/material/tabs';
import { VehiclesOverviewComponent } from './vehicles-overview/vehicles-overview.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { VehiclesEditComponent } from './vehicles-edit/vehicles-edit.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedTableComponent } from '../../shared/components/table/shared-table.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    VehicleRegistrationComponent,
    VehiclesListComponent,
    VehiclesOverviewComponent,
    VehiclesEditComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSnackBarModule,
    MatSortModule,
    MatProgressBarModule,
    MatTableModule,
    MatTabsModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    VehiclesRoutingModule,
    SharedTableComponent,
  ],
})
export class VehiclesModule {}
