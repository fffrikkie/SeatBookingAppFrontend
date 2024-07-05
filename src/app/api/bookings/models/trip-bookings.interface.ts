import { _Trip } from '../../trips/models/trips.interface';
import { _Vehicle } from '../../vehicles/models/vehicles.interface';
import { _Booking } from './bookings.interface';

export interface _TripBookings {
  tripInfo: _Trip;
  vehicleInfo: _Vehicle;
  bookings: _Booking[];
}
