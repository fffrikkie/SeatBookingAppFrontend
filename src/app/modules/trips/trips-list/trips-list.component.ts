import { Component, OnDestroy } from '@angular/core';
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
import { _TableColumnConfig } from '../../../shared/models/table-column-config.interface';
import { _TableColumnTypes } from '../../../shared/models/table-column-types.enum';
import { _TableActionResponse } from '../../../shared/models/table-action-response.interface';

@Component({
  selector: 'app-trips-list',
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.css',
})
export class TripsListComponent implements OnDestroy {
  reload$: BehaviorSubject<boolean> = new BehaviorSubject(true);
  destroy$: Subject<null> = new Subject();

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
      attributeValueName: 'availableDisplay',
      type: _TableColumnTypes.colourDisplay,
    },
    {
      columnName: '',
      attributeValueName: 'viewBookings',
      type: _TableColumnTypes.action,
      tooltip: 'View Trip Bookings',
      icon: 'visibility',
      iconColour: 'black',
    },
  ];
  dataSource?: _Trip[];
  loading: boolean = true;

  tripsData$: Observable<_Trip[]> = this.reload$.pipe(
    switchMap(() =>
      this._tripsService.getTrips().pipe(
        takeUntil(this.destroy$),
        map((trips) => {
          this.dataSource = trips.map((trip) => {
            trip.availableDisplay = Math.round(
              (trip.totalAvailableSeats / trip.totalSeats) * 100
            );
            return trip;
          });
          return this.dataSource;
        }),
        finalize(() => (this.loading = false))
      )
    )
  );

  constructor(private _tripsService: TripsService, private _router: Router) {}

  viewTripBookings(tripId: string): void {
    this._router.navigate(['bookings'], {
      state: { tripId: tripId },
    });
  }

  handleActionClick(clickedAction: _TableActionResponse<_Trip>): void {
    switch (clickedAction.action) {
      case 'viewBookings':
        this.viewTripBookings(clickedAction.element.id);
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
