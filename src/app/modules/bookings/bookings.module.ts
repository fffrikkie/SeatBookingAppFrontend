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
import { SeatBookingComponent } from './seat-booking/seat-booking.component';
import { BookingsRoutingModule } from './bookings-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { BookingsListComponent } from './bookings-list/bookings-list.component';
import { BookingsRegistrationComponent } from './bookings-registration/bookings-registration.component';
import { BookingsTripInfoComponent } from './bookings-trip-info/bookings-trip-info.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BookingsService } from './bookings.service';

@NgModule({
  declarations: [
    SeatBookingComponent,
    BookingsListComponent,
    BookingsRegistrationComponent,
    BookingsTripInfoComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    BookingsRoutingModule,
  ],
})
export class BookingsModule {}
