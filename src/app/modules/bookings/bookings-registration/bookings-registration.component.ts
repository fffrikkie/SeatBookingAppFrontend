import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingsService } from '../bookings.service';
import { Subject, takeUntil } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bookings-registration',
  templateUrl: './bookings-registration.component.html',
  styleUrl: './bookings-registration.component.css',
})
export class BookingsRegistrationComponent implements OnDestroy {
  @Input() tripId!: string;
  @Output() bookingRegistered: EventEmitter<boolean> = new EventEmitter();
  destroy$: Subject<null> = new Subject();
  bookingInfoGroup: FormGroup = new FormGroup({
    travellerName: new FormControl('', Validators.required),
    numberOfSeatsBooked: new FormControl('', [
      Validators.required,
      Validators.min(1),
    ]),
  });

  constructor(
    private _bookingsService: BookingsService,
    private _snackbar: MatSnackBar
  ) {}

  submitBookingRegistration(): void {
    if (this.bookingInfoGroup.valid) {
      let newBooking = { tripId: this.tripId, ...this.bookingInfoGroup.value };
      this._bookingsService
        .registerTripBooking(newBooking)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this._snackbar.open('Successfully Registered Booking!', 'Dismiss', {
              duration: 2000,
              panelClass: 'success-snackbar',
            });
            this.bookingRegistered.emit(true);
          },
          error: (err) => {
            this._snackbar.open(err.error, 'Dismiss', {
              duration: 5000,
              panelClass: 'error-snackbar',
            });
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
