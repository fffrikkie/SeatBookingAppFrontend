import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { _Booking } from '../../../api/bookings/models/bookings.interface';
import { BookingsService } from '../bookings.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-bookings-list',
  templateUrl: './bookings-list.component.html',
  styleUrl: './bookings-list.component.css',
})
export class BookingsListComponent implements OnDestroy {
  @Input() bookingsList!: _Booking[];
  @Output() bookingDeleted: EventEmitter<boolean> = new EventEmitter();

  destroy$: Subject<null> = new Subject();

  currentUser: string = environment.loggedInUser;
  displayedColumns: string[] = [
    'travellerName',
    'numberOfSeatsBooked',
    'actions',
  ];

  constructor(
    private _bookingsService: BookingsService,
    private _snackbar: MatSnackBar
  ) {}

  deleteBooking(bookingId: string): void {
    this._bookingsService
      .deleteBooking(bookingId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this._snackbar.open('Successfully Delete Booking!', 'Dismiss', {
            duration: 2000,
            panelClass: 'success-snackbar',
          });
          this.bookingDeleted.emit(true);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
