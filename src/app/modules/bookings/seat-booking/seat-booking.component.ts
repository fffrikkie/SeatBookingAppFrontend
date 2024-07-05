import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  BehaviorSubject,
  Observable,
  Subject,
  finalize,
  map,
  switchMap,
  takeUntil,
} from 'rxjs';
import { _TripBookings } from '../../../api/bookings/models/trip-bookings.interface';
import { BookingsService } from '../bookings.service';
import { _Booking } from '../../../api/bookings/models/bookings.interface';

@Component({
  selector: 'app-seat-booking',
  templateUrl: './seat-booking.component.html',
  styleUrl: './seat-booking.component.css',
})
export class SeatBookingComponent implements OnInit, OnDestroy {
  reload$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  destroy$: Subject<null> = new Subject();
  tripId?: string;
  vehicleId?: string;
  tripBookings?: _TripBookings;
  step: number = 0;

  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  dataSource?: _Booking[];
  loading: boolean = true;

  bookingsData$: Observable<_TripBookings> = this.reload$.pipe(
    switchMap(() =>
      this._bookingsService.getTripBookings(this.tripId!).pipe(
        takeUntil(this.destroy$),
        map((tripBookings) => {
          this.dataSource = tripBookings?.bookings;
          this.tripBookings = tripBookings;
          return tripBookings;
        }),
        finalize(() => (this.loading = false))
      )
    )
  );

  constructor(
    private _router: Router,
    private _bookingsService: BookingsService
  ) {
    const state = this._router.getCurrentNavigation()?.extras.state;
    if (!state || !state?.['tripId']) this._router.navigate(['trips']);

    this.tripId = state?.['tripId'];
    this.vehicleId = state?.['vehicleId'];
  }

  ngOnInit(): void {
    this.bookingsData$.subscribe();
  }

  goBack(): void {
    if (!this.vehicleId) this._router.navigate(['trips']);
    else
      this._router.navigate(['trips/trips-for-vehicle'], {
        state: { vehicleId: this.vehicleId },
      });
  }

  reload(): void {
    this.loading = true;
    this.reload$.next(true);
  }

  bookingRegistered(): void {
    this.step = 1;
    this.reload();
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
