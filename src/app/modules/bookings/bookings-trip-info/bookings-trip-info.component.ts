import { Component, Input } from '@angular/core';
import { _Trip } from '../../../api/trips/models/trips.interface';
import { _Vehicle } from '../../../api/vehicles/models/vehicles.interface';

@Component({
  selector: 'app-bookings-trip-info',
  templateUrl: './bookings-trip-info.component.html',
  styleUrl: './bookings-trip-info.component.css',
})
export class BookingsTripInfoComponent {
  @Input() tripInfo?: _Trip;
  @Input() vehicleInfo?: _Vehicle;
}
