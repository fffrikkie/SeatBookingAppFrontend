import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  finalize,
  map,
  switchMap,
  takeUntil,
} from 'rxjs';
import { _Trip } from '../../../api/trips/models/trips.interface';
import { TripsService } from '../trips.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { _TableColumnConfig } from '../../../shared/models/table-column-config.interface';
import { _TableColumnTypes } from '../../../shared/models/table-column-types.enum';
import { _TableActionResponse } from '../../../shared/models/table-action-response.interface';

@Component({
  selector: 'app-trips-for-vehicle',
  templateUrl: './trips-for-vehicle.component.html',
  styleUrl: './trips-for-vehicle.component.css',
})
export class TripsForVehicleComponent implements OnDestroy {
  reload$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  destroy$: Subject<null> = new Subject();
  vehicleId?: string;
  vehicleDisplayName?: string;
  columnnConfig: _TableColumnConfig[] = [
    {
      columnName: 'From',
      attributeValueName: 'startDestination',
      type: _TableColumnTypes.text,
    },
    {
      columnName: 'To',
      attributeValueName: 'endDestination',
      type: _TableColumnTypes.text,
    },
    {
      columnName: 'Departure Date',
      attributeValueName: 'departureDateTime',
      type: _TableColumnTypes.date,
    },
    {
      columnName: 'Total Seats',
      attributeValueName: 'totalSeats',
      type: _TableColumnTypes.text,
    },
    {
      columnName: 'Available Seats',
      attributeValueName: 'totalAvailableSeats',
      type: _TableColumnTypes.text,
    },
    {
      columnName: '',
      attributeValueName: 'editTrip',
      type: _TableColumnTypes.action,
      tooltip: 'Edit Trip Details',
      icon: 'edit',
      iconColour: 'black',
    },
    {
      columnName: '',
      attributeValueName: 'viewBookings',
      type: _TableColumnTypes.action,
      tooltip: 'View Trip Bookings',
      icon: 'chrome_reader_mode',
      iconColour: 'green',
    },
    {
      columnName: '',
      attributeValueName: 'delete',
      type: _TableColumnTypes.action,
      tooltip: 'Delete Trip',
      icon: 'delete',
      iconColour: 'red',
    },
  ];
  dataSource?: _Trip[];
  loading: boolean = true;

  tripData$: Observable<_Trip[]> = this.reload$.pipe(
    switchMap(() =>
      this._tripsService.getVehicleTrips(this.vehicleId!).pipe(
        takeUntil(this.destroy$),
        map((trips) => {
          this.dataSource = trips;
          return this.dataSource;
        }),
        finalize(() => (this.loading = false))
      )
    )
  );

  constructor(
    private _tripsService: TripsService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {
    const state = this._router.getCurrentNavigation()?.extras.state;
    if (!state || !state?.['vehicleId']) this._router.navigate(['vehicles']);
    this.vehicleId = state?.['vehicleId'];
    this.vehicleDisplayName = state?.['vehicleDisplayName'];
  }

  updateTrip(tripDetails: _Trip): void {
    this._router.navigate(['trips/trips-edit'], {
      state: tripDetails,
    });
  }

  viewTripBookings(tripId: string): void {
    this._router.navigate(['bookings'], {
      state: { tripId: tripId, vehicleId: this.vehicleId },
    });
  }

  deleteTrip(tripId: string): void {
    this._tripsService
      .deleteTrip(tripId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this._snackbar.open('Successfully Deleted Vehicle!', 'Dismiss', {
            duration: 2000,
          });
          this.reload$.next(true);
        },
        error: (err) => {
          this._snackbar.open(err.error, 'Dismiss', {
            duration: 5000,
            panelClass: ['error-snackbar'],
          });
        },
      });
  }

  registerVehicleTrip(): void {
    this._router.navigate(['trips/trips-registration'], {
      state: { vehicleId: this.vehicleId },
    });
  }

  goBack(): void {
    this._router.navigate(['vehicles']);
  }

  handleActionClick(clickedAction: _TableActionResponse<_Trip>): void {
    switch (clickedAction.action) {
      case 'editTrip':
        this.updateTrip(clickedAction.element);
        break;
      case 'viewBookings':
        this.viewTripBookings(clickedAction.element.id);
        break;
      case 'delete':
        this.deleteTrip(clickedAction.element.id);
        break;

      default:
        break;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
