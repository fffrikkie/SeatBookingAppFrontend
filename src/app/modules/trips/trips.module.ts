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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripRegistrationComponent } from './trips-registration/trip-registration.component';
import { TripsRoutingModule } from './trips-routing.module';
import { TripsForVehicleComponent } from './trips-for-vehicle/trips-for-vehicle.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TripsEditComponent } from './trips-edit/trips-edit.component';
import { TripsListComponent } from './trips-list/trips-list.component';
import { SharedTableComponent } from '../../shared/components/table/shared-table.component';

@NgModule({
  declarations: [
    TripRegistrationComponent,
    TripsForVehicleComponent,
    TripsEditComponent,
    TripsListComponent,
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
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    TripsRoutingModule,
    SharedTableComponent,
  ],
})
export class TripsModule {}
