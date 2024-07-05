import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { _Booking } from './models/bookings.interface';
import { _TripBookings } from './models/trip-bookings.interface';

@Injectable({
  providedIn: 'root',
})
export class BookingsApiService {
  constructor(private _httpClient: HttpClient) {}

  getTripBookings(tripId: string): Observable<_TripBookings> {
    return this._httpClient.get<_TripBookings>(
      `${environment.apiEndpoint}/Booking/GetTripBookings?tripId=${tripId}`
    );
  }

  registerTripBooking(booking: Partial<_Booking>): Observable<string> {
    return this._httpClient.post<string>(
      `${environment.apiEndpoint}/Booking/RegisterTripBooking`,
      booking
    );
  }

  updateBooking(booking: Partial<_Booking>): Observable<string> {
    return this._httpClient.patch<string>(
      `${environment.apiEndpoint}/Booking/UpdateBooking/${booking.id}`,
      booking
    );
  }

  deleteBooking(bookingId: string): Observable<string> {
    return this._httpClient.delete<string>(
      `${environment.apiEndpoint}/Booking/DeleteBooking/${bookingId}`
    );
  }
}
