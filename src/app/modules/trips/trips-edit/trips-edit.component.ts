import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { TripsService } from '../trips.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { _Trip } from '../../../api/trips/models/trips.interface';

@Component({
  selector: 'app-trips-edit',
  templateUrl: './trips-edit.component.html',
  styleUrl: './trips-edit.component.css',
})
export class TripsEditComponent implements OnInit, OnDestroy {
  destroy$: Subject<null> = new Subject();
  trip?: _Trip;
  currDate: Date = new Date();
  tripInfoGroup: FormGroup = new FormGroup({
    id: new FormControl('', Validators.required),
    fromDestination: new FormControl('', Validators.required),
    toDestination: new FormControl('', Validators.required),
    departureDate: new FormControl('', Validators.required),
    departureTime: new FormControl('', Validators.required),
  });

  constructor(
    private _router: Router,
    private _tripsService: TripsService,
    private _snackbar: MatSnackBar
  ) {
    this.trip = this._router.getCurrentNavigation()?.extras.state as _Trip;
  }

  ngOnInit(): void {
    this.tripInfoGroup.get('id')?.patchValue(this.trip?.id);
    this.tripInfoGroup
      .get('fromDestination')
      ?.patchValue(this.trip?.startDestination);
    this.tripInfoGroup
      .get('toDestination')
      ?.patchValue(this.trip?.endDestination);
    this.tripInfoGroup
      .get('departureDate')
      ?.patchValue(this.trip?.departureDateTime);

    const departureDate = new Date(this.trip?.departureDateTime!);
    const departureHour = departureDate.getHours();
    const departureMinute = departureDate.getMinutes();
    let departureTime = `${
      departureHour < 10 ? '0' + departureHour : departureHour
    }:${departureMinute < 10 ? '0' + departureMinute : departureMinute}`;
    this.tripInfoGroup.get('departureTime')?.patchValue(departureTime);
  }

  submitTripUpdate(): void {
    if (this.tripInfoGroup.valid) {
      let depDate: Date = new Date(
        this.tripInfoGroup.get('departureDate')?.value
      );
      const selectedTime = this.tripInfoGroup
        .get('departureTime')
        ?.value.split(':');
      depDate.setHours(selectedTime[0]);
      depDate.setMinutes(selectedTime[1]);
      this.tripInfoGroup.get('departureDate')?.patchValue(depDate);

      const updatedTrip: Partial<_Trip> = {
        id: this.tripInfoGroup.get('id')?.value,
        startDestination: this.tripInfoGroup.get('fromDestination')?.value,
        endDestination: this.tripInfoGroup.get('toDestination')?.value,
        departureDateTime: depDate.toISOString(),
      };

      this._tripsService
        .updateTrip(updatedTrip)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this._snackbar.open('Trip Successfully Updated!', 'Dismiss', {
              duration: 2000,
              panelClass: ['success-snackbar'],
            });
          },
        });
    }
  }

  goBack(): void {
    this._router.navigate(['trips/trips-for-vehicle'], {
      state: { vehicleId: this.trip?.vehicleId },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
