import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookingsApiService } from '../../api/bookings/bookings-api.service';
import { _Booking } from '../../api/bookings/models/bookings.interface';
import { _TripBookings } from '../../api/bookings/models/trip-bookings.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingsService {
  constructor(private _bookingsApiService: BookingsApiService) {}

  getTripBookings(tripId: string): Observable<_TripBookings> {
    return this._bookingsApiService.getTripBookings(tripId);
  }

  registerTripBooking(booking: Partial<_Booking>): Observable<string> {
    return this._bookingsApiService.registerTripBooking(booking);
  }

  updateBooking(booking: Partial<_Booking>): Observable<string> {
    return this._bookingsApiService.updateBooking(booking);
  }

  deleteBooking(bookingId: string): Observable<string> {
    return this._bookingsApiService.deleteBooking(bookingId);
  }
}
